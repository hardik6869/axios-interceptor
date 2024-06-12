exports.getProtectedData = (req, res) => {
  const { username } = req.user;
  res.json({ message: "This is protected data", username });
};
