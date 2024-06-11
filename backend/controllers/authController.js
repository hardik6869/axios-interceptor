const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const users = [
  {
    username: "hardik",
    password: "Hardik@123",
  },
  {
    username: "admin",
    password: "admin@123",
  },
]; // This should be replaced with a database in a real application

const SECRET_KEY = "your_jwt_secret_key";
const REFRESH_SECRET_KEY = "your_refresh_jwt_secret_key";

exports.login = (req, res) => {
  const { username, password } = req.body;
  const user = users.find((u) => u.username === username);

  if (!user) {
    return res.status(400).json({ message: "User not found" });
  }

  const isPasswordValid = bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(400).json({ message: "Invalid password" });
  }

  const accessToken = jwt.sign({ username: user.username }, SECRET_KEY, {
    expiresIn: "15m",
  });
  const refreshToken = jwt.sign(
    { username: user.username },
    REFRESH_SECRET_KEY,
    { expiresIn: "7d" }
  );

  res.json({ accessToken, refreshToken });
};

exports.register = (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 8);

  users.push({ username, password: hashedPassword });

  res.status(201).json({ message: "User registered successfully" });
};

exports.refreshToken = (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(400).json({ message: "Refresh token is required" });
  }

  jwt.verify(refreshToken, REFRESH_SECRET_KEY, (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Invalid refresh token" });
    }

    const newAccessToken = jwt.sign({ username: user.username }, SECRET_KEY, {
      expiresIn: "15m",
    });

    res.json({ accessToken: newAccessToken });
  });
};
