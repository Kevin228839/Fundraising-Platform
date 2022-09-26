import styled from 'styled-components';
import { Link } from 'react-router-dom';
import GoogleLogin from 'react-google-login';
import handleLogin from './GLogin';

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
  return (
    <Container>
      <StyledLink to={'/'}>
        <Title>Fundraising Dapp</Title>
      </StyledLink>
      <GoogleLogin
        clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
        buttonText="Sign in with Google"
        onSuccess={handleLogin}
        onFailure={handleLogin}
        cookiePolicy={'single_host_origin'}
      />;
    </Container>
  );
};

export default Header;
