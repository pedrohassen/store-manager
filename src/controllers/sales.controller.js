const salesService = require('../services/sales.service');
const {
  HTTP_OK_STATUS,
  HTTP_CREATED_STATUS,
} = require('./httpStatus');

const registerNewSale = async (req, res) => {
  const products = req.body;
  const newSale = await salesService.registerNewSale(products);
  return res.status(HTTP_CREATED_STATUS).json(newSale);
};

const readAllSales = async (req, res) => {
  const sales = req.body;
  const allSales = await salesService.readAllSales(sales);
  return res.status(HTTP_OK_STATUS).json(allSales);
};

const getSaleById = async (req, res) => {
  const { id } = req.params;
  const saleId = await salesService.getSaleById(id);
  return res.status(HTTP_OK_STATUS).json(saleId);
};

module.exports = {
  registerNewSale,
  readAllSales,
  getSaleById,
};
