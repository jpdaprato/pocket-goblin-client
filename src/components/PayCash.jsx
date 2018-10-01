import React from "react";

const PayCash = () => {
  const divStyle = {
    border: "5px solid blue",
    padding: "5px",
    marginTop: "5px",
    marginBottom: "15px",
    marginRight: "75%"
    // float: "left"
  };

  return (
    <div style={divStyle}>
      <input type="radio" /> Pay in Cash
    </div>
  );
};

export default PayCash;
