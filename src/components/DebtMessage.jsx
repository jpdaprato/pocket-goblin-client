import React from "react";

const DebtMessage = ({ payoff, interest, cost }) => {
  return (
    <div
      style={{
        padding: "10px",
        width: "30%",
        textAlign: "center",
        marginLeft: "35%"
      }}
    >
      Based on your current spending pattern,you should pay this off after{" "}
      {payoff} months. You will pay ${interest} in interest alone! The total
      cost of making this purchase for you will be ${cost}
    </div>
  );
};

export default DebtMessage;
