import { Box } from "@mui/material";
import Bar from "./bar";
import Header from "../Header";
import "./BarChart.css";

const BarChart = () => {
  return (
    <div className="bar-chart-container bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg mt-5">
      <Box>
        <Header
          title="Bar Chart"
          subTitle="The minimum wage in Germany, France and Spain (EUR/month)"
        />
        <Bar />
      </Box>
    </div>
  );
};

export default BarChart;
