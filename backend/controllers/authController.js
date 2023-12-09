const User = require("../models/user");
const sendToken = require("../utils/jwtToken");
const { ErrorHandler } = require("../middlewares/errorHandlers");
const UserVerify = require("../models/userVerify");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");

// Register a new user
exports.register = async (req, res, next) => {

  try {
    const { email, password, firstName, lastName, phone } = req.body;

    const user = await User.create({
      email,
      password,
      f_name: firstName,
      l_name: lastName,
      phone,
    });

    sendToken(user, 200, res);
  } catch (error) {
    console.error(error);
    if (error.name === 'SequelizeUniqueConstraintError' && error.fields.email) {
      return res.status(400).json({ error: 'Email is already in use.' });
    }
    return next(error);
  }
};

// Login user
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return next(new ErrorHandler("Email or password xxxxx!!", 404));
    }

    const isPasswordMatched = await user.comparePassword(password);

    if (!isPasswordMatched) {
      return next(new ErrorHandler("Email or password xxxxx!!", 401));
    }

    sendToken(user, 200, res);
    // res.json({ message: 'Login successful', user });
  } catch (error) {
    // Use the error handling middleware to handle the error
    return next(error);
  }
};

// Forgot password  => /api/password/forgot

exports.forgotPassword = async (req, res, next) => {
  console.log("EMAIL", req.body.email)
  if (!req.body.email) {
    return next(new ErrorHandler("Email address is required", 400));
  }
  const user = await User.findOne({ where: { email: req.body.email } });
  console.log("USER", user)
  if (!user) {
    return next(new ErrorHandler("User not found with this email", 404));
    // Get reset token
  }
  const resetToken = user.getResetPasswordToken();
  await user.save();
  // Create reset password url
  const resetUrl = `${process.env.FRONTEND_URL}/password/reset/${resetToken}`;

  const message = `Your password reset token is as follow:\n\n${resetUrl}\n\nIf you have not requested this email, then ignore it.`;
  try {
    await sendEmail({
      email: user.email,
      subject: "RNS BrandName Password Recovery",
      message,
    });
    res.status(200).json({
      success: true,
      message: `Email sent to ${user.email}`,
      forTest: resetUrl
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save({ validateBeforeSave: false });
    return next(new ErrorHandler(error.message, 500));
  }
};

// Reset password  => /api/v1/password/reset/:token

exports.resetPassword = async (req, res, next) => {
  try {
    // Hash URL token
    const resetPasswordToken = crypto
      .createHash('sha256')
      .update(req.params.token)
      .digest('hex');

    const user = await User.findOne({
      where: {
        resetPasswordToken,
      },
    });

    if (!user) {
      return next(new ErrorHandler('Password reset token is invalid or has been expired', 400));
    }

    if (req.body.password !== req.body.confirmPassword) {
      return next(new ErrorHandler('Password does not match', 400));
    }

    user.password = req.body.password;

    user.resetPasswordToken = null;
    user.resetPasswordExpire = null;

    await user.save();
    
    sendToken(user, 200, res);
  } catch (error) {
    next(error);
  }
};

// user profile
exports.getUserProfile = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.user.id);

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    return next(error);
  }
};

// Update / change password => /api/v1/password/update
exports.updatePassword = async (req, res, next) => {
  const user = await User.findById(req.user.id).select("+password");
  // check previous user password
  const isMatched = await user.comparePassword(req.body.oldPassword);
  if (!isMatched) {
    return next(new ErrorHandler("Old password is incorrect", 400));
  }

  user.password = req.body.password;
  await user.save();
  sendToken(user, 200, res);
};
//Update user profile => /api/v1/me/update
exports.updateProfile = async (req, res, next) => {
  const newUserData = { name: req.body.name, email: req.body.email };

  if (req.body.avatar !== "") {
    const user = await User.findById(req.user.id);

    // const image_id = user.avatar.public_id;
    // const removeImg = await cloudinary.v2.uploader.destroy(image_id);
    // console.log(removeImg);

    // const result = await cloudinary.v2.uploader.upload(req.body.avatar, {
    //   folder: "avatars",
    //   width: 150,
    //   crop: "scale",
    // });

    newUserData.avatar = {
      public_id: result.public_id,
      url: result.secure_url,
    };
  }

  //Update avatar
  const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  res.status(200).json({
    success: true,
  });
};
// Logout user => /api/v1/logout
exports.logout = async (req, res, next) => {
  res.cookie("token", null, { expires: new Date(Date.now()), httpOnly: true });
  res.status(200).json({
    success: true,
    message: "Logged out",
  });
};

// Admin Routes

// Get all users   =>   /api/v1/admin/users
exports.allUsers = async (req, res, next) => {
  const users = await User.findAll({
    attributes: {
      exclude: ['password'],
    },
  });

  res.status(200).json({
    success: true,
    users,
  });
};
