import { useState, useEffect } from 'react';

/**
 * Custom hook for managing animation states based on scroll progress
 * @param {Object} config - Configuration object
 * @param {Object} config.thresholds - Scroll position thresholds for each animation state
 * @param {number} scrollProgress - Current scroll progress (0-100)
 * @returns {Object} Animation state object with boolean flags
 */
const useTabletScene = ({ thresholds = {}, scrollProgress = 0 }) => {
  // Create state object based on thresholds
  const [animationState, setAnimationState] = useState(
    Object.keys(thresholds).reduce((acc, key) => {
      acc[key] = false;
      return acc;
    }, {})
  );

  // Update animation state based on scroll progress
  useEffect(() => {
    const newState = Object.keys(thresholds).reduce((acc, key) => {
      // Check if this animation should be activated
      if (Array.isArray(thresholds[key])) {
        // If threshold is [start, end], show when scrollProgress is between start and end
        const [start, end] = thresholds[key];
        acc[key] = scrollProgress >= start && (end === undefined || scrollProgress < end);
      } else {
        // If threshold is a single value, show when scrollProgress is >= that value
        acc[key] = scrollProgress >= thresholds[key];
      }
      return acc;
    }, {});

    setAnimationState(newState);
  }, [scrollProgress, thresholds]);

  // Helper functions
  const getProgressInRange = (start, end) => {
    // Calculate progress percentage within a specific range
    if (scrollProgress < start) return 0;
    if (scrollProgress >= end) return 100;
    return ((scrollProgress - start) / (end - start)) * 100;
  };

  return {
    animationState,
    getProgressInRange
  };
};

export default useTabletScene; 