const { DataTypes } = require('sequelize');
const db = require('../config/db');

const User = db.define('t_users', {
  f_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  l_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  phone: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  profile_img: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  create_date: {
    type: DataTypes.DATE,
    allowNull: false,
    field: 'createdAt', 
  },
  update_date: {
    type: DataTypes.DATE,
    field: 'updatedAt',
  },
});

module.exports = User;
