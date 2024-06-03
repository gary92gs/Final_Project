const express = require('express');
const router = express.Router();
const axios = require('axios');
const { buildApiQueryString } = require('./../helpers/apiRequestHelpers');
const { 
  getStockInfoAndCurrentDataByTickerSymbol,
  getHistoricalDataByTickerSymbol,
  getAllStockDataByTickerSymbol,
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
  console.log('tickerSymbol:', tickerSymbol);

  const allStockData = {
    stockInfoAndCurrentData: '',
    historicalData:'',
  }

  try {
    const existingStock = await getStockInfoAndCurrentDataByTickerSymbol(tickerSymbol);

    
    // NEED TO VERIFY OBJECT IS COMING IN CORRECTLY
    if (!existingStock){
      existingStock = await axios.post('/api/dashboard-analysis', {tickerSymbol}) 
    }


    allStockData.stockInfoAndCurrentData = existingStock;
    allStockData.historicalData = await getHistoricalDataByTickerSymbol(tickerSymbol);

    res.status(200).json({allStockData});

  } catch (error) {
    console.log(`Error: ${error}`)
    res.status(500).json({message: "Internal Server Error"})
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

  const { tickerSymbol } = req.body; //NEED TO TEST

  try {
    const allStockData = getAllStockDataByTickerSymbol(tickerSymbol);
    console.log('allStockData:', allStockData);
    
    // res.status(200).json({allStockData});
  } catch (error) {
    console.log(`Error: ${error}`)
    res.status(500).json({message: "Internal Server Error"})
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