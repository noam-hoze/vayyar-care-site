import React, { useState, useEffect } from 'react';
import { useMobileHomeVideo } from './MobileHomeVideoContext';

// Global theater mode overlay component to ensure only one overlay exists
const TheaterModeOverlay: React.FC = () => {
  const { theaterMode, setTheaterMode } = useMobileHomeVideo();
  const [isClosing, setIsClosing] = useState(false);

  // Handle the fade out animation when theaterMode changes
  useEffect(() => {
    if (!theaterMode) {
      setIsClosing(false);
    }
  }, [theaterMode]);

  // Handle click on overlay to close theater mode
  const handleOverlayClick = () => {
    if (theaterMode && !isClosing) {
      setIsClosing(true);
      // Wait for animation to complete before removing the overlay
      setTimeout(() => {
        setTheaterMode(false);
      }, 500); // Match the animation duration (0.5s)
    }
  };

  return (
    <div
      className={`theater-mode-overlay ${theaterMode ? 'active' : ''} ${isClosing ? 'closing' : ''}`}
      onClick={handleOverlayClick}
      style={{ pointerEvents: theaterMode ? 'auto' : 'none' }} // Enable clicking when overlay is active
    />
  );
};

export default TheaterModeOverlay;
