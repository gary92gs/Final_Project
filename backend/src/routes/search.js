const express = require('express');
const router = express.Router();
const axios = require('axios');

router.get('/', async (req, res) => {

  const { searchTerm } = req.query;

  const avApiKey = process.env.AV_API_KEY;
  const avBaseURL = process.env.AV_BASE_URL.replace('<<>>', `SYMBOL_SEARCH&keywords=${searchTerm}`);
  const avSymbolSearchQuery = `${avBaseURL}${avApiKey}`;

  // search AV api for existing ticker_symbol or company name
  try {
    const searchResult = await axios.get(avSymbolSearchQuery);
    return res.status(200).json({ data: searchResult.data.bestMatches });
  } catch (error) {
    console.log(`Error Retrieving API Data: ${error}`);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
  
});


module.exports = router;