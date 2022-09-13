const api = {
  hostname: 'localhost:8000',
  getProjectList () {
    return fetch(`http://${this.hostname}/api/v1/projectlist`, {
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    });
  },
  getProjectDetail () {
    return fetch(`http://${this.hostname}/api/v1/projectdetail`, {
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    });
  }
};

export default api;
