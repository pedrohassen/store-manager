const {
  HTTP_BAD_REQUEST,
  HTTP_NOT_FOUND,
} = require('./httpStatus');
const { readAllProducts } = require('../services/products.service');

const productIdExists = (req, res, next) => {
  const products = req.body;
  const productIds = products.map((item) => item.productId);
  const productsCheck = productIds.map((id) => {
    if (id) return true;
    return false;
  }).every((item) => item);
  if (!productsCheck) {
    return res.status(HTTP_BAD_REQUEST).send({ message: '"productId" is required' });
  }
  next();
};

const productIdExistsOnDb = async (req, res, next) => {
  const products = req.body;
  const result = await readAllProducts();
  const allProducts = result.map((item) => item.id);
  const productsCheck = products.map((item) => {
    if (allProducts.includes(item.productId)) return true;
    return false;
  }).every((item) => item);
  if (!productsCheck) return res.status(HTTP_NOT_FOUND).send({ message: 'Product not found' });
  next();
};

module.exports = {
  productIdExists,
  productIdExistsOnDb,
};
