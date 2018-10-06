import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import Header from "./components/Header.jsx";
import { Router } from "@reach/router";
import EnterPurchase from "./components/EnterPurchase.jsx";
import SnapshotResults from "./components/SnapshotResults.jsx";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentCashFlowAmount: 44,
      potentialPurchaseAmount: 472,
      potentialPurchaseFrequency: "never",
      potentialPurchasePaymentType: "cash",
      totalDebtAmount: 18,
      totalSavingAmount: 21
    };
    this.handlePotentialPurchaseInput = this.handlePotentialPurchaseInput.bind(
      this
    );
    this.handlePotentialPurchaseFrequencyChange = this.handlePotentialPurchaseFrequencyChange.bind(
      this
    );
    this.handlePotentialPaymentTypeChange = this.handlePotentialPaymentTypeChange.bind(
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

  handlePotentialPaymentTypeChange(e) {
    this.setState({ potentialPurchasePaymentType: e.target.value });
  }

  render() {
    const {
      handlePotentialPurchaseInput,
      handlePotentialPurchaseFrequencyChange,
      handlePotentialPaymentTypeChange
    } = this;
    const {
      currentCashFlowAmount,
      potentialPurchaseFrequency,
      potentialPurchasePaymentType,
      totalDebtAmount,
      totalSavingAmount,
      potentialPurchaseAmount
    } = this.state;

    return (
      <div>
        <Header title={"Pocket Goblin"} />
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
            handlePotentialPaymentTypeChange={handlePotentialPaymentTypeChange}
          />
          <SnapshotResults
            path="/what-if-results"
            handlePotentialPurchaseInput={handlePotentialPurchaseInput}
            currentCashFlowAmount={currentCashFlowAmount}
            totalDebtAmount={totalDebtAmount}
            totalSavingAmount={totalSavingAmount}
            potentialPurchaseAmount={potentialPurchaseAmount}
            potentialPurchaseFrequency={potentialPurchaseFrequency}
            potentialPurchasePaymentType={potentialPurchasePaymentType}
          />
        </Router>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
