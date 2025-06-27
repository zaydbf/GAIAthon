import Cards from "../Cards/Cards2";
import BarChart from "../barChart/BarChart";
import PieChart from "../pieChart/PieChart";

import "./MainDash.css";

const MainDash2 = () => {
  return (
    <div className="MainDash">
      <h1>EO Data</h1>
      <h1>Real-Time Atmospheric Gas Readings :</h1>
      <Cards />
      <div className="flex items-stretch gap-1">
        <div className="bar-chart-container">
          <BarChart />
        </div>
        <div className="pie-chart-container">
          <PieChart />
        </div>
      </div>
    </div>
  );
};

export default MainDash2;
