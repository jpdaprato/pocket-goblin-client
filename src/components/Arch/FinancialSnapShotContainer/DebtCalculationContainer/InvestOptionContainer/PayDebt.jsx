import React from "react";
import DebtFreeBy from "./PayDebtContainer/DebtFreeBy";
import SavedInterest from "./SavedInterest";
import TotalSaved from "./TotalSaved";
import PayDebtMessage from "./PayDebtMessage";

const divStyle = {
  paddingTop: "10px"
};

const PayDebt = ({ purchase, totalSaved, debtFree, interestSaved }) => {
  return (
    <div style={divStyle}>
      <DebtFreeBy debtFree={debtFree} />
      <SavedInterest interestSaved={interestSaved} />
      <TotalSaved totalSaved={totalSaved} />
      <PayDebtMessage
        purchase={purchase}
        totalSaved={totalSaved}
        debtFree={debtFree}
      />
    </div>
  );
};

export default PayDebt;
