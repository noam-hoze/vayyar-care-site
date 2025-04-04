import React, { useEffect, useState } from 'react';
import TabletLayout from './TabletLayout';
import './animations.css';

const AnimatedTabletScene9 = ({ scrollProgress = 0, scene }) => {
  const [showHeader, setShowHeader] = useState(false);
  const [showOverview, setShowOverview] = useState(false);
  const [showResidents, setShowResidents] = useState(false);
  const [showTasks, setShowTasks] = useState(false);
  const [showForecast, setShowForecast] = useState(false);
  
  useEffect(() => {
    // Animate elements based on scroll progress
    setShowHeader(scrollProgress >= 10);
    setShowOverview(scrollProgress >= 25);
    setShowResidents(scrollProgress >= 45);
    setShowTasks(scrollProgress >= 65);
    setShowForecast(scrollProgress >= 85);
  }, [scrollProgress]);
  
  return (
    <TabletLayout time="7:05 AM" showChatInput={true} showMetrics={true}>
      <div className="morning-header" style={{ 
        opacity: showHeader ? 1 : 0,
        transform: showHeader ? 'translateY(0)' : 'translateY(-20px)',
        transition: 'opacity 0.5s ease, transform 0.5s ease',
        padding: '15px',
        borderBottom: '1px solid #eee',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div>
          <h2 style={{ margin: '0 0 5px 0', color: '#2c3e50' }}>Good Morning, Maria</h2>
          <p style={{ margin: '0', color: '#7f8c8d', fontSize: '14px' }}>
            Tuesday, May 16 - Morning Shift
          </p>
        </div>
        <div style={{ 
          backgroundColor: '#f39c12', 
          color: 'white',
          padding: '6px 12px',
          borderRadius: '20px',
          fontSize: '12px',
          fontWeight: 'bold'
        }}>
          NEW SHIFT
        </div>
      </div>
      
      {showOverview && (
        <div style={{
          padding: '15px',
          animation: 'fadeIn 0.5s ease forwards'
        }}>
          <h3 style={{ 
            margin: '0 0 15px 0', 
            fontSize: '16px', 
            color: '#2c3e50',
            display: 'flex',
            alignItems: 'center'
          }}>
            <span style={{ marginRight: '8px' }}>📊</span>
            Overnight Summary
          </h3>
          
          <div style={{
            display: 'flex',
            justifyContent: 'space-around',
            padding: '15px',
            backgroundColor: '#f8f9fa',
            borderRadius: '8px',
            marginBottom: '15px'
          }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#2ecc71' }}>2</div>
              <div style={{ fontSize: '12px', color: '#7f8c8d' }}>Incidents</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#3498db' }}>95%</div>
              <div style={{ fontSize: '12px', color: '#7f8c8d' }}>Sleep Quality</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#9b59b6' }}>8</div>
              <div style={{ fontSize: '12px', color: '#7f8c8d' }}>Bathroom Visits</div>
            </div>
          </div>
        </div>
      )}
      
      {showResidents && (
        <div style={{
          padding: '0 15px 15px 15px',
          animation: 'fadeIn 0.5s ease forwards'
        }}>
          <h3 style={{ 
            margin: '0 0 15px 0', 
            fontSize: '16px', 
            color: '#2c3e50',
            display: 'flex',
            alignItems: 'center'
          }}>
            <span style={{ marginRight: '8px' }}>🧑‍🤝‍🧑</span>
            Resident Status
          </h3>
          
          {[
            { 
              room: "208", 
              name: "John D.", 
              status: "Improved", 
              statusColor: "#2ecc71",
              lastIncident: "None overnight",
              note: "Fall risk reduced after adjustment to nighttime routine"
            },
            { 
              room: "306", 
              name: "Alice M.", 
              status: "Stable", 
              statusColor: "#3498db",
              lastIncident: "One bathroom visit at 2:15 AM",
              note: "PT session scheduled for 10:30 AM today"
            },
            { 
              room: "115", 
              name: "Robert J.", 
              status: "Needs Attention", 
              statusColor: "#e74c3c",
              lastIncident: "Multiple bathroom visits (3x)",
              note: "UTI test results ready for review"
            }
          ].map((resident, index) => (
            <div 
              key={index}
              style={{
                backgroundColor: 'white',
                borderRadius: '8px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                padding: '15px',
                marginBottom: '10px',
                opacity: showResidents ? 1 : 0,
                transform: showResidents ? 'translateY(0)' : 'translateY(20px)',
                transition: `opacity 0.5s ease ${index * 0.15}s, transform 0.5s ease ${index * 0.15}s`,
                borderLeft: `4px solid ${resident.statusColor}`
              }}
            >
              <div style={{ 
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: '8px'
              }}>
                <div>
                  <span style={{ 
                    fontWeight: 'bold', 
                    color: '#2c3e50', 
                    marginRight: '5px' 
                  }}>
                    Room {resident.room}
                  </span>
                  <span style={{ color: '#7f8c8d' }}>• {resident.name}</span>
                </div>
                <div style={{ 
                  color: 'white',
                  backgroundColor: resident.statusColor,
                  padding: '2px 8px',
                  borderRadius: '4px',
                  fontSize: '11px',
                  fontWeight: 'bold'
                }}>
                  {resident.status}
                </div>
              </div>
              
              <div style={{ fontSize: '13px', color: '#7f8c8d', marginBottom: '5px' }}>
                <strong>Last incident:</strong> {resident.lastIncident}
              </div>
              
              <div style={{ fontSize: '13px', color: '#34495e' }}>
                {resident.note}
              </div>
            </div>
          ))}
        </div>
      )}
      
      {showTasks && (
        <div style={{
          padding: '0 15px 15px 15px',
          animation: 'fadeIn 0.5s ease forwards'
        }}>
          <h3 style={{ 
            margin: '0 0 15px 0', 
            fontSize: '16px', 
            color: '#2c3e50',
            display: 'flex',
            alignItems: 'center'
          }}>
            <span style={{ marginRight: '8px' }}>✅</span>
            Today's Tasks
          </h3>
          
          <div style={{
            backgroundColor: 'white',
            borderRadius: '8px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            padding: '15px',
            marginBottom: '15px'
          }}>
            <div style={{ marginBottom: '10px' }}>
              <div style={{ 
                display: 'flex', 
                alignItems: 'center',
                marginBottom: '8px'
              }}>
                <div style={{ 
                  width: '20px', 
                  height: '20px', 
                  borderRadius: '4px',
                  border: '2px solid #e74c3c',
                  marginRight: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <div style={{ 
                    width: '10px', 
                    height: '10px', 
                    borderRadius: '2px',
                    backgroundColor: '#e74c3c' 
                  }}></div>
                </div>
                <div style={{ 
                  fontSize: '14px', 
                  fontWeight: 'bold', 
                  color: '#2c3e50' 
                }}>High Priority</div>
              </div>
              
              <ul style={{ 
                margin: '0',
                paddingLeft: '30px',
                fontSize: '14px',
                color: '#34495e',
                lineHeight: '1.5'
              }}>
                <li>Review UTI test results for Room 115</li>
                <li>Update fall prevention plan for Room 208</li>
              </ul>
            </div>
            
            <div>
              <div style={{ 
                display: 'flex', 
                alignItems: 'center',
                marginBottom: '8px'
              }}>
                <div style={{ 
                  width: '20px', 
                  height: '20px', 
                  borderRadius: '4px',
                  border: '2px solid #3498db',
                  marginRight: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <div style={{ 
                    width: '10px', 
                    height: '10px', 
                    borderRadius: '2px',
                    backgroundColor: '#3498db' 
                  }}></div>
                </div>
                <div style={{ 
                  fontSize: '14px', 
                  fontWeight: 'bold', 
                  color: '#2c3e50' 
                }}>Standard Tasks</div>
              </div>
              
              <ul style={{ 
                margin: '0',
                paddingLeft: '30px',
                fontSize: '14px',
                color: '#34495e',
                lineHeight: '1.5'
              }}>
                <li>Morning medication rounds</li>
                <li>Attend PT session for Room 306 at 10:30 AM</li>
                <li>Team meeting at 2:00 PM</li>
              </ul>
            </div>
          </div>
        </div>
      )}
      
      {showForecast && (
        <div style={{
          padding: '0 15px 15px 15px',
          animation: 'fadeIn 0.5s ease forwards'
        }}>
          <h3 style={{ 
            margin: '0 0 15px 0', 
            fontSize: '16px', 
            color: '#2c3e50',
            display: 'flex',
            alignItems: 'center'
          }}>
            <span style={{ marginRight: '8px' }}>🔮</span>
            Predictions & Insights
          </h3>
          
          <div style={{
            backgroundColor: '#EDF7FF',
            borderRadius: '8px',
            padding: '15px',
            marginBottom: '15px',
            borderLeft: '4px solid #2D7DD2'
          }}>
            <h4 style={{ 
              margin: '0 0 10px 0', 
              color: '#2c3e50',
              fontSize: '15px' 
            }}>Fall Risk Forecast</h4>
            
            <p style={{ 
              margin: '0 0 10px 0', 
              fontSize: '14px', 
              color: '#34495e',
              lineHeight: '1.4'
            }}>
              Based on sleep patterns and recent mobility data, Room 306 may experience increased fall risk today. Consider implementing additional safety measures.
            </p>
            
            <div style={{ 
              display: 'flex', 
              justifyContent: 'flex-end', 
              marginTop: '10px' 
            }}>
              <button style={{
                padding: '8px 15px',
                backgroundColor: '#2D7DD2',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                fontSize: '13px',
                cursor: 'pointer',
                fontWeight: 'bold'
              }}>
                View Prevention Plan
              </button>
            </div>
          </div>
          
          <div style={{
            backgroundColor: 'white',
            borderRadius: '8px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            padding: '15px'
          }}>
            <h4 style={{ 
              margin: '0 0 15px 0', 
              color: '#2c3e50',
              fontSize: '15px',
              display: 'flex',
              alignItems: 'center'
            }}>
              <span style={{ 
                marginRight: '8px',
                width: '24px',
                height: '24px',
                backgroundColor: '#f1c40f',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: '14px',
                fontWeight: 'bold'
              }}>!</span>
              Weather & External Factors
            </h4>
            
            <div style={{ fontSize: '14px', color: '#34495e', lineHeight: '1.4' }}>
              <p style={{ margin: '0 0 10px 0' }}>
                <strong>Weather:</strong> High of 85°F expected. May increase dehydration risk.
              </p>
              <p style={{ margin: '0' }}>
                <strong>Reminder:</strong> Ensure residents have adequate water intake throughout the day, especially those with UTI history.
              </p>
            </div>
          </div>
        </div>
      )}
    </TabletLayout>
  );
};

export default AnimatedTabletScene9; 