import "../components/geography/Geography";
import Geography from "../components/geography/Geography";
import "../components/lineChart/LineChart";
import LineChart from "../components/lineChart/LineChart";

const CarbonForecasting: React.FC = () => {
  return (
    <div className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-4">Gas Forecasting</h1>
        <p className="text-xl text-gray-600 dark:text-gray-300">
          AI-powered predictions for future gas emissions The integrated AI
          model forecasts greenhouse gas emissions for the next 7 days based on
          EO data.
        </p>
      </div>

      <Geography />
      <LineChart />
      <p className="mt-4 text-center">
        ⚠️ Regularly monitor your emissions to stay within allowed thresholds.
      </p>
      <p className="mt-1 text-center">
        Use the AI-powered forecasts to plan proactive actions and reduce your
        environmental impact.
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

export default CarbonForecasting;
