import React from "react";

const divStyle = {
  paddingTop: "10px"
};

class DebtFreeBy extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { debtFree } = this.props;
    return <div style={divStyle}>Be Debt-Free Faster by {debtFree} months</div>;
  }
}

export default DebtFreeBy;
