import styled from 'styled-components';
import loading from '../asset/loading.gif';

// Below are styled components
const Container = styled.div`
width:100%;`;

const Img = styled.img`
margin-top:100px;
width:50px;
height:50px;
display: block;
margin-left: auto;
margin-right: auto;`;

// Load Component
const Load = () => {
  return (
    <Container>
       <Img src={loading}/>
    </Container>
  );
};

export default Load;
