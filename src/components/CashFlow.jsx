import React from "react";
import CashFlowLight from "./CashFlowLight";

const CashFlow = () => {
  const divStyle = {
    // border: "5px solid red",
    padding: "5px",
    marginTop: "5px",
    marginBottom: "15px"
  };

  return (
    <div style={divStyle}>
      <div style={{ textAlign: "center", paddingTop: "5px" }}>
        Current Cash Flow <CashFlowLight />
      </div>
    </div>
  );
};

export default CashFlow;
