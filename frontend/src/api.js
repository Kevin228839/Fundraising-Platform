const api = {
  hostname: process.env.REACT_APP_SERVER,
  getProjectList (page) {
    return fetch(`https://${this.hostname}/api/v1/projectlist?paging=${page}`, {
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    });
  },
  getProjectDetail (id) {
    return fetch(`https://${this.hostname}/api/v1/projectdetail?projectid=${id}`, {
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    });
  },
  userGoogleLogin (googleData) {
    return fetch(`https://${this.hostname}/api/v1/usergooglelogin`, {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify({
        token: googleData.tokenId
      })
    });
  },
  userLogout (accessToken) {
    return fetch(`https://${this.hostname}/api/v1/userlogout`, {
      method: 'POST',
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      })
    });
  },
  getUserData (accessToken) {
    return fetch(`https://${this.hostname}/api/v1/user`, {
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      })
    });
  },
  setWallet (accessToken, walletAddress) {
    return fetch(`https://${this.hostname}/api/v1/setwallet`, {
      method: 'PUT',
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify({
        wallet: walletAddress
      })
    });
  },
  refresh (refreshToken) {
    return fetch(`https://${this.hostname}/api/v1/refresh`, {
      method: 'POST',
      headers: new Headers({
        Authorization: `Bearer ${refreshToken}`,
        'Content-Type': 'application/json'
      })
    });
  },
  topUp (data) {
    return fetch(`https://${this.hostname}/api/v1/topup`, {
      method: 'POST',
      body: JSON.stringify({ data }),
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    });
  }
};

export default api;
