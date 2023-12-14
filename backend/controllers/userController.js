const User = require("../models/user");
const { ErrorHandler } = require("../middlewares/errorHandlers");

// Get user by ID
const getUserById = async (req, res, next) => {
  const userId = req.params.id;

  try {
    const user = await User.findByPk(userId, {
      attributes: ["f_name", "l_name", "email", "phone", "profile_img", "createdAt"],
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

// Update user by ID
const updateUserById = async (req, res, next) => {
  const userId = req.params.id;

  try {
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Log the current state of the user before the update
    console.log('Current user state:', user.toJSON());

    // Update user properties based on the request body
    user.f_name = req.body.f_name || user.f_name;
    user.l_name = req.body.l_name || user.l_name;
    user.email = req.body.email || user.email;
    user.phone = req.body.phone || user.phone;
    // Add more properties as needed

    // Save the updated user
    await user.save();

    // Log the updated user state
    console.log('User updated successfully. Updated user state:', user.toJSON());

    return res.status(200).json({ message: "User updated successfully", user });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Could not update the user" });
  }
};

// Add more controllers as needed for user-related operations

module.exports = {
  getUserById,
  updateUserById,
  // Add more exported controllers as needed
};