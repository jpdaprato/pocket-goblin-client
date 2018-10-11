const util = require("util");

// Helper function
const prettyPrintResponse = response => {
  console.log(util.inspect(response, { colors: true, depth: 4 }));
};

module.exports = prettyPrintResponse;
