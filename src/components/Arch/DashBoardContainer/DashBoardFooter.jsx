import React from "react";
import Repeat from "./Repeat";
import Pay from "./Pay";
import Footer from "./Footer";

const divStyle = {
  padding: "25px",
  width: "75%",
  margin: "auto"
};

const DashBoardFooter = ({ setView }) => {
  return (
    <div style={divStyle}>
      <Repeat />
      <Pay />
      <Footer setView={setView} />
    </div>
  );
};

export default DashBoardFooter;
