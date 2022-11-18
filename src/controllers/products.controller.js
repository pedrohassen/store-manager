const productsServices = require('../services/products.service');

const {
  HTTP_OK_STATUS,
  HTTP_NOT_FOUND,
  HTTP_CREATED_STATUS,
} = require('./httpStatus');

const readAllProducts = async (_req, res) => {
  const allProducts = await productsServices.readAllProducts();
  return res.status(HTTP_OK_STATUS).json(allProducts);
};

const readProductId = async (req, res) => {
  const { id } = req.params;
  const productId = await productsServices.readProductId(Number(id));
  if (!productId) return res.status(HTTP_NOT_FOUND).send({ message: 'Product not found' });
  return res.status(HTTP_OK_STATUS).json(productId);
};

const insertProduct = async (req, res) => {
  const { name } = req.body;
  const result = await productsServices.insertProduct({ name });
  return res.status(HTTP_CREATED_STATUS).json(result);
};

module.exports = {
  readAllProducts,
  readProductId,
  insertProduct,
};
