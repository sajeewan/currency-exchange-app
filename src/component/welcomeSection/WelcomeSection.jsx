import React from 'react';
import './WelcomeSection.css';

const WelcomeSection = ({ onToggleChart, showChart }) => {
  return (
    <div className="welcome-container">
      <div className="welcome-content">
        <h2>Welcome to ExchangeRate</h2>
        <p>Your ultimate resource for tracking real-time currency exchange rates and historical trends. Get started by viewing our interactive currency exchange chart.</p>
        <button className="chart-button" onClick={onToggleChart}>
          {showChart ? 'Hide Currency Exchange Chart' : 'Show Currency Exchange Chart'}
        </button>
      </div>
    </div>
  );
};

export default WelcomeSection;