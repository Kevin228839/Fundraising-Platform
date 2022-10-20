import { useState, useEffect } from 'react';
import styled from 'styled-components';
import api from '../../api';
import Load from '../../Global/Loading';

const Wrap = styled.div`
display:flex;
justify-content:center;
margin-top:50px;
width:100%;`;

const Container = styled.div`
width:1280px;
display:flex;
justify-content:center;
margin-left:auto;
margin-right:auto;
padding-top:50px;`;

const Left = styled.div`
width:55%;`;

const Right = styled.div`
width:45%;`;

const UserImg = styled.img`
margin-left:auto;
margin-right:auto;
display:block;
width:380px;
height:500px;`;

const UserName = styled.div`
padding:10px;
font-size:40px;
font-family:Arial;`;

const UserEmail = styled.div`
width:60%;
margin-top:40px;
padding:10px;
font-size:15px;
font-family:Helvetica;`;

const UserWallet = styled.div`
width:60%;
margin-top:40px;
padding:10px;
font-size:15px;
font-family:Helvetica;`;

const WalletInput = styled.input.attrs({
  type: 'string'
})`
width:300px;
height:50px;
border-radius:5px;
&:focus {
  outline:none;
}`;

const UpdateButton = styled.button`
text-align:center;
width:80px;
height:40px;
font-size:20px;
font-family:Arial;
border: 3px solid grey;
border-radius:5px;`;

const Profile = () => {
  let accessToken;
  if (typeof window !== 'undefined') {
    accessToken = localStorage.getItem('accessToken');
  }

  const [userData, setUserData] = useState(null);
  useEffect(() => {
    const fetchUserData = async () => {
      let response = await api.getUserData(accessToken);
      response = await response.json();
      setUserData(response.data.res[0]);
    };
    fetchUserData();
  }, []);
  console.log(userData);

  const handleUpdate = async () => {
    const WalletAccount = document.getElementById('walletaccount').value;
    api.setWallet(accessToken, WalletAccount).then(async (response) => {
      const responseData = await response.json();
      console.log(responseData.data);
      window.location.reload();
    });
  };

  if (accessToken === null || accessToken === 'undefined') {
    alert('Please login first');
    window.location.href = '/';
  } else {
    if (userData === null) {
      return <Load />;
    } else {
      return (
        <Wrap>
          <Container>
            <Left>
              <UserImg src={userData.picture} />
            </Left>
            <Right>
              <UserName>{userData.name}</UserName>
              <UserEmail>{userData.email}</UserEmail>
              <UserWallet>{userData.wallet}</UserWallet>
              <WalletInput id="walletaccount"/>
              <UpdateButton onClick={ async () => { await handleUpdate(); } }>Update</UpdateButton>
            </Right>
          </Container>
        </Wrap>
      );
    }
  }
};

export default Profile;
