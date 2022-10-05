const express = require('express');
const router = express.Router();
const PaymentController = require('../controllers/payment_controller');

router.post('/api/v1/topup', PaymentController.TopUp);

module.exports = router;
