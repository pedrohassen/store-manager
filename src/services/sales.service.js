const salesModel = require('../models/sales.model');
const productsModel = require('../models/products.model');

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
  const result = await salesModel.readAllSales();
  return result;
};

const updateSale = async (sales, saleId) => {
  const saleIdCheck = await salesModel.getSaleById(saleId);

  if (saleIdCheck.length === 0) {
    return { type: 'HTTP_NOT_FOUND', message: 'Sale not found' };
  }

  const salesCheck = sales.map(async (item) => {
    const result = await productsModel.readProductId(item.productId);
    return result;
  });

  const productChecked = (await Promise.all(salesCheck)).some((item) => !item);

  if (productChecked) return { type: 'HTTP_NOT_FOUND', message: 'Product not found' };
  const salesResult = sales.map(async (item) => {
    const result = await salesModel.updateSale(item, saleId);
    return result;
  });

  await Promise.all(salesResult);
  const result = await salesModel.getSaleById(saleId);
  return result;
};

const deleteSale = async (id) => {
  await salesModel.deleteSale(id);
};

module.exports = {
  getSaleById,
  registerNewSale,
  readAllSales,
  updateSale,
  deleteSale,
};
