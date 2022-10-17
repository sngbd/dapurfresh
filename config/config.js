require('dotenv').config();

const { DB_USERNAME, DB_PASSWORD, DB_NAME, DB_TEST_NAME, DB_HOST, DB_DIALECT } = process.env;
module.exports = {
  development: {
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: DB_NAME,
    host: DB_HOST,
    dialect: DB_DIALECT,
  },
  test: {
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: DB_TEST_NAME,
    host: DB_HOST,
    dialect: DB_DIALECT,
  },
  production: {
    use_env_variable: 'DATABASE_URL',
    dialect: DB_DIALECT,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  },
};
