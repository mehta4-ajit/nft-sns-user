const { DataTypes } = require("sequelize");
const sequelize = require("./sequelize"); // adjust path

const ItemNFT = sequelize.define("ItemNFT", {
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
    },
    user_id: DataTypes.INTEGER,
    network_kind: DataTypes.STRING,
    contract_address: DataTypes.STRING,
    token_id: DataTypes.STRING,
    txhash: DataTypes.STRING,
    item_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    metadata_url: DataTypes.STRING,
    ownership_address: DataTypes.STRING,
    ownership_history: DataTypes.TEXT,
    creator_address: DataTypes.STRING,
    status: { type: DataTypes.INTEGER, defaultValue: 0 },
    status_message: DataTypes.STRING,
}, {
    tableName: "item_nft",
    timestamps: true,
    createdAt: "createdat",
    updatedAt: "updatedat",
});


module.exports = ItemNFT;
