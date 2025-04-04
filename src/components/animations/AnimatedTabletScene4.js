import React, { useEffect, useState } from 'react';
import TabletLayout from './TabletLayout';
import './animations.css';

const AnimatedTabletScene4 = ({ scrollProgress = 0, scene }) => {
  const [showAlert, setShowAlert] = useState(false);
  const [showSuggestion, setShowSuggestion] = useState(false);
  const [showBathrooms, setShowBathrooms] = useState(false);
  
  useEffect(() => {
    // Animate elements based on scroll progress
    setShowAlert(scrollProgress >= 20);
    setShowBathrooms(scrollProgress >= 40);
    setShowSuggestion(scrollProgress >= 60);
  }, [scrollProgress]);
  
  return (
    <TabletLayout time="2:45 PM" showChatInput={true} showMetrics={true}>
      <div className="scene-title" style={{ 
        opacity: showAlert ? 1 : 0, 
        transform: showAlert ? 'translateY(0)' : 'translateY(20px)',
        transition: 'opacity 0.5s ease, transform 0.5s ease'
      }}>
        <h2>Bathroom Pattern</h2>
      </div>
      
      <div className="alert-card" style={{ 
        opacity: showAlert ? 1 : 0, 
        transform: showAlert ? 'translateY(0)' : 'translateY(20px)',
        transition: 'opacity 0.5s ease, transform 0.5s ease',
        backgroundColor: '#FEF9E7',
        border: '1px solid #F39C12',
        padding: '15px',
        borderRadius: '8px',
        margin: '15px 0'
      }}>
        <div className="alert-header">
          <span className="alert-icon" style={{ color: '#F39C12' }}>⚠️</span>
          <span className="alert-room">Room 115 - Bathroom Pattern Change</span>
        </div>
        
        <div className="alert-message" style={{ marginTop: '10px' }}>
          In the past 5 hours, John has been going to the bathroom more than 3 times.
        </div>
      </div>
      
      {showBathrooms && (
        <div className="bathroom-visualization" style={{
          animation: 'fadeIn 0.5s ease forwards',
          marginTop: '20px',
          padding: '15px',
          backgroundColor: 'white',
          borderRadius: '8px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
        }}>
          <h3 style={{ margin: '0 0 10px 0', fontSize: '16px' }}>Bathroom Visits Today</h3>
          <div style={{ display: 'flex', alignItems: 'flex-end', height: '100px', gap: '12px' }}>
            {[
              { time: '6:30 AM', height: 40 },
              { time: '9:15 AM', height: 35 },
              { time: '11:20 AM', height: 45 },
              { time: '12:45 PM', height: 30 },
              { time: '2:10 PM', height: 50 }
            ].map((visit, index) => (
              <div key={index} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1 }}>
                <div style={{ 
                  width: '100%',
                  height: `${visit.height}px`,
                  backgroundColor: '#3498db',
                  borderRadius: '3px 3px 0 0',
                  marginBottom: '5px',
                  animation: `scaleIn 0.5s ease-out ${index * 0.1}s forwards`,
                  transform: 'scaleY(0)',
                  transformOrigin: 'bottom'
                }}></div>
                <div style={{ fontSize: '10px', color: '#7f8c8d' }}>{visit.time}</div>
              </div>
            ))}
          </div>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            marginTop: '15px',
            fontSize: '12px',
            color: '#e74c3c',
            fontWeight: 'bold'
          }}>
            <div>Normal: 0-2 visits</div>
            <div>Today: 5 visits</div>
          </div>
        </div>
      )}
      
      {showSuggestion && (
        <div className="suggestion-card" style={{
          marginTop: '20px',
          padding: '15px',
          backgroundColor: '#E8F8F5',
          borderRadius: '8px',
          borderLeft: '4px solid #1ABC9C',
          animation: 'slideInUp 0.5s ease forwards'
        }}>
          <div className="suggestion-header" style={{ 
            display: 'flex', 
            alignItems: 'center',
            marginBottom: '10px'
          }}>
            <span style={{ marginRight: '10px', fontSize: '18px' }}>💡</span>
            <span style={{ fontWeight: 'bold' }}>Suggested Action</span>
          </div>
          <div className="suggestion-content">
            Check for UTI symptoms: burning sensation, cloudy urine, strong odor, or fever.
          </div>
          <div className="suggestion-buttons" style={{ 
            display: 'flex', 
            gap: '10px', 
            marginTop: '15px',
            justifyContent: 'flex-end'
          }}>
            <button style={{ 
              padding: '8px 15px', 
              backgroundColor: '#1ABC9C', 
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}>Document Check</button>
            <button style={{ 
              padding: '8px 15px', 
              backgroundColor: 'transparent', 
              color: '#1ABC9C',
              border: '1px solid #1ABC9C',
              borderRadius: '4px',
              cursor: 'pointer'
            }}>Dismiss</button>
          </div>
        </div>
      )}
    </TabletLayout>
  );
};

export default AnimatedTabletScene4; 