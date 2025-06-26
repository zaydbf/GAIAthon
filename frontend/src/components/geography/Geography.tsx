import { Box } from "@mui/material";

import Geo from "./geo";
import Header from "../Header";

const Geography = () => {
  return (
    <div className="bg-gradient-to-br from-sky-500 via-sky-500 to-white p-6 rounded-xl shadow-lg mt-10">
      <Box>
        <Header
          title="Select a Region to Explore future predections for Emission Levels

"
          subTitle="Use the map to choose any area and view concentrations'prediction for SO₂, CH₄, CO, NO₂, and O₃ based on satellite data and see if the country is in danger state."
        />

        <Geo />
      </Box>
    </div>
  );
};

export default Geography;
