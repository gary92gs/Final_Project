const db = require('./../index');

const getUserByEmail = async (email) => {

  const queryStr = `
    SELECT * 
    FROM USERS
    WHERE email = $1
  `;

  try {
    const usersArr = await db.query(queryStr, [email]);
    //if user does not exist, propagate new error message
    if (usersArr === 0) {
      throw new Error('User not found');
    }
    return usersArr[0];
  } catch (error) {
    throw error;
  }

};

const getUserByUsername = async (username) => {
  
  const queryStr = `
    SELECT * 
    FROM USERS
    WHERE username = $1
  `;

  try {
    const usersArr = await db.query(queryStr, [username]);
    //if user does not exist, propagate new error message
    if (usersArr === 0) {
      throw new Error('User not found');
    }
    return usersArr[0];
  } catch (error) {
    throw error;
  }

};

const getUserByUsernameOrEmail = async (usernameOrEmail) => {
  
  try {
    let usersArr;
    if (usernameOrEmail.includes('@')) {
      usersArr = await getUserByEmail(usernameOrEmail);
    } else {
      usersArr = await getUserByUsername(usernameOrEmail);
    }
    return foundUser;
  } catch (error) {
    throw error;
  }

};

const postNewUser = async (username, email, hashedPassword) => {

  const queryStr = `
    INSERT INTO users (username, email, password)
    VALUES($1, $2, $3)
    RETURNING *;
  `;

  try {
    const insertedUser = await db.query(queryStr, [username, email, hashedPassword]);
    return insertedUser[0];
  } catch (error) {
    throw error;
  }

};

module.exports = {
  getUserByUsernameOrEmail,
  postNewUser,
};