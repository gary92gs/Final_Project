const express = require('express');
const router = express.Router();

const { getUserByUsernameOrEmail } = require('./../db/queries/usersQueries');
const { isHashSame, setUserSessionCookie, deleteUserSessionCookie, } = require('./../helpers/userSessionHelpers');

// LOGIN (CREATE SESSION COOKIE)
router.post('/', async (req, res) => {

  // extract and store username and password from form request(rec.boy)
  const { usernameOrEmail, password } = req.body;

  if (!usernameOrEmail || !password) {
    return res.status(400).json({ message: 'Cannot submit form with incomplete field(s)' });
  }

  try {
    const foundUser = await getUserByUsernameOrEmail(usernameOrEmail);
    if (!foundUser){
      return res.status(404).json({ message: 'Invalid Login Credentials' });
    }
    const isSamePassword = await isHashSame(password, foundUser.password);
    if (!isSamePassword) {
      return res.status(401).json({ message: 'Invalid Login Credentials' });
    }
    setUserSessionCookie(req, foundUser.id);
    return res.status(201).json({ message: 'User Login Successful' });
  } catch (error) {
    console.log(`Error during login: ${error}`);
    return res.status(500).json({ message: 'Internal Server Error' });
  }

});

// LOGOUT (DELETE SESSION COOKIE)
router.delete('/', (req, res) => {
  console.log('inside delete /api/sessions')
  deleteUserSessionCookie(req);

  return res.status(200).json({ message: 'Logged Out Successfully' });
  
});

module.exports = router;