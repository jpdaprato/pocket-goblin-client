import React from "react";

const divStyle = {
  border: "5px solid #7c160e",
  padding: "5px",
  marginTop: "5px",
  marginBottom: "15px"
};

const hStyle = {
  textAlign: "center"
};

const inputStyle = {
  marginLeft: "45%"
};

class Purchases extends React.Component {
  constructor() {
    super();
    this.state = {
      input: false,
      amount: 0
    };
    this.changeToInput = this.changeToInput.bind(this);
    this.setAmount = this.setAmount.bind(this);
  }

  changeToInput() {
    const { input } = this.state;
    this.setState({
      input: !input
    });
  }

  setAmount(e) {
    this.setState({
      amount: e.target.value
    });
  }

  viewSwitch() {
    const { input } = this.state;
    if (input === false) {
      return (
        <label style={inputStyle} onClick={this.changeToInput}>
          $ Enter amount
        </label>
      );
    } else {
      return (
        <p style={inputStyle}>
          $
          <input
            onChange={this.setAmount}
            type="number"
            placeholder="Purchase amount"
          />
        </p>
      );
    }
  }

  render() {
    return (
      <div style={divStyle}>
        <h3 style={hStyle}>Eanter Potential Purchase</h3>
        {this.viewSwitch()}
      </div>
    );
  }
}

export default Purchases;
