import "./App.css";
import MainDash2 from "../components/MainDash/MainDash2";

import MainDash from "../components/MainDash/MainDash";
import RightSide from "../components/RightSide/RightSide";
import ThemeProvider, { useTheme } from "../context/ThemeContext";
import BackgroundAnimation from "../components/BackgroundAnimation";
import { useState } from "react";

const DashboardContent = () => {
  const { isDarkMode } = useTheme();
  const [toggled, setToggled] = useState(false);

  return (
    <div className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-4">Interactive Dashboard EO/IoT</h1>
        <p className="text-xl text-gray-600 dark:text-gray-300">
          Real-time Monitoring and Visualization of Carbon Emissions Data from
          Earth Observation Sources and IoT device 
        </p>
      </div>
      <div className="text-center mt-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
        Click To Change Data Type
      </div>
      <div className="App">
        <button
          className={`toggle-btn ${toggled ? "toggled" : ""}`}
          onClick={() => setToggled(!toggled)}
        >
          <div className="thumb"></div>
        </button>
      </div>
      <div className="text-center mt-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
        
        {toggled ? "Currently showing: IoT Dashboard" : "Currently showing: EO Dashboard"}
      </div>

      <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white relative overflow-hidden">
        <BackgroundAnimation darkMode={isDarkMode} />
        <div className="AppGlass">
          {toggled ? (
            <>
              <MainDash />
              <RightSide />
            </>
          ) : (
            <>
              <MainDash2 />
            </>
          )}
        </div>
      </div>

      <p className="mt-1 text-center">
        ⚠️ Stay below the thresholds to remain compliant, avoid penalties, and
        protect public health and the environment.
      </p>
      <p className="mt-1 text-center">
        This dashboard helps track emissions in real-time to promote
        transparency and responsible industrial activity.
      </p>

      <div className="mt-5 text-center">
        <a
          href="/#home"
          className="inline-block px-6 py-3 bg-emerald-600 text-white rounded-full font-medium transition-transform hover:scale-105 shadow-md hover:shadow-lg"
        >
          Back to Home
        </a>
      </div>
    </div>
  );
};

const Dashboard = () => (
  <ThemeProvider>
    <DashboardContent />
  </ThemeProvider>
);

export default Dashboard;
