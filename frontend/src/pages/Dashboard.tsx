import React from 'react';
import { BarChart, LineChart, PieChart } from 'lucide-react';

const Dashboard: React.FC = () => {
  return (
    <div className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-4">Interactive Dashboard</h1>
        <p className="text-xl text-gray-600 dark:text-gray-300">
          Real-time monitoring and visualization of carbon emissions data
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 mb-12">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Current Emissions</h3>
            <BarChart className="text-emerald-500" />
          </div>
          <p className="text-3xl font-bold text-emerald-600">245 tCO₂e</p>
          <p className="text-sm text-gray-500">-12% from last month</p>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Energy Usage</h3>
            <LineChart className="text-blue-500" />
          </div>
          <p className="text-3xl font-bold text-blue-600">1,234 kWh</p>
          <p className="text-sm text-gray-500">+3% from last month</p>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Carbon Sources</h3>
            <PieChart className="text-teal-500" />
          </div>
          <p className="text-3xl font-bold text-teal-600">5 Active</p>
          <p className="text-sm text-gray-500">2 need attention</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
          <h3 className="text-xl font-semibold mb-4">Emission Trends</h3>
          <div className="h-64 bg-gray-100 dark:bg-gray-700 rounded-lg"></div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
          <h3 className="text-xl font-semibold mb-4">Source Distribution</h3>
          <div className="h-64 bg-gray-100 dark:bg-gray-700 rounded-lg"></div>
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

export default Dashboard;