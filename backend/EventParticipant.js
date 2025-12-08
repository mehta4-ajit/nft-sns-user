const { DataTypes } = require("sequelize");
const sequelize = require("./sequelize");

const EventParticipant = sequelize.define("EventParticipant", {
  id: {
    type: DataTypes.BIGINT.UNSIGNED,
    primaryKey: true,
    autoIncrement: true,
  },
  event_id: {
    type: DataTypes.BIGINT.UNSIGNED,
    allowNull: false,
  },
  user_id: {
    type: DataTypes.BIGINT.UNSIGNED,
    allowNull: false,
  },
  item_id: {
    type: DataTypes.BIGINT.UNSIGNED,
    allowNull: false,
  },
  nft_title: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  nft_thumbnail: {
    type: DataTypes.STRING(500),
    allowNull: true,
  },
  nft_creator: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: "event_participants",
  timestamps: false,
});

module.exports = EventParticipant;
