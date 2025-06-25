import "../components/geography/Geography";
import Geography from "../components/geography/Geography";
import "../components/lineChart/LineChart";
import LineChart from "../components/lineChart/LineChart";

const CarbonForecasting: React.FC = () => {
  return (
    <div className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-4">Carbon Forecasting</h1>
        <p className="text-xl text-gray-600 dark:text-gray-300">
          AI-powered predictions for future carbon emissions The integrated AI
          model forecasts greenhouse gas emissions for the next 7 days based on
          IoT and EO data.
        </p>
      </div>
      <LineChart />
      <Geography />

      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg mt-10">
        <h3 className="text-xl font-semibold mb-4">
          Optimization Recommendations
        </h3>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
            <h4 className="font-semibold mb-2">Process Optimization</h4>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Implement smart scheduling for manufacturing processes to reduce
              peak energy consumption.
            </p>
          </div>
          <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
            <h4 className="font-semibold mb-2">Resource Allocation</h4>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Optimize delivery routes and vehicle capacity utilization.
            </p>
          </div>
          <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
            <h4 className="font-semibold mb-2">Energy Management</h4>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Switch to renewable energy sources during peak hours.
            </p>
          </div>
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
  );
};

export default CarbonForecasting;
