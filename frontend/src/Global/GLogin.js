const { default: api } = require('../api');

// handling the response from Google
const handleLogin = async googleData => {
  const res = await api.userGoogleLogin(googleData);
  const data = await res.json();
  // store returned user in a context?
  if (data.error) {
    throw new Error(data.error);
  }
};

module.exports = {
  handleLogin
};
