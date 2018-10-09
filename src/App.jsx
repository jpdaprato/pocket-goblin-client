import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import Header from "./components/Header.jsx";
import { Router, Link } from "@reach/router";
import EnterPurchase from "./components/EnterPurchase.jsx";
import SnapshotResults from "./components/SnapshotResults.jsx";
import LinkItems from "./components/LinkItems.jsx";
import GoblinAdvice from "./components/GoblinAdvice.jsx";
import Auth from "./Auth/Auth.js";

// Render Auth0 login modal
const auth = new Auth();
auth.login();

class App extends React.Component {
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
    this.getUserData();
  }

  getUserData() {
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
        <Link to="/">
          <Header title={"Pocket Goblin"} />
        </Link>
        <Router>
          <EnterPurchase
            path="/"
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
        </Router>
        {/* Plaid Link component */}
        <LinkItems />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
