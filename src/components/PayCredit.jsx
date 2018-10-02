import React from "react";

const PayCredit = () => {
  const divStyle = {
    border: "5px solid purple",
    padding: "5px",
    marginTop: "5px",
    marginBottom: "15px",
    marginLeft: "75%"
    // float: "up"
  };

  return (
    <div style={divStyle}>
      <input type="radio" /> Pay with Credit
    </div>
  );
};

export default PayCredit;
