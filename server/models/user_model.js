const { pool } = require('./mysqlcon');
// const config = require('../config');
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.CLIENT_ID);

const userGoogleLogin = async (req) => {
  const conn = await pool.getConnection();
  try {
    // verify Google-provided token
    const { token } = req.body;
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.CLIENT_ID
    });
    // check against our database
    const { name, email, picture } = ticket.getPayload();
    const user = await conn.user.upsert({
      where: { email },
      update: { name, picture },
      create: { name, email, picture }
    });
    // store results in session
    req.session.userId = user.id;
    return { user };
  } catch (err) {
    console.error('Error while login with google!', err.message);
    // await conn.query('ROLLBACK');
    throw err;
  } finally {
    await conn.release();
  }
};

module.exports = {
  userGoogleLogin
};
