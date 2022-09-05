1. 'npm install' after you clone this project
2. rename .env-template to .env
3. write mysql connection setting from localhost into .env
4. 'nodemon index.js' to run the server
5. api
  - get project list: http://localhost:8000/api/v1/projectlist?paging=0
  - get project detail http://localhost:8000/api/v1/projectdetail?projectid=1