const { expect } = require('chai');
const sinon = require('sinon');
const chai = require('chai');
const sinonChai = require('sinon-chai');

chai.use(sinonChai);

const salesService = require('../../../src/services/sales.service');
const { registerNewSale, readAllSales, getSaleById } = require('../../../src/controllers/sales.controller');

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

 it('Retorna todas as vendas', async () => {
    sinon.stub(salesService, 'readAllSales').resolves(controllerMocks.allSalesReturn);

    const req = { body: controllerMocks.registeredProducts };
    const res = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    await readAllSales(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(controllerMocks.allSalesReturn);
  });

  it('Retorna uma venda por id', async () => {
    sinon.stub(salesService, 'getSaleById').resolves(controllerMocks.salesByIdReturn);

    const req = { params: { id: 1 } };
    const res = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    await getSaleById(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(controllerMocks.salesByIdReturn);
  });

  afterEach(sinon.restore);
});
