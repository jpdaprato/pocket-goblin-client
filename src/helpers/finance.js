export function calculateCompoundInterest(
  amount, //amount to calculate interest on
  interestRate, //rate for period
  investmentTimeline, // timeline in n periods
  isRecurring // if recurring, amount is added back at each period
) {
  var total = amount;
  var invested = 0;
  for (let i = 0; i < investmentTimeline; i++) {
    invested += amount;
    total *= interestRate;
    if (isRecurring) {
      total += amount;
    }
  }

  if (isRecurring) {
    return {
      total: total,
      amountInvested: invested,
      interestEarned: total - invested
    };
  }

  return {
    total: total,
    amountInvested: amount,
    interestEarned: total - amount
  };
}
