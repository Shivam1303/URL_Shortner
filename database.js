const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("url_shortener", "root", "Helios#22", {
    host: "localhost",
    dialect: "mysql",
});

sequelize
    .authenticate()
    .then(() => {
        console.log("Connection has been established successfully.");
    })
    .catch((err) => {
        console.error("Unable to connect to the database:", err);
    });

const checkSync = () => {
    sequelize.sync().then(() => {
        console.log("Sync successful");
    });
};

module.exports = { sequelize, checkSync };
