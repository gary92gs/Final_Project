const express = require('express');
const router = express.Router();
const axios = require('axios');
const { requestAllStockDataByTickerSymbol } = require('./../helpers/apiRequestHelpers');
const {
  checkApiData,
  formatAllStockData,
} = require('./../helpers/apiDataHelpers');
const {
  getStockInfoAndCurrentDataByTickerSymbol,
  getHistoricalDataByTickerSymbol,
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

  const allStockData = {
    stockInfoAndCurrentData: '',
    historicalData: '',
  };

  try {
    let existingStock = await getStockInfoAndCurrentDataByTickerSymbol(tickerSymbol);
    console.log('stock in DB?:', existingStock);

    // NEED TO VERIFY OBJECT IS COMING IN CORRECTLY
    if (!existingStock) {
      console.log('Making API Requests');
      const postResponse = await axios.post(`http://${process.env.HOST}:${process.env.PORT}/api/dashboard-analysis`, { tickerSymbol });
      console.log('GET: postResponse.data', postResponse.data);
      // console.log('existingStock2:', existingStock); 
    }

    return res.status(200).json({ message: 'get message' });

    // allStockData.stockInfoAndCurrentData = existingStock;
    // allStockData.historicalData = await getHistoricalDataByTickerSymbol(tickerSymbol);
    // res.status(200).json({allStockData});

  } catch (error) {
    console.log(`Error: ${error}`);
    res.status(500).json({ message: "Internal Server Error" });
  }


  res.status(200).json({ message: "working" });
});

// MASS API CALLS + INSERT QUERIES FOR NEW STOCKS (stocks that do not exist in our db)
// grab ticker symbol from req object
// retrive all stock data from multiple api endpoints

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
    // CHECK DATA RESPONSE (anything missing? is it not a stock?)
    const dataReport = checkApiData(rawStockData);
    console.log('dataReport:', dataReport);
    if (dataReport.isNotPresent) {
      return res.status(204).json({
        message: `This Ticker Symbol does not exist in our records.`
      });
    }
    if (dataReport.isNotStock) {
      return res.status(206).json({
        message: `This Ticker Symbol pertains to an ETF, Mutual Fund, or ADR (American Depository Receipt).`
      });
    }
    if (dataReport.hasIncompleteData) {
      return res.status(206).json({
        message: `This Ticker Symbol pertains to a Stock, but does not contain the information necessary for analysis.`
      });
    }
    //FORMAT DATA
    formatAllStockData(rawStockData);
    //QUERY DB THRICE (INSERTS)
    return res.status(200).json({ message: 'post message' });
    // res.status(200).json({allStockData});
  } catch (error) {
    console.log(`Error: ${error}`);
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