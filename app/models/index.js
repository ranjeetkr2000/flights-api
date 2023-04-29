const { DATABASE } = require("../../config/config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(DATABASE);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.flights = require("./flights.model.js")(sequelize, Sequelize);

module.exports = db;