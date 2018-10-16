const moment = require("moment");
const { prettyPrintResponse } = require("../helpers");
const models = require("../models/index");
const client = require("../plaid");
const dotenv = require("dotenv");

const result = dotenv.config();
if (result.error) {
  throw result.error;
}

const controller = {
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
          // Create structure and import txns
          models.User.findOne({
            where: { id: userId }
          })
            .then(user => {
              return models.Item.findOrCreate({
                where: { user_id: user.dataValues.id },
                defaults: {
                  access_token: accessToken,
                  plaid_item_id: itemId
                }
              });
            })
            .then(item => {
              return Promise.all(
                txns.accounts.map(account => {
                  models.Account.findOrCreate({
                    where: {
                      plaid_account_id: account.account_id,
                      item_id: item[0].dataValues.id
                    },
                    defaults: {
                      name: account.name,
                      type: account.type,
                      subtype: account.subtype,
                      current_balance: account.balances.available
                        ? account.balances.available
                        : account.balances.current
                    }
                  });
                })
              );
            })
            .then(() => {
              txns.transactions.forEach(txn => {
                models.Account.findOne({
                  where: { plaid_account_id: txn.account_id },
                  attributes: ["id"]
                }).then(acctId => {
                  models.Transaction.findOrCreate({
                    where: {
                      plaid_transaction_id: txn.transaction_id
                    },
                    defaults: {
                      name: txn.name,
                      amount: txn.amount,
                      category: txn.category,
                      category_id: txn.category_id,
                      type: txn.transaction_type,
                      post_date: txn.date,
                      plaid_account_id: txn.account_id,
                      account_id: acctId.dataValues.id
                    }
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
