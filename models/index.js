const Sequelize = require("sequelize");

const sequelize = new Sequelize("pocketgoblin", "postgres", "postgres");

const models = {
  user: sequelize.import("./users")
};

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

models.sequelize = sequelize;
models.Sequelize = Sequelize;

module.exports = models;
