import "./App.css";
import MainDash from "../components/MainDash/MainDash";
// import RightSide from "../components/RightSide/RightSide";
import ThemeProvider, { useTheme } from "../context/ThemeContext";
import BackgroundAnimation from "../components/BackgroundAnimation";

const Dashboard = () => {
  const { isDarkMode } = useTheme();
  return (
    <ThemeProvider>
      <div className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4">Interactive Dashboard</h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Real-time monitoring and visualization of carbon emissions data
          </p>
        </div>
        <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white relative overflow-hidden">
          <BackgroundAnimation darkMode={isDarkMode} />
          <div className="AppGlass">
            <MainDash />
            {/* <RightSide /> */}
          </div>
        </div>
        <div className="mt-16 text-center">
          <a
            href="/#home"
            className="inline-block px-6 py-3 bg-emerald-600 text-white rounded-full font-medium transition-transform hover:scale-105 shadow-md hover:shadow-lg"
          >
            Back to Home
          </a>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default Dashboard;
