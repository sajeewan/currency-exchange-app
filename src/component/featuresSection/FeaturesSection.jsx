import React from 'react';
import './FeaturesSection.css';

const FeaturesSection = () => {
  return (
    <div className="features-section">
      <h2 className="features-title">Explore Our Features</h2>
      <div className="features-tiles">
        {/* Tile 1: 7-Day Currency Exchange Rate Chart */}
        <div className="feature-tile">
          <div className="tile-icon">
            <span>📊</span>
          </div>
          <h3>7-Day Exchange Rate Chart</h3>
          <p>View a detailed 7-day chart of currency exchange rates to track trends and make informed decisions.</p>
        </div>

        {/* Tile 2: Add New Currency */}
        <div className="feature-tile">
          <div className="tile-icon">
            <span>💱</span>
          </div>
          <h3>Add New Currency</h3>
          <p>Easily add new currencies to your watchlist and stay updated with their exchange rates.</p>
        </div>

        {/* Tile 3: Show User Logs */}
        <div className="feature-tile">
          <div className="tile-icon">
            <span>📜</span>
          </div>
          <h3>Show User Logs</h3>
          <p>Access your activity logs to review past actions, transactions, and updates in one place.</p>
        </div>
      </div>
    </div>
  );
};

export default FeaturesSection;