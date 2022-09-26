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
  }
};

export default api;
