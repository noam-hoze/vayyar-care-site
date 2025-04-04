import React from 'react';
import { withAnimatedTabletScene } from './BaseAnimatedTabletScene';
import { Card, Section, Alert, Badge } from './TabletSceneComponents';
import FadeInList from './FadeInList';

// Room visualization component
const RoomVisualization = ({ showAlert }) => (
  <div className="room-visualization">
    <div className="room-visualization-card">
      {/* Room number with flashing effect for Room 302 */}
      <div 
        className={`room-label ${showAlert ? "alert alert-flicker" : ""}`}
      >
        Room 302
      </div>
      
      {/* Bed */}
      <div className="bed">
        Bed
      </div>
      
      {/* Resident */}
      <div className="resident">
        <div>O</div>
        <div>/|\</div>
        <div>/ \</div>
        <div className="resident-label">Resident</div>
      </div>
    </div>
  </div>
);

// Risk assessment meter component
const RiskMeter = () => (
  <div className="risk-meter">
    <h4 className="risk-meter-title">Fall Risk Assessment</h4>
    <div className="risk-meter-bar">
      <div className="risk-meter-progress" style={{ width: '85%' }}></div>
      <div className="risk-meter-label"></div>
    </div>
    <div className="risk-meter-info">
      Previous falls: 2 in last 30 days
    </div>
  </div>
);

// Main scene component content
const SceneContent = ({ 
  animationState, 
  scene,
  scrollProgress 
}) => {
  return (
    <div className="tablet-scene-content">
      {/* Alert Details */}
      <div className={`scale-in ${animationState.showAlertDetails ? 'active' : ''}`}>
        <Section title="Bed Exit Alert - Room 302">
          <Alert 
            type="critical"
            content="Alert triggered at 10:27 AM. Resident attempting to exit bed without assistance."
          />
          
          <div className={`slide-up ${animationState.showAlertDetails ? 'active' : ''} delay-200`}>
            <RoomVisualization showAlert={animationState.showAlertBanner} />
          </div>
          
          {/* Risk Assessment */}
          <div className={`slide-up ${animationState.showRiskMeter ? 'active' : ''} delay-300`}>
            <RiskMeter />
          </div>
        </Section>
      </div>
    </div>
  );
};

// Animation state configuration
const getAnimationState = (scrollProgress) => {
  return {
    showNormalState: true,
    showAlertBanner: true,
    showAlertDetails: true,
    showResponseOptions: false,
    showResolution: false,
    alertMetric: 0,
    criticalMetric: 1,
    showRiskMeter: true,
    showTimer: false,
    showActionButtons: false,
    showNurseApproaching: false
  };
};

// Export the wrapped component
export default withAnimatedTabletScene(
  SceneContent,
  getAnimationState,
  {
    showMetrics: true,
    showChatInput: true,
    time: '10:27 AM',
    criticalMetric: 1 // Important parameter for showing the red critical alert
  }
); 