import React from "react";

const divStyle = {
  padding: "10px",
  width: "30%",
  textAlign: "center",
  marginLeft: "35%"
};

const DebtMessage = ({ payOffTime, totalInterest, totalCost }) => {
  return (
    <div style={divStyle}>
      Based on your current spending pattern,you should pay this off after{" "}
      {payOffTime} months. You will pay ${totalInterest} in interest alone! The
      total cost of making this purchase for you will be ${totalCost}
    </div>
  );
};

export default DebtMessage;
