import React from "react";

const divStyle = {
  padding: "5px",
  marginTop: "5px",
  marginBottom: "15px"
};

const div2Style = {
  marginLeft: "45%"
};

const Repeat = () => {
  return (
    <div style={divStyle}>
      <div style={div2Style}>
        Repeat:
        <select>
          <option value="never">Never</option>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
          <option value="yearly">Yearly</option>
        </select>
      </div>
    </div>
  );
};

export default Repeat;
