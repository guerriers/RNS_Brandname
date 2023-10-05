const { DataTypes } = require('sequelize');
const db = require('../config/db');
const jwt = require("jsonwebtoken");

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
    allowNull: true,
    field: 'createdAt', 
  },
  update_date: {
    type: DataTypes.DATE,
    allowNull: true,
    field: 'updatedAt',
  },
});
// Encrypting password before saving user
User.beforeCreate(async (user, options) => {
  if (user.changed('password')) {
    user.password = await bcrypt.hash(user.password, 10);
  }
});

User.beforeUpdate(async (user, options) => {
  if (user.changed('password')) {
    user.password = await bcrypt.hash(user.password, 10);
  }
});

// Compare user password
User.prototype.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Return JWT token
User.prototype.getJwtToken = function () {
  return jwt.sign({ id: this.id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_TIME || '7d',
  });
};

// Generate password token
User.prototype.getResetPasswordToken = function () {
  // Generate token
  const resetToken = crypto.randomBytes(20).toString('hex');
  // Hash and set to resetPasswordToken
  this.resetPasswordToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');
  // Set token expire time
  this.resetPasswordExpire = Date.now() + 30 * 60 * 1000;
  return resetToken;
};
module.exports = User;
