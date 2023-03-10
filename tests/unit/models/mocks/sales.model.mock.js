const insertDbReturn = [
  {
    "fieldCount": 0,
    "affectedRows": 1,
    "insertId": 1,
    "info": "",
    "serverStatus": 2,
    "warningStatus": 0
  },
  null
];

const selectDbReturn = [
  [
    {
      "date": "2022-11-16T15:16:03.000Z",
      "productId": 1,
      "quantity": 5
    },
    {
      "date": "2022-11-16T15:16:03.000Z",
      "productId": 2,
      "quantity": 10
    }
  ],
  null
];

const registeredProducts = [
  {
    "productId": 1,
    "quantity": 1
  },
  {
    "productId": 2,
    "quantity": 5
  }
];

const allSalesDb = [
  [
    {
      "saleId": 1,
      "date": "2022-11-17T21:43:26.000Z",
      "productId": 1,
      "quantity": 5
    },
    {
      "saleId": 1,
      "date": "2022-11-17T21:43:26.000Z",
      "productId": 2,
      "quantity": 10
    },
    {
      "saleId": 2,
      "date": "2022-11-17T21:43:26.000Z",
      "productId": 3,
      "quantity": 15
    }
  ],
  null
];

const allSalesReturn = [
  {
    "saleId": 1,
    "date": "2022-11-17T21:43:26.000Z",
    "productId": 1,
    "quantity": 5
  },
  {
    "saleId": 1,
    "date": "2022-11-17T21:43:26.000Z",
    "productId": 2,
    "quantity": 10
  },
  {
    "saleId": 2,
    "date": "2022-11-17T21:43:26.000Z",
    "productId": 3,
    "quantity": 15
  }
];

const salesByIdReturn = [
  {
    "date": "2022-11-16T15:16:03.000Z",
    "productId": 1,
    "quantity": 5
  },
  {
    "date": "2022-11-16T15:16:03.000Z",
    "productId": 2,
    "quantity": 10
  }
];

const updateSalesRequisition = [
  {
    "productId": 1,
    "quantity": 10
  },
  {
    "productId": 2,
    "quantity": 50
  }
];

module.exports = {
  insertDbReturn,
  selectDbReturn,
  registeredProducts,
  allSalesDb,
  allSalesReturn,
  salesByIdReturn,
  updateSalesRequisition,
};
