const express = require("express");
const router = express.Router();
const {
  getUserById,
  updateUserById,
  // Add more controllers as needed for user-related operations
} = require("../controllers/userController");
const { isAuthenticatedUser, authorizeRoles } = require("../middlewares/auth");

router.route("/:id").get(getUserById);
router.route("/:id").put(updateUserById);
// Add more routes as needed for user-related operations

module.exports = router;