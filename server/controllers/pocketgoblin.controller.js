const moment = require("moment");
const { prettyPrintResponse } = require("../helpers");
const models = require("../../models/index");
const client = require("../plaid");
const dotenv = require("dotenv");

const result = dotenv.config();
if (result.error) {
  throw result.error;
}

// TODO: remove: should be passed in from React client once an item's created
// let ACCESS_TOKEN = process.env.ACCESS_TOKEN;

const controller = {
  // ORIGINAL CODE
  // getTransactions: (request, response) => {
  //   console.log("we are in the getTransactions controllers!");
  //   //Check that we receive the user Id in the request
  //   if (!request.query.userId) {
  //     return response.status(404).end("You must provide a user id!");
  //   }

  // Will be called by createItem graphql endpoint
  saveItemData: (accessToken, itemId, userId) => {
    // Pull transactions for the Item for the last 30 days
    let startDate = moment()
      .subtract(30, "days")
      .format("YYYY-MM-DD");
    let endDate = moment().format("YYYY-MM-DD");
    client.getTransactions(
      accessToken,
      startDate,
      endDate,
      {
        count: 250,
        offset: 0
      },
      function(error, transactionsResponse) {
        if (error != null) {
          prettyPrintResponse(error);
        } else {
          //store response in lower char variable for ease-of-use
          const txns = transactionsResponse;
          console.log("Transactions fetched from Plaid API");

          // Create structure and import txns
          models.User.findOne({
            id: userId
          })
            .then(user => {
              return models.Item.create({
                access_token: accessToken,
                plaid_item_id: itemId,
                user_id: user.dataValues.id
              });
            })
            .then(item => {
              var promises = [];
              txns.accounts.forEach(account => {
                promises.push(
                  models.Account.create({
                    name: account.name,
                    type: account.type,
                    subtype: account.subtype,
                    current_balance: account.balances.available
                      ? account.balances.available
                      : account.balances.current,
                    plaid_account_id: account.account_id,
                    item_id: item.dataValues.id
                  })
                );
              });
              return Promise.all(promises);
            })
            .then(() => {
              txns.transactions.forEach(txn => {
                models.Account.findOne({
                  where: { plaid_account_id: txn.account_id },
                  attributes: ["id"]
                }).then(acctId => {
                  models.Transaction.create({
                    name: txn.name,
                    amount: txn.amount,
                    category: txn.category,
                    category_id: txn.category_id,
                    type: txn.transaction_type,
                    post_date: txn.date,
                    plaid_account_id: txn.account_id,
                    plaid_transaction_id: txn.transaction_id,
                    account_id: acctId.dataValues.id
                  });
                });
              });
            })
            .then(() => {
              console.log(
                "New Item successfully created and all data saved to the database"
              );
            })
            .catch(error => console.error(error));
        }
      }
    );
  }
};

module.exports = controller;
