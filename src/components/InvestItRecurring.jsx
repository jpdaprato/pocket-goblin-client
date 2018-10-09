import React from "react";
import { calculateCompoundInterest } from "../helpers/finance";

const InvestItRecurring = props => {
  const monthlyInterestRate = 1 + props.rateOfReturn / 12;
  const timelineInMonths = props.investmentTimeline * 12;

  const compoundInterestObject = calculateCompoundInterest(
    props.purchaseAmount,
    monthlyInterestRate,
    timelineInMonths,
    true
  );
  //Total spend for MONTHLY expense over investment timeline
  const totalSpend = Number(compoundInterestObject.amountInvested.toFixed(2));

  //Total interest user would earn if invested
  const interestEarned = Number(
    compoundInterestObject.interestEarned.toFixed(2)
  );

  const totalEarnedIfInvested = Number(compoundInterestObject.total.toFixed(2));

  {
    console.log(compoundInterestObject);
  }

  return (
    <div>
      <h4>Investment Timeline: {props.investmentTimeline} Years</h4>
      <h4>Total Dollars Spent: ${totalSpend}</h4>
      <h4>Interest You Would Earn: ${interestEarned}</h4>
      <h4>Real Cost of Spending Today: ${totalEarnedIfInvested}</h4>
      <p>
        {`If you choose to invest the $${
          props.purchaseAmount
        } every month rather than spend it, you could earn $${interestEarned} in interest!
        This would bring the real opportunity cost of what you are spending
        your money on to $${totalEarnedIfInvested}
        after 20 years! That's a lot of dough! So the question you should ask yourself is this: Is
        spending $${props.purchaseAmount} every month worth the $
        ${interestEarned} that you're passing up?`}
      </p>
    </div>
  );
};

export default InvestItRecurring;
