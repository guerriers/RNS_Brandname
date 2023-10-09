const express = require("express");
const { register, login, me, logout } = require("../controllers/authController");
const { isAuthenticatedUser } = require("../middlewares/auth");

const router = express.Router();

// Register a new user
router.route("/register").post(register);

// Login user
router.route("/login").post(login);

router.route("/me").get(isAuthenticatedUser, me);

// Logout route
router.route("/logout").post(logout);

module.exports = router;
