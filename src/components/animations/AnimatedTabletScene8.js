import React, { useEffect, useState } from 'react';
import TabletLayout from './TabletLayout';
import './animations.css';

const AnimatedTabletScene8 = ({ scrollProgress = 0, scene }) => {
  const [showHeader, setShowHeader] = useState(false);
  const [showMonitoring, setShowMonitoring] = useState(false);
  const [showSleepData, setShowSleepData] = useState(false);
  const [showAlerts, setShowAlerts] = useState(false);
  
  useEffect(() => {
    // Animate elements based on scroll progress
    setShowHeader(scrollProgress >= 15);
    setShowMonitoring(scrollProgress >= 30);
    setShowSleepData(scrollProgress >= 50);
    setShowAlerts(scrollProgress >= 70);
  }, [scrollProgress]);
  
  // Dark theme colors for night mode
  const darkTheme = {
    background: '#1e272e',
    cardBackground: '#2d3436',
    textPrimary: '#dfe6e9',
    textSecondary: '#b2bec3',
    accent: '#74b9ff',
    border: '#636e72',
    alert: '#d63031',
    success: '#00b894'
  };
  
  // Create a dark mode wrapper to style the TabletLayout
  const darkModeStyles = {
    ".tablet-screen": {
      backgroundColor: darkTheme.background,
    },
    ".tablet-header": {
      borderBottom: `1px solid ${darkTheme.border}`,
      backgroundColor: darkTheme.cardBackground
    },
    ".tablet-header-logo": {
      color: darkTheme.accent
    },
    ".tablet-header-time": {
      color: darkTheme.textSecondary
    },
    ".tablet-header-avatar": {
      backgroundColor: darkTheme.border
    }
  };
  
  return (
    <div className="dark-mode-container" style={{ position: 'relative' }}>
      <style>
        {`
          .dark-mode-container .tablet-screen {
            background-color: ${darkTheme.background};
          }
          .dark-mode-container .tablet-screen > div:first-child {
            border-bottom: 1px solid ${darkTheme.border};
            background-color: ${darkTheme.cardBackground};
          }
          .dark-mode-container .tablet-screen > div:first-child > div:first-child {
            color: ${darkTheme.accent};
          }
          .dark-mode-container .tablet-screen > div:first-child > div:last-child div:first-child {
            color: ${darkTheme.textSecondary};
          }
          .dark-mode-container .tablet-screen > div:first-child > div:last-child div:last-child {
            background-color: ${darkTheme.border};
          }
        `}
      </style>
      <TabletLayout time="2:15 AM" showChatInput={true} showMetrics={true}>
        <div className="night-mode-header" style={{ 
          opacity: showHeader ? 1 : 0,
          transform: showHeader ? 'translateY(0)' : 'translateY(-20px)',
          transition: 'opacity 0.5s ease, transform 0.5s ease',
          padding: '15px',
          color: darkTheme.textPrimary,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div>
            <h2 style={{ margin: '0 0 5px 0', color: darkTheme.textPrimary }}>Night Mode</h2>
            <p style={{ margin: '0', color: darkTheme.textSecondary, fontSize: '14px' }}>
              Silent monitoring active
            </p>
          </div>
          <div style={{ 
            backgroundColor: darkTheme.accent, 
            color: darkTheme.background,
            padding: '6px 12px',
            borderRadius: '20px',
            fontSize: '12px',
            fontWeight: 'bold'
          }}>
            ACTIVE
          </div>
        </div>
        
        {showMonitoring && (
          <div style={{
            backgroundColor: darkTheme.cardBackground,
            margin: '15px',
            padding: '15px',
            borderRadius: '8px',
            boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
            animation: 'fadeIn 0.5s ease forwards',
            border: `1px solid ${darkTheme.border}`
          }}>
            <h3 style={{ 
              margin: '0 0 15px 0', 
              fontSize: '16px', 
              color: darkTheme.textPrimary,
              display: 'flex',
              alignItems: 'center'
            }}>
              <span style={{ marginRight: '8px', fontSize: '18px' }}>🛌</span>
              Current Status
            </h3>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
              <div style={{ 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center' 
              }}>
                <div style={{ 
                  color: darkTheme.success, 
                  fontSize: '20px', 
                  fontWeight: 'bold',
                  marginBottom: '5px'
                }}>
                  8/8
                </div>
                <div style={{ color: darkTheme.textSecondary, fontSize: '12px' }}>Residents</div>
              </div>
              
              <div style={{ 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center' 
              }}>
                <div style={{ 
                  color: darkTheme.success, 
                  fontSize: '20px', 
                  fontWeight: 'bold',
                  marginBottom: '5px'
                }}>
                  7
                </div>
                <div style={{ color: darkTheme.textSecondary, fontSize: '12px' }}>Sleeping</div>
              </div>
              
              <div style={{ 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center' 
              }}>
                <div style={{ 
                  color: darkTheme.alert, 
                  fontSize: '20px', 
                  fontWeight: 'bold',
                  marginBottom: '5px'
                }}>
                  1
                </div>
                <div style={{ color: darkTheme.textSecondary, fontSize: '12px' }}>Awake</div>
              </div>
            </div>
            
            <div style={{ 
              padding: '10px', 
              backgroundColor: 'rgba(116, 185, 255, 0.1)', 
              borderRadius: '6px',
              color: darkTheme.textPrimary,
              fontSize: '14px',
              display: 'flex',
              alignItems: 'center'
            }}>
              <span style={{ color: darkTheme.accent, marginRight: '8px', fontSize: '16px' }}>ℹ️</span>
              Notifications are silenced. Critical alerts only.
            </div>
          </div>
        )}
        
        {showSleepData && (
          <div style={{
            backgroundColor: darkTheme.cardBackground,
            margin: '15px',
            padding: '15px',
            borderRadius: '8px',
            boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
            animation: 'fadeIn 0.5s ease forwards',
            border: `1px solid ${darkTheme.border}`
          }}>
            <h3 style={{ 
              margin: '0 0 15px 0', 
              fontSize: '16px', 
              color: darkTheme.textPrimary,
              display: 'flex',
              alignItems: 'center'
            }}>
              <span style={{ marginRight: '8px', fontSize: '18px' }}>💤</span>
              Sleep Patterns
            </h3>
            
            <div style={{ height: '80px', marginBottom: '10px', position: 'relative' }}>
              {/* Sleep quality visualization - horizontal bars */}
              {[
                { room: "208", quality: 85, name: "John D." },
                { room: "306", quality: 72, name: "Alice M." },
                { room: "115", quality: 90, name: "Robert J." },
                { room: "410", quality: 60, name: "Emily L." }
              ].map((resident, index) => (
                <div 
                  key={index}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    marginBottom: '10px',
                    opacity: showSleepData ? 1 : 0,
                    transform: showSleepData ? 'translateX(0)' : 'translateX(-20px)',
                    transition: `opacity 0.5s ease ${index * 0.1}s, transform 0.5s ease ${index * 0.1}s`
                  }}
                >
                  <div style={{ 
                    width: '60px', 
                    fontSize: '12px', 
                    color: darkTheme.textSecondary,
                    marginRight: '10px'
                  }}>
                    Room {resident.room}
                  </div>
                  <div style={{ 
                    flex: 1, 
                    height: '8px', 
                    backgroundColor: 'rgba(255,255,255,0.1)',
                    borderRadius: '4px',
                    overflow: 'hidden'
                  }}>
                    <div 
                      style={{
                        width: `${resident.quality}%`,
                        height: '100%',
                        backgroundColor: 
                          resident.quality > 80 ? '#00b894' :
                          resident.quality > 65 ? '#74b9ff' : '#ff7675',
                        borderRadius: '4px',
                        transform: 'scaleX(0)',
                        transformOrigin: 'left',
                        animation: showSleepData ? `scaleIn 0.8s ease-out ${index * 0.2}s forwards` : 'none'
                      }}
                    />
                  </div>
                  <div style={{ 
                    width: '40px', 
                    textAlign: 'right', 
                    fontSize: '12px', 
                    color: darkTheme.textSecondary,
                    marginLeft: '10px'
                  }}>
                    {resident.quality}%
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {showAlerts && (
          <div style={{
            margin: '15px',
            animation: 'fadeIn 0.5s ease forwards'
          }}>
            <h3 style={{ 
              margin: '0 0 15px 0', 
              fontSize: '16px', 
              color: darkTheme.textPrimary,
              display: 'flex',
              alignItems: 'center'
            }}>
              <span style={{ marginRight: '8px', fontSize: '18px' }}>⚠️</span>
              Recent Activity
            </h3>
            
            <div style={{
              backgroundColor: darkTheme.cardBackground,
              padding: '15px',
              borderRadius: '8px',
              boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
              border: `1px solid ${darkTheme.border}`,
              marginBottom: '15px'
            }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: '10px'
              }}>
                <div style={{
                  color: darkTheme.textPrimary,
                  fontWeight: 'bold',
                  fontSize: '14px'
                }}>
                  Room 410 - Bathroom Visit
                </div>
                <div style={{
                  color: darkTheme.textSecondary,
                  fontSize: '12px'
                }}>
                  1:42 AM
                </div>
              </div>
              <div style={{
                color: darkTheme.textSecondary,
                fontSize: '14px'
              }}>
                Emily returned to bed after 6 minute bathroom visit.
              </div>
            </div>
            
            <div style={{
              backgroundColor: darkTheme.cardBackground,
              padding: '15px',
              borderRadius: '8px',
              boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
              border: `1px solid ${darkTheme.alert}`,
              position: 'relative',
              overflow: 'hidden'
            }}>
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '4px',
                height: '100%',
                backgroundColor: darkTheme.alert
              }}></div>
              
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: '10px'
              }}>
                <div style={{
                  color: darkTheme.alert,
                  fontWeight: 'bold',
                  fontSize: '14px'
                }}>
                  Room 306 - Restlessness
                </div>
                <div style={{
                  color: darkTheme.textSecondary,
                  fontSize: '12px'
                }}>
                  2:10 AM
                </div>
              </div>
              <div style={{
                color: darkTheme.textSecondary,
                fontSize: '14px',
                marginBottom: '15px'
              }}>
                Alice showing signs of restlessness for past 35 minutes.
              </div>
              <div style={{
                display: 'flex',
                justifyContent: 'flex-end',
                gap: '10px'
              }}>
                <button style={{
                  backgroundColor: 'transparent',
                  border: `1px solid ${darkTheme.accent}`,
                  color: darkTheme.accent,
                  padding: '6px 12px',
                  borderRadius: '4px',
                  fontSize: '12px',
                  cursor: 'pointer'
                }}>
                  Snooze
                </button>
                <button style={{
                  backgroundColor: darkTheme.accent,
                  border: 'none',
                  color: darkTheme.background,
                  padding: '6px 12px',
                  borderRadius: '4px',
                  fontSize: '12px',
                  fontWeight: 'bold',
                  cursor: 'pointer'
                }}>
                  Check Now
                </button>
              </div>
            </div>
          </div>
        )}
      </TabletLayout>
    </div>
  );
};

export default AnimatedTabletScene8; 