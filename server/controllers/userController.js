const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Register a new user
const registrationController = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Check if the user already exists
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user instance
    user = new User({
      name,
      email,
      password: hashedPassword,
      role,
    });

    await user.save();

    // Return user info without password in response
    const { password: userPassword, ...userWithoutPassword } = user._doc;
    res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: userWithoutPassword,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Registration failed",
    });
  }
};

// Login Controller
const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: process.env.JWT_EXPIRES,
    });

    const userToSend = {
      email: user.email,
      name: user.name,
      role: user.role,
    };

    res.status(200).json({
      success: true,
      message: "Login successful",
      user: userToSend,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Login failed",
    });
  }
};

// Logout user
const logoutController = async (req, res) => {
  const token = req.headers.authorization;

  if (token) {
    res.status(200).json({
      success: true,
      message: "Logout successful",
    });
  } else {
    res.status(401).json({
      success: false,
      message: "Token not provided. Unauthorized.",
    });
  }
};

module.exports = {
  registrationController,
  loginController,
  logoutController,
};
