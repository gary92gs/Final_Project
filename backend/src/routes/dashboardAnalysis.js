const express = require('express');
const router = express.Router();

router.get('/:id', (req, res) => {
  // extract id from request params
  // find the stock by id in the db
  // query db for all analysis data
  // send data to dashboard analysis component
})

module.exports = router;