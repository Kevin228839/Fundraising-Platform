import { useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { gapi } from 'gapi-script';
import GoogleBtn from '../Pages/User/GoogleBtn';
import api from '../api';

const Container = styled.div`
height:70px;
display:flex;
justify-content:space-between;
align-items:center;
border-bottom: 2px solid #E0E0E0`;

const Title = styled.div`
width:400px;
font-size:30px;
font-style:oblique;`;

const TopUp = styled.div`
width:80px;
padding-left:10px;
display:flex;
align-items:center;
justify-content:center;
font-size:18px;
font-family:Arial;
border: 2px black solid;
border-radius:5px;`;

const StyledLink = styled(Link)`
letter-spacing:1em;
font-size:20px;
color:black;
text-decoration:none;`;

const Header = () => {
  let accessToken, refreshToken;
  if (typeof window !== 'undefined') {
    accessToken = localStorage.getItem('accessToken');
    refreshToken = localStorage.getItem('refreshToken');
  }

  useEffect(() => {
    const initClient = () => {
      gapi.auth2.init({
        clientId: process.env.REACT_APP_GOOGLE_CLIENT_ID,
        scope: ''
      });
    };
    const refresh = async () => {
      const response = await api.refresh(refreshToken);
      const data = await response.json();
      if (typeof window !== 'undefined') {
        localStorage.clear();
        localStorage.setItem('accessToken', data.data.newAccessToken);
        localStorage.setItem('refreshToken', data.data.newRefreshToken);
      }
    };
    // To initialize our client, we will call the gapi function in our useEffect hook,
    // so that it gets called when our page loads or on every render
    gapi.load('client:auth2', initClient);

    // refreshing accessToken and refreshToken when accessToken is outdated
    if (accessToken === 'undefined') {
      refresh();
    }
  });

  return (
    <Container>
      <StyledLink to={'/'}>
        <Title>Fundraising Dapp</Title>
      </StyledLink>
      <StyledLink to={'/topup'}>
        <TopUp>儲值</TopUp>
      </StyledLink>
      <GoogleBtn/>
    </Container>
  );
};

export default Header;
