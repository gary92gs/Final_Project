const express = require('express');
const router = express.Router();

router.get('/:ticker_symbol', (req, res) => {
  // search database for existing ticker_symbol or company name
  
  // if match found display relevant data

  // else:
  // make api request to obtain data from FMP
  // save data into stocks table
  // display relevant data from db
});


module.exports = router;