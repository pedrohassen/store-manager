const express = require('express');
const productsModel = require('./models/products.model');

const app = express();

const HTTP_OK_STATUS = 200;
const HTTP_NOT_FOUND = 404;

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.get('/products', async (_req, res) => {
  const allProducts = await productsModel.readAllProducts();
  return res.status(HTTP_OK_STATUS).json(allProducts);
});

app.get('/products/:id', async (req, res) => {
  const { id } = req.params;
  const productId = await productsModel.readProductId(Number(id));
  if (!productId) return res.status(HTTP_NOT_FOUND).send({ message: 'Product not found' });
  return res.status(HTTP_OK_STATUS).json(productId);
});

// não remova essa exportação, é para o avaliador funcionar
// você pode registrar suas rotas normalmente, como o exemplo acima
// você deve usar o arquivo index.js para executar sua aplicação 
module.exports = app;