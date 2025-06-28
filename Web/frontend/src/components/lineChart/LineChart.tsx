import { Box } from "@mui/material";
import React from "react";
import Line from "./Line";
import Header from "../Header";

const LineChart: React.FC = () => {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg mt-5">
      <Box>
        <Header
          title="Predicted Greenhouse Gas Emissions (Next 7 Days)"
          subTitle="Powered by AI, this forecast shows expected levels of SO₂, CH₄, CO, NO₂, and O₃ based on Earth Observation datasets."
        />
        <Line />
      </Box>
    </div>
  );
};

export default LineChart;
