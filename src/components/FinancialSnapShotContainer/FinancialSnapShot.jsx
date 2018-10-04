import React from "react";
import DebtToSavingRatio from "./DebtToSavingRatio";
import Saving from "./Saving";
import DebtCalculationContainer from "./DebtCalculationContainer/DebtCalculationContainer";
import GoblinPic from "./GoblinPic";

const divStyle = {
  padding: "5px",
  marginTop: "5px",
  marginBottom: "15px"
};

const buttonStyle = {
  marginLeft: "40%"
};

const FinancialSnapShot = ({ debtToSaving, saving }) => {
  return (
    <div style={divStyle}>
      <div>
        <DebtToSavingRatio />
      </div>
      <Saving />
      <DebtCalculationContainer />
      <GoblinPic />
      <button style={buttonStyle}>What Would the Goblin Do?</button>
    </div>
  );
};

export default FinancialSnapShot;
