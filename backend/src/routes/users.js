const express = require('express');
const router = express.Router();

const { hashString, setUserSessionCookie } = require('./../helpers/userSessionHelpers');
const { postNewUser } = require('./../db/queries/usersQueries');

// CREATE NEW USER
router.post('/', async (req, res) => {

  // grab newUser information from registration form (req.body)
  const { username, email, password } = req.body;

  // check req.body to have form filled out
  if (!username || !email || !password) {
    return res.status(400).json({ message: 'Cannot submit form with incomplete field(s)' });
  }

  try {
    // hash the user's password entry
    const hashedPassword = await hashString(password);
    // insert the new user into the database with hashed password
    const postedUser = await postNewUser(username, email, hashedPassword);
    // set session cookie
    setUserSessionCookie(req, postedUser.id);
    return res.status(201).json({ message: 'Form submission successful' });
  } catch (error) {
    console.log(`Error adding new user to database: ${error}`);
    // check for unique_violation error code for PostgreSQL
    if (error.code === '23505') {
      return res.status(409).json({ message: 'Username or email already exists' });
    }
    return res.status(500).json({ message: 'Internal server error' });
  }

});

module.exports = router;