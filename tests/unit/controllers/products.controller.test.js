const { expect } = require('chai');
const sinon = require('sinon');
const chai = require('chai');
const sinonChai = require('sinon-chai');

chai.use(sinonChai);

const productsService = require('../../../src/services/products.service');
const { readAllProducts, readProductId, insertProduct, updateProduct, deleteProduct } = require('../../../src/controllers/products.controller');

const controllerMocks = require('./mocks/products.controller.mock');

describe('Testes da camada "Controllers", referente aos produtos', () => {
  it('Retorna todos os produtos', async () => {
    sinon.stub(productsService, 'readAllProducts').resolves(controllerMocks.allProductsResponse);

    const req = {};
    const res = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    await readAllProducts(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(controllerMocks.allProductsResponse);
  });

  it('Retorna um produto por id', async () => {
    sinon.stub(productsService, 'readProductId').resolves(controllerMocks.productResponse);

    const req = { params: { id: 1 } };
    const res = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    await readProductId(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(controllerMocks.productResponse);
  });

  it('Retorna um erro caso o id do produto não exista', async () => {
    sinon.stub(productsService, 'readProductId').resolves(undefined);

    const req = { params: { id: 7 } };
    const res = {};

    res.status = sinon.stub().returns(res);
    res.send = sinon.stub().returns({ message: 'Product not found' });

    await readProductId(req, res);

    expect(res.status).to.have.been.calledWith(404);
    expect(res.send).to.have.been.calledWith({ message: 'Product not found' });
  });

  it('Insere um novo produto', async () => {
    sinon.stub(productsService, 'insertProduct').resolves(controllerMocks.insertResponse);

    const req = { body: { name: 'ProdutoA'} };
    const res = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    await insertProduct(req, res);

    expect(res.status).to.have.been.calledWith(201);
    expect(res.json).to.have.been.calledWith(controllerMocks.insertResponse);
  });

  it('Atualiza um produto', async () => {
    sinon.stub(productsService, 'updateProduct').resolves(controllerMocks.updatedProductResponse);

    const req = { params: { id: 1 }, body: { name: 'ProdutoX' } };
    const res = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    await updateProduct(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(controllerMocks.updatedProductResponse);
  });

  it('Deleta um produto por id', async () => {
    sinon.stub(productsService, 'deleteProduct');

    const req = { params: { id: 1 } };
    const res = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    await deleteProduct(req, res);

    expect(res.status).to.have.been.calledWith(204);
    expect(res.json).to.have.been.calledWith();
  });

  afterEach(sinon.restore);
});
