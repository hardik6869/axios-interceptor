const express = require("express");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/authRoutes");
const protectedRoutes = require("./routes/protectedRoutes");

const cors = require("cors"); // Import CORS middleware
require("dotenv").config();
const app = express();

// Use CORS middleware
app.use(cors({ credentials: true, origin: process.env.ORIGIN }));

app.use(bodyParser.json());
app.use(express.json());
app.use("/auth", authRoutes);
app.use("/protected", protectedRoutes);

app.listen(process.env.PORT, () => {
  console.log(
    `Server is running on http://localhost:${process.env.PORT || 5000}`
  );
});
