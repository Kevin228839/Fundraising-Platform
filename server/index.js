const express = require('express');
const path = require('path');
const https = require('https');
const fs = require('fs');
const app = express();
const port = 8000;
const cors = require('cors');
const ProjectRouter = require('./routes/project_route');
const PaymentRouter = require('./routes/payment_route');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// handle api requests
app.use('/', ProjectRouter);
app.use('/', PaymentRouter);

// for frontend url (after react build)
app.use(express.static(path.join(__dirname, '../frontend/build')));
app.use('/', function (_req, res, next) {
  res.sendFile(path.join(__dirname, '../frontend/build/index.html'), function (err) {
    if (err) {
      res.status(500).send(err);
      next(err);
    }
  });
});
// handle errors
app.use((err, _req, res, _next) => {
  const statusCode = err.statusCode || 500;
  console.error(err.message, err.stack);
  res.status(statusCode).json({ message: err.message });
});

// https server
https.createServer({
  key: fs.readFileSync('../ssl/key.pem'),
  cert: fs.readFileSync('../ssl/cert.pem')
}, app).listen(port, () => {
  console.log(`Example app is listening at port:${port}`);
});
