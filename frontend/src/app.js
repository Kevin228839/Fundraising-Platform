import { Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Header from './Global/Header';
import Home from './Pages/Home/Home';
import Project from './Pages/Project/Project';
import GoogleLogin from 'react-google-login';

const App = () => {
  const [page, setPage] = useState(0);
  // Handling the response from Google
  const handleLogin = async googleData => {
    const res = await fetch('/api/v1/userGoogleLogin', {
      method: 'POST',
      body: JSON.stringify({
        token: googleData.tokenId
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const data = await res.json();
    // store returned user in a context?
  };
  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={<Home page={page} setPage={setPage}/>} />
        <Route path='/project/:id' element={<Project />} />
        <Route path='/' element={
          <GoogleLogin
            clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID} // 729914523776-ssjacls3n7g4gamepferg5pmgv7mgseb.apps.googleusercontent.com
            buttonText="Google Login"
            onSuccess={handleLogin}
            onFailure={handleLogin}
            cookiePolicy={'single_host_origin'}
          />}
        />
      </Routes>
    </>
  );
};

export default App;
