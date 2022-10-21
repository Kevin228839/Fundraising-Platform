const { pool } = require('./mysqlcon');
require('dotenv').config();
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.REACT_APP_GOOGLE_CLIENT_ID);
const jwt = require('jsonwebtoken');

const verifyAccess = async (req) => {
  try {
    const accessToken = req.headers.authorization.split(' ')[1];
    if (accessToken !== null) {
      jwt.verify(accessToken, process.env.ACCESS_SECRET);
    }
  } catch (err) {
    console.error('Error while verifying access token!', err.message);
    throw err;
  }
};

// 把verifyRefresh寫進verifyAccess裡面
// 將verifyRefresh回傳的值用next(response)傳到下一個model，再傳回前端設定於localstorage中
// 上述行不通 ∵傳到下一個model的資料是已過期的accesstoken而不是新的accesstoken
const verifyRefresh = async (req) => {
  let newAccessToken;
  let newRefreshToken;
  try {
    const refreshToken = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_SECRET, (err, decoded) => {
      if (!err) {
        return { decoded };
      } else {
        return false;
      }
    });
    // refreshToken is still valid
    if (decoded) {
      // generate new JWT tokens
      const { sub, name, email, picture } = decoded;
      newAccessToken = await jwt.sign({ sub, name, email, picture }, process.env.ACCESS_SECRET, { expiresIn: '0.5h' });
      newRefreshToken = await jwt.sign({ sub, name, email, picture }, process.env.REFRESH_SECRET, { expiresIn: '1d' });
    }
    return { newAccessToken, newRefreshToken };
  } catch (err) {
    console.error('Error while refreshing token!', err.message);
    throw err;
  }
};

const userGoogleLogin = async (req) => {
  const conn = await pool.getConnection();
  try {
    // verify Google-provided token
    const { token } = req.body;
    if (token !== null) {
      const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.REACT_APP_GOOGLE_CLIENT_ID
      });
      // check against our database
      const { sub, name, email, picture } = ticket.getPayload();
      await conn.query(
        `INSERT INTO User (googleId, name, email, picture, wallet) VALUES (?, ?, ?, ?, '0x')
        ON DUPLICATE KEY UPDATE googleId=?, name=?, picture=?`, [sub, name, email, picture, sub, name, picture]
      );
      await conn.query('COMMIT');

      // generate JWT tokens
      const accessToken = await jwt.sign({ sub, name, email, picture }, process.env.ACCESS_SECRET, { expiresIn: '0.5h' });
      const refreshToken = await jwt.sign({ sub, name, email, picture }, process.env.REFRESH_SECRET, { expiresIn: '1d' });

      return { accessToken, refreshToken };
    }
  } catch (err) {
    console.error('Error while login with google!', err.message);
    await conn.query('ROLLBACK');
    throw err;
  } finally {
    await conn.release();
  }
};

const userLogout = async () => {
  // if (typeof window !== 'undefined') {
  //   localStorage.clear();
  // }
};

const getUserData = async (req) => {
  const conn = await pool.getConnection();
  try {
    const accessToken = req.headers.authorization.split(' ')[1];
    if (accessToken !== null) {
      const decoded = jwt.verify(accessToken, process.env.ACCESS_SECRET);
      const [res] = await conn.query(
        'SELECT * FROM User WHERE googleId=?', [decoded.sub]
      );
      await conn.query('COMMIT');

      return { res };
    }
  } catch (err) {
    console.error('Error while getting user data!', err.message);
    await conn.query('ROLLBACK');
    throw err;
  } finally {
    await conn.release();
  }
};

const setWallet = async (req) => {
  const conn = await pool.getConnection();
  try {
    const accessToken = req.headers.authorization.split(' ')[1];
    const { wallet } = req.body;
    if (accessToken !== null) {
      const decoded = jwt.verify(accessToken, process.env.ACCESS_SECRET);
      const [res] = await conn.query(
        'UPDATE User SET wallet=? WHERE googleId=?', [wallet, decoded.sub]
      );
      await conn.query('COMMIT');

      return { res };
    }
  } catch (err) {
    console.error('Error while getting user data!', err.message);
    await conn.query('ROLLBACK');
    throw err;
  } finally {
    await conn.release();
  }
};

module.exports = {
  verifyAccess,
  verifyRefresh,
  userGoogleLogin,
  userLogout,
  getUserData,
  setWallet
};
