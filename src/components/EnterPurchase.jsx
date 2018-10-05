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
      handlePotentialPaymentTypeChange
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
          onBlur={handlePotentialPurchaseFrequencyChange}
          // onChange={handlePotentialPurchaseFrequencyChange}
        >
          <option value="never">Never</option>
          <option value="weekly">Weekly</option>
        </select>
        <div>
          {/* https://techblog.commercetools.com/seven-patterns-by-example-the-many-ways-to-type-radio-in-react-bfe14322bb6f */}
          <input
            name="paymentType"
            type="radio"
            value="cash"
            checked={potentialPurchasePaymentType === "cash"}
            onChange={handlePotentialPaymentTypeChange}
          />
          Pay in Cash
          <input
            name="paymentType"
            type="radio"
            value="credit"
            checked={potentialPurchasePaymentType === "credit"}
            onChange={handlePotentialPaymentTypeChange}
          />
          Pay with Credit
        </div>
      </div>
    );
  }
}

export default EnterPurchase;
