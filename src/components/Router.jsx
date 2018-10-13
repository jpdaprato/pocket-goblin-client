import React from "react";
import axios from "axios";
import RouterComponent from "./RouterComponent.jsx";

class RouterContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentCashFlowAmount: 0,
      purchaseAmount: 0,
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
          totalDebtAmount: data.totalDebt + 15000,
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
      <RouterComponent
        handlePurchaseInput={handlePurchaseInput}
        handlePurchaseFrequencyChange={handlePurchaseFrequencyChange}
        handlePaymentTypeChange={handlePaymentTypeChange}
        currentCashFlowAmount={currentCashFlowAmount}
        purchaseFrequency={purchaseFrequency}
        purchasePaymentType={purchasePaymentType}
        totalDebtAmount={totalDebtAmount}
        totalSavingAmount={totalSavingAmount}
        purchaseAmount={purchaseAmount}
      />
    );
  }
}

export default RouterContainer;
