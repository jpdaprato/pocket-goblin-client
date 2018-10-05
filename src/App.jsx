import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import Header from "./components/DashBoardContainer/Header.jsx";
import { Router, Link } from "@reach/router";
import EnterPurchase from "./components/EnterPurchase.jsx";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      potentialPurchaseAmount: 0,
      currentCashFlowAmount: 100,
      potentialPurchaseFrequency: "never",
      potentialPurchasePaymentType: "cash"
    };
    this.handlePotentialPurchaseInput = this.handlePotentialPurchaseInput.bind(
      this
    );
    this.handlePotentialPurchaseFrequencyChange = this.handlePotentialPurchaseFrequencyChange.bind(
      this
    );
  }

  componentDidMount() {
    axios
      .post("http://localhost:8000/graphql", {
        query: "{ cashFlow totalDebt totalSavings }"
      })
      .then(response => console.log(response))
      .catch(error => console.log(error));
  }

  handlePotentialPurchaseInput(e) {
    this.setState({
      potentialPurchaseAmount: e.target.value
    });
  }

  handlePotentialPurchaseFrequencyChange(event) {
    console.log(event.target.value);
    this.setState({ potentialPurchaseFrequency: event.target.value });
  }

  render() {
    const {
      handlePotentialPurchaseInput,
      handlePotentialPurchaseFrequencyChange
    } = this;
    const {
      currentCashFlowAmount,
      potentialPurchaseFrequency,
      potentialPurchasePaymentType
    } = this.state;

    return (
      <div>
        <Header title={"test title"} />
        <Router>
          <EnterPurchase
            path="/"
            handlePotentialPurchaseInput={handlePotentialPurchaseInput}
            currentCashFlowAmount={currentCashFlowAmount}
            potentialPurchaseFrequency={potentialPurchaseFrequency}
            handlePotentialPurchaseFrequencyChange={
              handlePotentialPurchaseFrequencyChange
            }
            potentialPurchasePaymentType={potentialPurchasePaymentType}
          />
        </Router>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
