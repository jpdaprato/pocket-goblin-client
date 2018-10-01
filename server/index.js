const util = require("util");

const express = require("express");
const bodyParser = require("body-parser");
const moment = require("moment");
const plaid = require("plaid");
const dotenv = require("dotenv");

const result = dotenv.config();

if (result.error) {
  throw result.error;
}

const APP_PORT = process.env.APP_PORT;
const PLAID_CLIENT_ID = process.env.PLAID_CLIENT_ID;
const PLAID_SECRET = process.env.PLAID_SECRET;
const PLAID_PUBLIC_KEY = process.env.PLAID_PUBLIC_KEY;
const PLAID_ENV = process.env.PLAID_ENV;

// We store the access_token in memory - in production, store it in a secure
// persistent data store
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

const app = express();
app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());

app.get("/", function (request, response, next) {
  response.render("index.ejs", {
    PLAID_PUBLIC_KEY: PLAID_PUBLIC_KEY,
    PLAID_ENV: PLAID_ENV
  });
});

// Exchange token flow - exchange a Link public_token for
// an API access_token
// https://plaid.com/docs/#exchange-token-flow
app.post("/get_access_token", function (request, response, next) {
  PUBLIC_TOKEN = request.body.public_token;
  client.exchangePublicToken(PUBLIC_TOKEN, function (error, tokenResponse) {
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
app.get("/transactions", function (request, response, next) {
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
    function (error, transactionsResponse) {
      if (error != null) {
        prettyPrintResponse(error);
        return response.json({
          error: error
        });
      } else {
        prettyPrintResponse(transactionsResponse);
        response.json({ error: null, transactions: transactionsResponse });
      }
    }
  );
});

// Retrieve Identity for an Item
// https://plaid.com/docs/#identity
app.get("/identity", function (request, response, next) {
  client.getIdentity(ACCESS_TOKEN, function (error, identityResponse) {
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
app.get("/balance", function (request, response, next) {
  client.getBalance(ACCESS_TOKEN, function (error, balanceResponse) {
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
app.get("/accounts", function (request, response, next) {
  client.getAccounts(ACCESS_TOKEN, function (error, accountsResponse) {
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
app.get("/auth", function (request, response, next) {
  client.getAuth(ACCESS_TOKEN, function (error, authResponse) {
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
app.get("/item", function (request, response, next) {
  // Pull the Item - this includes information about available products,
  // billed products, webhook information, and more.
  client.getItem(ACCESS_TOKEN, function (error, itemResponse) {
    if (error != null) {
      prettyPrintResponse(error);
      return response.json({
        error: error
      });
    }
    // Also pull information about the institution
    client.getInstitutionById(itemResponse.item.institution_id, function (
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

const server = app.listen(APP_PORT, function () {
  console.log("PocketGoblin server listening on port " + APP_PORT);
});

const prettyPrintResponse = response => {
  console.log(util.inspect(response, { colors: true, depth: 4 }));
};

// TODO: Consider removing this function (necessary for development environment) 
app.post("/set_access_token", function (request, response, next) {
  ACCESS_TOKEN = request.body.access_token;
  client.getItem(ACCESS_TOKEN, function (error, itemResponse) {
    response.json({
      item_id: itemResponse.item.item_id,
      error: false
    });
  });
});
