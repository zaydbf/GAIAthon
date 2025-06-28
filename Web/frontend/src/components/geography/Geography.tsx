import { Box } from "@mui/material";

import Geo from "./geo";
import Header from "../Header";

const Geography = () => {
  return (
    <div className="bg-gradient-to-br from-sky-500 via-sky-500 to-white p-6 rounded-xl shadow-lg mt-10">
      <Box>
        <Header
          title="Global Distribution of CO₂ Concentrations"
          subTitle="Explore the average CO₂ levels measured across different countries worldwide, highlighting regional variations in carbon emissions."
        />

        <Geo />
      </Box>
    </div>
  );
};

export default Geography;
