const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const graphqlHTTP = require("express-graphql");
const { buildSchema } = require("graphql");
const cors = require("cors");
const request = require("request");
const models = require("../models/index");
const prettyPrintResponse = require("./helpers");
const client = require("./plaid");
const appRoutes = require("./routes/pocketgoblin.routes.js");
const ctrl = require("./controllers/pocketgoblin.controller.js");

const result = dotenv.config();
if (result.error) {
  throw result.error;
}

const APP_PORT = process.env.APP_PORT;
const AUTH0_CLIENT_ID = process.env.AUTH0_CLIENT_ID;
const AUTH0_CLIENT_SECRET = process.env.AUTH0_CLIENT_SECRET;

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
    createItem(publicToken: String!, userId: String!): String
    cashFlow: Float
    totalDebt: Float
    totalSavings: Float
  }
`);

// RESOLVER FUNCTIONS
const asyncGetUserInfo = userId => {
  return new Promise((resolve, reject) => {
    asyncGetAuth0AccessToken().then(accessToken => {
      var options = {
        method: "GET",
        url: `https://pocketgoblin.auth0.com/api/v2/users/${userId}`,
        headers: {
          authorization: `Bearer ${accessToken}`
        }
      };

      request(options, function(error, response, body) {
        if (error) {
          prettyPrintResponse(error);
          reject(error);
        }

        const parsedUserData = JSON.parse(body);

        models.User.findOrCreate({
          where: { sub: userId },
          defaults: { email: parsedUserData.email, name: parsedUserData.name }
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
          .catch(error => {
            prettyPrintResponse(error);
            reject(error);
          });
      });
    });
  });
};

const asyncGetAuth0AccessToken = () => {
  return new Promise((resolve, reject) => {
    var options = {
      method: "POST",
      url: "https://pocketgoblin.auth0.com/oauth/token",
      headers: { "content-type": "application/json" },
      body: `{"client_id":"${AUTH0_CLIENT_ID}","client_secret":"${AUTH0_CLIENT_SECRET}","audience":"https://pocketgoblin.auth0.com/api/v2/","grant_type":"client_credentials"}`
    };

    request(options, function(error, response, body) {
      if (error) {
        prettyPrintResponse(error);
        reject(error);
      }
      resolve(JSON.parse(body).access_token);
    });
  });
};

// Create Item
const asyncCreateItem = (publicToken, userId) => {
  return new Promise((resolve, reject) => {
    client.exchangePublicToken(publicToken, function(error, tokenResponse) {
      if (error != null) {
        prettyPrintResponse(error);
        reject(error);
      }
      ACCESS_TOKEN = tokenResponse.access_token;
      ITEM_ID = tokenResponse.item_id;
      resolve(ctrl.saveItemData(ACCESS_TOKEN, ITEM_ID, userId));
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
      attributes: ["users_id", "total_debt", "total_savings"]
    })
      .then(snapshotData => resolve(snapshotData[0].total_debt))
      .catch(error => reject(error));
  });
};

// Total Savings
const asyncGetTotalSavings = () => {
  return new Promise((resolve, reject) => {
    models.Snapshot.findAll({
      attributes: ["users_id", "total_debt", "total_savings"]
    })
      .then(snapshotData => resolve(snapshotData[0].total_savings))
      .catch(error => reject(error));
  });
};

// The root provides a resolver function for each API endpoint
let root = {
  getUserInfo: ({ userId }) => {
    return asyncGetUserInfo(userId);
  },
  createItem: ({ publicToken, userId }) => {
    return asyncCreateItem(publicToken, userId);
  },
  cashFlow: () => {
    return asyncGetCashFlow();
  },
  totalDebt: () => {
    return asyncGetTotalDebt();
  },
  totalSavings: () => {
    return asyncGetTotalSavings();
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

// Create server
app.listen(APP_PORT, function() {
  console.log("PocketGoblin server listening on port " + APP_PORT);
});
