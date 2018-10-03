import React from "react";
import CashFlow from "./CashFlow";
import DebtToSavingRatio from "./DebtToSavingRatio";
import Header from "./Header";

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
        <CashFlow />
        <div>
          <DebtToSavingRatio />
        </div>
      </div>
    );
  }
}

export default FinancialSnapShot;
