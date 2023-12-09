const { Model, DataTypes } = require('sequelize');
const sequelize = require("../config/db");
const User = require("./user");

class UserVerify extends Model {};

UserVerify.init({
  verify_status: {
    type: DataTypes.TEXT,
    allowNull: false,
    defaultValue: 'pending',
    validate: {
      notNull: {
        msg: 'Verify Status cannot be null.',
      },
      notEmpty: {
        msg: 'Verify Status cannot be empty.',
      },
      isIn: {
        args: [['pending', 'submitted', 'verified']],
        msg: 'Must be pending or verified.',
      },
    }
  },
  idCard_img: {
    type: DataTypes.ARRAY(DataTypes.JSON),
    allowNull: true,
    },
  bank_img: {
    type: DataTypes.ARRAY(DataTypes.JSON),
    allowNull: true,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: "t_users",
      key: "id",
    },
  },
}, {
  sequelize,
  modelName: 't_userVerifies',
  timestamps: true,
  paranoid: true,
})

module.exports = UserVerify;