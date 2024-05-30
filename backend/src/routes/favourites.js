const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  // get user ID from session
  // find users favourited stocks
  // extract users favourited stocks
  // send the favourites object as a response to component
});

router.get('/:id', (req, res) => {
  
})

router.post('/', (req, res) => {
  // get user ID from session
  // check if the stock is already in users favourites
  // if stock is not in users favourites create a new db query to add
  // send server success message
})

router.delete('/', ()=> {

})

module.exports = router;