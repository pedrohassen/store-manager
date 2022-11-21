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

  it('Retorna todas as vendas', async () => {
    sinon.stub(connection, 'execute').resolves(modelMocks.allSalesDb);
    const result = await salesModel.readAllSales();

    expect(result).to.be.deep.equal(modelMocks.allSalesReturn);
  });

  it('Retorna uma venda por Id', async () => {
    sinon.stub(connection, 'execute').resolves(modelMocks.selectDbReturn);
    const result = await salesModel.getSaleById(1);

    expect(result).to.be.deep.equal(modelMocks.salesByIdReturn)
  });

  it('Atualiza uma venda por id', async () => {
    sinon.stub(connection, 'execute').resolves(modelMocks.updateSalesRequisition);
    const requisitionBody = [{
        "productId": 1,
        "quantity": 17
      }];

    const result = await salesModel.updateSale(requisitionBody, 1);

    expect(result).to.be.deep.equal(undefined);
  });

  it('Deleta uma venda por id', async () => {
    sinon.stub(connection, 'execute');
    const result = await salesModel.deleteSale(1);

    expect(result).to.be.deep.equal(undefined);
  });

  afterEach(sinon.restore);
});
