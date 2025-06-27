import { Box } from "@mui/material";
import Bar from "./bar";
import Header from "../Header";
import "./BarChart.css";

const BarChart = () => {
  return (
    <div className="bar-chart-container bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg mt-5">
      <Box>
        <Header
          title="Global Greenhouse Gas Trends (2019–2023)"
          subTitle="CH₄, CO₂, and O₃ concentrations over 5 years"
        />
        <Bar />
      </Box>
      <p>
        This bar chart represents the adjusted concentrations of gases for
        clearer comparison.
      </p>
      <p>
        Specifically, CH₄ values have been multiplied by 100 and O₃ values by
        10,000 to account for differences in units and scales.
      </p>
      <p>Hover over each bar to view the normalized values.</p>
    </div>
  );
};

export default BarChart;
