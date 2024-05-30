const express = require('express');
const router = express.Router();

let login = [{
  homepage: "homepage",
}]

router.get('/', (req, res) => {
  res.json(login);
});

router.post('/', (req, res) => {
  // extract and store username and password from form request(rec.boy)
  // username = req.body.username
  // password = req.body.password

  // fetch user object from database and match username

  // if username does not exist send relevant alert "invalid username or password"

  // if username exists:
  // compare hashed passwords

  // if passwords match:
    // set session data
    // send server success response
    
  // render dashboard

  // else send relevant alert "invalid username or password"
});

router.delete('/', (req, res) => {
  // extract session ID from the session cookie

  // clear the cookies from the browser
  // send server success message
  // render login page
})

module.exports = router;