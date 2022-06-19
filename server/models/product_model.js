const { pool } = require('./mysqlcon');

const getProduct = async () => {
  const conn = await pool.getConnection();
  try {
    const [res] = await conn.query('SELECT * FROM ProjectList');
    await conn.query('COMMIT');
    return res;
  } catch (err) {
    console.error('Error while getting projects! ', err.message);
    await conn.query('ROLLBACK');
    throw err;
  } finally {
    await conn.release();
  }
};

module.exports = {
  getProduct
};
