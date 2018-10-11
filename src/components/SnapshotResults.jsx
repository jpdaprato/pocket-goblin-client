import React from "react";
import { Link } from "@reach/router";
import CashFlowMeter from "./CashFlowMeter.jsx";
import InputAmount from "./InputAmount.jsx";
import RealCostOfCredit from "./RealCostOfCredit.jsx";
// import PayDebtNonRecurring from "./PayDebtNonRecurring.jsx";
import PayDebtOrInvestIt from "./PayDebtOrInvestIt.jsx";

class SnapshotResults extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      payDebtOrInvestItSelection: "invest",
      debtFreeFasterBy: 5,
      interestSavedAmount: 876,
      totalSavedAmount: 3276,
      rateOfReturn: 0.1,
      investmentTimeline: 20
    };
  }

  handlePayDebtOrInvestSelection = event => {
    this.setState({ payDebtOrInvestItSelection: event.target.value });
  };

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
        <InputAmount
          handlePurchaseInput={handlePurchaseInput}
          purchaseAmount={purchaseAmount}
        />
        <h2>What if you spend the money...</h2>
        <div>
          <h3>Cash Flow</h3>
          <CashFlowMeter
            currentCashFlowAmount={currentCashFlowAmount}
            purchaseAmount={purchaseAmount}
          />
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
              <button
                value="debt"
                onClick={this.handlePayDebtOrInvestSelection}
              >
                Pay Debt
              </button>
              <button
                value="invest"
                onClick={this.handlePayDebtOrInvestSelection}
              >
                Invest it
              </button>
              {/* {this.renderPayDebtOrInvestItInfo()} */}

              <PayDebtOrInvestIt
                debtFreeFasterBy={this.state.debtFreeFasterBy}
                interestSavedAmount={this.state.interestSavedAmount}
                totalSavedAmount={this.state.totalSavedAmount}
                purchaseAmount={this.props.purchaseAmount}
                purchaseFrequency={this.props.purchaseFrequency}
                payDebtOrInvestItSelection={
                  this.state.payDebtOrInvestItSelection
                }
                investmentTimeline={this.state.investmentTimeline}
                rateOfReturn={this.state.rateOfReturn}
              />
            </div>
          </div>
        </div>
        <Link to="/goblin-advice">
          <button>What Would the Goblin Do?</button>
        </Link>
      </div>
    );
  }
}

export default SnapshotResults;
