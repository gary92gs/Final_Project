const express = require('express');
const router = express.Router();
const { getUsersFavouriteStocks, addStocktoUserFavourites, deleteStockFromUsersFavourites } = require('../db/queries/favouritesQueries')
const { getUserSessionCookie } = require('../helpers/userSessionHelpers')

router.get('/', async (req, res) => {
  // get user ID from session
  try {
    const userID = getUserSessionCookie(req);
    if (!userID) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    // find users favourited stocks
    // extract users favourited stocks
    const favouriteStocks = await getUsersFavouriteStocks(userID);
    // send the favourites object as a response to component
    res.json({ userFavourites: favouriteStocks })
  } catch (error) {
    console.log(`Error: ${error}`);
    res.status(500).json({ message: 'Internal Server Error' })
  }

});

router.post('/', async (req, res) => {
    // get user ID from session
  try {
    const userID = getUserSessionCookie(req);
    if (!userID) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    // stock ID extraction from request body, frontend reference
    const stockID = req.body.stockID;
    // query db to remove stock from favourite
    const stockAddedtoFavourites = await addStocktoUserFavourites(userID, stockID);

    if (!stockAddedtoFavourites) {
      return res.status(500).json({ message: 'Adding stocks to favourites was unsuccessful' })
    }
    // send server success message
    return res.status(200).json({ message: 'Stock has been added to your favourites' });
  }
  catch (error) {
    console.log(`Error: ${error}`);
    res.status(500).json({ message: 'Internal Server Error' })
  }
})

router.delete('/', async () => {
  // get user ID from session
  try {
    const userID = getUserSessionCookie(req);
    if (!userID) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    // stock ID extraction from request body, frontend reference
    const stockID = req.body.stockID;
    // query db to remove stock from favourite
    await deleteStockFromUsersFavourites(userID, stockID);
    // send server success message
    res.json({ message: 'Stonk has been deleted from your favourites' })
  }
  catch (error) {
    console.log(`Error: ${error}`);
    res.status(500).json({ message: 'Internal Server Error' })
  }
})

module.exports = router;