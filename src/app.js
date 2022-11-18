const express = require('express');
const {
  readAllProducts,
  readProductId,
  insertProduct,
} = require('./controllers/products.controller');

const nameValidation = require('./middlewares/nameValidation');

const app = express();
app.use(express.json());

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.get('/products', readAllProducts);

app.get('/products/:id', readProductId);

app.post('/products', nameValidation, insertProduct);

// não remova essa exportação, é para o avaliador funcionar
// você pode registrar suas rotas normalmente, como o exemplo acima
// você deve usar o arquivo index.js para executar sua aplicação 
module.exports = app;