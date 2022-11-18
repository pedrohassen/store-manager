const salesService = require('../services/sales.service');
const {
  HTTP_CREATED_STATUS,
} = require('./httpStatus');

const registerNewSale = async (req, res) => {
  const products = req.body;
  const newSale = await salesService.registerNewSale(products);
  return res.status(HTTP_CREATED_STATUS).json(newSale);
};

module.exports = {
  registerNewSale,
};
