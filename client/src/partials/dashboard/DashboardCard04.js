import React from "react";
import BarChart from "../../charts/BarChart01";

// Import utilities
import { tailwindConfig } from "../../utils/Utils";

function DashboardCard04(props) {
  const { name, auctionPrice, totalPoints } = props;
  const chartData = {
    labels: ["20"],
    datasets: [
      // Light blue bars
      {
        label: "Auction Price",
        data: [auctionPrice],
        backgroundColor: tailwindConfig().theme.colors.blue[400],
        hoverBackgroundColor: tailwindConfig().theme.colors.blue[500],
        barPercentage: 0.66,
        categoryPercentage: 0.66,
      },
      // Blue bars
      {
        label: "Total Points",
        data: [totalPoints],
        backgroundColor: tailwindConfig().theme.colors.indigo[500],
        hoverBackgroundColor: tailwindConfig().theme.colors.indigo[600],
        barPercentage: 0.66,
        categoryPercentage: 0.66,
      },
      {
        label: "Points Per Dollar",
        data: [totalPoints / auctionPrice],
        backgroundColor: tailwindConfig().theme.colors.green[500],
        hoverBackgroundColor: tailwindConfig().theme.colors.green[600],
        barPercentage: 0.66,
        categoryPercentage: 0.66,
      },
    ],
  };

  return (
    <div className="flex flex-col col-span-full sm:col-span-6 bg-white shadow-lg rounded-sm border border-gray-200">
      <header className="px-5 py-4 border-b border-gray-100">
        <h2 className="font-semibold text-gray-800">{name}</h2>
      </header>
      {/* Chart built with Chart.js 3 */}
      {/* Change the height attribute to adjust the chart height */}
      <BarChart data={chartData} width={595} height={248} />
    </div>
  );
}

export default DashboardCard04;
