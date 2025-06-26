import { Box } from "@mui/material";
import Pie from "./pie";
import Header from "../Header";
import "./PieChart.css";

const PieChart = () => {
  return (
    <div className="pie-chart-container bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg mt-5">
      <Box>
        <Header title="Pie Chart" subTitle="Simple Pie Chart" />
        <Pie />
      </Box>
    </div>
  );
};

export default PieChart;
