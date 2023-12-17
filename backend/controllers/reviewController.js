const Review = require("../models/reviews");
const { ErrorHandler } = require("../middlewares/errorHandlers");

// Create a review
const createReview = async (req, res, next) => {
  try {
    req.body.user_id = req.user.id; 

    const newReview = await Review.create(req.body);
    return res.status(201).json(newReview);
  } catch (error) {
    console.error(error);
    return next(error);
  }
};

// Get all reviews
const getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.findAll();
    return res.status(200).json(reviews);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Could not retrieve reviews" });
  }
};

// Get reviews by user ID (SELLER ID)
const getReviewsByUserId = async (req, res) => {
  const userId = req.params.id;
  try {
    const reviews = await Review.findAll({
      where: {
        seller_id: userId,
      },
    });
    return res.status(200).json(reviews);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Could not retrieve reviews by user ID" });
  }
};

// Update a review by ID
const updateReview = async (req, res, next) => {
  const reviewId = req.params.id;
  try {
    const review = await Review.findByPk(reviewId);

    if (!review) {
      return next(new ErrorHandler("Review not found", 404));
    }

    // Assuming you want to allow updating only by the user who created the review
    if (review.user_id !== req.user.id) {
      return next(new ErrorHandler("Unauthorized", 403));
    }

    review.set(req.body);
    const updatedReview = await review.save();

    return res.status(200).json(updatedReview);
  } catch (error) {
    console.error(error);
    return next(error);
  }
};

// Delete a review by ID
const deleteReview = async (req, res, next) => {
  const reviewId = req.params.id;
  try {
    const review = await Review.findByPk(reviewId);

    if (!review) {
      return next(new ErrorHandler("Review not found", 404));
    }

    // Assuming you want to allow deletion only by the user who created the review
    if (review.user_id !== req.user.id) {
      return next(new ErrorHandler("Unauthorized", 403));
    }

    await review.destroy();
    return res.status(204).send();
  } catch (error) {
    console.error(error);
    return next(error);
  }
};

module.exports = {
  createReview,
  getAllReviews,
  getReviewsByUserId,
  updateReview,
  deleteReview,
};
