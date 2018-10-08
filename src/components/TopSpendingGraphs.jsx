import React from "react";
import { HorizontalBar } from "react-chartjs-2";

const TopSpendingGraphs = ({ recurring, categories, shop }) => {
  const recurringGraph = {
    labels: recurring.labels,
    datasets: [
      {
        label: "Top Recurring",
        backgroundColor: [
          "rgb(146, 66, 244)",
          "rgb(65, 86, 244)",
          "rgb(235, 244, 65)",
          "rgb(244, 65, 184"
        ],
        data: recurring.data
      }
    ]
  };

  const categoriesGraph = {
    labels: categories.labels,
    datasets: [
      {
        label: "Top Categories",
        backgroundColor: [
          "rgb(146, 66, 244)",
          "rgb(65, 86, 244)",
          "rgb(235, 244, 65)",
          "rgb(244, 65, 184"
        ],
        data: categories.data
      }
    ]
  };

  const shopGraph = {
    labels: shop.labels,
    datasets: [
      {
        label: "Top Shop",
        backgroundColor: [
          "rgb(146, 66, 244)",
          "rgb(65, 86, 244)",
          "rgb(235, 244, 65)",
          "rgb(244, 65, 184"
        ],
        data: shop.data
      }
    ]
  };

  return (
    <div style={{ height: "50%", width: "50%" }}>
      <HorizontalBar data={recurringGraph} />
      <HorizontalBar data={categoriesGraph} />
      <HorizontalBar data={shopGraph} />
    </div>
  );
};

export default TopSpendingGraphs;
