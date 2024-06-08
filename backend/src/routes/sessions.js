const express = require('express');
const router = express.Router();
const cookieParser = require('cookie-parser');

const { getUserByUsernameOrEmail } = require('./../db/queries/usersQueries');
const { isHashSame, setUserSessionCookie, deleteUserSessionCookie, } = require('./../helpers/userSessionHelpers');

router.use(cookieParser());

// LOGIN (CREATE SESSION COOKIE)
router.post('/', async (req, res) => {

  // extract and store username and password from form request(rec.boy)
  const { usernameOrEmail, password } = req.body;

  if (!usernameOrEmail || !password) {
    return res.status(400).json({ message: 'Cannot submit form with incomplete field(s)' });
  }

  try {
    const foundUser = await getUserByUsernameOrEmail(usernameOrEmail);
    const isSamePassword = await isHashSame(password, foundUser.password);
    if (isSamePassword) {
      setUserSessionCookie(req, foundUser.id);
      return res.status(201).json({ message: 'User Login Successful' });
    }
    return res.status(401).json({ message: 'Invalid Login Credentials' });
  } catch (error) {
    if (error.message === 'User not found') {
      return res.status(404).json({ message: 'Invalid Login Credentials' });
    }
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

// GET REQUEST TO CHECK COOKIE SESSION
router.get('/check', (req, res) => {
  if (req.session && req.cookies['PP-session']) {
    return res.status(200).json({ isLoggedIn: true });
  } else {
    return res.status(401).json({ isLoggedIn: false });
  }
});

module.exports = router;