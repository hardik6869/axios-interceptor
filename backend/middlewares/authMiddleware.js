const jwt = require("jsonwebtoken");
const SECRET_KEY = "your_jwt_secret_key";

exports.verifyToken = (req, res, next) => {
  const token = req.headers["authorization"];

  if (!token) {
    return res.status(403).json({ message: "No token provided" });
  }

  const tokenPart = token.split(" ")[1];

  jwt.verify(tokenPart, SECRET_KEY, (err, decoded) => {
    if (err) {
      console.error("Token verification error:", err); // Log the error for debugging
      return res.status(500).json({ message: "Failed to authenticate token" });
    }

    req.userId = decoded.username;
    next();
  });
};
