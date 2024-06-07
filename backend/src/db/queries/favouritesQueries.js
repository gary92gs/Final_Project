const db = require('./../index');

const getUsersFavouriteStocks = async (userID) => {

  const queryStr = `
  SELECT *
  FROM favourite_stocks
  JOIN stocks ON stock_id = stocks.id
  WHERE owner_id = $1;
  `;

  try {
    const result = await db.query(queryStr, [userID]);
    if (!result.rows.length) {
      return false;
    }
    return result.rows;
  }
  catch (error) {
    throw error;
  }
};

const addStocktoUserFavourites = async (userID, stockID) => {

  const queryStr = `
  INSERT INTO favourite_stocks (user_id, stock_id)
  VALUES ($1, $2)
  RETURNING *;
  `;

  try {
    await db.query(queryStr, [userID, stockID]);
    if (!result.rows.length) {
      return false;
    }
    return result.rows[0]
  }
  catch (error) {
    throw error;
  }
}

const deleteStockFromUsersFavourites = async (userID, stockID) => {

  const queryStr = `
    DELETE FROM favourite_stocks
    WHERE user_id = $1 AND stock_id = $2;
  `;

  try {
    await db.query(queryStr, [userID, StockID]);
  }
  catch (error) {
    throw error;
  }
}


module.exports = { getUsersFavouriteStocks, addStocktoUserFavourites, deleteStockFromUsersFavourites };