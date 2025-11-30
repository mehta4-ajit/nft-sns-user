const { DataTypes } = require("sequelize");
const sequelize = require("./sequelize");
const User = require("./User");

const UserWallet = sequelize.define("UserWallet", {
  address: { type: DataTypes.STRING, allowNull: false },
  is_active: { type: DataTypes.BOOLEAN, defaultValue: false },
  balance: {
  type: DataTypes.DECIMAL(18, 8),
  defaultValue: 0,
}
}, {
  tableName: "user_wallets",
  timestamps: true,
});

// Associations
User.hasMany(UserWallet, { foreignKey: "user_id", onDelete: "CASCADE" });
UserWallet.belongsTo(User, { foreignKey: "user_id" });

module.exports = UserWallet;
