import React from "react";
import axios from "axios";
import PlaidLink from "react-plaid-link";

const API_ENDPOINT =
  process.env.API_ENDPOINT || "http://localhost:8000/graphql";

class LinkItems extends React.Component {
  handleOnSuccess(token, metadata) {
    axios
      .post(API_ENDPOINT, {
        query: `{ createItem(publicToken: "${token}", userId: "${
          localStorage.getItem("userData").id
        }") }`
      })
      .catch(error => console.log(error));
  }

  handleOnExit() {
    console.log("User exited Plaid Link");
  }
  render() {
    return (
      <PlaidLink
        clientName="cygnustechnologies"
        env={process.env.PLAID_ENV}
        product={["auth", "transactions"]}
        publicKey={process.env.PLAID_PUBLIC_KEY}
        onExit={this.handleOnExit}
        onSuccess={this.handleOnSuccess}
      >
        Connect Accounts
      </PlaidLink>
    );
  }
}

export default LinkItems;
