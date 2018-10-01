const util = require("util");

const express = require("express");
const bodyParser = require("body-parser");
const moment = require("moment");
const plaid = require("plaid");
const dotenv = require("dotenv");
const graphqlHTTP = require('express-graphql');
const { buildSchema } = require('graphql');

const result = dotenv.config();

if (result.error) {
  throw result.error;
}

//data models
const models = require("../models/index");

//variables
const APP_PORT = process.env.APP_PORT;
const PLAID_CLIENT_ID = process.env.PLAID_CLIENT_ID;
const PLAID_SECRET = process.env.PLAID_SECRET;
const PLAID_PUBLIC_KEY = process.env.PLAID_PUBLIC_KEY;
const PLAID_ENV = process.env.PLAID_ENV;

// We store the access_token in memory - in production, store it in a secure
// persistent data store
//FIXME:Do we need to pass in env variables for access_toen and item_id?
let ACCESS_TOKEN = process.env.ACCESS_TOKEN;
let PUBLIC_TOKEN = null;
let ITEM_ID = process.env.ITEM_ID;

// Initialize the Plaid client
// Find your API keys in the Dashboard (https://dashboard.plaid.com/account/keys)
const client = new plaid.Client(
  PLAID_CLIENT_ID,
  PLAID_SECRET,
  PLAID_PUBLIC_KEY,
  plaid.environments[PLAID_ENV],
  { version: "2018-05-22" }
);

// Construct a schema, using GraphQL schema language
let schema = buildSchema(`
  type Query {
    hello: String
  }
`);

// The root provides a resolver function for each API endpoint
let root = {
  hello: () => {
    return 'Hello world!';
  },
};

const app = express();
app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));

app.get("/", function(request, response, next) {
  response.render("index.ejs", {
    PLAID_PUBLIC_KEY: PLAID_PUBLIC_KEY,
    PLAID_ENV: PLAID_ENV
  });
});

//PocketGoblin Queries
app.get("/api/cashflow/", (request, response) => {
  models.Cashflow.findAll({
    attributes: ["client_id", "account_type", "year", "month", "sum"],
    where: {
      $and: [
        {
          client_id: {
            $ne: null
          }
        },
        {
          account_type: {
            $ne: null
          }
        }
      ]
    }
  })
    .then(cashflow => response.json(cashflow))
    .catch(error => console.error(error));
});

app.get("/api/snapshot", (request, response) => {
  models.Snapshot.findAll({
    attributes: ["client_id", "total_debt", "total_savings"]
  })
    .then(snapshot => response.json(snapshot))
    .catch(error => console.error(error));
});

app.get("/api/topspending", (request, response) => {
  models.TopSpending.findAll({
    attributes: ["client_id", "category", "sum"],
    where: {
      $and: [
        {
          client_id: {
            $ne: null
          }
        },
        {
          category: {
            $ne: null
          }
        }
      ]
    }
  })
    .then(spending => response.json(spending))
    .catch(error => console.error(error));
});

//PLAID
// Exchange token flow - exchange a Link public_token for
// an API access_token
// https://plaid.com/docs/#exchange-token-flow
app.post("/get_access_token", function(request, response, next) {
  PUBLIC_TOKEN = request.body.public_token;
  client.exchangePublicToken(PUBLIC_TOKEN, function(error, tokenResponse) {
    if (error != null) {
      prettyPrintResponse(error);
      return response.json({
        error: error
      });
    }
    ACCESS_TOKEN = tokenResponse.access_token;
    ITEM_ID = tokenResponse.item_id;
    prettyPrintResponse(tokenResponse);
    response.json({
      access_token: ACCESS_TOKEN,
      item_id: ITEM_ID,
      error: null
    });
  });
});

// Retrieve Transactions for an Item
// https://plaid.com/docs/#transactions
app.get("/transactions", function(request, response, next) {
  // Pull transactions for the Item for the last 30 days
  let startDate = moment()
    .subtract(30, "days")
    .format("YYYY-MM-DD");
  let endDate = moment().format("YYYY-MM-DD");
  client.getTransactions(
    ACCESS_TOKEN,
    startDate,
    endDate,
    {
      count: 250,
      offset: 0
    },
    function(error, transactionsResponse) {
      if (error != null) {
        prettyPrintResponse(error);
        return response.json({
          error: error
        });
      } else {
        //store response in lower char variable for ease-of-use
        const txns = transactionsResponse;

        //Create structure and import txns
        models.Environment.create({
          type: process.env.PLAID_ENV,
          secret: process.env.PLAID_SECRET
        })
          .then(environment => {
            return models.Client.create({
              plaid_client_id: process.env.PLAID_CLIENT_ID,
              environment_id: environment.dataValues.id
            });
          })
          .then(client => {
            return models.Item.create({
              access_token: process.env.ACCESS_TOKEN,
              plaid_account_id: process.env.PLAID_CLIENT_ID,
              plaid_item_id: txns.item.item_id,
              client_id: client.dataValues.id
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
            prettyPrintResponse(transactionsResponse);
            response.json({ error: null, transactions: transactionsResponse });
          })
          .catch(error => console.error(error));
      }
    }
  );
});

// Retrieve Identity for an Item
// https://plaid.com/docs/#identity
app.get("/identity", function(request, response, next) {
  client.getIdentity(ACCESS_TOKEN, function(error, identityResponse) {
    if (error != null) {
      prettyPrintResponse(error);
      return response.json({
        error: error
      });
    }
    prettyPrintResponse(identityResponse);
    response.json({ error: null, identity: identityResponse });
  });
});

// Retrieve real-time Balances for each of an Item's accounts
// https://plaid.com/docs/#balance
app.get("/balance", function(request, response, next) {
  client.getBalance(ACCESS_TOKEN, function(error, balanceResponse) {
    if (error != null) {
      prettyPrintResponse(error);
      return response.json({
        error: error
      });
    }
    prettyPrintResponse(balanceResponse);
    response.json({ error: null, balance: balanceResponse });
  });
});

// Retrieve an Item's accounts
// https://plaid.com/docs/#accounts
app.get("/accounts", function(request, response, next) {
  client.getAccounts(ACCESS_TOKEN, function(error, accountsResponse) {
    if (error != null) {
      prettyPrintResponse(error);
      return response.json({
        error: error
      });
    }
    prettyPrintResponse(accountsResponse);
    response.json({ error: null, accounts: accountsResponse });
  });
});

// Retrieve ACH or ETF Auth data for an Item's accounts
// https://plaid.com/docs/#auth
app.get("/auth", function(request, response, next) {
  client.getAuth(ACCESS_TOKEN, function(error, authResponse) {
    if (error != null) {
      prettyPrintResponse(error);
      return response.json({
        error: error
      });
    }
    prettyPrintResponse(authResponse);
    response.json({ error: null, auth: authResponse });
  });
});

// Retrieve information about an Item
// https://plaid.com/docs/#retrieve-item
app.get("/item", function(request, response, next) {
  // Pull the Item - this includes information about available products,
  // billed products, webhook information, and more.
  client.getItem(ACCESS_TOKEN, function(error, itemResponse) {
    if (error != null) {
      prettyPrintResponse(error);
      return response.json({
        error: error
      });
    }
    // Also pull information about the institution
    client.getInstitutionById(itemResponse.item.institution_id, function(
      err,
      instRes
    ) {
      if (err != null) {
        const msg =
          "Unable to pull institution information from the Plaid API.";
        console.log(msg + "\n" + JSON.stringify(error));
        return response.json({
          error: msg
        });
      } else {
        prettyPrintResponse(itemResponse);
        response.json({
          item: itemResponse.item,
          institution: instRes.institution
        });
      }
    });
  });
});

const server = app.listen(APP_PORT, function() {
  console.log("PocketGoblin server listening on port " + APP_PORT);
});

const prettyPrintResponse = response => {
  console.log(util.inspect(response, { colors: true, depth: 4 }));
};

// TODO: Consider removing this function (necessary for development environment)
app.post("/set_access_token", function(request, response, next) {
  ACCESS_TOKEN = request.body.access_token;
  client.getItem(ACCESS_TOKEN, function(error, itemResponse) {
    response.json({
      item_id: itemResponse.item.item_id,
      error: false
    });
  });
});
