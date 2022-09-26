const express = require('express');
const app = express();
const port = 8000;
const cors = require('cors');
const ProjectRouter = require('./routes/project_route');
const { pool } = require('./mysqlcon');

console.log('test');
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', ProjectRouter);
// handle errors
app.use((err, _req, res, _next) => {
  const statusCode = err.statusCode || 500;
  console.error(err.message, err.stack);
  res.status(statusCode).json({ message: err.message });
});

app.listen(port, () => {
  console.log(`Example app is listening at port:${port}`);
});

// Check authentication middleware
app.use(async (req, res, next) => {
  const conn = await pool.getConnection();
  const user = await conn.user.findFirst({ where: { id: req.session.userId } });
  req.user = user;
  next();
});
