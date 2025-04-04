import React, { useState, useEffect } from 'react';
import TabletLayout from './TabletLayout';
import './animations.css';

const AnimatedTabletScene1_5 = ({ scrollProgress = 0, scene }) => {
  // Animation state based on scroll position
  const [animationState, setAnimationState] = useState({
    showWatchlist: false,
    showCriticalAlert: false
  });

  // Update animation state based on scroll progress
  useEffect(() => {
    setAnimationState({
      showWatchlist: scrollProgress >= 0,
      showCriticalAlert: scrollProgress >= 80 // Show critical alert near end of scene
    });
  }, [scrollProgress]);

  // Watchlist items with priority levels
  const watchlistItems = [
    { room: "208", priority: "high", reason: "Fall detected at 3:18 AM", status: "Requires follow-up" },
    { room: "306", priority: "medium", reason: "Gait decline (60%)", status: "PT evaluation recommended" },
    { room: "115", priority: "medium", reason: "Bathroom visits increased", status: "Check for UTI symptoms" },
    { room: "410", priority: "low", reason: "Immobility flagged", status: "Monitor mobility" }
  ];

  // Render watchlist item
  const renderWatchlistItem = (item, index) => {
    const priorityColors = {
      high: '#E63946',
      medium: '#F39C12',
      low: '#3EBD93'
    };
    
    const priorityLabels = {
      high: 'HIGH',
      medium: 'MEDIUM',
      low: 'LOW'
    };
    
    return (
      <div 
        key={index}
        className="fade-in"
        style={{
          padding: '16px',
          marginBottom: '16px',
          borderRadius: '8px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          border: '1px solid #F0F0F0',
          backgroundColor: 'white',
          animation: `fadeIn 0.3s ease-out ${index * 0.1}s both`,
          opacity: animationState.showCriticalAlert ? 0.5 : 1,
          filter: animationState.showCriticalAlert ? 'blur(1px)' : 'none',
          transition: 'opacity 0.3s ease, filter 0.3s ease'
        }}
      >
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '8px'
        }}>
          <div style={{
            fontSize: '16px',
            fontWeight: 'bold'
          }}>
            Room {item.room}
          </div>
          <div style={{
            fontSize: '12px',
            fontWeight: 'bold',
            color: 'white',
            backgroundColor: priorityColors[item.priority],
            padding: '4px 8px',
            borderRadius: '12px'
          }}>
            {priorityLabels[item.priority]}
          </div>
        </div>
        <div style={{
          fontSize: '14px',
          marginBottom: '8px'
        }}>
          {item.reason}
        </div>
        <div style={{
          fontSize: '13px',
          color: '#6C757D'
        }}>
          {item.status}
        </div>
      </div>
    );
  };

  // Critical Alert Banner
  const renderCriticalAlertBanner = () => (
    <div 
      className="slideInDown alert-flicker"
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 10,
        backgroundColor: '#E63946',
        color: 'white',
        padding: '16px',
        boxShadow: '0 4px 12px rgba(230, 57, 70, 0.5)'
      }}
    >
      <div style={{
        display: 'flex',
        flexDirection: 'column'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          marginBottom: '8px'
        }}>
          <span style={{
            fontSize: '18px',
            fontWeight: 'bold',
            marginRight: '8px'
          }}>
            ⚠️ CRITICAL ALERT: BED EXIT
          </span>
        </div>
        <div style={{
          fontSize: '14px'
        }}>
          ROOM 302 - HIGH PRIORITY
        </div>
        
        <div style={{
          display: 'flex',
          justifyContent: 'flex-end',
          marginTop: '8px'
        }}>
          <div style={{
            backgroundColor: 'white',
            color: '#E63946',
            fontSize: '14px',
            fontWeight: 'bold',
            padding: '6px 12px',
            borderRadius: '20px',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
            cursor: 'pointer'
          }}>
            RESPOND
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <TabletLayout 
      showMetrics={true} 
      time="9:45 AM"
      showChatInput={true}
      criticalMetric={animationState.showCriticalAlert ? 1 : 0}
    >
      <div style={{
        position: 'relative',
        height: '100%',
        display: 'flex',
        flexDirection: 'column'
      }}>
        {/* Critical Alert Banner */}
        {animationState.showCriticalAlert && renderCriticalAlertBanner()}
        
        {/* Main content */}
        <div style={{
          position: 'relative',
          height: '100%',
          opacity: animationState.showCriticalAlert ? 0.8 : 1,
          filter: animationState.showCriticalAlert ? 'blur(1px)' : 'none',
          transition: 'opacity 0.3s ease, filter 0.3s ease'
        }}>
          <h3 style={{
            fontSize: '18px',
            margin: '0 0 16px 0',
            color: '#333'
          }}>
            Resident Watchlist
          </h3>
          
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: '16px'
          }}>
            <div style={{
              fontSize: '14px',
              color: '#6C757D'
            }}>
              {watchlistItems.length} residents require attention
            </div>
            <div style={{
              fontSize: '14px',
              color: '#2D7DD2',
              fontWeight: 'bold'
            }}>
              Sort: Priority ↓
            </div>
          </div>
          
          {/* Regular watchlist items */}
          {animationState.showWatchlist && watchlistItems.map((item, index) => renderWatchlistItem(item, index))}
        </div>
      </div>
    </TabletLayout>
  );
};

export default AnimatedTabletScene1_5; 