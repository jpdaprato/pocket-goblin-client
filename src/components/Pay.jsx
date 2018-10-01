import React from "react";
import PayCash from "./PayCash";
import PayCredit from "./PayCredit";
const Pay = () => {
  const divStyle = {
    border: "5px solid green",
    padding: "5px",
    marginTop: "5px",
    marginBottom: "15px"
  };

  return (
    <div style={divStyle}>
      <PayCash />
      <PayCredit />
    </div>
  );
};

export default Pay;
