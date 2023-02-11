const { Sequelize } = require('sequelize');

const db = new Sequelize({
  dialect: process.env.BD_DIALECT,
  host: process.env.DB_HOST,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATEBASE,
  logging: false,
});
module.exports = { db };
