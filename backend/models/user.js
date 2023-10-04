const { DataTypes } = require('sequelize');
const db = require('../config/db');

const User = db.define('t_users', {
  f_name: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  l_name: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  email: {
    type: DataTypes.TEXT,
    allowNull: false,
    unique: true,
  },
  phone: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  profile_img: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  password: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  status: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  create_date: {
    type: DataTypes.DATE,
    allowNull: false,
    field: 'createdAt', 
  },
  update_date: {
    type: DataTypes.DATE,
    allowNull: true,
    field: 'updatedAt',
  },
});

module.exports = User;
