const { expect } = require('chai');
const sinon = require('sinon');

const connection = require('../../../src/models/connection');
const productsModel = require('../../../src/models/products.model');

const modelMocks = require('./mocks/products.model.mock');

describe('Testes da camada "Models", referente aos produtos', () => {
  it('Retorna todos os produtos', async () => {
    sinon.stub(connection, 'execute').resolves(modelMocks.allProductsDb);
    const result = await productsModel.readAllProducts();

    expect(result).to.be.deep.equal(modelMocks.allProductsResponse);
  });

  it('Retorna um produto por id', async () => {
    sinon.stub(connection, 'execute').resolves(modelMocks.allProductsDb);
    const result = await productsModel.readProductId(1);

    expect(result).to.be.deep.equal(modelMocks.productResponse);
  });

  it('Insere um novo produto', async () => {
    sinon.stub(connection, 'execute').resolves(modelMocks.insertResponseDb);
    const newProduct = { name: 'ProdutoA' };
    const result = await productsModel.insertProduct(newProduct);

    expect(result).to.be.deep.equal(modelMocks.insertResponse)
  });

  it('Atualiza um produto', async () => {
    sinon.stub(connection, 'execute').onFirstCall().resolves().onSecondCall().resolves([[modelMocks.updatedProductResponse]]);
    const result = await productsModel.updateProduct(1, 'ProdutoX');

    expect(result).to.be.deep.equal(modelMocks.updatedProductResponse);
  });

  it('Deleta um produto por id', async () => {
    sinon.stub(connection, 'execute');
    const result = await productsModel.deleteProduct(1);

    expect(result).to.be.deep.equal(undefined);
  });

  afterEach(sinon.restore);
});
