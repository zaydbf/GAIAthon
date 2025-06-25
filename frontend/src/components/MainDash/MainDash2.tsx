import Cards from "../Cards/Cards2";
import BarChart from "../barChart/BarChart";
import PieChart from "../pieChart/PieChart";

import "./MainDash.css";

const MainDash2 = () => {
  return (
    <div className="MainDash">
      <h1>eo</h1>
      <h1>Real-Time Atmospheric Gas Readings :</h1>
      <Cards />
      <BarChart />
      <PieChart />
    </div>
  );
};

export default MainDash2;
