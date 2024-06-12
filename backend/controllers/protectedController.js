exports.getProtectedData = (req, res) => {
  const { username, id } = req.user;
  res.json({ message: "This is protected data", username, id });
};
