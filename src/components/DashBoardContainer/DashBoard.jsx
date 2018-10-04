import React from "react";
import Header from "./Header";
import Purchase from "./Purchase";
import CashFlow from "./CashFlow";

const DashBoard = ({ viewSwitcher }) => {
  return (
    <div>
      <Header />
      <Purchase />
      <CashFlow />
      {viewSwitcher()}
    </div>
  );
};

export default DashBoard;
