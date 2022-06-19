const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/product_controller');

router.get('/api/v1/product', ProductController.getProduct);

module.exports = router;
