const axios = require('axios');

const buildApiQueryString = (baseURL, apiFunction, apiParameter, apiKey) => {

  if (baseURL.includes('financialmodelingprep')) {
    return `${baseURL}${apiFunction}/${apiParameter}?apikey=${apiKey}`;
  }

  if (apiFunction === 'SYMBOL_SEARCH') {
    return `${baseURL}${apiFunction}&keywords=${apiParameter}&apikey=${apiKey}`;
  }

  return `${baseURL}${apiFunction}&symbol=${apiParameter}&apikey=${apiKey}`;

};

module.exports = {
  buildApiQueryString,
};