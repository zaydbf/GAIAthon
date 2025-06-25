import { Box } from "@mui/material";
import Pie from "./pie";
import Header from "../Header";

const PieChart = () => {
  return (
    <Box>
      <Header title="Pie Chart" subTitle="Simple Pie Chart" />

      <Pie />
    </Box>
  );
};

export default PieChart;
