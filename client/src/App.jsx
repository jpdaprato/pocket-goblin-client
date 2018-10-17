import React, { Component } from "react";
import styled from "react-emotion";

const Wrapper = styled("div")`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
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
        <button onClick={this.goTo.bind(this, "home")}>Home</button>
        <h3>Pocket Goblin</h3>
        {!isAuthenticated() && (
          <button onClick={this.login.bind(this)}>Log In</button>
        )}
        {isAuthenticated() && (
          <button onClick={this.logout.bind(this)}>Log Out</button>
        )}
      </Wrapper>
    );
  }
}

export default App;
