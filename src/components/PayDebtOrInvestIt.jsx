import React from "react";
import PayDebtRecurring from "./PayDebtRecurring.jsx";
import PayDebtNonRecurring from "./PayDebtNonRecurring.jsx";
import InvestItRecurring from "./InvestItRecurring.jsx";
import InvestItNonRecurring from "./InvestItNonRecurring.jsx";

const PayDebtOrInvestIt = props => {
  const isRecurring = props.purchaseFrequency !== "never";
  const isPayDebtSelected = props.payDebtOrInvestItSelection === "debt";

  //"Pay Debt" selected && Purchase Amount Repeats Never
  if (isPayDebtSelected && !isRecurring) {
    return (
      <PayDebtNonRecurring
        debtFreeFasterBy={props.debtFreeFasterBy}
        interestSavedAmount={props.interestSavedAmount}
        totalSavedAmount={props.totalSavedAmount}
        purchaseAmount={props.purchaseAmount}
      />
    );
  }

  //"Pay Debt" selected && Purchase Amount Repeats
  if (isPayDebtSelected && isRecurring) {
    return (
      <PayDebtRecurring
        debtFreeFasterBy={props.debtFreeFasterBy}
        interestSavedAmount={props.interestSavedAmount}
        totalSavedAmount={props.totalSavedAmount}
        purchaseAmount={props.purchaseAmount}
      />
    );
  }

  //"Invest It" selected && Purchase Amount Repeats Never
  if (!isPayDebtSelected && !isRecurring) {
    return (
      <InvestItNonRecurring
        investmentTimeline={props.investmentTimeline}
        purchaseAmount={props.purchaseAmount}
        rateOfReturn={props.rateOfReturn}
      />
    );
  }

  //"Invest It" selected && Purchase Amount Repeats
  if (!isPayDebtSelected && isRecurring) {
    return (
      <InvestItRecurring
        investmentTimeline={props.investmentTimeline}
        purchaseAmount={props.purchaseAmount}
        rateOfReturn={props.rateOfReturn}
      />
    );
  }
};

export default PayDebtOrInvestIt;
