const pg = require('pg');
require('dotenv').config();

// Reality check
if (!process.env.DB_NAME)
  throw new Error(
    'DB_NAME not found in environment variables, do you have .env file?'
  );

if (!process.env.DB_USER)
  throw new Error(
    'DB_USER not found in environment variables, do you have .env file?'
  );

if (!process.env.DB_HOST)
  throw new Error(
    'DB_HOST not found in environment variables, do you have .env file?'
  );

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
