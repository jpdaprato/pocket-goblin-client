import React from "react";
import DashBoard from "./DashBoard";
import DashBoardFooter from "./DashBoardFooter";
import FinancialSnapShotContainer from "../FinancialSnapShotContainer/FinancialSnapShotContainer";

class DashBoardContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      view: "dashBoard"
    };
    this.viewSwitcher = this.viewSwitcher.bind(this);
    this.setView = this.setView.bind(this);
  }

  viewSwitcher() {
    const { view } = this.state;
    if (view === "dashBoard") {
      return <DashBoardFooter setView={this.setView} />;
    } else if (view === "snapShot") {
      return <FinancialSnapShotContainer />;
    }
  }

  setView() {
    this.setState({
      view: "snapShot"
    });
  }

  render() {
    return <DashBoard viewSwitcher={this.viewSwitcher} />;
  }
}

export default DashBoardContainer;
