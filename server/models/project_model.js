const { pool } = require('./mysqlcon');
const config = require('../config');

const getProjectList = async (page = 0) => {
  const conn = await pool.getConnection();
  try {
    const [res] = await conn.query(
      `SELECT project_id, project_name, project_admin, project_category, project_caption, 
      project_start_date, project_end_date, project_target_amount, project_image 
      FROM ProjectList LIMIT ?, ?`, [page * config.listPerPage, config.listPerPage]
    );
    // check whether next page exist
    const [nextPageRes] = await conn.query('SELECT project_id FROM ProjectList LIMIT ?, ?', [(page + 1) * config.listPerPage, config.listPerPage]);
    const nextPage = (nextPageRes.length !== 0) ? (parseInt(page) + 1) : null;
    await conn.query('COMMIT');
    return { res, nextPage };
  } catch (err) {
    console.error('Error while getting project list!', err.message);
    await conn.query('ROLLBACK');
    throw err;
  } finally {
    await conn.release();
  }
};

const getProjectDetail = async (id) => {
  const conn = await pool.getConnection();
  try {
    const [res] = await conn.query('SELECT * FROM ProjectList WHERE project_id = ?', [id]);
    await conn.query('COMMIT');
    return { res };
  } catch (err) {
    console.log('Error while getting project detail', err.message);
    await conn.query('ROLLBACK');
    throw err;
  } finally {
    await conn.release();
  }
};

module.exports = {
  getProjectList,
  getProjectDetail
};
