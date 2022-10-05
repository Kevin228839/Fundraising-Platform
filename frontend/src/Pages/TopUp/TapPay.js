import styled from 'styled-components';
import { useEffect } from 'react';

const Container = styled.div`
width:100%`;

const Tpfield = styled.div`
height: 40px;
width: 300px;
border: 1px solid gray;
margin: 5px 0;
padding: 5px;`;

const TapPay = (props) => {
  // get getTPDirect from props
  const getTPDirect = props.getTPDirect;

  useEffect(() => {
    // call getTPDirect => setupSDK => card setUp
    getTPDirect().then((TPDirect) => {
      TPDirect.setupSDK(125935,
        'app_KvPsF2nQiMs4uCPDLwLBL7iJqybbaP3CZB8uZmc4ctyyO0Oh0KkQljgP6sbU',
        'sandbox');
      TPDirect.card.setup({
        fields: {
          number: {
            // css selector
            element: '#card-number',
            placeholder: '**** **** **** ****'
          },
          expirationDate: {
            // DOM object
            element: document.getElementById('card-expiration-date'),
            placeholder: 'MM / YY'
          },
          ccv: {
            element: '#card-ccv',
            placeholder: 'ccv'
          }
        }
      });
    });
  }, []);

  return (
    <>
    <Container>
      <Tpfield id="card-number"></Tpfield>
      <Tpfield id="card-expiration-date"></Tpfield>
      <Tpfield id="card-ccv"></Tpfield>
    </Container>
    </>
  );
};

export default TapPay;
