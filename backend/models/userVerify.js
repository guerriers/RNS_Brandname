const { DataTypes } = require("sequelize");
const db = require("../config/db");

const UserVerify = db.define("t_userVerify", {
  verify_status: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  idCard_img: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  bank_img: {
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
  create_date: {
    type: DataTypes.DATE,
    allowNull: true,
    field: "createdAt",
  },
  update_date: {
    type: DataTypes.DATE,
    allowNull: true,
    field: "updatedAt",
  },
}, {
  tableName: "t_userVerify",
});

module.exports = UserVerify;