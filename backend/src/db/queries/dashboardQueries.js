const db = require('./../index');

// gets from both stocks and current_data 
const getStockInfoAndCurrentDataByTickerSymbol = async (tickerSymbol) => {

  const queryStr = `
    SELECT * 
    FROM stocks
    JOIN current_data ON stocks.id = stock_id
    WHERE ticker_symbol = $1;
  `;

  try {
    const result = await db.query(queryStr, [tickerSymbol]);
    if (!result.rows.length) {
      return false;
    }
    return result.rows[0];
  } catch (error) {
    throw error;
  }

};

// gets from historical_data 
const getHistoricalDataByTickerSymbol = async (tickerSymbol) => {

  const queryStr = `
    SELECT *
    FROM historical_data
    WHERE ticker_symbol = $1
    ORDER BY report_date DESC;
  `;

  try {
    const result = await db.query(queryStr, [tickerSymbol]);
    if (!result.rows.length) {
      return false;
    }
    return result.rows;
  } catch (error) {
    throw error;
  }

};



// posts to stocks
const postNewStocksInfo = async (newStockInfo) => {

  const {
    tickerSymbol,
    companyName,
    imageURL,
    description,
    industrySector,
    country,
    currency,
  } = newStockInfo;

  const queryStr = `
    INSERT INTO stocks (ticker_symbol, company_name, image_url, description, industry_sector, country, currency)
    VALUES ($1, $2, $3, $4, $5, $6, $7)
    RETURNING *;
  `;

  try {
    const result = await db.query(queryStr, [
      tickerSymbol,
      companyName,
      imageURL,
      description,
      industrySector,
      country,
      currency,
    ]);
    if (!result.rows.length) {
      return false;
    }
    return result.rows[0];
  } catch (error) {
    throw error;
  }
};

// posts to current_data
const postNewCurrentDataByStockId = async (stockId, newStockCurrentData) => {

  const {
    eps,
    peRatio,
    dividendPerShare,
    dividendYield,
    investmentBeta,
  } = newStockCurrentData;

  const queryStr = `
    INSERT INTO current_data (stock_id, eps, pe_ratio, dividend_per_share, dividend_yield, investment_beta)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING *;
  `;

  try {
    const result = await db.query(queryStr, [
      stockId,
      eps,
      peRatio,
      dividendPerShare,
      dividendYield,
      investmentBeta,
    ]);
    if (!result.rows.length) {
      return false;
    }
    return result.rows[0];
  } catch (error) {
    throw error;
  }
};

// posts to historical_data
const postNewHistoricalDataByStockId = async (stockId, newHistoricalDataArr) => {

  let queryStr = `INSERT INTO historical_data (
    stock_id,
    report_date,
    net_income,
    outstanding_shares,
    shareholders_equity,
    total_dividend_payout,
    reported_eps,
    m1_high,
    m1_low,
    m1_open,
    m1_close,
    m2_high,
    m2_low,
    m2_open,
    m2_close,
    m3_high,
    m3_low,
    m3_open,
    m3_close,
  ) VALUES `;

  const parameterizedArgumentsArr = [];

  newHistoricalDataArr.forEach((tableRow, i) => {
    const start = i * 19;
    queryStr = queryStr + `(
      $${1 + start},
      $${2 + start},
      $${3 + start},
      $${4 + start},
      $${5 + start},
      $${6 + start},
      $${7 + start},
      $${8 + start},
      $${9 + start},
      $${10 + start},
      $${11 + start},
      $${12 + start},
      $${13 + start},
      $${14 + start},
      $${15 + start},
      $${16 + start},
      $${17 + start},
      $${18 + start},
      $${19 + start}
    ),`;
    parameterizedArgumentsArr.push(...Object.values(tableRow));
  });

  queryStr = queryStr.slice(0, -1) + `RETURNING *;`;

  try {
    const result = await db.query(queryStr, parameterizedArgumentsArr);
    if (!result.rows.length) {
      return false;
    }
    return result.rows;
  } catch (error) {
    throw error;
  }

};

// updates row of data to current_data table
const updateNewCurrentStockDataByStockId = async (stockId, newCurrentData) => {

  const {
    eps,
    peRatio,
    dividendPerShare,
    dividendYield,
    investmentBeta,
  } = newCurrentData;

  const queryStr = `
    UPDATE current_data
    SET eps = $2, pe_ratio = $3, dividend_per_share = $4, dividend_yield = $5, investment_beta = $6
    WHERE stock_id = $1
    RETURNING *;
  `;

  try {
    const result = await db.query(queryStr, [
      stockId,
      eps,
      peRatio,
      dividendPerShare,
      dividendYield,
      investmentBeta,
    ]);
    if (!result.rows.length) {
      return false;
    }
    return result.rows[0];
  } catch (error) {
    throw error;
  }

};

module.exports = {
  getStockInfoAndCurrentDataByTickerSymbol,
  getHistoricalDataByTickerSymbol,
  postNewStocksInfo,
  postNewCurrentDataByStockId,
  postNewHistoricalDataByStockId,
  updateNewCurrentStockDataByStockId,
};