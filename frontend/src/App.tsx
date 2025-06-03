import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import About from './components/About';
import Team from './components/Team';
import Contact from './components/Contact';
import GetStarted from './components/GetStarted';
import Footer from './components/Footer';
import ThemeProvider, { useTheme } from './context/ThemeContext';
import Dashboard from './pages/Dashboard';
import AIAssistant from './pages/AIAssistant';
import CarbonForecasting from './pages/CarbonForecasting';
import Signup from './pages/Signup'
import Signin from './pages/Signin'
import BackgroundAnimation from './components/BackgroundAnimation';



function App() {
  const { isDarkMode } = useTheme();
  return (
    
    <ThemeProvider>
      <Router>
        <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white relative overflow-hidden">
          <BackgroundAnimation darkMode={isDarkMode}/>
          <Navbar />
          <main className="relative z-10">
            <Routes>
              <Route path="/" element={
                <>
                  <Hero />
                  <GetStarted />
                  <Services />
                  <About />
                  <Team />
                  <Contact />
                  
                </>
              } />
              
              <Route path="/Signup" element={<Signup />} />
              <Route path="/Signin" element={<Signin />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/ai-assistant" element={<AIAssistant />} />
              <Route path="/carbon-forecasting" element={<CarbonForecasting />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;