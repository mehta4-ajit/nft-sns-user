const Item = require("./Item");
const ItemNFT = require("./ItemNFT");
const User = require("./User");
const EventParticipant = require("./EventParticipant");

// 1 Item → 1 NFT
Item.hasOne(ItemNFT, {
  foreignKey: "item_id",
  as: "nftData",
});

ItemNFT.belongsTo(Item, {
  foreignKey: "item_id",
  as: "item",
});

// 1 User → Many Items
User.hasMany(Item, {
  foreignKey: "user_id",
  as: "items",
});

Item.belongsTo(User, {
  foreignKey: "user_id",
  as: "user",
});

// ✅ Event Participation Relations
EventParticipant.belongsTo(Item, {
  foreignKey: "item_id",
  as: "nft",
});

Item.hasMany(EventParticipant, {
  foreignKey: "item_id",
  as: "participants",
});

EventParticipant.belongsTo(User, {
  foreignKey: "user_id",
  as: "user",
});

module.exports = { Item, ItemNFT, User, EventParticipant };
