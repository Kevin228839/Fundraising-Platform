const ProductModel = require('../models/product_model');

const getProduct = async (req, res, next) => {
  try {
    const response = await ProductModel.getProduct();
    res.status(200).json({ data: response });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getProduct
};
