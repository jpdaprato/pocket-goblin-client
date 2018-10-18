import React from "react";
import { Route, Router } from "react-router-dom";
import styled, { injectGlobal } from "react-emotion";
import history from "../history";
import Auth from "../Auth/Auth";
import App from "../App.jsx";
import Home from "../Home/Home.jsx";
import Callback from "../Callback/Callback.jsx";
import EnterPurchase from "./EnterPurchase.jsx";
import SnapshotResults from "./SnapshotResults.jsx";
import GoblinAdvice from "./GoblinAdvice.jsx";
import TopSpending from "./TopSpending.jsx";

injectGlobal`
  @font-face {
    font-family: 'Arsenal', sans-serif;
    src: url('https://fonts.googleapis.com/css?family=Arsenal:400,700');
  }
  
  body {
    font-family: 'Arsenal', sans-serif; 
  }

`;

const Wrapper = styled("div")`
  display: grid;
  justify-content: center;
  margin-top: 2rem;
  grid-template-columns: 400px;
`;

const auth = new Auth();

const handleAuthentication = ({ location }) => {
  if (/access_token|id_token|error/.test(location.hash)) {
    auth.handleAuthentication();
  }
};

const RouterComponent = props => {
  const {
    handlePurchaseInput,
    handlePurchaseFrequencyChange,
    handlePaymentTypeChange,
    currentCashFlowAmount,
    purchaseFrequency,
    purchasePaymentType,
    totalDebtAmount,
    totalSavingAmount,
    purchaseAmount
  } = props;

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
        <Route
          path="/enter-purchase"
          render={props => (
            <EnterPurchase
              auth={auth}
              handlePurchaseInput={handlePurchaseInput}
              currentCashFlowAmount={currentCashFlowAmount}
              purchaseFrequency={purchaseFrequency}
              handlePurchaseFrequencyChange={handlePurchaseFrequencyChange}
              purchasePaymentType={purchasePaymentType}
              handlePaymentTypeChange={handlePaymentTypeChange}
              purchaseAmount={purchaseAmount}
              {...props}
            />
          )}
        />
        <Route
          path="/snapshot-results"
          render={props => (
            <SnapshotResults
              auth={auth}
              handlePurchaseInput={handlePurchaseInput}
              currentCashFlowAmount={currentCashFlowAmount}
              totalDebtAmount={totalDebtAmount}
              totalSavingAmount={totalSavingAmount}
              purchaseAmount={purchaseAmount}
              purchaseFrequency={purchaseFrequency}
              purchasePaymentType={purchasePaymentType}
              {...props}
            />
          )}
        />
        <Route
          path="/goblin-advice"
          render={props => <GoblinAdvice auth={auth} {...props} />}
        />
        <Route
          path="/top-spending"
          render={props => <TopSpending auth={auth} {...props} />}
        />
      </Wrapper>
    </Router>
  );
};

export default RouterComponent;
