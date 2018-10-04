import React from "react";

const divStyle = {
  padding: "10px",
  width: "30%",
  textAlign: "center",
  marginLeft: "35%"
};

class PayDebtMessage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { purchase, saved, debtFree } = this.props;
    return (
      <div style={divStyle}>
        If you choose to pay down debt with the ${purchase} rather thean spend
        it today, you could save ${saved} in interest payments and reduce the
        time it will you to get out of debt by {debtFree} months. So the
        question you should ask yourself is this: is spending ${purchase} today
        worth it?
      </div>
    );
  }
}

export default PayDebtMessage;
