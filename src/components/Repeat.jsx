import React from "react";

const Repeat = () => {
  const divStyle = {
    border: "5px solid yellow",
    padding: "5px",
    marginTop: "5px",
    marginBottom: "15px",
    margin: "auto"
  };

  return (
    <div style={divStyle}>
      Repeat:
      <select stlye={{ marginLeft: 5 }}>
        <option value="never">Never</option>
        <option value="weekly">Weekly</option>
        <option value="monthly">Monthly</option>
        <option value="yearly">Yearly</option>
      </select>
    </div>
  );
};

export default Repeat;
