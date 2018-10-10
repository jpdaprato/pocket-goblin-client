import React from "react";
import axios from "axios";
import { Router } from "@reach/router";
import EnterPurchase from "./EnterPurchase.jsx";
import SnapshotResults from "./SnapshotResults.jsx";
import GoblinAdvice from "./GoblinAdvice.jsx";
import TopSpending from "./TopSpending.jsx";

class RouterComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentCashFlowAmount: 0,
      purchaseAmount: 100,
      purchaseFrequency: "never",
      purchasePaymentType: "cash",
      totalDebtAmount: 0,
      totalSavingAmount: 0
    };
    this.handlePurchaseInput = this.handlePurchaseInput.bind(this);
    this.handlePurchaseFrequencyChange = this.handlePurchaseFrequencyChange.bind(
      this
    );
    this.handlePaymentTypeChange = this.handlePaymentTypeChange.bind(this);
  }

  componentDidMount() {
    this.getItemData();
  }

  getItemData() {
    axios
      .post("http://localhost:8000/graphql", {
        query: "{ cashFlow totalDebt totalSavings }"
      })
      .then(({ data: { data } }) => {
        this.setState({
          currentCashFlowAmount: data.cashFlow,
          totalDebtAmount: data.totalDebt,
          totalSavingAmount: data.totalSavings
        });
      })
      /* eslint-disable-next-line */
      .catch(error => console.log(error));
  }

  handlePurchaseInput(e) {
    this.setState({
      purchaseAmount: Number(e.target.value)
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
        {/* TODO: Remove this header */}
        <h1>This is the Router Component</h1>
        <Router>
          <EnterPurchase
            path="home/enter-purchase"
            handlePurchaseInput={handlePurchaseInput}
            currentCashFlowAmount={currentCashFlowAmount}
            purchaseFrequency={purchaseFrequency}
            handlePurchaseFrequencyChange={handlePurchaseFrequencyChange}
            purchasePaymentType={purchasePaymentType}
            handlePaymentTypeChange={handlePaymentTypeChange}
            purchaseAmount={purchaseAmount}
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
          <TopSpending path="/top-spending" />
        </Router>
      </div>
    );
  }
}

export default RouterComponent;
