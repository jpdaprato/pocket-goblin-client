import React from "react";

const divStyle = {
  // border: "5px solid green",
  padding: "5px",
  marginTop: "5px",
  marginBottom: "15px",
  paddingLeft: "40%"
};

class Pay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      payType: ""
    };
    this.setPayType = this.setPayType.bind(this);
    this.payOption = this.payOption.bind(this);
  }

  setPayType(e) {
    this.setState({
      payType: e.target.defaultValue
    });
  }

  payOption() {
    const { payType } = this.state;
    if (payType === "") {
      return;
    } else if (payType === "cash") {
      return <h1>cash Options</h1>;
    } else {
      return <h1>credit Option</h1>;
    }
  }

  render() {
    return (
      <div style={divStyle}>
        <input name="pay" onClick={this.setPayType} value="cash" type="radio" />{" "}
        Pay in Cash
        <input
          name="pay"
          onClick={this.setPayType}
          value="credit"
          type="radio"
        />{" "}
        Pay with Credit
        {this.payOption()}
      </div>
    );
  }
}

export default Pay;
