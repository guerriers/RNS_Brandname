const express = require("express");
const router = express.Router();
const {
  getUserById,
  updateUserById,
  addFavorites,
  // Add more controllers as needed for user-related operations
} = require("../controllers/userController");
const { isAuthenticatedUser, authorizeRoles } = require("../middlewares/auth");

router.route("/:id").get(getUserById);
// router.route("/:id").put(updateUserById);
router.route("/:id/update").put(updateUserById);
// router.route("/:id").put(addFavorites);
// router.route("/:id/addFavorites").put(addFavorites);
router.route("/:userId/addFavorites").put(addFavorites);

// Add more routes as needed for user-related operations

module.exports = router;
