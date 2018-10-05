import React from "react";
import InputAmount from "./InputAmount.jsx";
import CashFlowMeter from "./CashFlowMeter.jsx";

class EnterPurchase extends React.Component {
  render() {
    const {
      handlePotentialPurchaseInput,
      currentCashFlowAmount,
      potentialPurchaseFrequency,
      handlePotentialPurchaseFrequencyChange,
      potentialPurchasePaymentType,
      handlePotentialPaymentType
    } = this.props;
    return (
      <div>
        <h1>Enter potential purchase</h1>
        <InputAmount
          handlePotentialPurchaseInput={handlePotentialPurchaseInput}
        />
        <CashFlowMeter currentCashFlowAmount={currentCashFlowAmount} />
        Repeat:
        <select
          value={potentialPurchaseFrequency}
          onChange={handlePotentialPurchaseFrequencyChange}
        >
          <option value="never">Never</option>
          <option value="weekly">Weekly</option>
        </select>
        <div>
          <input
            name="paymentType"
            type="radio"
            value="cash" // checked={potentialPurchasePaymentType === "cash"}
            onChange={handlePotentialPaymentType}
          />
          Pay in Cash
          <input
            name="paymentType"
            type="radio"
            value="credit" // checked={potentialPurchasePaymentType === "credit"}
            onChange={handlePotentialPaymentType}
          />
          Pay with Credit
        </div>
      </div>
    );
  }
}

export default EnterPurchase;
