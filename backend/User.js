// User.js
const { DataTypes } = require("sequelize");
const sequelize = require("./sequelize");

const User = sequelize.define("User", {
  full_name: { type: DataTypes.STRING },
  email: { type: DataTypes.STRING, unique: true },
  password: { type: DataTypes.STRING },
  wallet_address: { type: DataTypes.STRING, unique: true },
  role: { type: DataTypes.STRING, defaultValue: "User" },
  bio: { type: DataTypes.TEXT },
  twitter: { type: DataTypes.STRING },
  instagram: { type: DataTypes.STRING },
  website: { type: DataTypes.STRING },
});

module.exports = User;
