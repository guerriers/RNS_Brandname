const { DataTypes } = require("sequelize");
const db = require("../config/db");

const Product = db.define("t_products", {
  p_name: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  p_brand: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  p_category: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  p_price: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  p_conditions: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  p_receipt: DataTypes.TEXT,
  p_img: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "t_users",
      key: "id",
    },
  },
  p_description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  p_status: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  create_date: {
    type: DataTypes.DATE,
    allowNull: false,
    field: "createdAt",
  },
  update_date: {
    type: DataTypes.DATE,
    allowNull: false,
    field: "updatedAt",
  },
});

module.exports = Product;
