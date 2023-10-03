const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'postgres',
  username: 'postgres',
  password: '1234',
  database: 'rns_brandname',
  host: 'localhost',
  port: 5432, 
});

module.exports = sequelize;
