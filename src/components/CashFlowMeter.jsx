import React from "react";

const CashFlowMeter = props => {
  let redCircle = {
    height: "25px",
    width: "25px",
    backgroundColor: "rgba(255, 0, 0, 0.3)",
    borderRadius: "50%",
    display: "inline-block"
  };

  let yellowCircle = {
    height: "25px",
    width: "25px",
    backgroundColor: "rgba(255, 255, 0, 0.3)",
    borderRadius: "50%",
    display: "inline-block"
  };

  let greenCircle = {
    height: "25px",
    width: "25px",
    backgroundColor: "rgba(0, 255, 0, 0.3)",
    borderRadius: "50%",
    display: "inline-block"
  };

  const lights = (
    <div>
      <span style={redCircle} />
      <span style={yellowCircle} />
      <span style={greenCircle} />
    </div>
  );

  const stopLight = amount => {
    if (amount < 40) {
      redCircle.backgroundColor = "rgba(255, 0,0, 1)";
      return lights;
    } else if (amount < 74) {
      yellowCircle.backgroundColor = "rgba(255, 255, 0, 1)";
      return lights;
    } else {
      greenCircle.backgroundColor = "rgba(0, 255, 0, 1)";
      return lights;
    }
  };

  return (
    <div>{stopLight(props.currentCashFlowAmount - props.purchaseAmount)}</div>
  );
};

export default CashFlowMeter;
