import { useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { gapi } from 'gapi-script';
import GoogleBtn from '../Pages/User/GoogleBtn';

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

const StyledLink = styled(Link)`
letter-spacing:1em;
font-size:20px;
color:black;
text-decoration:none;`;

const Header = () => {
  useEffect(() => {
    const initClient = () => {
      gapi.auth2.init({
        clientId: process.env.REACT_APP_GOOGLE_CLIENT_ID,
        scope: ''
      });
    };
    gapi.load('client:auth2', initClient);
  });
  return (
    <Container>
      <StyledLink to={'/'}>
        <Title>Fundraising Dapp</Title>
      </StyledLink>
      <GoogleBtn/>
    </Container>
  );
};

export default Header;
