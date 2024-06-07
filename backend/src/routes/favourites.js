const express = require('express');
const router = express.Router();
const { getUsersFavouriteStocks }  = require('../db/queries/favouritesQueries')

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
  // stock ID extraction from request body, frontend reference
  // send server success message
})

router.delete('/', () => {

})

module.exports = router;