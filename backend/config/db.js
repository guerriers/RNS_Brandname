const { Sequelize } = require('sequelize');
const URI = process.env.POSTGRES_URI + "?sslmode=require";
const sequelize = new Sequelize(URI);
module.exports = sequelize;
