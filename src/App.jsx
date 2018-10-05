import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import Header from "./components/Header.jsx";
import { Router, Link } from "@reach/router";
import EnterPurchase from "./components/EnterPurchase.jsx";
import SnapshotResults from "./components/SnapshotResults.jsx";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentCashFlowAmount: 44,
      potentialPurchaseAmount: 1,
      potentialPurchaseFrequency: "never",
      potentialPurchasePaymentType: "cash",
      totalDebtAmount: 2,
      totalSavingAmount: 3,
      totalYearlyPaymentAmount: 5664,
      totalYearlyInterestAmount: 782,
      totalYearlyCostAmount: 6446
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
      totalYearlyPaymentAmount,
      totalYearlyInterestAmount,
      totalYearlyCostAmount,
      potentialPurchaseAmount
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
            handlePotentialPaymentTypeChange={handlePotentialPaymentTypeChange}
          />
          <SnapshotResults
            path="/what-if-results"
            handlePotentialPurchaseInput={handlePotentialPurchaseInput}
            currentCashFlowAmount={currentCashFlowAmount}
            totalDebtAmount={totalDebtAmount}
            totalSavingAmount={totalSavingAmount}
            totalYearlyPaymentAmount={totalYearlyPaymentAmount}
            totalYearlyInterestAmount={totalYearlyInterestAmount}
            totalYearlyCostAmount={totalYearlyCostAmount}
            potentialPurchaseAmount={potentialPurchaseAmount}
          />
        </Router>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
