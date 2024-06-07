const express = require('express');
const router = express.Router();
const { getUsersFavouriteStocks, addStocktoUserFavourites }  = require('../db/queries/favouritesQueries')

router.get('/', async (req, res) => {
  // get user ID from session
  try {
    const userID = req.session.userID;
    if (!userID) {
      return res.status(401).json({ message: 'Unauthorized, please leave' });
    }
    // find users favourited stocks
    // extract users favourited stocks
    const favouriteStocks = await getUsersFavouriteStocks(userID);
    // send the favourites object as a response to component
    res.json({ favourites: favouriteStocks })
  } catch (error) {
    console.log(`Error: ${error}`);
    res.status(500).json({ message: 'Internal Server Error' })
  }

});

router.post('/', async (req, res) => {
  // get user ID from session
  try {
    const userID = req.session.userID;
    if (!userID) {
      return res.status(401).json({ message: 'Unauthorized, please leave' });
    }
  // stock ID extraction from request body, frontend reference
  const stockID = req.body.stockID;

  await addStocktoUserFavourites(userID, stockID);
  // send server success message
  res.json({ message: 'Stonk has been added to your favourites' });
  }
  catch (error) {
    console.log(`Error: ${error}`);
    res.status(500).json({ message: 'Internal Server Error' })
  }
})

router.delete('/', () => {

})

module.exports = router;