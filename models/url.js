const { DataTypes } = require("sequelize");
const { sequelize } = require("../database");

const Url = sequelize.define(
    "Url",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        originalUrl: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        shortUrl: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        createdAt: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
        // Optional: expire URLs after 30 days
        expiresAt: {
            type: DataTypes.DATE,
            // defaultValue: sequelize.literal("CURRENT_TIMESTAMP + INTERVAL 30 DAY"),
        },
    },
    {
        timestamps: false,
    }
);

module.exports = Url;
