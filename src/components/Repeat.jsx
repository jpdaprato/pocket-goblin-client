import React from "react";

const Repeat = () => {
  const divStyle = {
    border: "5px solid yellow",
    padding: "5px",
    marginTop: "5px",
    marginBottom: "15px"
  };

  const pStyle = {
    marginLeft: "80%"
  };

  return (
    <div style={divStyle}>
      <p>Repeat</p>
      <p style={pStyle}>Never</p>
    </div>
  );
};

export default Repeat;
