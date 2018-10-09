import React from "react";
import { calculateCompoundInterest } from "../helpers/finance";

const InvestItNonRecurring = props => {
  {
    console.log(props);
  }

  const compoundInterestObject = calculateCompoundInterest(
    props.purchaseAmount,
    1 + props.rateOfReturn,
    props.investmentTimeline,
    false
  );

  const interestEarned = Number(
    compoundInterestObject.interestEarned.toFixed(2)
  );

  const totalEarnedIfInvested = Number(compoundInterestObject.total.toFixed(2));

  return (
    <div>
      <h4>Investment Timeline {props.investmentTimeline} Years</h4>
      <h4>Interest You Would Earn ${interestEarned}</h4>
      <h4>
        Real Cost of Spending Today ${props.purchaseAmount + interestEarned}
      </h4>
      <p>
        {`If you choose to invest the $${props.purchaseAmount} rather than
        spend it today, you could earn $${interestEarned} in interest!
        This would bring the real opportunity cost of what you are spending
        your money on to $${totalEarnedIfInvested}
        after 20 years. So the question you should ask yourself is this: Is
        spending $${props.purchaseAmount} today worth the $
        ${interestEarned} that you're passing up?`}
      </p>
    </div>
  );
};

export default InvestItNonRecurring;
