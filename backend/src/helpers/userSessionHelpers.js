const bcrypt = require('bcryptjs');

const hashString = async (newPassword) => {

  const saltRounds = 10;

  try {
    const hashedPassword = await bcrypt.hash(newPassword, saltRounds);
    return hashedPassword;
  } catch (error) {
    throw error;
  }

};

const isHashSame = async (enteredPassword, hashedPassword) => {
  
  try {
    const isMatch = await bcrypt.compare(enteredPassword, hashedPassword);
    return isMatch;
  } catch (error) {
    throw error;
  }

};

const setUserSessionCookie = (req, userId) => {

  req.session.userId = userId;

};

const deleteUserSessionCookie = (req) => { 

  req.session = null;
  
};

module.exports = {
  hashString,
  isHashSame,
  setUserSessionCookie,
  deleteUserSessionCookie,
};