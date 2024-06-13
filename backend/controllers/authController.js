const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const {
  SECRET_KEY,
  REFRESH_SECRET_KEY,
  TOKEN_EXPIRATION,
  REFRESH_TOKEN_EXPIRATION,
} = require("../config/config");
const User = require("../models/User");

// Register a new user
exports.register = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      username,
      password: hashedPassword,
    });

    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

//  Login a user
exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find the user
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generate tokens
    const accessToken = jwt.sign(
      { username: user.username, id: user._id },
      SECRET_KEY,
      { expiresIn: TOKEN_EXPIRATION }
    );
    const refreshToken = jwt.sign(
      { username: user.username, id: user._id },
      REFRESH_SECRET_KEY,
      { expiresIn: REFRESH_TOKEN_EXPIRATION }
    );

    // Save refresh token to database
    user.refreshToken = refreshToken;
    await user.save();

    res.json({ accessToken, refreshToken });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Refresh access token
exports.refreshToken = async (req, res) => {
  try {
    const { token } = req.body;
    if (!token) {
      return res
        .status(401)
        .json({ message: "Request failed with status code 401" });
    }

    // Verify the refresh token
    jwt.verify(token, REFRESH_SECRET_KEY, async (err, decoded) => {
      if (err) {
        return res.status(403).json({ message: "Invalid refresh token" });
      }

      const user = await User.findById(decoded.id);
      if (!user || user.refreshToken !== token) {
        return res.status(403).json({ message: "Invalid refresh token" });
      }

      const newAccessToken = jwt.sign(
        { username: user.username, id: user._id },
        SECRET_KEY,
        { expiresIn: TOKEN_EXPIRATION }
      );

      res.json({ accessToken: newAccessToken });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

//  Logout a user
exports.logout = async (req, res) => {
  try {
    const { userId } = req.body;

    // Remove refresh token from database
    await User.findByIdAndUpdate(userId, { $unset: { refreshToken: "" } });

    res.json({ message: "Logged out successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
