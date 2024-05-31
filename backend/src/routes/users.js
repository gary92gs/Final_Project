const express = require('express');
const router = express.Router();

const { hashString, setUserSessionCookie } = require('./../helpers/userSessionHelpers');
const { postNewUser } = require('./../db/queries/usersQueries');

// CREATE NEW USER
router.post('/', async (req, res) => {

  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ message: 'Cannot submit form with incomplete field(s)' });
  }

  try {
    const hashedPassword = await hashString(password);
    const postedUser = await postNewUser(username, email, hashedPassword);
    setUserSessionCookie(req, postedUser.id);
    return res.status(201).json({ message: 'Form submission successful' });
  } catch (error) {
    console.log(`Error adding new user to database: ${error}`);
    if (error.code === '23505') { //error code specifically for postgresSQL VIOLATION OF UNIQUE VALUE
      return res.status(409).json({ message: 'Username or email already exists' });
    }
    return res.status(500).json({ message: 'Internal server error' });
  }

});

module.exports = router;