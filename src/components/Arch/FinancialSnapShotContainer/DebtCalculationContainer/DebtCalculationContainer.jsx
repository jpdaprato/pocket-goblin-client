import React from "react";
import DebtCalculation from "./DebtCalculation";

class DebtCalculationContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      payOffTime: 2,
      totalInterest: 3,
      totalCost: 4
    };
  }

  render() {
    const { payOffTime, totalInterest, totalCost } = this.state;
    return (
      <DebtCalculation
        payOffTime={payOffTime}
        totalInterest={totalInterest}
        totalCost={totalCost}
      />
    );
  }
}

export default DebtCalculationContainer;
