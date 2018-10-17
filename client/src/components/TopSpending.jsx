import React from "react";
import { Link } from "react-router-dom";
import styled from "react-emotion";
import TopSpendingGraphs from "./TopSpendingGraphs.jsx";

//Styled Components
const Wrapper = styled("div")`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

class TopSpending extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recurring: {
        labels: ["Gym Membership", "Wine Culb", "Cool Magazing", "Netflix"],
        data: [58, 42, 29, 20]
      },
      categories: {
        labels: ["Rent", "Car Payment", "Groceries", "Dining Out"],
        data: [300, 263, 164, 75]
      },
      shop: {
        labels: ["Amazon", "Starbucks", "My Dive Bar", "McDonalds"],
        data: [58, 42, 29, 20]
      }
    };
  }

  render() {
    const { recurring, categories, shop } = this.state;

    return (
      <Wrapper>
        <h1>Spending Breakdown</h1>
        <TopSpendingGraphs
          recurring={recurring}
          categories={categories}
          shop={shop}
        />
        <Link to="/enter-purchase">
          <button>Start the Goblin without selection</button>
        </Link>
      </Wrapper>
    );
  }
}

export default TopSpending;
