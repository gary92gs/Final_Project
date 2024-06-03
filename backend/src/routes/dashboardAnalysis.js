const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  // extract id from request params [ front-end: axios.get('/api/dashboard-analysis, {params: {tickerSymbol: <value>}}) ]
  const { tickerSymbol } = req.query;
  console.log('tickerSymbol:', tickerSymbol);

  

  // find the stock by id in the db
  // query db for all analysis data
  // send data to dashboard analysis component
  res.status(200).json({ message: "working" });
});

module.exports = router;