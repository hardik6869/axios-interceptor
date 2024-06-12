require("dotenv").config();

module.exports = {
  SECRET_KEY: process.env.SECRET_KEY,
  REFRESH_SECRET_KEY: process.env.REFRESH_SECRET_KEY,
  TOKEN_EXPIRATION: process.env.TOKEN_EXPIRATION,
  REFRESH_TOKEN_EXPIRATION: process.env.REFRESH_TOKEN_EXPIRATION,
  MONGO_URI: process.env.MONGO_URI,
  PORT: process.env.PORT,
  ORIGIN: process.env.ORIGIN,
};
