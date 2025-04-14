import React, { useState, useEffect } from 'react';

// A component that shows a typing/loading indicator (animated dots)
const TypingIndicator = ({ 
  isVisible = true,
  dotCount = 3,
  animationDuration = 1200,
  className = ''
}) => {
  const [dots, setDots] = useState('');
  
  useEffect(() => {
    if (!isVisible) return;
    
    let currentDotCount = 0;
    
    const interval = setInterval(() => {
      currentDotCount = (currentDotCount + 1) % (dotCount + 1);
      setDots('.'.repeat(currentDotCount));
    }, animationDuration / dotCount);
    
    return () => clearInterval(interval);
  }, [isVisible, dotCount, animationDuration]);
  
  if (!isVisible) return null;
  
  const dotClassSuffix = `${dotCount}dot`;
  
  return (
    <div className={`typing-indicator ${className}`}>
      <div className={`typing-indicator-dots typing-indicator-dots-${dotClassSuffix}`}>
        {dots}
      </div>
    </div>
  );
};

export default TypingIndicator; 