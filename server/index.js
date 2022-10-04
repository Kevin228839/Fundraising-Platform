const express = require('express');
const app = express();
const port = 8000;
const cors = require('cors');
const session = require('express-session');
const oneHour = 1000 * 60 * 60 * 1;
const ProjectRouter = require('./routes/project_route');
const UserRouter = require('./routes/user_route');

// set up session
app.use(session({
  secret: 'thisismysecrctekeyfhrgfgrfrty84fwir767',
  cookie: { maxAge: oneHour },
  saveUninitialized: false,
  resave: true
}));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', ProjectRouter);
app.use('/', UserRouter);
// handle errors
app.use((err, _req, res, _next) => {
  const statusCode = err.statusCode || 500;
  console.error(err.message, err.stack);
  res.status(statusCode).json({ message: err.message });
});

app.listen(port, () => {
  console.log(`Example app is listening at port:${port}`);
});
