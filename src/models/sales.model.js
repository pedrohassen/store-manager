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

module.exports = {
  registerSoldProduct,
  getSaleById,
};
