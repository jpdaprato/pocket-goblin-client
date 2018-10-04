import React from "react";

const divStyle = {
  padding: "5px",
  marginTop: "5px",
  marginBottom: "15px",
  width: "75%",
  margin: "auto"
};

const buttonStyle = {
  marginLeft: "45%"
};

const Footer = ({ setView }) => {
  return (
    <div style={divStyle}>
      <button style={buttonStyle} onClick={setView} type="button">
        Start the Goblin!
      </button>
    </div>
  );
};

export default Footer;
