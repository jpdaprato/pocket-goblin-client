import React from "react";
import InvestInfo from "./InvestInfo";

class InvestInfoContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      interstEarn: 2703.38,
      realCostToday: 3175.38
    };
  }
  render() {
    return <InvestInfo />;
  }
}

export default InvestInfoContainer;
