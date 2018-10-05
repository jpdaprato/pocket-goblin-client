import React from "react";

const divStyle = {
  padding: "5px",
  marginTop: "5px",
  marginBottom: "15px"
};

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
  backgroundColor: "rgba(255, 255, 0, 1)",
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

class CashFlowLight extends React.Component {
  constructor() {
    super();
    this.state = {
      cashFlow: 79
    };
  }

  stopLight() {
    const { cashFlow } = this.state;

    if (cashFlow < 40) {
      // redCircle.backgroundColor = "rgba(255, 0,0, 1)";
      return lights;
    } else if (cashFlow < 74) {
      // yellowCircle.backgroundColor = "rgba(255, 255, 0, 1)";
      return lights;
    } else {
      // greenCircle.backgroundColor = "rgba(0, 255, 0, 1)";
      return lights;
    }
  }

  render() {
    return <div style={divStyle}>{this.stopLight()}</div>;
  }
}

export default CashFlowLight;
