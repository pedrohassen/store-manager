const express = require('express');
const {
  readAllProducts,
  readProductId,
  insertProduct,
  updateProduct,
  deleteProduct,
  searchProduct,
} = require('./controllers/products.controller');
const {
  registerNewSale,
  readAllSales,
  getSaleById,
  updateSale,
  deleteSale,
} = require('./controllers/sales.controller');

const nameValidation = require('./middlewares/nameValidation');
const {
  productIdExists,
  productIdExistsOnDb,
  saleIdValidation,
  productIdValidation,
} = require('./middlewares/productIdValidation');
const { quantityExists, quantityGreaterThanZero } = require('./middlewares/quantityValidation');

const app = express();
app.use(express.json());

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.get('/products/search', searchProduct);

app.get('/products', readAllProducts);

app.get('/products/:id', readProductId);

app.post('/products', nameValidation, insertProduct);

app.post('/sales',
  productIdExists,
  productIdExistsOnDb,
  quantityExists,
  quantityGreaterThanZero,
  registerNewSale);

app.get('/sales', readAllSales);

app.get('/sales/:id', saleIdValidation, getSaleById);

app.put('/products/:id', productIdValidation, nameValidation, updateProduct);

app.put('/sales/:id',
  productIdExists,
  productIdExistsOnDb,
  quantityExists,
  quantityGreaterThanZero,
  updateSale);

app.delete('/products/:id', productIdValidation, deleteProduct);

app.delete('/sales/:id', saleIdValidation, deleteSale);

// não remova essa exportação, é para o avaliador funcionar
// você pode registrar suas rotas normalmente, como o exemplo acima
// você deve usar o arquivo index.js para executar sua aplicação 
module.exports = app;
