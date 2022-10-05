const PaymentModel = require('../models/payment_model');

const TopUp = async (req, res, next) => {
  try {
    const data = await PaymentModel.TopUp(req.body.data);
    console.log(data);
    res.status(200).json(data);
    return;
  } catch (err) {
    next(err);
  }
};

module.exports = {
  TopUp
};
