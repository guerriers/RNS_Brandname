const User = require("../models/user");
const sendToken = require("../utils/jwtToken");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");

// Register a new user
exports.register = catchAsyncErrors(async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.create({ email, password });

    sendToken(user, 200, res);
    // res.json({ message: 'User registered successfully', user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// Login user
exports.login = catchAsyncErrors(async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ message: "Email or password xxxxx!!" });
    }

    if (user.password !== password) {
      return res.status(401).json({ message: "Email or password xxxxx!!" });
    }

    sendToken(user, 200, res);
    // res.json({ message: 'Login successful', user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// user profile
exports.me = catchAsyncErrors(async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id);
    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

