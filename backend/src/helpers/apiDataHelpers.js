const {
  confirmHistoricalDataAlignment,
  removeExtraMonthlyEntries,
} = require('./miscHelpers');

const isNotStock = (responseData) => {

  console.log('inside isNotStock()')

  const { profile } = responseData;

  if (
    profile[0].isEtf ||
    profile[0].isFund ||
    profile[0].isAdr
  ) {
    return true;
  }

  return false;
};

const checkProfile = (responseData) => {
  console.log('inside checkProfile()')
  const { profile } = responseData;

  try {
    return {
      symbol: profile[0].symbol,
      companyName: profile[0].companyName,
      isEtf: profile[0].isEtf,
      isFund: profile[0].isFund,
      isAdr: profile[0].isAdr,
    };
  } catch (error) {
    return false;
  }

};

const checkOverview = (responseData) => {
  console.log('inside checkOverview()')
  const { OVERVIEW } = responseData;

  try {
    if (OVERVIEW.Beta === 'None') {
      return false;
    }
    return {
      EPS: OVERVIEW.EPS,
      PERatio: OVERVIEW.PERatio,
      DividendPerShare: OVERVIEW.DividendPerShare,
      DividendYield: OVERVIEW.DividendYield,
      Beta: OVERVIEW.Beta,
    };
  } catch (error) {
    return false;
  }

};

const checkBalanceSheet = (responseData) => {
  console.log('inside checkBalanceSheet()')
  const { BALANCE_SHEET } = responseData;

  try {
    return {
      numberOfRows: BALANCE_SHEET.quarterlyReports.length,
      mostRecentReportDate: BALANCE_SHEET.quarterlyReports[0].fiscalDateEnding,
      mostRecentOutstandingShares: BALANCE_SHEET.quarterlyReports[0].commonStockSharesOutstanding,
      mostRecentShareholdersEquity: BALANCE_SHEET.quarterlyReports[0].totalShareholderEquity,
    }
  } catch (error) {
    return false;
  }

};

const checkCashFlow = (responseData) => {
  console.log('inside checkCashFlow()')
  const { CASH_FLOW } = responseData;

  try {
    return {
      numberOfRows: CASH_FLOW.quarterlyReports.length,
      mostRecentNetIncome: CASH_FLOW.quarterlyReports[0].netIncome,
      mostRecentTotalDividendPayout: CASH_FLOW.quarterlyReports[0].dividendPayoutCommonStock,
    }
  } catch (error) {
    return false;
  }

};

const checkEarnings = (responseData) => {
  console.log('inside checkEarnings()')
  const {EARNINGS} = responseData;

  try {
    return {
      numberOfRows: EARNINGS.quarterlyEarnings.length,
      mostRecentReportedEPS: EARNINGS.quarterlyEarnings[0].reportedEPS,
    }
  } catch (error) {
    return false;
  }
  
};

const checkTimeSeriesMonthly = (responseData) => {
  console.log('inside checkTimeSeriesMonthly()')
  const {TIME_SERIES_MONTHLY} = responseData;

  try {
    const monthlyTimeSeriesKeys = Object.keys(TIME_SERIES_MONTHLY['Monthly Time Series']);
    return {
      numberOfRows: monthlyTimeSeriesKeys.length,
      mostRecentHigh: TIME_SERIES_MONTHLY['Monthly Time Series'][monthlyTimeSeriesKeys[0]]['2. high'],
      mostRecentLow: TIME_SERIES_MONTHLY['Monthly Time Series'][monthlyTimeSeriesKeys[0]]['3. low'],
      mostRecentOpen: TIME_SERIES_MONTHLY['Monthly Time Series'][monthlyTimeSeriesKeys[0]]['1. open'],
      mostRecentClose: TIME_SERIES_MONTHLY['Monthly Time Series'][monthlyTimeSeriesKeys[0]]['4. close'],
    }
  } catch (error) {
    return false;  
  }

};

const buildDataReport = (responseData) => {
  console.log('building data report')
  return {
    profile: checkProfile(responseData),
    overview: checkOverview(responseData),
    balanceSheet: checkBalanceSheet(responseData),
    cashFlow: checkCashFlow(responseData),
    earnings: checkEarnings(responseData),
    timeSeriesMonthly: checkTimeSeriesMonthly(responseData),
  };

};

const checkApiData = (responseData) => {

  const {
    profile,
    OVERVIEW,
    BALANCE_SHEET,
    CASH_FLOW,
    EARNINGS,
    TIME_SERIES_MONTHLY,
  } = responseData;

  // console.log('profile:', profile);
  // console.log('OVERVIEW:', OVERVIEW);
  // console.log('BALANCE_SHEET:', BALANCE_SHEET);
  // console.log('CASH_FLOW:', CASH_FLOW.quarterlyReports);
  // console.log('EARNINGS:', EARNINGS);
  // console.log('TIME_SERIES_MONTHLY:', TIME_SERIES_MONTHLY);

  const dataReport = buildDataReport(responseData);

  if (!dataReport.profile) {
    return {
      isNotPresent: true,
      isNotStock: false,
      hasIncompleteData: false,
      dataReport,
    };
  }

  if (isNotStock(responseData)) {
    return {
      isNotPresent: false,
      isNotStock: true,
      hasIncompleteData: false,
      dataReport,
    };
  }

  if (
    !dataReport.overview ||
    !dataReport.balanceSheet ||
    !dataReport.cashFlow
  ) {
    return {
      isNotPresent: false,
      isNotStock: false,
      hasIncompleteData: true,
      dataReport,
    };
  }

  return {
    isNotPresent: false,
    isNotStock: false,
    hasIncompleteData: false,
    dataReport,
  }

};

const formatStockInfoAndCurrentData = (responseData) => {

  const {
    profile,
    OVERVIEW,
  } = responseData;

  return {
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
      eps: OVERVIEW.EPS === 'None' ? 0 : Number(OVERVIEW.EPS),
      pe_ratio: OVERVIEW.PERatio === 'None' ? 0 : Number(OVERVIEW.PERatio),
      dividend_per_share: OVERVIEW.DividendPerShare === 'None' ? 0 : Number(OVERVIEW.DividendPerShare),
      dividend_yield: OVERVIEW.DividendYield === 'None' ? 0 : Number(OVERVIEW.DividendYield),
      investment_beta: OVERVIEW.Beta === Number(OVERVIEW.Beta),
    },
  };

};

const formatHistoricalData = (responseData) => {

  const {
    BALANCE_SHEET,
    CASH_FLOW,
    EARNINGS,
    TIME_SERIES_MONTHLY,
  } = responseData;

  const historicalData = [];

  // grab all time series keys in order
  const timeSeriesDateKeys = Object.keys(TIME_SERIES_MONTHLY['Monthly Time Series']);

  console.log('Finished Building Stocks and Current_Data Objects');
  //write allStockData.historical_data from responseData
  while (
    BALANCE_SHEET.quarterlyReports.length &&
    CASH_FLOW.quarterlyReports.length &&
    EARNINGS.quarterlyEarnings.length
  ) {
    console.log(`Building Historical_Data Row #:${historicalData.length + 1}`);

    // confirm that the fiscalDateEnding values are the same
    console.log('checking if all report dates match');

    // maybe have cashfow and balance sheet set min date only. 
    confirmHistoricalDataAlignment(BALANCE_SHEET, CASH_FLOW, EARNINGS); // earnings date must not delete balance_sheet or cash_flow, but can be deleted by balance_sheet or cash_flow

    // TRIMMING EXTRA MONTHLY REPORTS (NEW REPORTS = SHOULD ONLY RUN AT BEGINNING)
    // ensures m_1-m_3 data correctly corresponds to each quarter
    console.log('checking for extra Monthly Time Series data (ie. data that belongs to current/unfinished quarter)');
    if (
      timeSeriesDateKeys.length &&
      BALANCE_SHEET.quarterlyReports[0].fiscalDateEnding.slice(0, -3) !== timeSeriesDateKeys[0].slice(0, -3)
    ) {
      removeExtraMonthlyEntries(BALANCE_SHEET, timeSeriesDateKeys);
    }
    console.log('finished checking for extra Monthly Time Series data');

    console.log('building dataRow');

    // collect data for each row
    const dataRow = {
      // remember to grab stockid after insert
      report_date: BALANCE_SHEET.quarterlyReports[0].fiscalDateEnding,
      net_income: parseInt(CASH_FLOW.quarterlyReports[0].netIncome),
      outstanding_shares: parseInt(BALANCE_SHEET.quarterlyReports[0].commonStockSharesOutstanding),
      shareholders_equity: BALANCE_SHEET.quarterlyReports[0].totalShareholderEquity === 'None' ? 0 : parseInt(BALANCE_SHEET.quarterlyReports[0].totalShareholderEquity),
      total_dividend_payout: CASH_FLOW.quarterlyReports[0].dividendPayoutCommonStock === 'None' ? 0 : parseInt(CASH_FLOW.quarterlyReports[0].dividendPayoutCommonStock),
      reported_eps: parseFloat(EARNINGS.quarterlyEarnings[0].reportedEPS), // check earnings.quarterlyEarnings[index].fiscalDateEnding, and default to 0 if not matching date
      m1: timeSeriesDateKeys[2] || 0,
      m1_high: parseFloat(TIME_SERIES_MONTHLY['Monthly Time Series']?.[timeSeriesDateKeys[2]]?.['2. high']) || 0,
      m1_low: parseFloat(TIME_SERIES_MONTHLY['Monthly Time Series']?.[timeSeriesDateKeys[2]]?.['3. low']) || 0,
      m1_open: parseFloat(TIME_SERIES_MONTHLY['Monthly Time Series']?.[timeSeriesDateKeys[2]]?.['1. open']) || 0,
      m1_close: parseFloat(TIME_SERIES_MONTHLY['Monthly Time Series']?.[timeSeriesDateKeys[2]]?.['4. close']) || 0,
      m2: timeSeriesDateKeys[1] || 0,
      m2_high: parseFloat(TIME_SERIES_MONTHLY['Monthly Time Series']?.[timeSeriesDateKeys[1]]?.['2. high']) || 0,
      m2_low: parseFloat(TIME_SERIES_MONTHLY['Monthly Time Series']?.[timeSeriesDateKeys[1]]?.['3. low']) || 0,
      m2_open: parseFloat(TIME_SERIES_MONTHLY['Monthly Time Series']?.[timeSeriesDateKeys[1]]?.['1. open']) || 0,
      m2_close: parseFloat(TIME_SERIES_MONTHLY['Monthly Time Series']?.[timeSeriesDateKeys[1]]?.['4. close']) || 0,
      m3: timeSeriesDateKeys[0] || 0,
      m3_high: parseFloat(TIME_SERIES_MONTHLY['Monthly Time Series']?.[timeSeriesDateKeys[0]]?.['2. high']) || 0,
      m3_low: parseFloat(TIME_SERIES_MONTHLY['Monthly Time Series']?.[timeSeriesDateKeys[0]]?.['3. low']) || 0,
      m3_open: parseFloat(TIME_SERIES_MONTHLY['Monthly Time Series']?.[timeSeriesDateKeys[0]]?.['1. open']) || 0,
      m3_close: parseFloat(TIME_SERIES_MONTHLY['Monthly Time Series']?.[timeSeriesDateKeys[0]]?.['4. close']) || 0,
    };

    console.log('finished building dataRow');
    console.log('dataRow:', dataRow);

    // shift used data row from each array for balance_sheet, cash_flow, and earnings
    BALANCE_SHEET.quarterlyReports.shift();
    CASH_FLOW.quarterlyReports.shift();
    EARNINGS.quarterlyEarnings.shift();
    for (let i = 0; i < 3; i++) {
      timeSeriesDateKeys.shift();
    }

    // unshift desired data for each row into allStockData.historical_data array
    historicalData.unshift(dataRow);

  }

  return historicalData;

};

const formatAllStockData = (responseData) => {

  const allStockData = formatStockInfoAndCurrentData(responseData);

  allStockData['historical_data'] = formatHistoricalData(responseData);
  
  // console.log('allStockData.stocks', allStockData.stocks);
  // console.log('allStockData.current_data', allStockData.current_data);
  // console.log('allStockData.historical_data', allStockData.historical_data);
  // console.log('allStockData:', allStockData);
};

module.exports = {
  checkApiData,
  formatAllStockData,
};
