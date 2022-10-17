const express = require('express');
const app = express();
const port = 8000;
const cors = require('cors');
// const session = require('express-session');
// const oneHour = 1000 * 60 * 60 * 1;
const cookieparser = require('cookie-parser');
const ProjectRouter = require('./routes/project_route');
const UserRouter = require('./routes/user_route');
const PaymentRouter = require('./routes/payment_route');

// // set up session
// app.use(session({
//   secret: 'thisismysecrctekeyfhrgfgrfrty84fwir767',
//   cookie: { maxAge: oneHour },
//   saveUninitialized: false,
//   resave: true
// }));

app.use(cors({
  'Access-Control-Allow-Origin': 'http://localhost:3000',
  origin: 'http://localhost:3000',
  credentials: true
}));
// sign for cookie
app.use(cookieparser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// handle api requests
app.use('/', ProjectRouter);
app.use('/', UserRouter);
app.use('/', PaymentRouter);

// handle errors
app.use((err, _req, res, _next) => {
  const statusCode = err.statusCode || 500;
  console.error(err.message, err.stack);
  res.status(statusCode).json({ message: err.message });
});

app.listen(port, () => {
  console.log(`Example app is listening at port:${port}`);
});
