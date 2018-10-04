import React from "react";
import PayDebt from "./PayDebt";
import SavedInterest from "./SavedInterest";
import TotalSaved from "./TotalSaved";
import PayDebtMessage from "./PayDebtMessage";

const InvestOption = () => {
  return (
    <div>
      <h3>Or, what you if instead...</h3>
      <button onClick={this.setDebt}>Pay Debt</button>
      <button onClick={this.setInvest}>Invest it</button>
      {this.viewSwitch()}
    </div>
  );
};

export default InvestOption;
