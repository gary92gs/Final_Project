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
    return result.rows;
  }
  catch (error) {
    throw error;
  }
};



module.exports = { getUsersFavouriteStocks };