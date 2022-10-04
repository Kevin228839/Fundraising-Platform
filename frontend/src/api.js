const api = {
  hostname: 'localhost:8000',
  getProjectList (page) {
    return fetch(`http://${this.hostname}/api/v1/projectlist?paging=${page}`, {
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    });
  },
  getProjectDetail (id) {
    return fetch(`http://${this.hostname}/api/v1/projectdetail?projectid=${id}`, {
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    });
  },
  userGoogleLogin (googleData) {
    return fetch(`http://${this.hostname}/api/v1/usergooglelogin`, {
      method: 'POST',
      body: JSON.stringify({
        token: googleData.tokenId
      }),
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    });
  },
  userLogout () {
    return fetch(`http://${this.hostname}/api/v1/userlogout`, {
      method: 'DELETE',
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    });
  },
  user () {
    return fetch(`http://${this.hostname}/user`, {
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    });
  }
};

export default api;
