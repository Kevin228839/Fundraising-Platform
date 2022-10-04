import { Component } from 'react';
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import api from '../../api';

class GoogleBtn extends Component {
  constructor (props) {
    super(props);
    this.state = {
      isLogined: false
    };
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
  }

  // Handling the response from Google
  async handleLogin (googleData) {
    const res = await api.userGoogleLogin(googleData);
    // res: 成功取得的google user資料
    const data = await res.json();
    console.log(data);
    // if (data.error) {
    //   throw new Error(data.error);
    // } else {
    //   // store returned user in a context?
    //   console.log(data);
    // }
  }

  login (res) {
    // To initialize our client, we will call the gapi function in our useEffect hook
    // so that it gets called when our page loads or on every render
    this.handleLogin(res);

    if (res.accessToken) {
      this.setState(state => ({
        isLogined: true
      }));
    }
  }

  async handleLogout (res) {
    const response = await api.userLogout();
    // res: 成功取得的google user資料
    const data = await response.json();
    console.log(data);
    // if (data.error) {
    //   throw new Error(data.error);
    // } else {
    //   // store returned user in a context?
    //   console.log(data);
    // }
  }

  logout (res) {
    this.handleLogout(res);
    this.setState(state => ({
      isLogined: false
    }));
  }

  render () {
    return (
    <div>
      { this.state.isLogined
        ? <GoogleLogout
            clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
            buttonText='Logout'
            onLogoutSuccess={this.logout}
            onFailure={this.logout}
          />
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
