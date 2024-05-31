const bcrypt = require('bcryptjs');

const hashString = async (string) => {

  const saltRounds = 10;

  try {
    const hashedPassword = await bcrypt.hash(string, saltRounds);
    return hashedPassword;
  } catch (error) {
    throw error;
  }

};

const isHashSame = async (newString, storedString) => {
  
  try {
    const isMatch = await bcrypt.compare(newString, storedString);
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