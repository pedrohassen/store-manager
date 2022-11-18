const allProductsResponse = [
  { id: 1, name: 'Martelo de Thor' },
  { id: 2, name: 'Traje de encolhimento' },
  { id: 3, name: 'Escudo do Capitão América' },
];

const productResponse = {
  id: 1, name: 'Martelo de Thor',
};

const insertResponse = {
  "fieldCount": 0,
  "affectedRows": 1,
  "insertId": 4,
  "info": "",
  "serverStatus": 2,
  "warningStatus": 0
};

const updatedProductResponse = {
  id: 1, name: 'ProdutoX',
};

module.exports = {
  allProductsResponse,
  productResponse,
  insertResponse,
  updatedProductResponse,
};
