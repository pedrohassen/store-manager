const salesService = require('../services/sales.service');
const {
  HTTP_OK_STATUS,
  HTTP_NO_CONTENT,
  HTTP_CREATED_STATUS,
} = require('./httpStatus');

const status = require('./httpStatus');

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

const updateSale = async (req, res) => {
  const { id } = req.params;
  const sales = req.body;

  const result = await salesService.updateSale(sales, id);
  if (result.type) return res.status(status[result.type]).json({ message: result.message });
  return res.status(HTTP_OK_STATUS).json({ saleId: id, itemsUpdated: result });
};

const deleteSale = async (req, res) => {
  const { id } = req.params;
  const result = await salesService.deleteSale(id);
  return res.status(HTTP_NO_CONTENT).json(result);
};

module.exports = {
  registerNewSale,
  readAllSales,
  getSaleById,
  updateSale,
  deleteSale,
};
