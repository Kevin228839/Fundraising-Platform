const express = require('express');
const app = express();
const port = 8000;
const cors = require('cors');
const ProductRouter = require('./routes/product_route');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', ProductRouter);
// handle errors
app.use((err, _req, res, _next) => {
  const statusCode = err.statusCode || 500;
  console.error(err.message, err.stack);
  res.status(statusCode).json({ message: err.message });
});

app.listen(port, () => {
  console.log(`Example app is listening at port:${port}`);
});
