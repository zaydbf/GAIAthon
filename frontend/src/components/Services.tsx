import React from 'react';
import { Link } from 'react-router-dom';
import { LineChart, Bot, BarChart4 } from 'lucide-react';

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  gradient: string;
  link: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ icon, title, description, gradient, link }) => {
  return (
    <Link to={link}>
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden transition-transform hover:scale-105 group">
        <div className={`h-2 ${gradient}`}></div>
        <div className="p-6">
          <div className="w-14 h-14 rounded-lg mb-4 flex items-center justify-center bg-gray-100 dark:bg-gray-700 group-hover:bg-opacity-80">
            {icon}
          </div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{title}</h3>
          <p className="text-gray-600 dark:text-gray-300">{description}</p>
        </div>
      </div>
    </Link>
  );
};

const Services: React.FC = () => {
  const services = [
    {
      icon: <LineChart className="text-emerald-600 dark:text-emerald-400" size={32} />,
      title: "Interactive Dashboard",
      description: "Monitor carbon emissions in real-time with our intuitive, data-rich dashboard that provides actionable insights and visualizations.",
      gradient: "bg-gradient-to-r from-emerald-500 to-emerald-600",
      link: "/dashboard"
    },
    {
      icon: <Bot className="text-blue-600 dark:text-blue-400\" size={32} />,
      title: "AI Assistant",
      description: "Our intelligent chatbot offers immediate support, answers questions about your carbon footprint, and suggests optimization strategies.",
      gradient: "bg-gradient-to-r from-blue-500 to-blue-600",
      link: "/ai-assistant"
    },
    {
      icon: <BarChart4 className="text-teal-600 dark:text-teal-400" size={32} />,
      title: "Carbon Forecasting",
      description: "Leverage the power of AI to predict future emissions based on various scenarios, helping you make informed decisions and set realistic targets.",
      gradient: "bg-gradient-to-r from-teal-500 to-teal-600",
      link: "/carbon-forecasting"
    }
  ];

  return (
    <section id="services" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
            Our Services
          </h2>
          <div className="mt-2 h-1 w-20 bg-emerald-500 mx-auto"></div>
          <p className="mt-6 text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            CARBONSENS offers a comprehensive suite of tools to monitor, analyze, and optimize your carbon footprint through cutting-edge IoT and AI technologies.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              icon={service.icon}
              title={service.title}
              description={service.description}
              gradient={service.gradient}
              link={service.link}
            />
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            How Our Technology Works
          </h3>
          <div className="relative">
            <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
              <div className="grid md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-gray-200 dark:divide-gray-700">
                <div className="p-6">
                  <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center mx-auto mb-4">
                    <span className="font-bold text-emerald-600 dark:text-emerald-400">1</span>
                  </div>
                  <h4 className="font-bold text-gray-900 dark:text-white mb-2">Data Collection</h4>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">IoT sensors capture real-time carbon emission data from various sources.</p>
                </div>
                <div className="p-6">
                  <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mx-auto mb-4">
                    <span className="font-bold text-blue-600 dark:text-blue-400">2</span>
                  </div>
                  <h4 className="font-bold text-gray-900 dark:text-white mb-2">AI Processing</h4>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">Advanced algorithms analyze patterns and identify optimization opportunities.</p>
                </div>
                <div className="p-6">
                  <div className="w-12 h-12 rounded-full bg-teal-100 dark:bg-teal-900/30 flex items-center justify-center mx-auto mb-4">
                    <span className="font-bold text-teal-600 dark:text-teal-400">3</span>
                  </div>
                  <h4 className="font-bold text-gray-900 dark:text-white mb-2">Actionable Insights</h4>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">Clear visualizations and recommendations help you reduce your carbon footprint.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;