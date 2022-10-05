import TapPay from './TapPay';
import styled from 'styled-components';
import api from '../../api';

const Container = styled.div`
width:100%;
display:flex;
flex-direction:column;
align-items:center;`;

const Flex = styled.div`
margin-top:50px;
margin-bottom:50px;
display:flex;
width:1280px;
justify-content:center;`;

const Left = styled.div`
display:flex;
flex-direction:column;
align-items:center;
width:640px;`;

const Right = styled.div`
width:640px;`;

const TopUpCaption = styled.div`
font-size:30px;
font-family:Arial;`;

const TopUpInput = styled.input.attrs({
  type: 'number'
})`
width:300px;
height:50px;
border-radius:5px;
&:focus {
  outline:none;
}`;

const CreditCardInfo = styled.div`
font-size:30px;
font-family:Arial;`;

const SubmitButton = styled.button`
text-align:center;
width:80px;
height:40px;
font-size:20px;
font-family:Arial;
border: 3px solid grey;
border-radius:5px;`;

const TopUp = () => {
  // getTPDirect function
  const getTPDirect = async () => {
    return new Promise((resolve, reject) => {
      if (typeof window.TPDirect !== 'undefined') {
        return resolve(window.TPDirect);
      } else {
        const script = window.document.createElement('script');
        script.src = 'https://js.tappaysdk.com/tpdirect/v5.8.0';
        script.async = true;
        script.onload = () => {
          if (typeof window.TPDirect !== 'undefined') {
            resolve(window.TPDirect);
          } else {
            reject(new Error('failed to load TapPay sdk'));
          }
        };
        script.onerror = reject;
        window.document.body.appendChild(script);
      }
    });
  };

  const handleChange = async () => {
    const TopUpAmount = document.getElementById('topupamount').value;
    getTPDirect().then((TPDirect) => {
      const tappayStatus = TPDirect.card.getTappayFieldsStatus();
      if (tappayStatus.canGetPrime === false) {
        alert('cannot get prime!');
        return;
      }
      TPDirect.card.getPrime(function (result) {
        if (result.status !== 0) {
          alert('get prime error' + result.msg);
          return;
        }
        const Prime = result.card.prime;
        const Data = {
          prime: Prime,
          topUpAmount: TopUpAmount
        };
        api.topUp(Data).then(async (response) => {
          const responseData = await response.json();
          console.log(responseData.data);
        });
      });
    }).catch(error => console.log(error));
  };

  return (
    <Container>
      <Flex>
      <Left>
        <TopUpCaption>儲值金額</TopUpCaption>
        <TopUpInput id="topupamount"/>
      </Left>
      <Right>
        <CreditCardInfo>信用卡資訊</CreditCardInfo>
        <TapPay getTPDirect={getTPDirect}/>
      </Right>
      </Flex>
      <SubmitButton onClick={async () => { await handleChange(); }}>送出</SubmitButton>
    </Container>
  );
};

export default TopUp;
