import React, { Component } from "react";
import { Navbar, Button } from "react-bootstrap";
import LinkItems from "./components/LinkItems.jsx";
<<<<<<< HEAD
class App extends Component {
  goTo(route) {
    this.props.history.replace(`/${route}`);
=======
import GoblinAdvice from "./components/GoblinAdvice.jsx";
import TopSpending from "./components/TopSpending";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentCashFlowAmount: 0,
      purchaseAmount: 100,
      purchaseFrequency: "never",
      purchasePaymentType: "cash",
      totalDebtAmount: 0,
      totalSavingAmount: 0
    };
    this.handlePurchaseInput = this.handlePurchaseInput.bind(this);
    this.handlePurchaseFrequencyChange = this.handlePurchaseFrequencyChange.bind(
      this
    );
    this.handlePaymentTypeChange = this.handlePaymentTypeChange.bind(this);
>>>>>>> Render 3 graphs to the page
  }

  login() {
    this.props.auth.login();
  }

  logout() {
    this.props.auth.logout();
  }

  render() {
    const { isAuthenticated } = this.props.auth;

    return (
      <div>
        <Navbar fluid>
          <Navbar.Header>
            <Navbar.Brand>
              <a href="#">Pocket Goblin</a>
            </Navbar.Brand>
            <Button
              bsStyle="primary"
              className="btn-margin"
              onClick={this.goTo.bind(this, "home")}
            >
              Home
            </Button>
            {!isAuthenticated() && (
              <Button
                id="qsLoginBtn"
                bsStyle="primary"
                className="btn-margin"
                onClick={this.login.bind(this)}
              >
                Log In
              </Button>
            )}
            {isAuthenticated() && (
              <Button
                id="qsLogoutBtn"
                bsStyle="primary"
                className="btn-margin"
                onClick={this.logout.bind(this)}
              >
                Log Out
              </Button>
            )}
          </Navbar.Header>
          <LinkItems />
        </Navbar>
      </div>
    );
  }
}

export default App;
