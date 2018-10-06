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
        publicKey="88a038c0956987b0027438f7596d9e"
        onExit={this.handleOnExit}
        onSuccess={this.handleOnSuccess}
      >
        Open Link and connect your bank!
      </PlaidLink>
    );
  }
}

export default LinkItems;
