import React from "react";
import { Link } from "@reach/router";
import CashFlowMeter from "./CashFlowMeter.jsx";
import InputAmount from "./InputAmount.jsx";
import RealCostOfCredit from "./RealCostOfCredit.jsx";

class SnapshotResults extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      payDebtOrInvestItButton: "debt",
      debtFreeFasterBy: 3,
      interestSavedAmount: 408,
      totalSavedAmount: 880,
      rateOfReturn: 0.1,
      investmentTimeline: 20
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
    this.setState({ payDebtOrInvestItButton: "debt" });
  }

  handlePayInvestButtonClick() {
    this.setState({ payDebtOrInvestItButton: "invest" });
  }

  renderPayDebtOrInvestItInfo() {
    const { purchaseAmount } = this.props;

    const {
      payDebtOrInvestItButton,
      debtFreeFasterBy,
      interestSavedAmount,
      totalSavedAmount,
      rateOfReturn,
      investmentTimeline
    } = this.state;

    const potentialInterestEarned =
      purchaseAmount * rateOfReturn * investmentTimeline;

    if (payDebtOrInvestItButton === "debt") {
      return (
        <div>
          <h4>Be Debt-Free Faster by {debtFreeFasterBy} months</h4>
          <h4>Save interest of ${interestSavedAmount}</h4>
          <h4>{`Total You'll Save $${totalSavedAmount}`}</h4>
          <p>
            If you chooses to pay down debt with the ${purchaseAmount} rather
            than spend it today, you cound save ${interestSavedAmount} in
            interest payments and reduce the time it would take you to get out
            of debt by {debtFreeFasterBy} months. So the question you should ask
            yourself is that: Is spending ${purchaseAmount} today worth it?
          </p>
        </div>
      );
    } else if (payDebtOrInvestItButton === "invest") {
      return (
        <div>
          <h4>Investment Timeline 20 Years</h4>
          <h4>Interest You Would Earn ${potentialInterestEarned}</h4>
          <h4>
            Real Cost of Spending Today $
            {potentialInterestEarned + purchaseAmount}
          </h4>
          <p>
            {`If you choose to invest the $${purchaseAmount} rather than
            spend it today, you could earn $${potentialInterestEarned} in interest.
            This would bring the real opportunity cost of what you are spending
            your money on to $${potentialInterestEarned + purchaseAmount}
            after 20 years.So the question you should ask yourself is this: Is
            spending $${purchaseAmount} today worth the $
            ${potentialInterestEarned} that I'm passing up?`}
          </p>
        </div>
      );
    }
    return;
  }

  render() {
    const {
      handlePurchaseInput,
      currentCashFlowAmount,
      totalSavingAmount,
      totalDebtAmount,
      purchaseFrequency,
      purchaseAmount,
      purchasePaymentType
    } = this.props;

    return (
      <div>
        <h1>Tap to Modify</h1>
        <InputAmount handlePurchaseInput={handlePurchaseInput} />
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
          <div>
            {purchasePaymentType === "credit" ? (
              <RealCostOfCredit
                purchaseFrequency={purchaseFrequency}
                purchaseAmount={purchaseAmount}
              />
            ) : null}
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
