import Navbar from "../Components/Navbar/Navbar";
import DashboardService from "../Components/Services/Dashboard/Dashboard";
import AIPredictService from "../Components/Services/AIPredict/AIPredict";
import ChatbotService from "../Components/Services/Chatbot/Chatbot";
import { useState } from "react";
import "../Components/Services/style.css";

function Services() {
  const [activeService, setActiveService] = useState(null);

  const renderMainMenu = () => (
    <div className="service-selection">
      <div className="service-card">
        <h2>Dashboard</h2>
        <p>Visualize and monitor carbon data in real-time with smart insights.</p>
        <button className="btn primary-btn" onClick={() => setActiveService("dashboard")}>Go to Dashboard</button>
      </div>
      <div className="service-card">
        <h2>AI Predict</h2>
        <p>Leverage AI to forecast carbon emissions based on various scenarios.</p>
        <button className="btn primary-btn" onClick={() => setActiveService("ai")}>Go to AI Predict</button>
      </div>
      <div className="service-card">
        <h2>Chatbot</h2>
        <p>Ask questions and get guidance through our smart environmental assistant.</p>
        <button className="btn primary-btn" onClick={() => setActiveService("chatbot")}>Go to Chatbot</button>
      </div>
    </div>
  );

  return (
    <div>
      <Navbar />
      <div className="services-container">
        {activeService ? (
          <div className="service-content">
            <button className="back-button" onClick={() => setActiveService(null)}>&larr; Back</button>
            {activeService === "dashboard" && <DashboardService />}
            {activeService === "ai" && <AIPredictService />}
            {activeService === "chatbot" && <ChatbotService />}
          </div>
        ) : (
          renderMainMenu()
        )}
      </div>
    </div>
  );
}

export default Services;