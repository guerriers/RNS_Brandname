const User = require('../models/user');

// Register a new user
const register = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.create({ email, password });

    res.json({ message: 'User registered successfully', user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Login user
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ message: 'Email or password xxxxx!!' });
    }

    if (user.password !== password) {
      return res.status(401).json({ message: 'Email or password xxxxx!!' });
    }

    res.json({ message: 'Login successful', user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { register, login };