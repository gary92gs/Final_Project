const db = require('./../index');

const getUsersFavouriteStocks = async (userId) => {

  const queryStr = `
  SELECT *
  FROM favourite_stocks
  JOIN stocks ON stock_id = stocks.id
  WHERE owner_id = $1;
  `;

  try {
    const result = await db.query(queryStr, [userId]);
    if (!result.rows.length) {
      return false;
    }
    return result.rows;
  }
  catch (error) {
    throw error;
  }
};

const addStocktoUserFavourites = async (userId, stockId) => {

  const queryStr = `
  INSERT INTO favourite_stocks (owner_id, stock_id)
  VALUES ($1, $2)
  RETURNING *;
  `;

  try {
    const result = await db.query(queryStr, [userId, stockId]);
    if (!result.rows.length) {
      return false;
    }
    return result.rows[0]
  }
  catch (error) {
    throw error;
  }
}

const deleteStockFromUsersFavourites = async (userId, stockId) => {

  const queryStr = `
    DELETE FROM favourite_stocks
    WHERE owner_id = $1 AND stock_id = $2;
  `;

  try {
    await db.query(queryStr, [userId, stockId]);
  }
  catch (error) {
    throw error;
  }
}


module.exports = { getUsersFavouriteStocks, addStocktoUserFavourites, deleteStockFromUsersFavourites };