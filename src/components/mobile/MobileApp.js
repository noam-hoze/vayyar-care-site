import React, { useState } from 'react';
import StartShift from './StartShift';
import Watchlist from './Watchlist';
import './mobile-styles.css';

const MobileApp = () => {
  const [currentScreen, setCurrentScreen] = useState('startShift');
  
  // Mock data for our scenes
  const shiftData = {
    alerts: 4,
    critical: 1,
    monitored: 100,
    summaryItems: [
      "Room 208 – Fall detected at 3:18 AM",
      "Room 306 – Gait decline (60%)",
      "Room 115 – Bathroom activity increased",
      "Room 410 – Immobility flagged"
    ]
  };
  
  const patientCards = [
    {
      id: 1,
      room: "208",
      description: "Fall detected at 3:18 AM",
      priority: "high",
      icon: "⚠️"
    },
    {
      id: 2,
      room: "306",
      description: "Gait decline (60%)",
      priority: "medium",
      icon: "👣"
    },
    {
      id: 3,
      room: "115",
      description: "Bathroom activity increased",
      priority: "medium",
      icon: "🚻"
    },
    {
      id: 4,
      room: "410",
      description: "Immobility flagged",
      priority: "medium",
      icon: "🛌"
    }
  ];
  
  // Screen navigation handlers
  const navigateToWatchlist = () => {
    setCurrentScreen('watchlist');
  };
  
  const navigateToStartShift = () => {
    setCurrentScreen('startShift');
  };
  
  // Render the current screen
  return (
    <div className="mobile-app">
      <div className="phone-frame">
        {currentScreen === 'startShift' && (
          <StartShift 
            data={shiftData} 
            onViewWatchlist={navigateToWatchlist}
          />
        )}
        
        {currentScreen === 'watchlist' && (
          <Watchlist
            data={shiftData}
            cards={patientCards}
            onBack={navigateToStartShift}
          />
        )}
      </div>
    </div>
  );
};

export default MobileApp; 