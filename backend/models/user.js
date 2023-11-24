const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const crypto = require('crypto')
const UserVerify = require('./userVerify');

class User extends Model {};

User.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  f_name: {
    type: DataTypes.TEXT,
    allowNull: false,
    validate: {
      notNull: {
        msg: 'First name cannot be null.',
      },
      notEmpty: {
        msg: 'First name cannot be empty.',
      },
    },
  },
  l_name: {
    type: DataTypes.TEXT,
    allowNull: false,
    validate: {
      notNull: {
        msg: 'Last name cannot be null.',
      },
      notEmpty: {
        msg: 'Last name cannot be empty.',
      },
    },
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: {
      args: true,
      msg: 'Email is already in use.',
    },
    validate: {
      notNull: {
        msg: 'Email cannot be null.',
      },
      notEmpty: {
        msg: 'Email cannot be empty.',
      },
      isEmail: {
        msg: 'Invalid email format.',
      },
    },
  },
  phone: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      notNull: {
        msg: 'Phone cannot be null.',
      },
      notEmpty: {
        msg: 'Phone cannot be empty.',
      },
    },
  },
  profile_img: {
    type: DataTypes.TEXT,
    allowNull: false,
    defaultValue: 'noimg',
    validate: {
      notNull: {
        msg: 'Profile image cannot be null.',
      },
      notEmpty: {
        msg: 'Profile image cannot be empty.',
      },
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: 'Password cannot be null.',
      },
      notEmpty: {
        msg: 'Password cannot be empty.',
      },
    },
  },
  roles: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'user',
    validate: {
      notNull: {
        msg: 'Roles cannot be null.',
      },
      notEmpty: {
        msg: 'Roles cannot be empty.',
      },
      isIn: {
        args: [['admin', 'user']],
        msg: 'Must be Admin or User',
      },
    },
  },
  resetPasswordToken: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  resetPasswordExpire: {
    type: DataTypes.DATE,
    allowNull: true,
  }
}, {
  sequelize,
  modelName: 't_users',
  timestamps: true,
  paranoid: true,
})

User.hasOne(UserVerify, { foreignKey: "user_id" });
UserVerify.belongsTo(User, { foreignKey: "user_id" });

//Encrypting password before saving user
User.beforeSave(async (user)=> {
  const hashedPassword = await bcrypt.hash(user.password, 10);
  user.password = hashedPassword;
});

User.prototype.getJwtToken = function () {
  return jwt.sign({ id: this.id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_TIME,
  });
};
User.prototype.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Generate password reset token
User.prototype.getResetPasswordToken = function () {
  // Generate token
  const resetToken = crypto.randomBytes(20).toString('hex');

  // Hash and set to resetPasswordToken
  this.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex')

  // Set token expire time
  this.resetPasswordExpire = Date.now() + 30 * 60 * 1000

  return resetToken

}

module.exports = User;

