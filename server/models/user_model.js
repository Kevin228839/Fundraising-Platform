const { pool } = require('./mysqlcon');
require('dotenv').config();
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.REACT_APP_GOOGLE_CLIENT_ID);

const userGoogleLogin = async (req) => {
  const conn = await pool.getConnection();
  try {
    // verify Google-provided token
    const { token } = req.body;
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.REACT_APP_GOOGLE_CLIENT_ID
    });
    // check against our database
    const { sub, name, email, picture } = ticket.getPayload();
    await conn.query(
      `INSERT INTO User (googleId, name, email, picture) VALUES (?, ?, ?, ?)
      ON DUPLICATE KEY UPDATE googleId=?, name=?, picture=?`, [sub, name, email, picture, sub, name, picture]
    );
    const [userRes] = await conn.query(
      'SELECT googleId, name, email, picture FROM User WHERE email=?', [email]
    );
    await conn.query('COMMIT');
    // store results in session
    req.session.userId = sub;
    return { userRes };
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
