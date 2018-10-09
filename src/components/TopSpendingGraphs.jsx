import React from "react";
// import { HorizontalBar } from "react-chartjs-2";
import { Bar } from "react-chartjs-2";

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
          "rgb(244, 65, 184)"
        ],
        data: recurring.data
      }
    ]
  };

  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true
          }
        }
      ]
    }
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
          "rgb(244, 65, 184)"
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
          "rgb(244, 65, 184)"
        ],
        data: shop.data
      }
    ]
  };

  return (
    <div style={{ height: "50%", width: "50%" }}>
      <h1>Top Recurring </h1>
      <select>
        <option value="monthly">Monthly</option>
      </select>
      <Bar data={recurringGraph} options={options} />
      <p>
        Recurring expenses add up! Click on one to analyze how reducting it
        would help imporve your financial health
      </p>
      <h1>Top Categories </h1>
      <select>
        <option value="monthly">Monthly</option>
      </select>
      <Bar data={categoriesGraph} options={options} />
      <p>
        Category spending shows you genral trends. Most people can save tons of
        money be reducing the amount of money they spend at bars and
        restaurants.
      </p>
      <h1>Top Shop </h1>
      <select>
        <option value="monthly">Monthly</option>
      </select>
      <Bar data={shopGraph} options={options} />
      <p>
        Watch out! That daily latte or impulsive Amazon purchase adds up! if you
        used that money ti pay down debt or top up savings, you will be in far
        better shape! And lets be honest, ill bet you wouldnt miss that shiny
        new gadget after a few months
      </p>
    </div>
  );
};

export default TopSpendingGraphs;
