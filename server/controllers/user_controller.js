const UserModel = require('../models/user_model');

// access token middleware
const verifyAccess = async (req, res, next) => {
  try {
    await UserModel.verifyAccess(req);
    next();
  } catch (err) {
    next(err);
  }
};

// refresh access token when the current one is outdated
const verifyRefresh = async (req, res, next) => {
  try {
    const response = await UserModel.verifyRefresh(req);
    res.status(201).json({
      message: 'Verify refresh token successful!',
      data: response
    });
    // res.clearCookie();
    // res.cookie('refreshToken', response.newRefreshToken, {
    //   sameSite: 'none',
    //   secure: true,
    //   path: '/',
    //   maxAge: 60 * 60 * 24 * 1000 // 24 hours
    // });
  } catch (err) {
    next(err);
  }
};

const userGoogleLogin = async (req, res, next) => {
  try {
    const response = await UserModel.userGoogleLogin(req);
    // res.cookie('refreshToken', response.refreshToken, {
    //   sameSite: 'none',
    //   secure: true,
    //   path: '/',
    //   maxAge: 60 * 60 * 24 * 1000 // 24 hours
    // });
    res.status(201).json({
      message: 'Login successful!',
      data: response
    });
  } catch (err) {
    next(err);
  }
};

const userLogout = async (req, res, next) => {
  try {
    await UserModel.userLogout();
    // res.clearCookie('refreshToken');
    res.status(201).json({ message: 'Logout successful!' });
  } catch (err) {
    next(err);
  }
};

const getUserData = async (req, res, next) => {
  try {
    const response = await UserModel.getUserData(req);
    console.log(`getUserData controller response: ${JSON.stringify(response)}`);
    res.status(201).json({
      message: 'Get user data successful!',
      data: response
    });
  } catch (err) {
    next(err);
  }
};

const setWallet = async (req, res, next) => {
  try {
    const response = await UserModel.setWallet(req);
    res.status(201).json({
      message: 'Set wallet successful!',
      data: response
    });
  } catch (err) {
    next(err);
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
