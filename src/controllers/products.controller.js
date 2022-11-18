const productsServices = require('../services/products.service');

const HTTP_OK_STATUS = 200;
const HTTP_NOT_FOUND = 404;

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

module.exports = {
  readAllProducts,
  readProductId,
};