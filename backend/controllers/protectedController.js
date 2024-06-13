const User = require("../models/User");

exports.getProtectedData = (req, res) => {
  const { username, id } = req.user;
  res.json({ message: "This is protected data", username, id });
};

//  Get all users
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find({}, "username _id createdAt");
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
