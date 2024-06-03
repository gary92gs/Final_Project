
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
    buildApiQueryString(
      apiFunction === 'profile' ? process.env.FMP_BASE_URL : process.env.AV_BASE_URL,
      apiFunction,
      tickerSymbol,
      apiFunction === 'profile' ? process.env.FMP_API_KEY : process.env.AV_API_KEY,
    )
  });

  try {
    const requests = apiQueryStringsArr.map(async (queryStringURL) => await axios.get(queryStringURL));
    const responses = await Promise.all(requests);
    return responses.map(response => response.data);
  } catch (error) {
    throw error;
  }

};

module.exports = {
  buildApiQueryString,
  requestAllStockDataByTickerSymbol,
};