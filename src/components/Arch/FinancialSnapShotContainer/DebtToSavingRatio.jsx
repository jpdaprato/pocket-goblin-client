import React from "react";

const divStyle = {
  // border: "5px solid yellow",
  padding: "5px",
  marginTop: "5px",
  marginBottom: "15px",
  textAlign: "center"
};

const debtBar = {
  margin: "auto",
  width: "8%",
  height: "8px",
  borderStyle: "solid",
  borderColor: "yellow",
  backgroundColor: "yellow"
};

class DebtToSavingRatio extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      debtRatio: null
    };
  }

  render() {
    return (
      <div style={divStyle}>
        Debt To Saving
        <div style={debtBar} />
      </div>
    );
  }
}

export default DebtToSavingRatio;
