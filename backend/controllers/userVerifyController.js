const UserVerify = require("../models/userVerify");
const User = require("../models/user");
const { ErrorHandler } = require("../middlewares/errorHandlers");
const { uploadImagesToAzure,deleteImagesFromAzure } = require('../utils/azureUpload');
const Product = require("../models/products.js");

// Add a new user verification entry
const createUserVerify = async (req, res) => {
  // console.log("Request Body:", req.body.idCard_img);
  try {
    let result = Array.isArray(req.files.idCard_img) ? req.files.idCard_img : [req.files.idCard_img].filter(Boolean);
    let result2 = Array.isArray(req.files.bank_img) ? req.files.bank_img : [req.files.bank_img].filter(Boolean);
    const idCard = await uploadImagesToAzure(result, 'idCard_img');
    const bankImg = await uploadImagesToAzure(result2, 'bank_img');

    req.body.idCard_img = idCard;
    req.body.bank_img = bankImg;
    req.body.user_id = req.user.id;
    req.body.verify_status = "submitted";

    const newUserVerify = await UserVerify.create(req.body);
    return res.status(201).json(newUserVerify);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({
        error: "Could not add user verification",
        details: error.message,
      });
  }
};


// Get all user verification entries
const getAllUserVerify = async (req, res) => {
  // console.log(req)
  try {
    const userVerifications = await UserVerify.findAll();
    return res.status(200).json(userVerifications);
  } catch (error) {
    console.error(error);
    return next(new ErrorHandler("Could not retrieve user verifications", 500));
  }
};

// Get user verification status by user_id
const getUserVerificationStatus = async (req, res) => {
  const userId = req.params.id; // Assuming you're passing the user_id as a route parameter

  try {
    const userVerification = await UserVerify.findOne({
      where: {
        user_id: userId,
      },
      attributes: ['verify_status'], // Only retrieve the verify_status field
    });

    if (!userVerification) {
      return res.status(404).json({ error: "User verification not found" });
    }

    return res.status(200).json({ verify_status: userVerification.verify_status });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Could not retrieve user verification status" });
  }
};

// Get a user verification entry by Token
const getUserVerifyByToken = async (req, res) => {

  try {
    const userVerification = await UserVerify.findOne(
      { where: { user_id: req.user.id } },
    );

    if (!userVerification) {
      return res.status(404).json({ error: "User verification not found" });
    }

    return res.status(200).json(userVerification);
  } catch (error) {
    // console.error(error);
    return res
      .status(500)
      .json({ error: "Could not retrieve the user verification" });
  }
};

// Update a user verification entry by ID
const updateUserVerify = async (req, res) => {
  const userVerificationId = req.params.id;

  try {
    const userVerification = await UserVerify.findByPk(userVerificationId);

    if (!userVerification) {
      return res.status(404).json({ error: "User verification not found" });
    }

    // Update user verification fields here
    userVerification.idCard_img = req.body.idCard_img;
    userVerification.bank_img = req.body.bank_img;
    userVerification.user_id = req.body.user_id;

    await userVerification.save();

    return res
      .status(200)
      .json({ message: "User verification updated successfully" });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: "Could not update the user verification" });
  }
};

// Delete a user verification entry by ID
const deleteUserVerify = async (req, res) => {
  const userId = req.params.id;

  try {
    // Get all products of the user
    const userProducts = await Product.findAll({
      where: {
        user_id: userId,
      },
    });

    // If no products found, return a message
    if (userProducts.length > 0) {
      // Loop through each userProduct and delete it
      for (let userProduct of userProducts) {
        for (let i = 0; i < userProduct.p_img.length; i++) {
          await deleteImagesFromAzure(userProduct.p_img[i].public_id);
        }

        if (userProduct.p_receipt) {
          for (let i = 0; i < userProduct.p_receipt.length; i++) {
            await deleteImagesFromAzure(userProduct.p_receipt[i].public_id);
          }
        }

        await userProduct.destroy({ where: { id: userProduct.id } });
      }

      console.log(`All products of user ID ${userId} deleted successfully.`);
    }

    // Delete the user verification entry
    const deletedRowCount = await UserVerify.destroy({
      where: {
        user_id: userId,
      },
    });

    if (deletedRowCount === 0) {
      return res.status(404).json({ error: "User verification not found" });
    }

    console.log(`User verification ID ${userId} deleted successfully.`);
    return res.status(204).send();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Could not delete the user verification" });
  }
};


//Admin
// Admin Update a user verification entry by ID
const adminUpdateUserVerify = async (req, res) => {
  const userVerificationId = parseInt(req.params.id);
  console.log("Admin Update User Verification", userVerificationId);

  try {
    const userVerification = await UserVerify.findOne({
      where: {
        user_id: userVerificationId
      }
    });

    if (!userVerification) {
      return res.status(404).json({ error: "User verification not found" });
    }

    // Update only the verify_status field
    userVerification.verify_status = await req.body.verify_status;

    // Save the updated record
     userVerification.save();

    return res.status(201).json({ message: "User verification updated successfully" });
  } catch (error) {
    console.error(error);

    // Handle Sequelize validation errors
    if (error.name === 'SequelizeValidationError') {
      return res.status(400).json({ error: error.message });
    }

    return res.status(500).json({ error: "Could not update the user verification" });
  }
};


// Get a user verification entry by Id
const getUserVerifyById = async (req, res) => {
  const userId = req.params.id;
  try {
    const userVerification = await UserVerify.findOne({
      where: { user_id: userId },
      include: [User],
    });

    if (!userVerification) {
      return res.status(404).json({ error: "User verification not found" });
    }

    return res.status(200).json(userVerification);
  } catch (error) {
    // console.error(error);
    return res
      .status(500)
      .json({ error: "Could not retrieve the user verification" });
  }
};

module.exports = {
  createUserVerify,
  getAllUserVerify,
  getUserVerifyByToken,
  updateUserVerify,
  deleteUserVerify,
  adminUpdateUserVerify,
  getUserVerifyById,
  getUserVerificationStatus,
};