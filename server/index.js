const express = require("express");
const bodyParser = require("body-parser");
const moment = require("moment");
const dotenv = require("dotenv");
const graphqlHTTP = require("express-graphql");
const { buildSchema } = require("graphql");
const cors = require("cors");
const request = require("request");
const models = require("../models/index");
const prettyPrintResponse = require("./helpers");
const client = require("./plaid"); //Plaid Client
const appRoutes = require("./routes/pocketgoblin.routes.js");

const result = dotenv.config();
if (result.error) {
  throw result.error;
}

const APP_PORT = process.env.APP_PORT;
const PLAID_CLIENT_ID = process.env.PLAID_CLIENT_ID;
const PLAID_SECRET = process.env.PLAID_SECRET;
const PLAID_PUBLIC_KEY = process.env.PLAID_PUBLIC_KEY;
const PLAID_ENV = process.env.PLAID_ENV;
const AUTH0_API_TOKEN = process.env.AUTH0_API_TOKEN;

// PLAID API
// We store the access_token in memory - in production, store it in a secure
// persistent data store
let ACCESS_TOKEN = null;
let PUBLIC_TOKEN = null;
let ITEM_ID = null;

// GRAPHQL API
// Construct a schema, using GraphQL schema language
let schema = buildSchema(`
  type Query {
    getUserInfo(userId: String!): String
    createItem(publicToken: String!): String
    transactions: String
    cashFlow: Float
    totalDebt: Float
    totalSavings: Float
  }
`);

// RESOLVER FUNCTIONS
const asyncGetUserInfo = userId => {
  return new Promise((resolve, reject) => {
    var options = {
      method: "GET",
      url: `https://pocketgoblin.auth0.com/api/v2/users/${userId}`,
      headers: {
        authorization: `${AUTH0_API_TOKEN}`
      }
    };

    request(options, function(error, response, body) {
      if (error) {
        prettyPrintResponse(error);
        reject(error);
      }

      const parsedUser = JSON.parse(body);

      //After getting the user info, find or create using that data
      models.User.findOrCreate({
        where: { sub: userId },
        defaults: { email: parsedUser.email, name: parsedUser.name }
      })
        .spread((user, created) => {
          const userData = JSON.stringify({
            id: user.dataValues.id,
            name: user.dataValues.name,
            email: user.dataValues.email,
            wasCreated: created
          });
          resolve(userData);
        })
        .catch(error => reject(error));
    });
  });
};

// Create Item
const asyncCreateItem = publicToken => {
  return new Promise((resolve, reject) => {
    client.exchangePublicToken(publicToken, function(error, tokenResponse) {
      if (error != null) {
        prettyPrintResponse(error);
        reject(error);
      }
      // TODO: Persist ACCESS_TOKEN and ITEM_ID in db
      ACCESS_TOKEN = tokenResponse.access_token;
      ITEM_ID = tokenResponse.item_id;
      prettyPrintResponse(tokenResponse);
      resolve(
        "Item successfully created: access_token and item_id have been received by the server"
      );
    });
  });
};
// Cash Flow
const asyncGetCashFlow = () => {
  return new Promise((resolve, reject) => {
    models.Cashflow.findAll({
      attributes: ["user_id", "account_type", "year", "month", "sum"],
      where: {
        $and: [
          {
            user_id: {
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
      .then(cashFlowData => resolve(calculateCashFlow(cashFlowData)))
      .catch(error => reject(error));
  });
};

const calculateCashFlow = cashFlowData => {
  let depositoryTotal;
  let creditTotal;

  for (let elem of cashFlowData) {
    let isTotalData = elem.year === null;
    let isDepository = elem.account_type === "depository";
    let isCredit = elem.account_type === "credit";

    if (isTotalData && isDepository) {
      depositoryTotal = elem.sum;
    } else if (isTotalData && isCredit) {
      creditTotal = elem.sum;
    }
  }

  let cashFlow = depositoryTotal - creditTotal;

  return cashFlow;
};

// Total Debt
const asyncGetTotalDebt = () => {
  return new Promise((resolve, reject) => {
    models.Snapshot.findAll({
      attributes: ["user_id", "total_debt", "total_savings"]
    })
      .then(snapshotData => resolve(snapshotData[0].total_debt))
      .catch(error => reject(error));
  });
};

// Total Savings
const asyncGetTotalSavings = () => {
  return new Promise((resolve, reject) => {
    models.Snapshot.findAll({
      attributes: ["user_id", "total_debt", "total_savings"]
    })
      .then(snapshotData => resolve(snapshotData[0].total_savings))
      .catch(error => reject(error));
  });
};

// Transactions
const asyncGetTransactions = () => {
  return new Promise((resolve, reject) => {
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
      (error, transactionsResponse) => {
        if (error != null) {
          prettyPrintResponse(error);
          reject(error);
        } else {
          prettyPrintResponse(transactionsResponse);
          resolve(
            JSON.stringify({ error: null, transactions: transactionsResponse })
          );
        }
      }
    );
  });
};

// The root provides a resolver function for each API endpoint
let root = {
  getUserInfo: ({ userId }) => {
    return asyncGetUserInfo(userId);
  },
  createItem: ({ publicToken }) => {
    return asyncCreateItem(publicToken);
  },
  cashFlow: () => {
    return asyncGetCashFlow();
  },
  totalDebt: () => {
    return asyncGetTotalDebt();
  },
  totalSavings: () => {
    return asyncGetTotalSavings();
  },
  transactions: () => {
    return asyncGetTransactions();
  }
};
//END RESOLVER FUNCTIONS

const app = express();

app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());
app.use(cors());
app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true
  })
);

//Pass in the app to our routes to mount.
appRoutes(app);

// //PLAID EXPRESS SERVER ENDPOINTS
// Exchange token flow - exchange a Link public_token for
// an API access_token
// https://plaid.com/docs/#exchange-token-flow
app.post("/get_access_token", function(request, response) {
  PUBLIC_TOKEN = request.body.public_token;
  client.exchangePublicToken(PUBLIC_TOKEN, function(error, tokenResponse) {
    if (error != null) {
      prettyPrintResponse(error);
      return response.json({
        error: error
      });
    }
    // TODO: Persist ACCESS_TOKEN and ITEM_ID in db
    ACCESS_TOKEN = tokenResponse.access_token;
    ITEM_ID = tokenResponse.item_id;
    prettyPrintResponse(tokenResponse);
    response.json(
      "Item successfully created: access_token and item_id have been received by the server"
    );
  });
});

// // Retrieve Identity for an Item
// // https://plaid.com/docs/#identity
// app.get("/identity", function(request, response, next) {
//   client.getIdentity(ACCESS_TOKEN, function(error, identityResponse) {
//     if (error != null) {
//       prettyPrintResponse(error);
//       return response.json({
//         error: error
//       });
//     }
//     prettyPrintResponse(identityResponse);
//     response.json({ error: null, identity: identityResponse });
//   });
// });

// // Retrieve real-time Balances for each of an Item's accounts
// // https://plaid.com/docs/#balance
// app.get("/balance", function(request, response, next) {
//   client.getBalance(ACCESS_TOKEN, function(error, balanceResponse) {
//     if (error != null) {
//       prettyPrintResponse(error);
//       return response.json({
//         error: error
//       });
//     }
//     prettyPrintResponse(balanceResponse);
//     response.json({ error: null, balance: balanceResponse });
//   });
// });

// // Retrieve an Item's accounts
// // https://plaid.com/docs/#accounts
// app.get("/accounts", function(request, response, next) {
//   client.getAccounts(ACCESS_TOKEN, function(error, accountsResponse) {
//     if (error != null) {
//       prettyPrintResponse(error);
//       return response.json({
//         error: error
//       });
//     }
//     prettyPrintResponse(accountsResponse);
//     response.json({ error: null, accounts: accountsResponse });
//   });
// });

// // Retrieve ACH or ETF Auth data for an Item's accounts
// // https://plaid.com/docs/#auth
// app.get("/auth", function(request, response, next) {
//   client.getAuth(ACCESS_TOKEN, function(error, authResponse) {
//     if (error != null) {
//       prettyPrintResponse(error);
//       return response.json({
//         error: error
//       });
//     }
//     prettyPrintResponse(authResponse);
//     response.json({ error: null, auth: authResponse });
//   });
// });

// // Retrieve information about an Item
// // https://plaid.com/docs/#retrieve-item
// app.get("/item", function(request, response, next) {
//   // Pull the Item - this includes information about available products,
//   // billed products, webhook information, and more.
//   client.getItem(ACCESS_TOKEN, function(error, itemResponse) {
//     if (error != null) {
//       prettyPrintResponse(error);
//       return response.json({
//         error: error
//       });
//     }
//     // Also pull information about the institution
//     client.getInstitutionById(itemResponse.item.institution_id, function(
//       err,
//       instRes
//     ) {
//       if (err != null) {
//         const msg =
//           "Unable to pull institution information from the Plaid API.";
//         console.log(msg + "\n" + JSON.stringify(error));
//         return response.json({
//           error: msg
//         });
//       } else {
//         prettyPrintResponse(itemResponse);
//         response.json({
//           item: itemResponse.item,
//           institution: instRes.institution
//         });
//       }
//     });
//   });
// });

// Retrieve Transactions for an Item
// https://plaid.com/docs/#transactions
// NOTE: modified and used to seed database with plaid sandbox data

// Create server
app.listen(APP_PORT, function() {
  console.log("PocketGoblin server listening on port " + APP_PORT);
});

// // TODO: Consider removing this function (necessary for development environment?)
// app.post("/set_access_token", function(request, response, next) {
//   ACCESS_TOKEN = request.body.access_token;
//   client.getItem(ACCESS_TOKEN, function(error, itemResponse) {
//     response.json({
//       item_id: itemResponse.item.item_id,
//       error: false
//     });
//   });
// });
