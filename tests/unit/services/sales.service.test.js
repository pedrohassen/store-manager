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

  it('Retorna todas as vendas', async () => {
    sinon.stub(salesModel, 'readAllSales').resolves(serviceMocks.allSalesReturn);
    const result = await salesService.readAllSales();

    expect(result).to.be.deep.equal(serviceMocks.allSalesReturn);
  });

  it('Retorna uma venda por Id', async () => {
    sinon.stub(salesModel, 'getSaleById').resolves(serviceMocks.salesByIdReturn);
    const result = await salesService.getSaleById(1);

    expect(result).to.be.deep.equal(serviceMocks.salesByIdReturn);
  });

  afterEach(sinon.restore);
});
