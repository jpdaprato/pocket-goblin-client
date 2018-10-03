import React from "react";

class DebtFreeBy extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      debtFree: 0
    };
  }

  render() {
    const { debtFree } = this.state;
    return (
      <div style={{ paddingTop: "10px" }}>
        Be Debt-Free Faster by {debtFree} months
      </div>
    );
  }
}

export default DebtFreeBy;
