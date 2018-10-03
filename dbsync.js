const models = require("./models/index");
const dotenv = require("dotenv");
const result = dotenv.config();

if (result.error) {
  throw result.error;
}

//Create environment and client entries to avoid problems when
// pulling in transactions, accounts and items
models.sequelize
  // //use force:true to destroy data/tables before sync (ok for dev)
  // .sync({ force: true })
  .sync()
  // .then(() => {
  //   return models.Environment.create({
  //     type: process.env.PLAID_ENV,
  //     secret: process.env.PLAID_SECRET
  //   });
  // })
  // .then(() => {
  //   return models.Client.create({
  //     plaid_client_id: process.env.PLAID_CLIENT_ID,
  //     environment_id: 1
  //   });
  // })
  //.then(() => models.sequelize.close())
  .catch(err => console.error(err));
