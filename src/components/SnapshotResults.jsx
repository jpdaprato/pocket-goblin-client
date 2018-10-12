import React from "react";
import { Link } from "@reach/router";
import { HorizontalBar } from "react-chartjs-2";
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

  graphColorPicker(num) {
    if (num < 100) {
      return "red";
    } else if (num < 300) {
      return "yellow";
    }
    return "green";
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

    const DebtSavingGraph = {
      labels: ["Debt to Savings Ratio", "Total Savings"],
      datasets: [
        {
          data: [
            ((totalDebtAmount / totalSavingAmount) * 100).toFixed(2),
            totalSavingAmount
          ],
          backgroundColor: [
            this.graphColorPicker(
              ((totalDebtAmount / totalSavingAmount) * 100).toFixed(2)
            ),
            this.graphColorPicker(totalSavingAmount)
          ]
        }
      ]
    };

    const DebtSavingGraphOptions = {
      legend: {
        display: false
      },
      scales: {
        xAxes: [
          {
            display: false,
            ticks: {
              beginAtZero: true
            }
          }
        ]
      }
    };

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
        <div style={{ width: "30%", height: "30%" }}>
          <HorizontalBar
            data={DebtSavingGraph}
            options={DebtSavingGraphOptions}
          />
          {/* <h3>Debt to Savings Ratio</h3>
          <span>
            {((totalDebtAmount / totalSavingAmount) * 100).toFixed(2)}%
          </span>
        </div>
        <div>
          <h3>Total Savings</h3>
          <span>${totalSavingAmount}</span> */}
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
