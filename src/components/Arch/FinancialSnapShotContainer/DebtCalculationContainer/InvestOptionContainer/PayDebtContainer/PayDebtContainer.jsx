import React from "react";
import PayDebt from "../PayDebt";

class PayDebtContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      interestSaved: 6,
      debtFree: 7,
      totalSaved: 10,
      purchase: 18
    };
  }

  render() {
    const { interestSaved, debtFree, totalSaved, purchase } = this.state;
    return (
      <PayDebt
        interestSaved={interestSaved}
        debtFree={debtFree}
        totalSaved={totalSaved}
        purchase={purchase}
      />
    );
  }
}

export default PayDebtContainer;
