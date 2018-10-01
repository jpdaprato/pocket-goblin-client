import React from "react";

const Purchases = () => {
  const divStyle = {
    border: "5px solid #7c160e",
    padding: "5px",
    marginTop: "5px",
    marginBottom: "15px"
  };

  const hStyle = {
    textAlign: "center"
  };

  const inputStyle = {
    margin: "10px 50% 10px 46%"
  };

  return (
    <div style={divStyle}>
      <h3 style={hStyle}>Eanter Potential Purchase</h3>
      <input style={inputStyle} type="number" placeholder="Purchase amount" />
    </div>
  );
};

export default Purchases;
