import React from "react";
import InvestmentTimeLine from "./InvestmentTimeLine";
import InterestEarn from "./InterestEarn";
import RealCostToday from "./RealCostToday";
import InvestMessage from "./InvestMessage";

const divStyle = {
  padding: "5px",
  marginTop: "5px",
  marginBottom: "15px",
  textAlign: "center"
};

const InvestInfo = () => {
  return (
    <div style={divStyle}>
      <InvestmentTimeLine />
      <InterestEarn />
      <RealCostToday />
      <InvestMessage />
    </div>
  );
};

export default InvestInfo;
