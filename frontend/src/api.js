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
  topUp (data) {
    return fetch(`http://${this.hostname}/api/v1/topup`, {
      method: 'POST',
      body: JSON.stringify({ data }),
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    });
  }
};

export default api;
