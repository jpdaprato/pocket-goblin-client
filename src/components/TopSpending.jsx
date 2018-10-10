import React from "react";
import { Link } from "@reach/router";
import TopSpendingGraphs from "./TopSpendingGraphs.jsx";

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
        data: [58, 42, 29, 20]
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
      <div>
        <h2>Tap an item to Analyze</h2>
        <TopSpendingGraphs
          recurring={recurring}
          categories={categories}
          shop={shop}
        />
        <Link path to="/home/enter-purchase">
          <button>Start the Goblin without selection</button>
        </Link>
      </div>
    );
  }
}

export default TopSpending;
