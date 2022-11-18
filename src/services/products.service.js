const productsModel = require('../models/products.model');

const readAllProducts = async () => {
  const result = await productsModel.readAllProducts();
  return result;
};

const readProductId = async (id) => {
  const result = await productsModel.readProductId(id);
  return result;
};

const insertProduct = async ({ name }) => {
  const { insertId } = await productsModel.insertProduct({ name });
  const result = await readProductId(insertId);
  return result;
};

const updateProduct = async (id, name) => {
  const result = await productsModel.updateProduct(id, name);
  return result;
};

const deleteProduct = async (id) => {
  const result = await productsModel.deleteProduct(id);
  return result;
};

module.exports = {
  readAllProducts,
  readProductId,
  insertProduct,
  updateProduct,
  deleteProduct,
};
