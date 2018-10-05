import React from "react";

const InvestOption = ({ setDebt, setInvest, viewSwitch }) => {
  return (
    <div>
      <h3>Or, what you if instead...</h3>
      <button onClick={setDebt}>Pay Debt</button>
      <button onClick={setInvest}>Invest it</button>
      {viewSwitch()}
    </div>
  );
};

export default InvestOption;
