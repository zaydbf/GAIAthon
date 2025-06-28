import React from 'react';
import { ArrowDown } from 'lucide-react';
import Logo from './Logo';

const Hero: React.FC = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-50/70 to-blue-50/70 dark:from-gray-900 dark:to-gray-800 z-10"></div>
        <div className="absolute inset-0 opacity-10 dark:opacity-20">
          {/* Background pattern */}
          <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 0 10 L 40 10 M 10 0 L 10 40" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="0.5"
                  className="text-emerald-900/30"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-20">
        <div className="flex flex-col lg:flex-row items-center">
          <div className="lg:w-1/2 text-center lg:text-left mb-12 lg:mb-0">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white leading-tight">
              <span className="block">Monitoring Gases</span>
              <span className="block mt-2">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-blue-600">
                  Emissions with EO/IoT & AI
                </span>
              </span>
            </h1>
            <p className="mt-6 text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto lg:mx-0">
              CARBONSENS revolutionizes environmental monitoring by combining advanced IoT sensors & EO Data with AI-powered analytics to track, predict, and optimize carbon emissions in real-time.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
              <a
                href="#services"
                className="px-8 py-3 rounded-full bg-gradient-to-r from-emerald-600 to-blue-600 text-white font-medium text-lg transition-transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Explore Solutions
              </a>
              <a
                href="#about"
                className="px-8 py-3 rounded-full bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 font-medium text-lg transition-transform hover:scale-105 shadow-md hover:shadow-lg"
              >
                Learn More
              </a>
            </div>
          </div>
          <div className="lg:w-1/2 flex justify-center">
            <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 animate-float">
              <Logo className="w-full h-full" />
              <div className="absolute inset-0 -z-10 bg-gradient-to-b from-emerald-400/20 to-blue-500/20 dark:from-emerald-600/10 dark:to-blue-600/10 rounded-full blur-3xl transform scale-110"></div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
        <a href="#services" className="text-gray-600 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400">
          <ArrowDown size={28} />
        </a>
      </div>
    </section>
  );
};

export default Hero;