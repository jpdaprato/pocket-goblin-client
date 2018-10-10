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
        query: `{ createItem(publicToken: "${token}") }`
      })
      .then(response => console.log(response.data.data.createItem))
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
