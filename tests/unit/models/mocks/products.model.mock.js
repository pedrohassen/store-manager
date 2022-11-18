const allProductsDb = [
  [
    { id: 1, name: 'Martelo de Thor' },
    { id: 2, name: 'Traje de encolhimento' },
    { id: 3, name: 'Escudo do Capitão América' },
  ]
];

const allProductsResponse = [
  { id: 1, name: 'Martelo de Thor' },
  { id: 2, name: 'Traje de encolhimento' },
  { id: 3, name: 'Escudo do Capitão América' },
];

const productResponse = {
  id: 1, name: 'Martelo de Thor',
};

const insertResponseDb = [
  {
    "fieldCount": 0,
    "affectedRows": 1,
    "insertId": 4,
    "info": "",
    "serverStatus": 2,
    "warningStatus": 0
  },
  null
];

const insertResponse = {
  "fieldCount": 0,
  "affectedRows": 1,
  "insertId": 4,
  "info": "",
  "serverStatus": 2,
  "warningStatus": 0
};

module.exports = {
  allProductsDb,
  allProductsResponse,
  productResponse,
  insertResponseDb,
  insertResponse,
};
