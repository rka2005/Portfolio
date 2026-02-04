import React from 'react';
import './AchievementLoader.css';

const AchievementLoader = () => {
  return (
    <div className="achievement-loader-container">
      <div className="loader-message">
        <h2 className="loader-title">Loading Achievements</h2>
        <p className="loader-subtitle">Please wait while we fetch your data...</p>
      </div>
      <div className="loader-spinner"></div>
      <div className="loader-grid">
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="placeholder-card"></div>
        ))}
      </div>
    </div>
  );
};

export default AchievementLoader;
