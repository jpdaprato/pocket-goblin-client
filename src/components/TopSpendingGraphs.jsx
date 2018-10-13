import React from "react";
import { HorizontalBar } from "react-chartjs-2";
import styled from "react-emotion";

//Styled Components
const Titles = styled("h1")`
  text-align: center;
`;

const TopSpendingGraphs = ({ recurring, categories, shop }) => {
  const barGraphColors = [
    "rgb(146, 66, 244)",
    "rgb(65, 86, 244)",
    "rgb(235, 244, 65)",
    "rgb(244, 65, 184)"
  ];

  const options = {
    legend: {
      display: false
    },
    scales: {
      xAxes: [
        {
          ticks: {
            beginAtZero: true
          }
        }
      ]
    }
  };

  const recurringGraph = {
    labels: recurring.labels,
    datasets: [
      {
        label: "Top Recurring",
        backgroundColor: barGraphColors,
        data: recurring.data
      }
    ]
  };

  const categoriesGraph = {
    labels: categories.labels,
    datasets: [
      {
        label: "Top Categories",
        backgroundColor: barGraphColors,
        data: categories.data
      }
    ]
  };

  const shopGraph = {
    labels: shop.labels,
    datasets: [
      {
        label: "Top Shop",
        backgroundColor: barGraphColors,
        data: shop.data
      }
    ]
  };

  return (
    <div style={{ height: "50%", width: "50%" }}>
      <Titles>Top Recurring </Titles>
      <select>
        <option value="monthly">Monthly</option>
      </select>
      <HorizontalBar data={recurringGraph} options={options} />
      <p>
        Recurring expenses add up! Click on one to analyze how reducting it
        would help imporve your financial health.
      </p>
      <Titles>Top Categories </Titles>
      <select>
        <option value="monthly">Monthly</option>
      </select>
      <HorizontalBar data={categoriesGraph} options={options} />
      <p>
        Category spending shows you genral trends. Most people can save tons of
        money be reducing the amount of money they spend at bars and
        restaurants.
      </p>
      <Titles>Top Shop </Titles>
      <select>
        <option value="monthly">Monthly</option>
      </select>
      <HorizontalBar data={shopGraph} options={options} />
      <p>
        {`Watch out! That daily latte or impulsive Amazon purchase adds up! If you
        used that money to pay down debt or top up savings, you will be in far
        better shape! And let's be honest, I'll bet you wouldnt miss that shiny
        new gadget after a few months.`}
      </p>
    </div>
  );
};

export default TopSpendingGraphs;
