const models = require("./models/index");
const dotenv = require("dotenv");
const result = dotenv.config();

if (result.error) {
  throw result.error;
}

//Sync models to create schema in DB
models.sequelize
  // //use force:true to destroy data/tables before sync (ok for dev)
  .sync({ force: true })
  .catch(err => console.error(err));
