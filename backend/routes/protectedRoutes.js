const express = require("express");
const { verifyToken } = require("../middlewares/authMiddleware");
const protectedController = require("../controllers/protectedController");

const router = express.Router();

router.get("/data", verifyToken, protectedController.getProtectedData);

module.exports = router;
