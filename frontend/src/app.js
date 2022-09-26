import { Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Header from './Global/Header';
import Home from './Pages/Home/Home';
import GoogleLogin from 'react-google-login';

const App = () => {
  const [page, setPage] = useState(0);
  // Handling the response from Google 
  const handleLogin = async googleData => {
    const res = await fetch("/api/v1/userGoogleLogin", {
        method: "POST",
        body: JSON.stringify({
        token: googleData.tokenId
      }),
      headers: {
        "Content-Type": "application/json"
      }
    })
    const data = await res.json()
    // store returned user in a context?
  }
  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={<Home page={page} setPage={setPage}/>}/>
        <Route path='/' element={<GoogleLogin
          clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
          buttonText="Sign in with Google"
          className="ct-button ct-button--secondary"
          onSuccess={handleResponse}
          onFailure={handleResponse}
          cookiePolicy="single_host_origin"
        />}
        />
      </Routes>
    </>
  );
};

export default App;
