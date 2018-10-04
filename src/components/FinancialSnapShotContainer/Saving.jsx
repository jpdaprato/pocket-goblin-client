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
  width: "3%",
  height: "8px",
  borderStyle: "solid",
  borderColor: "red",
  backgroundColor: "red"
};

class Saving extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      saving: null
    };
  }

  render() {
    return (
      <div style={divStyle}>
        Saving
        <div style={debtBar} />
      </div>
    );
  }
}

export default Saving;
