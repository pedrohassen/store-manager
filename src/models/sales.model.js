const connection = require('./connection');

const registerSale = async () => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO StoreManager.sales (date) VALUES (default)',
  );
  return insertId;
};

const registerSoldProduct = async (products) => {
  const id = await registerSale();
  const placeholders = products.map((_) => '(?, ?, ?)').join(', ');
  const values = products
    .reduce((acc, { productId, quantity }) => [...acc, id, productId, quantity], []);
  await connection.execute(
    `INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity)
    VALUES ${placeholders}`, values,
  );
  return id;
};

const getSaleById = async (id) => {
  const [result] = await connection.execute(
    `SELECT
    B.date,
    A.product_id AS productId,
    A.quantity
    FROM StoreManager.sales_products AS A
    INNER JOIN StoreManager.sales AS B
    ON B.id = A.sale_id
    AND B.id = ?
    ORDER BY B.id, A.product_id`,
    [id],
  );
  return result;
};

const readAllSales = async () => {
  const [result] = await connection.execute(
    `SELECT
    B.id AS saleId,
    B.date,
    A.product_id AS productId,
    A.quantity
    FROM StoreManager.sales_products AS A
    INNER JOIN StoreManager.sales AS B
    ON B.id = A.sale_id
    ORDER BY B.id, A.product_id`,
  );
  return result;
};

const updateSale = async ({ quantity, productId }, saleId) => {
  await connection.execute(
    'UPDATE StoreManager.sales_products SET quantity = ? WHERE product_id = ? AND sale_id = ?',
    [quantity, productId, saleId],
  );
};

const deleteSale = async (id) => {
  await connection.execute(
    'DELETE FROM StoreManager.sales WHERE id = ?',
    [id],
  );
  await connection.execute(
    'DELETE FROM StoreManager.sales_products WHERE sale_id = ?',
    [id],
  );
};

module.exports = {
  registerSoldProduct,
  getSaleById,
  readAllSales,
  updateSale,
  deleteSale,
};
