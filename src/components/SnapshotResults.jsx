import React from "react";
import { HorizontalBar } from "react-chartjs-2";
import { Link } from "react-router-dom";
import styled from "react-emotion";
import CashFlowMeter from "./CashFlowMeter.jsx";
import InputAmount from "./InputAmount.jsx";
import RealCostOfCredit from "./RealCostOfCredit.jsx";
import PayDebtOrInvestIt from "./PayDebtOrInvestIt.jsx";

//Styled Components
const Wrapper = styled("div")`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const WhatIfContainer = styled("div")`
  display: flex;
  width: 40%;
  flex-direction: column;
`;

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

  DebtGraphColorPicker(num) {
    if (num > 0.6) {
      return "red";
    } else if (num > 0.4) {
      return "yellow";
    }
    return "green";
  }

  savingGraphColorPicker(num) {
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
      labels: ["Total Debt", "Total Savings"],
      datasets: [
        {
          data: [totalDebtAmount, totalSavingAmount],
          backgroundColor: [
            this.DebtGraphColorPicker(totalDebtAmount / totalSavingAmount),
            this.savingGraphColorPicker(totalSavingAmount)
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
      <Wrapper>
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
        </div>
        <WhatIfContainer>
          <div>
            {purchasePaymentType === "credit" ? (
              <RealCostOfCredit
                purchaseFrequency={purchaseFrequency}
                purchaseAmount={purchaseAmount}
              />
            ) : null}
            <div style={{ textAlign: "center" }}>
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
        </WhatIfContainer>
        <Link to="/goblin-advice">
          <button>What Would the Goblin Do?</button>
        </Link>
      </Wrapper>
    );
  }
}

export default SnapshotResults;
