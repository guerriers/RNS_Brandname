const express = require("express");
const router = express.Router();
const {
  createReview,
  getAllReviews,
  getReviewsByUserId,
  updateReview,
  deleteReview,
} = require("../controllers/reviewController");
const { isAuthenticatedUser } = require("../middlewares/auth");

// Create a review
router.route("/").post(isAuthenticatedUser, createReview);

// Get all reviews
router.route("/").get(getAllReviews);

// Get reviews by user ID
router.route("/user/:id").get(isAuthenticatedUser, getReviewsByUserId);

// Update a review by ID
router.route("/:id").put(isAuthenticatedUser, updateReview);

// Delete a review by ID
router.route("/:id").delete(isAuthenticatedUser, deleteReview);

module.exports = router;
