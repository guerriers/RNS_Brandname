const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/db");

class Review extends Model {}

Review.init(
  {
    re_text: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    re_score: {
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
  },
  {
    sequelize,
    modelName: "t_reviews",
    timestamps: true,
    paranoid: true,
  }
);
module.exports = Review;
