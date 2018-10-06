import React from "react";
import axios from "axios";
import PlaidLink from "react-plaid-link";

class LinkItems extends React.Component {
  handleOnSuccess(token, metadata) {
    console.log("This is the public_token returned by plaid: ", token);
    console.log(
      "This is the metadata returned by plaid along with the public_token: ",
      metadata
    );
    axios
      .post("http://localhost:8000/graphql", {
        // Code from App.jsx that works: solely for testing purposes
        query: "{ cashFlow totalDebt totalSavings }"
        // Untested code to make a call to graphql to create an item
        // query: `{ createItem(publicToken: $public_token) }`,
        // variables: { public_token }
      })
      .then(response => console.log(response))
      .catch(error => console.log(error));
  }

  handleOnExit() {
    // handle the case when your user exits Link
    console.log("User exited Plaid Link");
  }
  render() {
    return (
      <PlaidLink
        clientName="cygnustechnologies"
        env="sandbox"
        product={["auth", "transactions"]}
        // FIXME: should not be hardcoded; figure out how to import from .env
        publicKey="88a038c0956987b0027438f7596d9e"
        onExit={this.handleOnExit}
        onSuccess={this.handleOnSuccess}
      >
        Open Link and connect your bank!
      </PlaidLink>
    );
  }
}

// class LinkItems extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {};

//     this.handleLinkButtonClick = this.handleLinkButtonClick.bind(this);
//     this.createItem = this.createItem.bind(this);
//   }

//   handleLinkButtonClick() {
//     this.createItem();
//   }

//   createItem() {
//     Plaid.create({
//       clientName: "cygnustechnologies",
//       // TODO: replace hardcoded env and key w/ vars that live in .env file
//       env: "sandbox",
//       key: "88a038c0956987b0027438f7596d9e",
//       product: ["transactions"],
//       // Optional – use webhooks to get transaction and error updates
//       webhook: "https://requestb.in",
//       onLoad: function() {
//         console.log("Link has loaded");
//         // Optional, called when Link loads
//       },
//       onSuccess: function(public_token, metadata) {
//   console.log(
//     "This is the public_token returned by plaid: ",
//     public_token
//   );
//   console.log(
//     "This is the metadata returned by plaid along with the public_token: ",
//     metadata
//   );
//   axios
//     .post("http://localhost:8000/graphql", {
//       // Code from App.jsx that works: solely for testing purposes
//       query: "{ cashFlow totalDebt totalSavings }"
//       // Untested code to make a call to graphql to create an item
//       // query: `{ createItem(publicToken: $public_token) }`,
//       // variables: { public_token }
//     })
//     .then(response => console.log(response))
//     .catch(error => console.log(error));
// },
//       onExit: function(err, metadata) {
//         // The user exited the Link flow.
//         if (err != null) {
//           console.log(err);
//           // The user encountered a Plaid API error prior to exiting.
//         }
//         // metadata contains information about the institution
//         // that the user selected and the most recent API request IDs.
//         // Storing this information can be helpful for support.
//       }
//     }).open();
//   }

//   render() {
//     return (
//       <div>
//         <button onClick={this.handleLinkButtonClick}>Link Account</button>
//       </div>
//     );
//   }
// }

export default LinkItems;
