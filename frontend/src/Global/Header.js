import styled from 'styled-components';
import { Link } from 'react-router-dom';

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
    </Container>
  );
};

export default Header;
