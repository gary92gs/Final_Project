const express = require('express');
const router = express.Router();



router.get('/', async (req, res) => {

  const { searchTerm } = req.query;

  const avApiKey = process.env.AV_API_KEY;
  const avBaseURL = process.env.AV_BASE_URL.replace('<<>>', 'SYMBOL_SEARCH&keywords=');
  const avSymbolSearchQuery = `${avBaseURL}SYMBOL_SEARCH&keywords=${searchTerm}${avApiKey}`;
  console.log('avSymbolSearchQuery:', avSymbolSearchQuery);


  // search AV api for existing ticker_symbol or company name

  // return search results as array of objects

  res.json({ message: 'reached /api/search' });
});


module.exports = router;