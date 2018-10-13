import React from "react";
import { Route, Router } from "react-router-dom";
import styled from "react-emotion";
import history from "../history";
import Auth from "../Auth/Auth";
import App from "../App.jsx";
import Home from "../Home/Home.jsx";
import Callback from "../Callback/Callback.jsx";
import EnterPurchase from "./EnterPurchase.jsx";
import SnapshotResults from "./SnapshotResults.jsx";
import GoblinAdvice from "./GoblinAdvice.jsx";
import TopSpending from "./TopSpending.jsx";
import LinkItems from "./LinkItems.jsx";

<<<<<<< HEAD
class RouterComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentCashFlowAmount: 0,
      purchaseAmount: 0,
      purchaseFrequency: "never",
      purchasePaymentType: "cash",
      totalDebtAmount: 1500,
      totalSavingAmount: 3000
    };
    this.handlePurchaseInput = this.handlePurchaseInput.bind(this);
    this.handlePurchaseFrequencyChange = this.handlePurchaseFrequencyChange.bind(
      this
    );
    this.handlePaymentTypeChange = this.handlePaymentTypeChange.bind(this);
  }

  componentDidMount() {
    this.getItemData();
  }

  getItemData() {
    axios
      .post("http://localhost:8000/graphql", {
        query: "{ cashFlow totalDebt totalSavings }"
      })
      .then(({ data: { data } }) => {
        this.setState({
          currentCashFlowAmount: data.cashFlow,
          totalDebtAmount: data.totalDebt + 15000,
          totalSavingAmount: data.totalSavings
        });
      })
      /* eslint-disable-next-line */
      .catch(error => console.log(error));
  }
=======
// Grid Wrapper for entire app since this component
// creates the outermost div
const Wrapper = styled("div")`
  display: grid;
  justify-content: center;
  margin-top: 2rem;
`;
>>>>>>> Route user using one routing system: react-router-dom; pass on history and authentication information throughout the app; repurpose homepage to display buttons that route to LinkItems and EnterPurchase, respectively

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
        <Route
          path="/link-items"
          render={props => <LinkItems auth={auth} {...props} />}
        />
      </Wrapper>
    </Router>
  );
};

export default RouterComponent;
