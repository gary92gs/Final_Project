const express = require('express');
const router = express.Router();
const axios = require('axios');
const { 
  requestAllStockDataByTickerSymbol,
  requestCurrent10YrTreasuryYield,
  requestCurrentStockPriceByTickerSymbol,
} = require('./../helpers/apiRequestHelpers');
const {
  checkApiData,
  formatAllStockData,
} = require('./../helpers/apiDataHelpers');
const {
  calculateStockIntrinsicValue,
} = require('./../helpers/intrinsicValueHelpers');
const {
  getStockInfoByTickerSymbol,
  getCurrentDataByStockId,
  getHistoricalDataByStockId,
  postNewStocksInfo,
  postNewCurrentDataByStockId,
  postNewHistoricalDataByStockId,
  updateNewCurrentStockDataByStockId,
} = require('./../db/queries/dashboardQueries');

// CHECK DATABASE FOR EXISTING
// grab ticker symbol from req object [ front-end: axios.get('/api/dashboard-analysis, {params: {tickerSymbol: <value>}}) ]
// query db for existing stock data
// if stock not-present, 
// make POST request to self to retrieve data (and insert it into db)
// send stockdata to user/front-end
router.get('/', async (req, res) => {

  const { tickerSymbol } = req.query;

  const allAnalysisData = {};
 
  try {
    allAnalysisData['stocks'] = await getStockInfoByTickerSymbol(tickerSymbol);

    // NEED TO VERIFY OBJECT IS COMING IN CORRECTLY
    if (!allAnalysisData.stocks) {
      console.log('stock does not exist in db!!')
      // request new data via post request
      const response = await axios.post(`http://${process.env.HOST}:${process.env.PORT}/api/dashboard-analysis`, { tickerSymbol });
      
      // check if post was unsuccessful and relay post request's message to user/frontend
      if (!response.data.isPosted) {
        return res.status(response.status).json({message: response.data.message})
      }

      allAnalysisData.stocks = await getStockInfoByTickerSymbol(tickerSymbol);
    }

    // grab remaining stock data
    allAnalysisData['current_data'] = await getCurrentDataByStockId(allAnalysisData.stocks.id);
    allAnalysisData['historical_data'] = await getHistoricalDataByStockId(allAnalysisData.stocks.id);
    
    // grab risk_free_rate (10yr treasury yield)
    allAnalysisData['risk_free_rate'] = await requestCurrent10YrTreasuryYield();
    // grab current stock price
    allAnalysisData['current_stock_price'] = await requestCurrentStockPriceByTickerSymbol(tickerSymbol);
    
    // calculate intrinsic value
    allAnalysisData['intrinsic_value'] = calculateStockIntrinsicValue(allAnalysisData);

    const {
      current_stock_price,
      intrinsic_value,
      risk_free_rate,
      stocks,
      current_data,
    } = allAnalysisData;

    console.log('current_stock_price:', current_stock_price);
    console.log('intrinsic_value:', intrinsic_value);

    return res.status(200).json({ message: 'get message', allAnalysisData });

  } catch (error) {
    console.log(`Error: ${error}`);
    res.status(500).json({ message: "Internal Server Error" });
  }


  res.status(200).json({ message: "working" });
});

// MASS API CALLS + INSERT QUERIES FOR NEW STOCKS (stocks that do not exist in our db)
// grab ticker symbol from req object
// retrieve all stock data from multiple api endpoints
// check api data (and generate report for easy viewing) and return without data if unsuitable
// format retrieved data into appropriate structure for db insert queries
// make queries to db to insert and return all data on new stock 
// stocks table (return)
// current_data table (return)
// historical_data table (don't return)
// send data back to GET route (which called this route)
router.post('/', async (req, res) => {

  const { tickerSymbol } = req.body;

  try {
    const rawStockData = await requestAllStockDataByTickerSymbol(tickerSymbol);
    console.log('API calls complete');

    // Log dataReport for 'birds-eye-view' for data received from api requests
    const dataReport = checkApiData(rawStockData);

    // if data is unsuitable, return corresponding message
    if (dataReport.isNotPresent) {
      return res.status(204).json({
        isPosted: false,
        message: `This Ticker Symbol does not exist in our records.`
      });
    }
    if (dataReport.isNotStock) {
      return res.status(206).json({
        isPosted: false,
        message: `This Ticker Symbol pertains to an ETF, Mutual Fund, or ADR (American Depository Receipt).`
      });
    }
    if (dataReport.hasIncompleteData) {
      return res.status(206).json({
        isPosted: false,
        message: `This Ticker Symbol pertains to a Stock, but does not contain the information necessary for analysis.`
      });
    }
    
    // if data response is suitable format data into 3 objects for inserting into corresponding tables
    const {
      stocks, // for stocks table
      current_data, // for current_data table
      historical_data, // for historical data table
    } = formatAllStockData(rawStockData);

    //QUERY DB THRICE (stocks, current_data, and historical_data)
    // log these variables to see newly inserted data
    const postedStockInfo = await postNewStocksInfo(stocks);
    const postedCurrentData = await postNewCurrentDataByStockId(postedStockInfo.id, current_data);
    const postedHistoricalData = await postNewHistoricalDataByStockId(postedStockInfo.id, historical_data);

    // return isPosted status + corresponding message
    return res.status(200).json({
      isPosted: true,
      message: `Stock Data, Current Data, and Historical Data Have Been Inserted Into The Database Successfully.`
    });

  } catch (error) {
    console.log(`Error Requesting, Formating, or Inserting Data: ${error}`);
    res.status(500).json({ message: "Internal Server Error" });
  }

});

// CHECK FOR NEW DATA PERTAINING TO SPECIFIC STOCK
// grab ticker symbol from req object
// query db for date of most recent quarter for given stock 
// make api call to determine date of most recent quarter 
// if new data was released (api date > db date), 
// determine how many quarters need to be inserted into db
// query db to insert (without return) new data point(s) into db
// current_data table
// historical_data table
// query db for all stock data, including newly inserted rows
// send updated stock data to frontend
router.put('/', async (req, res) => {

});

module.exports = router;

