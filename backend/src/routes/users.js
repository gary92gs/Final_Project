const express = require('express');
const router = express.Router();

let db = [
  {
    username: "test",
    password: "test"
}
]

router.get('/', (req, res) => {
  res.json(db);
});

module.exports = router;