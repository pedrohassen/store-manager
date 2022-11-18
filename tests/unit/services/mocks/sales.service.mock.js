const registeredNewSaleReturn = {
  "id": 1,
  "itemsSold": [
    {
      "productId": 1,
      "quantity": 1
    },
    {
      "productId": 2,
      "quantity": 5
    }
  ]
};

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

module.exports = {
  registeredNewSaleReturn,
  registeredProducts,
  allSalesReturn,
  salesByIdReturn,
};
