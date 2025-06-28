import { Box } from "@mui/material";
import Pie from "./pie";
import Header from "../Header";
import "./PieChart.css";

const PieChart = () => {
  return (
    <div className="pie-chart-container bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg mt-5">
      <Box>
        <Header
          title="Gas Emissions Breakdown"
          subTitle="Daily distribution of major atmospheric pollutants"
        />
        <Pie region="Africa" />
      </Box>
      <p>
        This pie chart shows the relative concentrations of various gases after
        applying normalization factors:
      </p>
      <p>
        CO and NO₂ values are multiplied by 10, CH₄ is divided by 10, and O₃ is
        divided by 1000.
      </p>
      <p>
        Hover over each slice to view the adjusted values and compare the gases
        more easily.
      </p>
    </div>
  );
};

export default PieChart;
