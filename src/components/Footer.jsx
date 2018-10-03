import React from "react";
import { Router, Link } from "@reach/router";
import FinancialSnapShot from "./FinancialSnapShot";

const Footer = () => {
  const divStyle = {
    // border: "5px solid #e874d4",
    padding: "5px",
    marginTop: "5px",
    marginBottom: "15px",
    width: "75%",
    margin: "auto"
  };

  const buttonStyle = {
    marginLeft: "45%"
  };

  return (
    <div style={divStyle}>
      <button style={buttonStyle} type="button">
        Start the Goblin!
      </button>
    </div>
  );
};

export default Footer;
