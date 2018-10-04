//In order to get views support with model sync, we use this library
const Sequelize = require("sequelize-views-support");
// const Sequelize = require("sequelize");

//FIXME:Move these things into environmental variables
const dbName = process.env.DATABASE_NAME || "pocketgoblin";
const dbUser = process.env.DATABASE_USER || "charlieastrada";
const dbPassword = process.env.DATABASE_PASSWORD || "";
const dbHost = process.env.HOST || "localhost";

const sequelize = new Sequelize(dbName, dbUser, dbPassword, {
  dialect: "postgres",
  host: dbHost
});

const models = {
  Account: sequelize.import("./account"),
  Client: sequelize.import("./client"),
  Environment: sequelize.import("./environment"),
  Item: sequelize.import("./item"),
  Transaction: sequelize.import("./transaction"),
  Snapshot: sequelize.import("./snapshot"),
  Cashflow: sequelize.import("./cashflow"),
  TopSpending: sequelize.import("./topSpending")
};

Object.keys(models).forEach(model => {
  if ("associate" in models[model]) {
    models[model].associate(models);
  }
});

models.sequelize = sequelize;
models.Sequelize = Sequelize;

module.exports = models;
