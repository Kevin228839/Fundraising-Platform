import { GoogleLogin } from 'react-google-login';
import { useEffect } from 'react';
import { gapi } from 'gapi-script';
import api from '../api';

const Login = () => {
  // To initialize our client, we will call the gapi function in our useEffect hook so that it gets called when our page loads or on every render
  useEffect(() => {
    const initClient = () => {
      gapi.auth2.init({
        clientId: process.env.REACT_APP_GOOGLE_CLIENT_ID,
        scope: ''
      });
    };
    gapi.load('client:auth2', initClient);
  });
  // Handling the response from Google
  const handleLogin = async googleData => {
    const res = await api.userGoogleLogin(googleData);
    // res: 成功取得的google user資料
    const data = await res.json();
    console.log(data);

    // const data = await res.json();
    // if (data.error) {
    //   throw new Error(data.error);
    // } else {
    //   // store returned user in a context?
    //   console.log(data);
    // }
  };
  return (
    <GoogleLogin
      clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
      buttonText="Sign in with Google"
      onSuccess={handleLogin}
      onFailure={handleLogin}
      cookiePolicy={'single_host_origin'}
    />
  );
};

export default Login;
