// require('dotenv').config();
const axios = require('axios');
const {
  confirmHistoricalDataAlignment,
  removeExtraMonthlyEntries,
} = require('./miscHelpers');

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

const formatAllStockData = (responseData) => {

  const {
    profile,
    OVERVIEW,
    BALANCE_SHEET,
    CASH_FLOW,
    EARNINGS,
    TIME_SERIES_MONTHLY,
  } = responseData;

  const allStockData = {
    // stocks table (Request 0)
    stocks: {
      ticker_symbol: profile[0].symbol,
      company_name: profile[0].companyName,
      image_url: profile[0].image,
      description: profile[0].description,
      industry_sector: profile[0].sector,
      country: profile[0].country,
      currency: profile[0].currency,
    },
    // current_data table (Request 1)
    current_data: {
      // remember to grab stockid after insert
      eps: Number(OVERVIEW.EPS),
      pe_ratio: Number(OVERVIEW.PERatio),
      dividend_per_share: Number(OVERVIEW.DividendPerShare),
      dividend_yield: Number(OVERVIEW.DividendYield),
      investment_beta: Number(OVERVIEW.Beta),
    },
    // historical_data table (Request 2)
    historical_data: []
  };

  // grab all time series keys in order
  const timeSeriesDateKeys = Object.keys(TIME_SERIES_MONTHLY['Monthly Time Series']);

  //write allStockData.historical_data from responseData
  while (
    BALANCE_SHEET.quarterlyReports.length &&
    CASH_FLOW.quarterlyReports.length &&
    EARNINGS.quarterlyEarnings.length
  ) {

    const balanceSheetDate = new Date(BALANCE_SHEET.quarterlyReports[0].fiscalDateEnding);
    const cashFlowDate = new Date(CASH_FLOW.quarterlyReports[0].fiscalDateEnding);
    const earningsDate = new Date(EARNINGS.quarterlyEarnings[0].fiscalDateEnding);

    // confirm that the fiscalDateEnding values are the same
    confirmHistoricalDataAlignment(balanceSheetDate, cashFlowDate, earningsDate, BALANCE_SHEET, CASH_FLOW, EARNINGS);

    // TRIMMING EXTRA MONTHLY REPORTS (NEW REPORTS = SHOULD ONLY RUN AT BEGINNING)
    // ensures m_1-m_3 data correctly corresponds to each quarter
    if (BALANCE_SHEET.quarterlyReports[0].fiscalDateEnding.slice(0, -3) !== timeSeriesDateKeys[0].slice(0, -3)) {
      removeExtraMonthlyEntries(BALANCE_SHEET, timeSeriesDateKeys);
    }

    // collect data for each row
    const dataRow = {
      // remember to grab stockid after insert
      report_date: BALANCE_SHEET.quarterlyReports[0].fiscalDateEnding,
      net_income: CASH_FLOW.quarterlyReports[0].netIncome,
      outstanding_shares: BALANCE_SHEET.quarterlyReports[0].commonStockSharesOutstanding,
      shareholders_equity: BALANCE_SHEET.quarterlyReports[0].totalShareholderEquity,
      total_dividend_payout: CASH_FLOW.quarterlyReports[0].dividendPayoutCommonStock,
      reported_eps: EARNINGS.quarterlyEarnings[0].reportedEPS,
      m1: timeSeriesDateKeys[2],
      m1_high: TIME_SERIES_MONTHLY['Monthly Time Series'][timeSeriesDateKeys[2]]['2. high'],
      m1_low: TIME_SERIES_MONTHLY['Monthly Time Series'][timeSeriesDateKeys[2]]['3. low'],
      m1_open: TIME_SERIES_MONTHLY['Monthly Time Series'][timeSeriesDateKeys[2]]['1. open'],
      m1_close: TIME_SERIES_MONTHLY['Monthly Time Series'][timeSeriesDateKeys[2]]['4. close'],
      m2: timeSeriesDateKeys[1],
      m2_high: TIME_SERIES_MONTHLY['Monthly Time Series'][timeSeriesDateKeys[1]]['2. high'],
      m2_low: TIME_SERIES_MONTHLY['Monthly Time Series'][timeSeriesDateKeys[1]]['3. low'],
      m2_open: TIME_SERIES_MONTHLY['Monthly Time Series'][timeSeriesDateKeys[1]]['1. open'],
      m2_close: TIME_SERIES_MONTHLY['Monthly Time Series'][timeSeriesDateKeys[1]]['4. close'],
      m3: timeSeriesDateKeys[0],
      m3_high: TIME_SERIES_MONTHLY['Monthly Time Series'][timeSeriesDateKeys[0]]['2. high'],
      m3_low: TIME_SERIES_MONTHLY['Monthly Time Series'][timeSeriesDateKeys[0]]['3. low'],
      m3_open: TIME_SERIES_MONTHLY['Monthly Time Series'][timeSeriesDateKeys[0]]['1. open'],
      m3_close: TIME_SERIES_MONTHLY['Monthly Time Series'][timeSeriesDateKeys[0]]['4. close'],
    };

    // shift used data row from each array for balance_sheet, cash_flow, and earnings
    BALANCE_SHEET.quarterlyReports.shift();
    CASH_FLOW.quarterlyReports.shift();
    EARNINGS.quarterlyEarnings.shift();
    for (let i = 0; i < 3; i++) {
      timeSeriesDateKeys.shift();
    }
    // unshift desired data for each row into allStockData.historical_data array
    allStockData.historical_data.unshift(dataRow);

  }

  console.log('allStockData:', allStockData);
};

module.exports = {
  buildApiQueryString,
  requestAllStockDataByTickerSymbol,
  formatAllStockData,
};