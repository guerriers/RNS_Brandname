const { DataTypes } = require("sequelize");
const db = require("../config/db");

const Review = db.define("t_reviews", {
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "t_users",
      key: "id",
    },
  },
  review_img: {
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

module.exports = Review;
