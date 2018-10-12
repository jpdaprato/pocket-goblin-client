import React from "react";
import { Route, Router } from "react-router-dom";
import styled from "react-emotion";
import App from "./App.jsx";
import Home from "./Home/Home.jsx";
import Callback from "./Callback/Callback.jsx";
import Auth from "./Auth/Auth";
import history from "./history";

//Grid Wrapper for entire app since this component
//creates the outermost div
const Wrapper = styled("div")`
  display: grid;
  justify-content: center;
  margin-top: 2rem;
`;

const auth = new Auth();

const handleAuthentication = ({ location }) => {
  if (/access_token|id_token|error/.test(location.hash)) {
    auth.handleAuthentication();
  }
};

export const makeMainRoutes = () => {
  return (
    <Router history={history}>
      <Wrapper className="routes-component">
        <Route path="/" render={props => <App auth={auth} {...props} />} />
        <Route path="/home" render={props => <Home auth={auth} {...props} />} />
        <Route
          path="/callback"
          render={props => {
            handleAuthentication(props);
            return <Callback {...props} />;
          }}
        />
      </Wrapper>
    </Router>
  );
};
