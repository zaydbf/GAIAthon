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
    </div>
  );
};

export default PieChart;
