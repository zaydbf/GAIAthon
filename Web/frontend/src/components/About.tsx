import React from 'react';
import { Check, ClipboardCheck, Leaf, Globe } from 'lucide-react';

const About: React.FC = () => {
  return (
    <section id="about" className="py-20 bg-white dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
            About CARBONSENS
          </h2>
          <div className="mt-2 h-1 w-20 bg-emerald-500 mx-auto"></div>
          <p className="mt-6 text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Pioneering a sustainable future through innovative IoT and AI technologies for precise carbon emission monitoring and reduction.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Our Mission
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              At CARBONSENS, we're committed to empowering organizations with the tools they need to understand, manage, and reduce their carbon footprint. Our innovative solution combines the power of Internet of Things (IoT) sensors and Earth observation data (EO) with advanced artificial intelligence to provide accurate, real-time data and actionable insights.
            </p>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              We believe that by making gas emissions data more accessible and understandable, we can accelerate the transition to a low-carbon economy and contribute to a more sustainable future for our planet.
            </p>
            
            <div className="space-y-3">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <Check className="h-6 w-6 text-emerald-500" />
                </div>
                <div className="ml-3">
                  <p className="text-gray-600 dark:text-gray-300">
                    <span className="font-medium text-gray-900 dark:text-white">Precision Monitoring:</span> Our IoT sensors provide accurate, real-time data collection.& We get daily EO data
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <Check className="h-6 w-6 text-emerald-500" />
                </div>
                <div className="ml-3">
                  <p className="text-gray-600 dark:text-gray-300">
                    <span className="font-medium text-gray-900 dark:text-white">Intelligent Analysis:</span> Our AI algorithms transform raw data into meaningful insights.
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <Check className="h-6 w-6 text-emerald-500" />
                </div>
                <div className="ml-3">
                  <p className="text-gray-600 dark:text-gray-300">
                    <span className="font-medium text-gray-900 dark:text-white">Actionable Solutions:</span> We provide clear recommendations for emission reduction.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-emerald-50 dark:bg-emerald-900/20 rounded-xl p-6 transition-transform hover:scale-105">
              <Leaf className="h-10 w-10 text-emerald-600 dark:text-emerald-400 mb-4" />
              <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Environmental Impact</h4>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Helping organizations reduce their carbon footprint and contribute to a healthier planet.
              </p>
            </div>
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6 transition-transform hover:scale-105">
              <Globe className="h-10 w-10 text-blue-600 dark:text-blue-400 mb-4" />
              <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Global Reach</h4>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Scalable solutions that can be deployed anywhere in the world to address climate challenges.
              </p>
            </div>
            <div className="bg-teal-50 dark:bg-teal-900/20 rounded-xl p-6 transition-transform hover:scale-105">
              <ClipboardCheck className="h-10 w-10 text-teal-600 dark:text-teal-400 mb-4" />
              <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Regulatory Compliance</h4>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Helping businesses meet increasingly stringent carbon reporting requirements.
              </p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700/30 rounded-xl p-6 transition-transform hover:scale-105">
              <div className="relative h-10 w-10 mb-4">
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-lg"></div>
                <div className="absolute inset-1 bg-white dark:bg-gray-800 rounded-lg flex items-center justify-center">
                  <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-blue-500">AI</span>
                </div>
              </div>
              <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Innovative Technology</h4>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Cutting-edge AI and IoT solutions working together to solve complex environmental challenges.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;