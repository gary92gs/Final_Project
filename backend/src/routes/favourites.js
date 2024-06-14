const express = require('express');
const router = express.Router();
const {
  getUsersFavouriteStocks,
  addStocktoUserFavourites,
  deleteStockFromUsersFavourites,
  getMostFavouritedStocks,
} = require('../db/queries/favouritesQueries');
const { getUserSessionCookie } = require('../helpers/userSessionHelpers');

// gets the top 10 most-favourited stocks
router.get('/trending', async (req, res) => {

  try {

    const userId = getUserSessionCookie(req);
    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const trendingStocks = await getMostFavouritedStocks();
    if (!trendingStocks) {
      return res.status(204).json({ message: 'No Trending Stocks in DB' });
    }
    console.log('trendingStocks', trendingStocks);
    return res.status(200).json({ trendingStocks });

  } catch (error) {
    console.log(`Error: ${error}`);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.get('/', async (req, res) => {

  try {

    const userId = getUserSessionCookie(req);
    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const favouriteStocks = await getUsersFavouriteStocks(userId);

    res.status(200).json({ userFavourites: favouriteStocks });

  } catch (error) {
    console.log(`Error: ${error}`);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.post('/', async (req, res) => {

  try {

    const userId = getUserSessionCookie(req);
    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const stockId = req.body.stock_id;
    const stockAddedtoFavourites = await addStocktoUserFavourites(userId, stockId);

    if (!stockAddedtoFavourites) {
      return res.status(500).json({ message: 'Adding stocks to favourites was unsuccessful' });
    }

    return res.status(200).json({ message: 'Stock has been added to your favourites' });
  }
  catch (error) {
    console.log(`Error: ${error}`);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.delete('/', async (req, res) => {

  try {

    const userId = getUserSessionCookie(req);
    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const stockId = req.body.stock_id;
    await deleteStockFromUsersFavourites(userId, stockId);

    res.json({ message: 'Stock has been deleted from your favourites' });
  }
  catch (error) {
    console.log(`Error: ${error}`);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});


module.exports = router;