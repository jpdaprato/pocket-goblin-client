import React from "react";
import FinancialSnapShot from "./FinancialSnapShot";

class FinancialSnapShotContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      debtToSaving: 0,
      saving: 0
    };
  }
  render() {
    const { debtToSaving, saving } = this.state;
    return <FinancialSnapShot debtToSaving={debtToSaving} saving={saving} />;
  }
}

export default FinancialSnapShotContainer;
