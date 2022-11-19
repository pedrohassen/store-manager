const productsService = require('../services/products.service');

const {
  HTTP_OK_STATUS,
  HTTP_NO_CONTENT,
  HTTP_NOT_FOUND,
  HTTP_CREATED_STATUS,
} = require('./httpStatus');

const readAllProducts = async (_req, res) => {
  const allProducts = await productsService.readAllProducts();
  return res.status(HTTP_OK_STATUS).json(allProducts);
};

const readProductId = async (req, res) => {
  const { id } = req.params;
  const productId = await productsService.readProductId(Number(id));
  if (!productId) return res.status(HTTP_NOT_FOUND).send({ message: 'Product not found' });
  return res.status(HTTP_OK_STATUS).json(productId);
};

const insertProduct = async (req, res) => {
  const { name } = req.body;
  const result = await productsService.insertProduct({ name });
  return res.status(HTTP_CREATED_STATUS).json(result);
};

const updateProduct = async (req, res) => {
  const { params: { id }, body: { name } } = req;
  const result = await productsService.updateProduct(id, name);
  return res.status(HTTP_OK_STATUS).json(result);
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;
  const result = await productsService.deleteProduct(id);
  return res.status(HTTP_NO_CONTENT).json(result);
};

const searchProduct = async (req, res) => {
  const { q } = req.query;
  const result = await productsService.searchProduct(q);
  return res.status(HTTP_OK_STATUS).json(result);
};

module.exports = {
  readAllProducts,
  readProductId,
  insertProduct,
  updateProduct,
  deleteProduct,
  searchProduct,
};
