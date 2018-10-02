const Sequelize = require("sequelize");

const sequelize = new Sequelize("pocketgoblin", "charlieastrada", "", {
  dialect: "postgres"
});

const models = {
  Account: sequelize.import("./account"),
  Client: sequelize.import("./client"),
  Environment: sequelize.import("./environment"),
  Item: sequelize.import("./item"),
  Transaction: sequelize.import("./transaction")
};

Object.keys(models).forEach(model => {
  if ("associate" in models[model]) {
    models[model].associate(models);
  }
});

models.sequelize = sequelize;
models.Sequelize = Sequelize;

module.exports = models;
