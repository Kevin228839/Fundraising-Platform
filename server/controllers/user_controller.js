const UserModel = require('../models/user_model');

const userGoogleLogin = async (req, res, next) => {
  try {
    const response = await UserModel.userGoogleLogin(req);
    res.status(201).json({ data: response });
  } catch (err) {
    next(err);
  }
};

const userLogout = async (req, res, next) => {
  try {
    await req.session.destroy();
    res.status(200).json({ message: 'Logged out successfully' });
  } catch (err) {
    next(err);
  }
};

const user = async (req, res, next) => {
  try {
    res.status(200).json(req.user);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  userGoogleLogin,
  userLogout,
  user
};
