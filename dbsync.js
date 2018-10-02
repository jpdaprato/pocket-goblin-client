const models = require("./models/index");

models.sequelize.sync({ force: true }).then(() => {
  console.log("sync complete");
});
