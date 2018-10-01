import React from "react";
import CashFlowLight from "./CashFlowLight";
const CashFlow = () => {
  const divStyle = {
    border: "5px solid red",
    padding: "5px",
    marginTop: "5px",
    marginBottom: "15px"
  };

  const cashFlowLight = {
    border: "5px solid #e27f14",
    padding: "5px",
    marginTop: "5px",
    marginBottom: "5px"
  };

  return (
    <div style={divStyle}>
      <p>Current Cash Flow</p>
      <div>
        <CashFlowLight />
      </div>
    </div>
  );
};

export default CashFlow;
