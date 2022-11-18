const productsModel = require('../models/products.model');

const readAllProducts = async () => {
  const result = await productsModel.readAllProducts();
  return result;
};

const readProductId = async (id) => {
  const result = await productsModel.readProductId(id);
  return result;
};

module.exports = {
  readAllProducts,
  readProductId,
};
