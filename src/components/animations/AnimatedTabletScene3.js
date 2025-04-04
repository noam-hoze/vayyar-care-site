import React, { useEffect, useState } from 'react';
import TabletLayout from './TabletLayout';
import './animations.css';

const AnimatedTabletScene3 = ({ scrollProgress = 0, scene }) => {
  const [showBars, setShowBars] = useState(false);
  
  useEffect(() => {
    // Show bars when the scroll progress is at least 30%
    setShowBars(scrollProgress >= 30);
  }, [scrollProgress]);
  
  // Generate random bar heights for the gait/stride visualization
  const bars = Array.from({ length: 12 }, () => ({
    height: Math.floor(Math.random() * 60) + 20,
    delay: Math.random() * 0.5
  }));
  
  return (
    <TabletLayout time="10:42 AM" showChatInput={true} showMetrics={true}>
      <div style={{ padding: '0', marginBottom: '20px' }}>
        <div className="tablet-header">
          <h3>Stride Irregularity Analysis</h3>
          <div className="date">May 15, 2023</div>
        </div>
        
        <div className="stride-visualization">
          <div className="visualization-labels">
            <div>High</div>
            <div>Normal</div>
            <div>Low</div>
          </div>
          
          <div className="visualization-container">
            {bars.map((bar, index) => (
              <div 
                key={index}
                className="stride-bar"
                style={{
                  height: `${bar.height}px`,
                  animationDelay: showBars ? `${bar.delay}s` : '0s',
                  animationPlayState: showBars ? 'running' : 'paused'
                }}
              />
            ))}
          </div>
          
          <div className="time-axis">
            <span>12AM</span>
            <span>6AM</span>
            <span>12PM</span>
            <span>6PM</span>
            <span>12AM</span>
          </div>
        </div>
        
        <div className="analysis-summary">
          <div className={`summary-item ${showBars ? 'slide-in' : ''}`}>
            <h4>Irregular stride pattern detected</h4>
            <p>Morning hours show increased irregularity</p>
          </div>
          
          <div className={`summary-item ${showBars ? 'slide-in' : ''}`} style={{ animationDelay: '0.2s' }}>
            <h4>Recommended action</h4>
            <p>Review medication timing and morning routine</p>
          </div>
        </div>
      </div>
    </TabletLayout>
  );
};

export default AnimatedTabletScene3;
