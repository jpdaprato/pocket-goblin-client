import React from "react";
import PayOff from "./PayOff";
import InterestPayed from "./InterestPayed";
import TotalCost from "./TotalCost";
import DebtMessage from "./DebtMessage";

const divStyle = {
  // border: "5px solid yellow",
  padding: "5px",
  marginTop: "5px",
  marginBottom: "15px",
  textAlign: "center"
};

class DebtCalculation extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      payOffTime: 0,
      totalInterest: 0,
      totalCost: 0
    };
  }

  render() {
    const { payOffTime, totalInterest, totalCost } = this.state;

    return (
      <div style={divStyle}>
        <h3>The real cost of putting it on Credit</h3>
        <PayOff payoff={payOffTime} />
        <InterestPayed interest={totalInterest} />
        <TotalCost cost={totalCost} />
        <DebtMessage
          payoff={payOffTime}
          interest={totalInterest}
          cost={totalCost}
        />
      </div>
    );
  }
}

export default DebtCalculation;
