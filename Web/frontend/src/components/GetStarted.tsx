import React from 'react';
import { useNavigate } from 'react-router-dom';
const GetStarted: React.FC = () => {
  const navigate = useNavigate();
  return (
    
    <section id="get-started" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
          Ready to Make a Difference?
        </h2>
        <div className="mt-2 h-1 w-20 bg-emerald-500 mx-auto"></div>
        <p className="mt-6 text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          Try CARBONSENS and be part of the solution. Whether you're passionate about sustainability,
          data, or just want to have a positive impact — we're building a platform for you.
        </p>
        <button
          className="mt-10 px-8 py-4 rounded-lg bg-gradient-to-r from-emerald-600 to-blue-600 text-white font-semibold shadow-md hover:scale-105 transition-transform"
          onClick={() => {
            navigate('/Signup')
          }}
        >
          Get Started
        </button>
      </div>
    </section>
  );
};

export default GetStarted;
