import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import Header from "./components/Header.jsx";
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
    this.handlePotentialPaymentType = this.handlePotentialPaymentType.bind(
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

  handlePotentialPurchaseFrequencyChange(e) {
    this.setState({ potentialPurchaseFrequency: e.target.value });
  }

  handlePotentialPaymentType(e) {
    this.setState({ potentialPurchasePaymentType: e.target.value });
  }

  render() {
    const {
      handlePotentialPurchaseInput,
      handlePotentialPurchaseFrequencyChange,
      handlePotentialPaymentType
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
            handlePotentialPaymentType={handlePotentialPaymentType}
          />
        </Router>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
