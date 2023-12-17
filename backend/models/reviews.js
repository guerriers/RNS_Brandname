const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const crypto = require("crypto");

class Review extends Model {
  // Generate review token
  static async generateReviewToken(userEmail) {
    // Generate token
    const reviewToken = crypto.randomBytes(20).toString("hex");

    // Hash the token before storing it
    const hashedReviewToken = crypto
      .createHash("sha256")
      .update(reviewToken)
      .digest("hex");

    // Set the review token in the database or use it as needed
    this.reviewToken = hashedReviewToken;

    // Set token expire time (adjust the expiration time as needed)
    this.reviewTokenExpire = Date.now() + 30 * 24 * 60 * 60 * 1000; // 30 days

    return reviewToken;
  }
}

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
    seller_id: {
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
