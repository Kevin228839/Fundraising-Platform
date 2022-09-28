const { pool } = require('./mysqlcon');
require('dotenv').config();
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.REACT_APP_GOOGLE_CLIENT_ID);

const userGoogleLogin = async (req) => {
  const conn = await pool.getConnection();
  try {
    // verify Google-provided token
    // console.log(req.body);
    const { token } = req.body;
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.REACT_APP_GOOGLE_CLIENT_ID
    });
    // check against our database
    const { name, email, picture } = ticket.getPayload();
    const [res] = await conn.query(
      `INSERT INTO User (name, email, picture) VALUES (?, ?, ?)
      ON DUPLICATE KEY UPDATE name=?, picture=?`, [name, email, picture, name, picture]
    );
    const [userRes] = await conn.query('SELECT id FROM User WHERE email=?', [email]);
    await conn.query('COMMIT');
    // store results in session
    req.session.userId = userRes;
    return { req, res };
  } catch (err) {
    console.error('Error while login with google!', err.message);
    await conn.query('ROLLBACK');
    throw err;
  } finally {
    await conn.release();
  }
};

module.exports = {
  userGoogleLogin
};
