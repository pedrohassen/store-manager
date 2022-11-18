const { expect } = require('chai');
const sinon = require('sinon');

const connection = require('../../../src/models/connection');
const salesModel = require('../../../src/models/sales.model');

const modelMocks = require('./mocks/sales.model.mock');

describe('Testes da camada "Models", referente as vendas', () => {
  it('Registra na database uma venda', async () => {
    sinon.stub(connection, 'execute').resolves(modelMocks.insertDbReturn);
    const result = await salesModel.registerSoldProduct(modelMocks.registeredProducts);

    expect(result).to.be.deep.equal(1);
  });

  it('Retorna uma venda por Id', async () => {
    sinon.stub(connection, 'execute').resolves(modelMocks.selectDbReturn);
    const result = await salesModel.getSaleById(1);

    expect(result).to.be.deep.equal(modelMocks.registeredProducts)
  });

  afterEach(sinon.restore);
});
