const {
  HTTP_BAD_REQUEST,
  HTTP_NOT_FOUND,
} = require('./httpStatus');
const { readAllProducts, readProductId } = require('../services/products.service');
const { getSaleById } = require('../services/sales.service');

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

const saleIdValidation = async (req, res, next) => {
  const { id } = req.params;
  const result = await getSaleById(id);
  if (!id || result.length === 0) {
    return res.status(HTTP_NOT_FOUND).send({ message: 'Sale not found' });
  }
  next();
};

const productIdValidation = async (req, res, next) => {
  const { id } = req.params;
  const result = await readProductId(id);
  if (!id || !result) {
    return res.status(HTTP_NOT_FOUND).send({ message: 'Product not found' });
  }
  next();
};

module.exports = {
  productIdExists,
  productIdExistsOnDb,
  saleIdValidation,
  productIdValidation,
};
