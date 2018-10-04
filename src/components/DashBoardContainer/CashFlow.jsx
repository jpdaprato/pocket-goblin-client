import React from "react";
import CashFlowLight from "./CashFlowLight";

const divStyle = {
  padding: "5px",
  marginTop: "5px",
  marginBottom: "15px"
};

const hStyle = {
  textAlign: "center"
};

const div2 = {
  textAlign: "center",
  paddingTop: "5px"
};

const CashFlow = () => {
  return (
    <div style={divStyle}>
      <h3 style={hStyle}>What if you spend the money...</h3>
      <div style={div2}>
        Current Cash Flow <CashFlowLight />
      </div>
    </div>
  );
};

export default CashFlow;
