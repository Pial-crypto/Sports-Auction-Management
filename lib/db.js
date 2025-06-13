const pgp = require('pg-promise')();

const dbConfig = {
    host: 'localhost',
    port: 5432,
    database: 'Sport-auction',
    user: 'postgres',
    password: '1234'
};

const db = pgp(dbConfig);

module.exports = db;

// Example query
async function getUsers() {
  try {
    const result = await db.query('SELECT * FROM users');
    return result.rows;
  } catch (error) {
    console.error('Error executing query:', error);
    throw error;
  }
}