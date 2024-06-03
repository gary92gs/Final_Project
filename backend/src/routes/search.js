const express = require('express');
const router = express.Router();
const axios = require('axios');
const { buildApiQueryString } = require('./../helpers/apiRequestHelpers');

router.get('/', async (req, res) => {

  const { searchTerm } = req.query;

  const apiQueryString = buildApiQueryString(
    process.env.AV_BASE_URL, 
    'SYMBOL_SEARCH', 
    searchTerm, 
    process.env.AV_API_KEY
  )

  try {
    const searchResult = await axios.get(apiQueryString);
    return res.status(200).json({ data: searchResult.data.bestMatches });
  } catch (error) {
    console.log(`Error Retrieving API Data: ${error}`);
    return res.status(500).json({ message: 'Internal Server Error' });
  }

});


module.exports = router;