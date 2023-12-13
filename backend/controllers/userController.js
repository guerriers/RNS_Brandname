const User = require("../models/user");
const { ErrorHandler } = require("../middlewares/errorHandlers");

// Get user by ID
const getUserById = async (req, res, next) => {
  const userId = req.params.id;

  try {
    const user = await User.findByPk(userId, {
      attributes: ["f_name", "l_name", "email", "phone", "profile_img"],
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.status(200).json(user);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Could not retrieve the user" });
  }
};

// Add more controllers as needed for user-related operations

module.exports = {
  getUserById,
  // Add more exported controllers as needed
};