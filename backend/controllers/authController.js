const User = require("../models/user");
const sendToken = require("../utils/jwtToken");
const { ErrorHandler } = require("../middlewares/errorHandlers");
const UserVerify = require("../models/userVerify");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");
const Review = require("../models/reviews");
const {
  uploadImagesToAzure,
  deleteImagesFromAzure,
} = require("../utils/azureUpload");

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
    if (error.name === "SequelizeUniqueConstraintError" && error.fields.email) {
      return res.status(400).json({ error: "Email is already in use." });
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
  console.log("EMAIL", req.body.email);
  if (!req.body.email) {
    return next(new ErrorHandler("Email address is required", 400));
  }
  const user = await User.findOne({ where: { email: req.body.email } });
  console.log("USER", user);
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
      forTest: resetUrl,
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
      .createHash("sha256")
      .update(req.params.token)
      .digest("hex");

    const user = await User.findOne({
      where: {
        resetPasswordToken,
      },
    });

    if (!user) {
      return next(
        new ErrorHandler(
          "Password reset token is invalid or has been expired",
          400
        )
      );
    }

    if (req.body.password !== req.body.confirmPassword) {
      return next(new ErrorHandler("Password does not match", 400));
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

// Send review invitation => /api/auth/sendreviewinvite
exports.sendReviewInvitation = async (req, res, next) => {
  try {
    // Retrieve necessary data from request body
    const { userEmail } = req.body;

    // Ensure that the user's email is available in the request body
    if (!userEmail) {
      return res.status(400).json({
        success: false,
        message: "User email not provided in the request body",
      });
    }

    // Generate a review token using the existing function in reviews.js
    const reviewToken = await Review.generateReviewToken();

    // Example review link
    const reviewLink = `${process.env.FRONTEND_URL}/review/${reviewToken}`;

    // Example email content
    const emailSubject = "Invitation to Write a Review";
    const emailMessage = `Hello,\n\nWe invite you to write a review. Click the following link to submit your review: ${reviewLink}\n\nThank you!`;

    // Send email
    await sendEmail({
      email: userEmail,
      subject: emailSubject,
      message: emailMessage,
    });

    // Respond to the client
    res.status(200).json({
      success: true,
      message: `Review invitation sent to ${userEmail}`,
    });
  } catch (error) {
    // Handle errors
    console.error(error);
    return next(new ErrorHandler("Failed to send review invitation", 500));
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

//Update user profile => /api/auth/me/update
exports.updateProfile = async (req, res, next) => {
  const userId = req.user.id;

  try {
    const user = await User.findByPk(userId);
    if (!user) {
      return next(new ErrorHandler("User not found", 404));
    }

    if (req.files && req.files.profile_img) {
      let images = Array.isArray(req.files.profile_img)
        ? req.files.profile_img
        : [req.files.profile_img].filter(Boolean);

        if (Array.isArray(user.profile_img) && user.profile_img.length > 0) {
        await Promise.all(
          user.profile_img.map(async (image) => {
            try {
              if (image.public_id !== "noimg" || image.url !== "noimg") {
                await deleteImagesFromAzure(image.public_id);
              }
            } catch (error) {
              console.error(
                `Error deleting image ${image.public_id}: ${error.message}`
              );
            }
          })
        );
      }

      const imagesLinks = await uploadImagesToAzure(images, "profile_img");
      req.body.profile_img = imagesLinks;
    }

    //Update avatar
    req.body.user_id = req.user.id;
    user.set(req.body);
    await user.save();

    res.status(200).json({
      success: true,
    });
  } catch (error) {
    console.error(error);
    return next(error);
  }
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
      exclude: ["password"],
    },
  });

  res.status(200).json({
    success: true,
    users,
  });
};
