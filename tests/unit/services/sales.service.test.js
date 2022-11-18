const { expect } = require('chai');
const sinon = require('sinon');

const salesModel = require('../../../src/models/sales.model');
const salesService = require('../../../src/services/sales.service');

const serviceMocks = require('./mocks/sales.service.mock');

describe('Testes da camada "Services", referente as vendas', () => {
  it('Registra na database uma venda', async () => {
    sinon.stub(salesModel, 'registerSoldProduct').resolves(1);
    sinon.stub(salesModel, 'getSaleById').resolves(serviceMocks.registeredProducts)
    const result = await salesService.registerNewSale(serviceMocks.registeredProducts);

    expect(result).to.be.deep.equal(serviceMocks.registeredNewSaleReturn);
  });

  afterEach(sinon.restore);
});
