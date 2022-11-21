const { expect } = require('chai');
const sinon = require('sinon');

const salesModel = require('../../../src/models/sales.model');
const productsModel = require('../../../src/models/products.model');
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

  it('Atualiza uma venda por id', async () => {
    sinon.stub(salesModel, 'updateSale').resolves(serviceMocks.updateSalesRequisition);
    sinon.stub(salesModel, 'getSaleById').onFirstCall().resolves(serviceMocks.updateSalesRequisition).onSecondCall().resolves(serviceMocks.updateSalesRequisition);
    sinon.stub(productsModel, 'readProductId').resolves(serviceMocks.readProductIdReturn);
    const requisitionBody = [{
        "productId": 1,
        "quantity": 17
      }];

    const result = await salesService.updateSale(requisitionBody, 1);

    expect(result).to.be.deep.equal(serviceMocks.updatedSalesReturn);
  });

  it('Testa se atualização da venda falha, se o id da venda passado seja inexistente', async () => {
    sinon.stub(salesModel, 'updateSale').resolves(serviceMocks.updateSalesRequisition);
    sinon.stub(salesModel, 'getSaleById').onFirstCall().resolves([]).onSecondCall().resolves(serviceMocks.updateSalesRequisition);
    sinon.stub(productsModel, 'readProductId').resolves(serviceMocks.readProductIdReturn);
    const requisitionBody = [{
        "productId": 1,
        "quantity": 17
      }];

    const result = await salesService.updateSale(requisitionBody, 1);

    expect(result).to.be.deep.equal({ type: 'HTTP_NOT_FOUND', message: 'Sale not found' });
  });

  it('Testa se atualização da venda falha, se o id do produto passado seja inexistente', async () => {
    sinon.stub(salesModel, 'updateSale').resolves(serviceMocks.updateSalesRequisition);
    sinon.stub(salesModel, 'getSaleById').onFirstCall().resolves(serviceMocks.updateSalesRequisition).onSecondCall().resolves(serviceMocks.updateSalesRequisition);
    sinon.stub(productsModel, 'readProductId').resolves(undefined);
    const requisitionBody = [{
        "productId": 1,
        "quantity": 17
      }];

    const result = await salesService.updateSale(requisitionBody, 1);

    expect(result).to.be.deep.equal({ type: 'HTTP_NOT_FOUND', message: 'Product not found' });
  });

  it('Deleta uma venda por id', async () => {
    sinon.stub(salesModel, 'deleteSale');
    const result = await salesService.deleteSale(1);

    expect(result).to.be.deep.equal(undefined);
  });

  afterEach(sinon.restore);
});
