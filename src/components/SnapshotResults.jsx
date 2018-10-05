import React from "react";
import { Link } from "@reach/router";
import CashFlowMeter from "./CashFlowMeter.jsx";
import InputAmount from "./InputAmount.jsx";

class SnapshotResults extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      button: "",
      debtFreeFasterBy: 3,
      interestSavedAmount: 408,
      totalSavedAmount: 880
    };
    this.handlePayDebtButtonClick = this.handlePayDebtButtonClick.bind(this);
    this.handlePayInvestButtonClick = this.handlePayInvestButtonClick.bind(
      this
    );
    this.renderPayDebtOrInvestItInfo = this.renderPayDebtOrInvestItInfo.bind(
      this
    );
  }

  handlePayDebtButtonClick() {
    this.setState({ button: "debt" });
  }

  handlePayInvestButtonClick() {
    this.setState({ button: "invest" });
  }

  renderPayDebtOrInvestItInfo() {
    const {
      button,
      debtFreeFasterBy,
      interestSavedAmount,
      totalSavedAmount
    } = this.state;
    if (button === "") {
      return;
    } else if (button === "debt") {
      return (
        <div>
          <h4>Be Debt-Free Faster by {debtFreeFasterBy} months</h4>
          <h4>Save interest of ${interestSavedAmount}</h4>
          <h4>Total You&apos;ll Save ${totalSavedAmount}</h4>
          <span>
            If you chooses to pay down debt with the $
            {this.props.potentialPurchaseAmount} rather than spend it today, you
            cound save ${interestSavedAmount} in interest payments and reduce
            the time it would take you to get out of debt by {debtFreeFasterBy}
            months. So the question you should ask yourself is that: Is spending
            ${this.props.potentialPurchaseAmount} today worth it?
          </span>
        </div>
      );
    } else if (button === "invest") {
      return <div>invest</div>;
    }
    return;
  }

  render() {
    const {
      handlePotentialPurchaseInput,
      currentCashFlowAmount,
      totalSavingAmount,
      totalDebtAmount,
      totalYearlyPaymentAmount,
      totalYearlyInterestAmount,
      totalYearlyCostAmount
    } = this.props;
    return (
      <div>
        <h1>Tap to Modify</h1>
        <InputAmount
          handlePotentialPurchaseInput={handlePotentialPurchaseInput}
        />
        <h2>What if you spend the money...</h2>
        <div>
          <h3>Cash Flow</h3>
          <CashFlowMeter currentCashFlowAmount={currentCashFlowAmount} />
        </div>
        <div>
          <h3>Debt to Savings</h3>
          <span>{totalDebtAmount / totalSavingAmount}</span>
        </div>
        <div>
          <h3>Savings</h3>
          <span>{totalSavingAmount}</span>
        </div>
        <div>
          <h3>The Real Cost of Putting it on Creit</h3>
          <div>
            <h4>
              Total Amount of Payments per year{" "}
              {` $${totalYearlyPaymentAmount}`}
            </h4>
            <h4>
              Interest You&apos;ll Pay Per Year{" "}
              {` $${totalYearlyInterestAmount}`}
            </h4>
            <h4>
              Total Amount of Payments per year {` $${totalYearlyCostAmount}`}
            </h4>
            <span>
              Based on your current spending pattern, it will take you {"X "}
              months to pay off every payment you put on credit.You will pay $
              {totalYearlyPaymentAmount} in interest alone every single year!
              Thats&apos;s a big chunk of change to pay out in interest!
            </span>
            <div>
              <h2>Or, what if you instead...</h2>
              <button onClick={this.handlePayDebtButtonClick}>Pay Debt</button>
              <button onClick={this.handlePayInvestButtonClick}>
                Invest it
              </button>
              {this.renderPayDebtOrInvestItInfo()}
            </div>
          </div>
        </div>
        <Link to="/what-if-results">
          <button>What Would the Goblin Do?</button>
        </Link>
      </div>
    );
  }
}

export default SnapshotResults;
