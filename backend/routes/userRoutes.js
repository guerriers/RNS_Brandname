const express = require("express");
const router = express.Router();
const {
  getUserById,
  // Add more controllers as needed for user-related operations
} = require("../controllers/userController");
const { isAuthenticatedUser, authorizeRoles } = require("../middlewares/auth");

router.route("/:id").get(getUserById);
// Add more routes as needed for user-related operations

module.exports = router;
