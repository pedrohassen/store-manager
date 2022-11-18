const { expect } = require('chai');
const sinon = require('sinon');

const productsModel = require('../../../src/models/products.model');
const productsService = require('../../../src/services/products.service');

const serviceMocks = require('./mocks/products.service.mock');

describe('Testes da camada "Services", referente aos produtos', () => {
  it('Retorna todos os produtos', async () => {
    sinon.stub(productsModel, 'readAllProducts').resolves(serviceMocks.allProductsResponse);
    const result = await productsService.readAllProducts();

    expect(result).to.be.deep.equal(serviceMocks.allProductsResponse);
  });

  it('Retorna um produto por id', async () => {
    sinon.stub(productsModel, 'readProductId').resolves(serviceMocks.productResponse);
    const result = await productsService.readProductId(1);

    expect(result).to.be.deep.equal(serviceMocks.productResponse);
  });

  it('Insere um novo produto', async () => {
    sinon.stub(productsModel, 'insertProduct').resolves(serviceMocks.insertResponse);
    sinon.stub(productsModel, 'readProductId').resolves(serviceMocks.productResponse);
    const newProduct = { name: 'ProdutoA' };
    const result = await productsService.insertProduct(newProduct);

    expect(result).to.be.deep.equal(serviceMocks.productResponse);
  });

  it('Atualiza um produto', async () => {
    sinon.stub(productsModel, 'updateProduct').resolves(serviceMocks.updatedProductResponse);
    const result = await productsService.updateProduct(1, 'ProdutoX');

    expect(result).to.be.deep.equal(serviceMocks.updatedProductResponse);
  });

  it('Deleta um produto por id', async () => {
    sinon.stub(productsModel, 'deleteProduct');
    const result = await productsService.deleteProduct(1);

    expect(result).to.be.deep.equal(undefined);
  });

  afterEach(sinon.restore);
});
