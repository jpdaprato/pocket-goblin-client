import React from "react";

const divStyle = {
  paddingTop: "10px"
};

const TotalCost = ({ totalCost }) => {
  return <div style={divStyle}>Total cost after paying ${totalCost}</div>;
};

export default TotalCost;
