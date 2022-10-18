import { Component } from 'react';
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import api from '../../api';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Container = styled.div`
height:70px;
display:flex;
justify-content:space-between;
align-items:center;
border-bottom: 2px solid #E0E0E0`;

const StyledLink = styled(Link)`
letter-spacing:1em;
font-size:20px;
color:black;
text-decoration:none;`;

const Profile = styled.div`
width:80px;
padding-left:10px;
display:flex;
align-items:center;
justify-content:center;
font-size:18px;
font-family:Arial;
border: 2px black solid;
border-radius:5px;`;

class GoogleBtn extends Component {
  constructor (props) {
    super(props);
    if (typeof window !== 'undefined') {
      if (localStorage.getItem('accessToken')) {
        this.state = { isLogined: true };
      } else {
        this.state = { isLogined: false };
      }
    }
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
  }

  // Handling the response from Google
  async handleLogin (googleData) {
    const response = await api.userGoogleLogin(googleData);
    const data = await response.json();
    const accessToken = data.data.accessToken;
    const refreshToken = data.data.refreshToken;
    if (typeof window !== 'undefined') {
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
    }
    if (data.error) {
      throw new Error(data.error);
    } else {
      // store returned user in a context?
      console.log(data);
      return { accessToken };
    }
  }

  login (req) {
    const accessToken = this.handleLogin(req);
    if (accessToken) {
      this.setState(state => ({ isLogined: true }));
    }
  }

  async handleLogout () {
    const accessToken = localStorage.getItem('accessToken');
    await api.userLogout(accessToken);
    if (typeof window !== 'undefined') {
      localStorage.clear();
    }
    window.location.href = '/';
  }

  logout () {
    this.handleLogout();
    this.setState(state => ({ isLogined: false }));
  }

  render () {
    return (
    <div>
      { this.state.isLogined
        ? <Container>
            <StyledLink to={'/user'}>
              <Profile>個人資料</Profile>
            </StyledLink>
            <GoogleLogout
              clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
              buttonText='Logout'
              onLogoutSuccess={this.logout}
              onFailure={this.logout}
            />
          </Container>
        : <GoogleLogin
            clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
            buttonText='Login'
            onSuccess={this.login}
            onFailure={this.login}
            cookiePolicy={'single_host_origin'}
          />
      }
    </div>
    );
  }
}

export default GoogleBtn;
