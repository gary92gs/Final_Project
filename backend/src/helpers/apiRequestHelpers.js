// require('dotenv').config();
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

const requestAllStockDataByTickerSymbol = async (tickerSymbol) => {

  const apiCallsArr = [
    'profile',
    'OVERVIEW',
    'BALANCE_SHEET',
    'CASH_FLOW',
    'EARNINGS',
    'TIME_SERIES_MONTHLY',
  ];

  const apiQueryStringsArr = apiCallsArr.map(apiFunction => {
    return buildApiQueryString(
      apiFunction === 'profile' ? process.env.FMP_BASE_URL : process.env.AV_BASE_URL,
      apiFunction,
      tickerSymbol,
      apiFunction === 'profile' ? process.env.FMP_API_KEY : process.env.AV_API_KEY
    );
  });

  try {
    const requests = apiQueryStringsArr.map(async (queryStringURL) => await axios.get(queryStringURL));
    const responses = await Promise.all(requests);
    return {
      profile: responses[0].data,
      OVERVIEW: responses[1].data,
      BALANCE_SHEET: responses[2].data,
      CASH_FLOW: responses[3].data,
      EARNINGS: responses[4].data,
      TIME_SERIES_MONTHLY: responses[5].data,
    };
  } catch (error) {
    throw error;
  }

};

module.exports = {
  buildApiQueryString,
  requestAllStockDataByTickerSymbol,
};