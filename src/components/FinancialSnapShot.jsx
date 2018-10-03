import React from "react";
import CashFlow from "./CashFlow";
import DebtToSavingRatio from "./DebtToSavingRatio";
import Header from "./Header";
import Purchase from "./Purchase";
import Saving from "./Saving";
import DebtCalculation from "./DebtCalculation";

const divStyle = {
  // border: "5px solid yellow",
  padding: "5px",
  marginTop: "5px",
  marginBottom: "15px"
};

class FinancialSnapShot extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      debtToSaving: 0,
      saving: 0
    };
  }
  render() {
    return (
      <div style={divStyle}>
        <Header />
        <Purchase />
        <CashFlow />
        <div>
          <DebtToSavingRatio />
        </div>
        <Saving />
        <DebtCalculation />
      </div>
    );
  }
}

export default FinancialSnapShot;
