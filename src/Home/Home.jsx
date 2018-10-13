import React, { Component } from "react";
import { Link } from "react-router-dom";
import LinkItems from "../components/LinkItems.jsx";
class Home extends Component {
  login() {
    this.props.auth.login();
  }

  render() {
    const { isAuthenticated } = this.props.auth;
    return (
      <div className="container">
        {isAuthenticated() && (
          <div>
            <LinkItems />
            <Link to="/enter-purchase">
              <button>Enter a Purchase</button>
            </Link>
          </div>
        )}
        {!isAuthenticated() && (
          <h4>
            You are not logged in! Please{" "}
            <a style={{ cursor: "pointer" }} onClick={this.login.bind(this)}>
              Log In
            </a>{" "}
            to continue.
          </h4>
        )}
      </div>
    );
  }
}

export default Home;
