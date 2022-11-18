const salesModel = require('../models/sales.model');

const registerSoldProduct = async (products) => {
  const result = salesModel.registerSoldProduct(products);
  return result;
};

const getSaleById = async (id) => {
  const result = await salesModel.getSaleById(id);
  return result;
};

const registerNewSale = async (products) => {
  const id = await registerSoldProduct(products);
  const result = await getSaleById(id);
  return {
    id,
    itemsSold: result.map((item) => ({ productId: item.productId, quantity: item.quantity })),
  };
};

const readAllSales = async () => {
  const result = salesModel.readAllSales();
  return result;
};

module.exports = {
  getSaleById,
  registerNewSale,
  readAllSales,
};
