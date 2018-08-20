const pg = require('pg');
require('dotenv').config();

// Postgres timestamp issue bug
pg.types.setTypeParser(1114, string => string);

module.exports = {
  client: 'pg',
  connection: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
  }
};
