const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/db");

class Product extends Model {}

Product.init(
  {
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
    p_receipt: {
      type: DataTypes.ARRAY(DataTypes.JSON),
      allowNull: true,
    },
    p_img: {
      type: DataTypes.ARRAY(DataTypes.JSON),
      allowNull: true,
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
  },
  {
    sequelize,
    modelName: "t_products",
    timestamps: true,
    paranoid: true,
  }
);

module.exports = Product;
