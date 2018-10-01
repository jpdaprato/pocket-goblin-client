import React from "react";
import CashFlow from "./CashFlow";
import Footer from "./Footer";
import Header from "./Header";
import Repeat from "./Repeat";
import Pay from "./Pay";
import Purchase from "./Purchase";

const Container = () => {
  const divStyle = {
    border: "5px solid gray",
    padding: "25px",
    width: "75%",
    margin: "auto"
  };
  return (
    <div style={divStyle}>
      <Header />
      <Purchase />
      <CashFlow />
      <Repeat />
      <Pay />
      <Footer />
    </div>
  );
};

export default Container;
