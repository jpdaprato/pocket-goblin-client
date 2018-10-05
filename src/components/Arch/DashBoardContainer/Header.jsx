import React from "react";

const Header = props => {
  const divStyle = {
    // border: "5px solid black",
    padding: "5px",
    marginTop: "5px",
    marginBottom: "15px"
  };

  const hStyle = {
    textAlign: "center"
  };

  return (
    <div style={divStyle}>
      <h3 style={hStyle}>{props.title}</h3>
    </div>
  );
};

export default Header;
