const db = require('./../index');

const getUserByEmail = async (email) => {

  const queryStr = `
    SELECT * 
    FROM USERS
    WHERE email = $1
  `;

  try {
    const result = await db.query(queryStr, [email]);
    //if user does not exist, propagate new error message
    if (!result.rows.length) {
      return false;
    }
    return result.rows[0];
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
    const result = await db.query(queryStr, [username]);
    //if user does not exist, propagate new error message
    if (!result.rows.length) {
      return false;
    }
    return result.rows[0];
  } catch (error) {
    throw error;
  }

};

const getUserByUsernameOrEmail = async (usernameOrEmail) => {

  try {
    let user;
    if (usernameOrEmail.includes('@')) {
      user = await getUserByEmail(usernameOrEmail);
    } else {
      user = await getUserByUsername(usernameOrEmail);
    }
    return user;
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
    const result = await db.query(queryStr, [username, email, hashedPassword]);
    return result.rows[0];
  } catch (error) {
    throw error;
  }

};

module.exports = {
  getUserByUsernameOrEmail,
  postNewUser,
};