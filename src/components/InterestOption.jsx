import React from "react";
import PayDebt from "./PayDebt";

class InterestOption extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      button: ""
    };

    this.setDebt = this.setDebt.bind(this);
    this.setInvest = this.setInvest.bind(this);
    this.viewSwitch = this.viewSwitch.bind(this);
  }

  setDebt() {
    console.log("debt");
    this.setState({ button: "debt" });
  }

  setInvest() {
    console.log("Invest");
    this.setState({ button: "invest" });
  }

  viewSwitch() {
    const { button } = this.state;
    if (button === "") {
      return;
    } else if (button === "debt") {
      return <PayDebt />;
    } else if (button === "invest") {
      return <h1>invest stuff</h1>;
    }
    return;
  }

  render() {
    return (
      <div>
        <h3>InterestOption</h3>
        <button onClick={this.setDebt}>Pay Debt</button>
        <button onClick={this.setInvest}>Invest it</button>
        {this.viewSwitch()}
      </div>
    );
  }
}

export default InterestOption;
