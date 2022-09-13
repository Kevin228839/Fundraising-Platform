import styled from 'styled-components';

const Container = styled.div`
height:70px;
display:flex;
justify-content:center;
align-items:center;
border-bottom: 2px solid #E0E0E0`;

const Title = styled.div`
width:300px;
font-size:40px;
font-style:oblique;`;

const Header = () => {
  return (
    <Container>
      <Title>Fundraising Dapp</Title>
    </Container>
  );
};

export default Header;
