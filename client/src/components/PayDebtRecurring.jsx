import React from "react";

const PayDebtRecurring = props => {
  return (
    <div>
      <h4>Be Debt-Free Faster by {props.debtFreeFasterBy} months</h4>
      <h4>Save interest of ${props.interestSavedAmount}</h4>
      <h4>{`Total You'll Save $${props.totalSavedAmount}`}</h4>
      <p>
        {`If you choose to pay down debt with the $${props.purchaseAmount}
            rather than spend it every month, you could save $${
              props.interestSavedAmount
            } in interest payments and reduce the time it would take you to get out
            of debt by ${
              props.debtFreeFasterBy
            } months. So the question you should ask
            yourself is: "Is spending $${props.purchaseAmount} every month worth
            giving up ${props.totalSavedAmount} tomorrow?"`}
      </p>
    </div>
  );
};

export default PayDebtRecurring;
