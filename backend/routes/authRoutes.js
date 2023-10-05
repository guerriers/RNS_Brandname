const express = require("express");
const { register, login, me } = require("../controllers/authController");
const { isAuthenticatedUser } = require("../middlewares/auth");

const router = express.Router();

// Register a new user
router.route("/register").post(register);

// Login user
router.route("/login").post(login);

router.route("/me").get(isAuthenticatedUser, me);

module.exports = router;
