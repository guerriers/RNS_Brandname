const { Sequelize } = require('sequelize');
const URI = `postgres://default:JXxWQpu6FMa0@ep-summer-shape-75925252.ap-southeast-1.postgres.vercel-storage.com:5432/verceldb?sslmode=require`;
const sequelize = new Sequelize(URI);
module.exports = sequelize;
