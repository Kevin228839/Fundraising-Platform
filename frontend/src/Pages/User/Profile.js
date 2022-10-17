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

const Profile = () => {
  let accessToken, refreshToken;
  if (typeof window !== 'undefined') {
    accessToken = localStorage.getItem('accessToken');
    refreshToken = localStorage.getItem('refreshToken');
  }

  const [userData, setUserData] = useState(null);
  useEffect(() => {
    const refresh = async (refreshToken) => {
      const response = await api.refresh(refreshToken);
      const data = await response.json();
      if (typeof window !== 'undefined') {
        localStorage.clear();
        localStorage.setItem('accessToken', data.data.newAccessToken);
        localStorage.setItem('refreshToken', data.data.newRefreshToken);
      }
    };
    const fetchUserData = async () => {
      let response = await api.getUserData(accessToken);
      response = await response.json();
      setUserData(response.data.res[0]);
    };

    if (localStorage.getItem('accessToken') === 'undefined') {
      refresh(refreshToken);
    }
    fetchUserData();
  }, []);
  console.log(userData);

  if (accessToken === null) {
    return <p>Please Login first</p>;
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
            </Right>
          </Container>
        </Wrap>
      );
    }
  }
};

export default Profile;
