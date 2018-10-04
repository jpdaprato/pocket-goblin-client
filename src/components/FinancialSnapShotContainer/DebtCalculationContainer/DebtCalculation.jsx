import React from "react";
import PayOff from "./PayOff";
import InterestPayed from "./InterestPayed";
import TotalCost from "./TotalCost";
import DebtMessage from "./DebtMessage";
import InvestOptionContainer from "./InvestOptionContainer/InvestOptionContainer";

const divStyle = {
  // border: "5px solid yellow",
  padding: "5px",
  marginTop: "5px",
  marginBottom: "15px",
  textAlign: "center"
};

const DebtCalculation = ({ payOffTime, totalInterest, totalCost }) => {
  return (
    <div style={divStyle}>
      <h3>The real cost of putting it on Credit</h3>
      <PayOff payOffTime={payOffTime} />
      <InterestPayed totalInterest={totalInterest} />
      <TotalCost totalCost={totalCost} />
      <DebtMessage
        payOffTime={payOffTime}
        totalInterest={totalInterest}
        totalCost={totalCost}
      />
      <InvestOptionContainer />
    </div>
  );
};

export default DebtCalculation;
