import React from 'react';
import { TrendingUp, AlertTriangle, CheckCircle } from 'lucide-react';

const CarbonForecasting: React.FC = () => {
  return (
    <div className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-4">Carbon Forecasting</h1>
        <p className="text-xl text-gray-600 dark:text-gray-300">
          AI-powered predictions for future carbon emissions
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
          <h3 className="text-xl font-semibold mb-4">Emission Forecast</h3>
          <div className="h-64 bg-gray-100 dark:bg-gray-700 rounded-lg mb-4"></div>
          <div className="flex items-center gap-2 text-emerald-600">
            <TrendingUp size={20} />
            <span>Predicted 15% reduction by next quarter</span>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
          <h3 className="text-xl font-semibold mb-4">Risk Analysis</h3>
          <div className="space-y-4">
            <div className="flex items-center gap-3 p-4 bg-red-100 dark:bg-red-900/20 rounded-lg">
              <AlertTriangle className="text-red-600" />
              <div>
                <h4 className="font-semibold">High Risk Area</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">Manufacturing emissions exceed target</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 bg-yellow-100 dark:bg-yellow-900/20 rounded-lg">
              <AlertTriangle className="text-yellow-600" />
              <div>
                <h4 className="font-semibold">Medium Risk Area</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">Transportation emissions near threshold</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 bg-green-100 dark:bg-green-900/20 rounded-lg">
              <CheckCircle className="text-green-600" />
              <div>
                <h4 className="font-semibold">Low Risk Area</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">Office energy consumption within target</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
        <h3 className="text-xl font-semibold mb-4">Optimization Recommendations</h3>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
            <h4 className="font-semibold mb-2">Process Optimization</h4>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Implement smart scheduling for manufacturing processes to reduce peak energy consumption.
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