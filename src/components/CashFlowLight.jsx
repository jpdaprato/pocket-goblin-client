import React from "react";

const divStyle = {
  // border: "5px solid #e27f14",
  padding: "5px",
  marginTop: "5px",
  marginBottom: "15px"
  // width: "250px",
  // height: "40px"
  // marginLeft: "60%"
};

let redCircle = {
  // paddingBottom: "5px",
  height: "25px",
  width: "25px",
  backgroundColor: "rgba(255, 0, 0, 0.3)",
  borderRadius: "50%",
  display: "inline-block"
  // float: "right"
};

let yellowCircle = {
  // paddingBottom: "5px",
  height: "25px",
  width: "25px",
  backgroundColor: "rgba(255, 255, 0, 0.3)",
  borderRadius: "50%",
  display: "inline-block"
  // float: "right"
};

let greenCircle = {
  // paddingBottom: "5px",
  height: "25px",
  width: "25px",
  backgroundColor: "rgba(0, 255, 0, 0.3)",
  borderRadius: "50%",
  display: "inline-block"
  // float: "right"
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
      cashFlow: 73
    };
  }

  stopLight() {
    const { cashFlow } = this.state;

    if (cashFlow < 40) {
      redCircle.backgroundColor = "rgba(255, 0,0, 1)";
      return lights;
    } else if (cashFlow < 74) {
      yellowCircle.backgroundColor = "rgba(255, 255, 0, 1)";
      return lights;
    } else {
      greenCircle.backgroundColor = "rgba(0, 255, 0, 1)";
      return lights;
    }
  }

  render() {
    return <div style={divStyle}>{this.stopLight()}</div>;
  }
}

export default CashFlowLight;
