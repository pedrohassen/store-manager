const { expect } = require('chai');
const sinon = require('sinon');
const chai = require('chai');
const sinonChai = require('sinon-chai');

chai.use(sinonChai);

const salesService = require('../../../src/services/sales.service');
const { registerNewSale } = require('../../../src/controllers/sales.controller');

const controllerMocks = require('./mocks/sales.controller.mock');

describe('Testes da camada "Controllers", referente as vendas', () => {
  it('Registra na database uma venda', async () => {
    sinon.stub(salesService, 'registerNewSale').resolves(controllerMocks.registeredNewSaleReturn);

    const req = { body: controllerMocks.registeredProducts };
    const res = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    await registerNewSale(req, res);

    expect(res.status).to.have.been.calledWith(201);
    expect(res.json).to.have.been.calledWith(controllerMocks.registeredNewSaleReturn);
  });

  afterEach(sinon.restore);
});
