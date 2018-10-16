import React, { Component } from "react";
import { Navbar, Button } from "react-bootstrap";
import styled from "react-emotion";

//Styled Components
const Wrapper = styled("div")`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 3%;
`;

class App extends Component {
  goTo(route) {
    this.props.history.replace(`/${route}`);
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
      <Wrapper className="nav">
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
        </Navbar>
      </Wrapper>
    );
  }
}

export default App;
