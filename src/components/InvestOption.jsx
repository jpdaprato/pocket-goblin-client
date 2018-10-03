import React from "react";
import PayDebt from "./PayDebt";
import SavedInterest from "./SavedInterest";
import TotalSaved from "./TotalSaved";
import PayDebtMessage from "./PayDebtMessage";

class InvestOption extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      button: "",
      interestSaved: 6,
      debtFree: 7,
      totalSaved: 10,
      purchase: 18
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
    const {
      button,
      purchase,
      totalSaved,
      debtFree,
      interestSaved
    } = this.state;
    if (button === "") {
      return;
    } else if (button === "debt") {
      return (
        <div>
          <PayDebt debtFree={debtFree} />
          <SavedInterest interestSaved={interestSaved} />
          <TotalSaved totalSaved={totalSaved} />
          <PayDebtMessage
            purchase={purchase}
            saved={totalSaved}
            debtFree={debtFree}
          />
        </div>
      );
    } else if (button === "invest") {
      return <h1>invest your money</h1>;
    }
    return;
  }

  render() {
    return (
      <div>
        <h3>Or, what you if you instead...</h3>
        <button onClick={this.setDebt}>Pay Debt</button>
        <button onClick={this.setInvest}>Invest it</button>
        {this.viewSwitch()}
      </div>
    );
  }
}

export default InvestOption;
