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

    const trendingStocks = getMostFavouritedStocks();
    if (!trendingStocks) {
      return res.status(204).json({ message: 'No Trending Stocks in DB' });
    }

    return res.status(200).json({ trendingStocks });

  } catch (error) {
    console.log(`Error: ${error}`);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.get('/', async (req, res) => {
  // get user ID from session
  try {
    const userId = getUserSessionCookie(req);
    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    // find users favourited stocks
    // extract users favourited stocks
    const favouriteStocks = await getUsersFavouriteStocks(userId);
    console.log('favouriteStocks:', favouriteStocks);
    // console.log("Favourite stocks", favouriteStocks)
    // send the favourites object as a response to component
    res.status(200).json({ userFavourites: favouriteStocks });
  } catch (error) {
    console.log(`Error: ${error}`);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.post('/', async (req, res) => {
  // get user ID from session
  try {
    const userId = getUserSessionCookie(req);
    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    // stock ID extraction from request body, frontend reference
    const stockId = req.body.stock_id;

    // query db to add stock from favourite
    const stockAddedtoFavourites = await addStocktoUserFavourites(userId, stockId);

    if (!stockAddedtoFavourites) {
      return res.status(500).json({ message: 'Adding stocks to favourites was unsuccessful' });
    }
    // send server success message
    return res.status(200).json({ message: 'Stock has been added to your favourites' });
  }
  catch (error) {
    console.log(`Error: ${error}`);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.delete('/', async (req, res) => {
  // get user ID from session
  try {
    const userId = getUserSessionCookie(req);
    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    // stock ID extraction from request body, frontend reference
    const stockId = req.body.stock_id;
    // query db to remove stock from favourite
    await deleteStockFromUsersFavourites(userId, stockId);
    // send server success message
    res.json({ message: 'Stock has been deleted from your favourites' });
  }
  catch (error) {
    console.log(`Error: ${error}`);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});


module.exports = router;