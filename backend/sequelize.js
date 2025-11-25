// sequelize.js
const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("nftsns", "nftsns02", "NN9CNXJ3", {
  host: "151.106.113.26",
  port: 55681,
  dialect: "mysql",
  logging: false,
});

module.exports = sequelize;
