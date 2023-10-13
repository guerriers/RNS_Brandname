const UserVerify = require("../models/userVerify");

// Add a new user verification entry
const createUserVerify = async (req, res) => {
  try {
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
  try {
    const userVerifications = await UserVerify.findAll();
    return res.status(200).json(userVerifications);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: "Could not retrieve user verifications" });
  }
};

// Get a user verification entry by ID
const getUserVerifyById = async (req, res) => {
  const userVerificationId = req.params.id;

  try {
    const userVerification = await UserVerify.findByPk(userVerificationId);

    if (!userVerification) {
      return res.status(404).json({ error: "User verification not found" });
    }

    return res.status(200).json(userVerification);
  } catch (error) {
    console.error(error);
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
    userVerification.verify_status = req.body.verify_status;
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
  const userVerificationId = req.params.id;

  try {
    const deletedRowCount = await UserVerify.destroy({
      where: { id: userVerificationId },
    });

    if (deletedRowCount === 0) {
      return res.status(404).json({ error: "User verification not found" });
    }

    console.log(
      `User verification ID ${userVerificationId} deleted successfully.`
    );
    return res.status(204).send();
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: "Could not delete the user verification" });
  }
};

module.exports = {
  createUserVerify,
  getAllUserVerify,
  getUserVerifyById,
  updateUserVerify,
  deleteUserVerify,
};
