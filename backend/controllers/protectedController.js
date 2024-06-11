exports.getProtectedData = (req, res) => {
  const username = req.userId; // Access the username from the decoded JWT token
  res.json({ username, data: "This is protected data" });
};
