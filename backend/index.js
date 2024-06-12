const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/authRoutes");
const protectedRoutes = require("./routes/protectedRoutes");

const cors = require("cors");
const app = express();
const { MONGO_URI, PORT, ORIGIN } = require("./config/config");

// CORS middleware
app.use(cors({ credentials: true, origin: ORIGIN }));

app.use(bodyParser.json());
app.use(express.json());
app.use("/auth", authRoutes);
app.use("/protected", protectedRoutes);

// Database connection
mongoose
  .connect(MONGO_URI)
  .then(() => {
    app.listen(PORT || 5000);
    console.log("Database is Connected! Listening to localhost 5000.");
  })
  .catch((error) => console.error("MongoDB connection error:", error));
