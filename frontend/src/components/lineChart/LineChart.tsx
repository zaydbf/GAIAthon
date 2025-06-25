import { Box } from "@mui/material";

import Line from "./Line";
import Header from "../Header";

const LineChart = () => {
  return (
    <Box>
      <Header
        title="Predicted Greenhouse Gas Emissions (Next 7 Days)

"
        subTitle="Powered by AI, this forecast shows expected levels of CO₂, CH₄, CO, NO₂, and O₃ based on IoT sensor data and Earth Observation datasets."
      />

      <Line />
    </Box>
  );
};

export default LineChart;
