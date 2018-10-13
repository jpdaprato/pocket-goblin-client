import React from "react";
import { Link } from "react-router-dom";
import styled from "react-emotion";
import InputAmount from "./InputAmount.jsx";
import CashFlowMeter from "./CashFlowMeter.jsx";

//Styled Components
const Wrapper = styled("div")`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

class EnterPurchase extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      handlePurchaseInput,
      currentCashFlowAmount,
      purchaseFrequency,
      handlePurchaseFrequencyChange,
      purchasePaymentType,
      purchaseAmount,
      handlePaymentTypeChange
    } = this.props;

    return (
      <Wrapper>
        <h1>Enter potential purchase</h1>
        <InputAmount
          handlePurchaseInput={handlePurchaseInput}
          purchaseAmount={purchaseAmount}
        />
        <div>
          <h3>Cash Flow</h3>
          <CashFlowMeter
            currentCashFlowAmount={currentCashFlowAmount}
            purchaseAmount={purchaseAmount}
          />
        </div>
        <div style={{ margin: "2%" }}>
          Repeat:
          <select
            value={purchaseFrequency}
            onBlur={handlePurchaseFrequencyChange}
            onChange={handlePurchaseFrequencyChange}
          >
            <option value="never">Never</option>
            <option value="monthly">Monthly</option>
          </select>
        </div>

        <div style={{ margin: "2%", marginBottom: "2%" }}>
          <input
            name="paymentType"
            type="radio"
            value="cash"
            checked={purchasePaymentType === "cash"}
            onChange={handlePaymentTypeChange}
          />
          Pay in Cash
          <input
            name="paymentType"
            type="radio"
            value="credit"
            checked={purchasePaymentType === "credit"}
            onChange={handlePaymentTypeChange}
          />
          Pay with Credit
        </div>
        <Link to="/snapshot-results">
          <button>Start the Goblin!</button>
        </Link>
      </Wrapper>
    );
  }
}

export default EnterPurchase;
