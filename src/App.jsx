import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import Header from "./components/Header.jsx";
import { Router } from "@reach/router";
import EnterPurchase from "./components/EnterPurchase.jsx";
import SnapshotResults from "./components/SnapshotResults.jsx";
import LinkItems from "./components/LinkItems.jsx";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentCashFlowAmount: 44,
      purchaseAmount: 472,
      purchaseFrequency: "never",
      purchasePaymentType: "cash",
      totalDebtAmount: 18,
      totalSavingAmount: 21
    };
    this.handlePurchaseInput = this.handlePurchaseInput.bind(this);
    this.handlePurchaseFrequencyChange = this.handlePurchaseFrequencyChange.bind(
      this
    );
    this.handlePaymentTypeChange = this.handlePaymentTypeChange.bind(this);
  }

  componentDidMount() {
    axios
      .post("http://localhost:8000/graphql", {
        query: "{ cashFlow totalDebt totalSavings }"
      })
      .then(response => console.log(response))
      .catch(error => console.log(error));
  }

  handlePurchaseInput(e) {
    this.setState({
      purchaseAmount: e.target.value
    });
  }

  handlePurchaseFrequencyChange(e) {
    this.setState({ purchaseFrequency: e.target.value });
  }

  handlePaymentTypeChange(e) {
    this.setState({ purchasePaymentType: e.target.value });
  }

  render() {
    const {
      handlePurchaseInput,
      handlePurchaseFrequencyChange,
      handlePaymentTypeChange
    } = this;

    const {
      currentCashFlowAmount,
      purchaseFrequency,
      purchasePaymentType,
      totalDebtAmount,
      totalSavingAmount,
      purchaseAmount
    } = this.state;

    return (
      <div>
        <Header title={"Pocket Goblin"} />
        <Router>
          <EnterPurchase
            path="/"
            handlePurchaseInput={handlePurchaseInput}
            currentCashFlowAmount={currentCashFlowAmount}
            purchaseFrequency={purchaseFrequency}
            handlePurchaseFrequencyChange={handlePurchaseFrequencyChange}
            purchasePaymentType={purchasePaymentType}
            handlePaymentTypeChange={handlePaymentTypeChange}
          />
          <SnapshotResults
            path="/what-if-results"
            handlePurchaseInput={handlePurchaseInput}
            currentCashFlowAmount={currentCashFlowAmount}
            totalDebtAmount={totalDebtAmount}
            totalSavingAmount={totalSavingAmount}
            purchaseAmount={purchaseAmount}
            purchaseFrequency={purchaseFrequency}
            purchasePaymentType={purchasePaymentType}
          />
          <GoblinAdvice path="/goblin-advice" />
        </Router>
        <LinkItems />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
