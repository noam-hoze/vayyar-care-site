import React, { useEffect, useState } from 'react';
import TabletLayout from './TabletLayout';
import './animations.css';

const AnimatedTabletScene6 = ({ scrollProgress = 0, scene }) => {
  const [showHeader, setShowHeader] = useState(false);
  const [showSummary, setShowSummary] = useState(false);
  const [showTrends, setShowTrends] = useState(false);
  const [showComparison, setShowComparison] = useState(false);
  const [showCallout, setShowCallout] = useState(false);
  
  useEffect(() => {
    // Animate elements based on scroll progress
    setShowHeader(scrollProgress >= 15);
    setShowSummary(scrollProgress >= 25);
    setShowTrends(scrollProgress >= 40);
    setShowComparison(scrollProgress >= 60);
    setShowCallout(scrollProgress >= 80);
  }, [scrollProgress]);
  
  // Sample trend data
  const trends = [
    { month: 'Jan', falls: 5, mobility: 82, bathroom: 12 },
    { month: 'Feb', falls: 7, mobility: 79, bathroom: 14 },
    { month: 'Mar', falls: 4, mobility: 78, bathroom: 16 },
    { month: 'Apr', falls: 6, mobility: 75, bathroom: 15 },
    { month: 'May', falls: 3, mobility: 73, bathroom: 18 },
  ];
  
  const maxFalls = Math.max(...trends.map(t => t.falls));
  const maxMobility = 100; // Percentage
  const maxBathroom = Math.max(...trends.map(t => t.bathroom));
  
  return (
    <TabletLayout time="10:15 AM" showChatInput={true} showMetrics={true}>
      <div className="documentation-header" style={{ 
        opacity: showHeader ? 1 : 0,
        transform: showHeader ? 'translateY(0)' : 'translateY(-20px)',
        transition: 'opacity 0.5s ease, transform 0.5s ease',
        padding: '15px',
        borderBottom: '1px solid #eee'
      }}>
        <h2 style={{ margin: '0 0 5px 0', color: '#2c3e50' }}>Team Huddle</h2>
        <p style={{ margin: '0', color: '#7f8c8d', fontSize: '14px' }}>
          Weekly trends and insights across all monitored residents
        </p>
      </div>
      
      {showSummary && (
        <div style={{
          backgroundColor: '#f8f9fa',
          padding: '15px',
          animation: 'fadeIn 0.5s ease forwards'
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: '10px'
          }}>
            <div style={{
              textAlign: 'center',
              flex: 1,
              padding: '10px',
              borderRadius: '8px',
              backgroundColor: 'white',
              margin: '0 5px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
            }}>
              <div style={{ color: '#e74c3c', fontSize: '24px', fontWeight: 'bold' }}>-14%</div>
              <div style={{ color: '#7f8c8d', fontSize: '12px' }}>Falls</div>
            </div>
            
            <div style={{
              textAlign: 'center',
              flex: 1,
              padding: '10px',
              borderRadius: '8px',
              backgroundColor: 'white',
              margin: '0 5px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
            }}>
              <div style={{ color: '#f39c12', fontSize: '24px', fontWeight: 'bold' }}>-8%</div>
              <div style={{ color: '#7f8c8d', fontSize: '12px' }}>Mobility</div>
            </div>
            
            <div style={{
              textAlign: 'center',
              flex: 1,
              padding: '10px',
              borderRadius: '8px',
              backgroundColor: 'white',
              margin: '0 5px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
            }}>
              <div style={{ color: '#3498db', fontSize: '24px', fontWeight: 'bold' }}>+11%</div>
              <div style={{ color: '#7f8c8d', fontSize: '12px' }}>Bathroom</div>
            </div>
          </div>
        </div>
      )}
      
      {showTrends && (
        <div style={{
          backgroundColor: 'white',
          padding: '15px',
          margin: '15px',
          borderRadius: '8px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          animation: 'fadeIn 0.5s ease forwards'
        }}>
          <h3 style={{ margin: '0 0 15px 0', fontSize: '16px', color: '#2c3e50' }}>5-Month Trends</h3>
          
          <div style={{ height: '150px', position: 'relative', marginBottom: '25px' }}>
            {/* X-axis */}
            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, borderTop: '1px solid #eee' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                {trends.map((data, index) => (
                  <div key={index} style={{ flex: 1, textAlign: 'center', fontSize: '10px', color: '#7f8c8d', paddingTop: '5px' }}>
                    {data.month}
                  </div>
                ))}
              </div>
            </div>
            
            {/* Falls chart */}
            <div style={{ 
              position: 'absolute', 
              bottom: '20px', 
              left: 0, 
              right: 0, 
              height: '90%', 
              display: 'flex', 
              alignItems: 'flex-end'
            }}>
              {trends.map((data, index) => (
                <div key={index} style={{ 
                  flex: 1, 
                  marginLeft: '5px', 
                  marginRight: '5px',
                  display: 'flex',
                  justifyContent: 'center' 
                }}>
                  <div style={{ 
                    width: '8px', 
                    height: `${(data.falls / maxFalls) * 100}%`, 
                    backgroundColor: '#e74c3c',
                    borderRadius: '2px',
                    transform: 'scaleY(0)',
                    transformOrigin: 'bottom',
                    animation: `scaleIn 0.5s ease-out ${index * 0.1}s forwards`
                  }} />
                </div>
              ))}
            </div>
            
            {/* Mobility chart (line) */}
            <svg style={{ 
              position: 'absolute', 
              bottom: '20px', 
              left: 0, 
              right: 0, 
              height: '90%', 
              width: '100%',
              opacity: showTrends ? 1 : 0,
              transition: 'opacity 0.5s ease 0.3s'
            }}>
              <polyline
                points={trends.map((data, index) => {
                  const x = (index * (100 / (trends.length - 1))) + '%';
                  const y = (100 - ((data.mobility / maxMobility) * 100)) + '%';
                  return `${x},${y}`;
                }).join(' ')}
                fill="none"
                stroke="#f39c12"
                strokeWidth="2"
                strokeDasharray="200"
                strokeDashoffset={showTrends ? "0" : "200"}
                style={{ transition: 'stroke-dashoffset 1s ease' }}
              />
              {trends.map((data, index) => {
                const x = (index * (100 / (trends.length - 1))) + '%';
                const y = (100 - ((data.mobility / maxMobility) * 100)) + '%';
                return (
                  <circle
                    key={index}
                    cx={x}
                    cy={y}
                    r="3"
                    fill="#f39c12"
                    opacity={showTrends ? 1 : 0}
                    style={{ transition: `opacity 0.5s ease ${0.3 + (index * 0.1)}s` }}
                  />
                );
              })}
            </svg>
          </div>
          
          <div style={{ display: 'flex', justifyContent: 'center', gap: '15px', marginTop: '5px' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <div style={{ width: '10px', height: '10px', backgroundColor: '#e74c3c', borderRadius: '2px', marginRight: '5px' }}></div>
              <span style={{ fontSize: '12px', color: '#7f8c8d' }}>Falls</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <div style={{ width: '10px', height: '10px', backgroundColor: '#f39c12', borderRadius: '2px', marginRight: '5px' }}></div>
              <span style={{ fontSize: '12px', color: '#7f8c8d' }}>Mobility %</span>
            </div>
          </div>
        </div>
      )}
      
      {showComparison && (
        <div style={{
          backgroundColor: 'white',
          padding: '15px',
          margin: '15px',
          borderRadius: '8px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          animation: 'fadeIn 0.5s ease forwards'
        }}>
          <h3 style={{ margin: '0 0 15px 0', fontSize: '16px', color: '#2c3e50' }}>Unit Comparison</h3>
          
          <div style={{ marginBottom: '15px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
              <span style={{ fontSize: '12px', color: '#7f8c8d' }}>Falls (East Wing)</span>
              <span style={{ fontSize: '12px', color: '#7f8c8d' }}>-22%</span>
            </div>
            <div style={{ width: '100%', height: '8px', backgroundColor: '#f1f1f1', borderRadius: '4px', overflow: 'hidden' }}>
              <div 
                style={{ 
                  width: '78%', 
                  height: '100%', 
                  backgroundColor: '#2ecc71',
                  transform: 'scaleX(0)',
                  transformOrigin: 'left',
                  animation: showComparison ? 'scaleIn 0.8s ease-out forwards' : 'none',
                  borderRadius: '4px'
                }} 
              />
            </div>
          </div>
          
          <div style={{ marginBottom: '15px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
              <span style={{ fontSize: '12px', color: '#7f8c8d' }}>Falls (West Wing)</span>
              <span style={{ fontSize: '12px', color: '#7f8c8d' }}>-8%</span>
            </div>
            <div style={{ width: '100%', height: '8px', backgroundColor: '#f1f1f1', borderRadius: '4px', overflow: 'hidden' }}>
              <div 
                style={{ 
                  width: '45%', 
                  height: '100%', 
                  backgroundColor: '#f39c12',
                  transform: 'scaleX(0)',
                  transformOrigin: 'left',
                  animation: showComparison ? 'scaleIn 0.8s ease-out 0.2s forwards' : 'none',
                  borderRadius: '4px'
                }} 
              />
            </div>
          </div>
          
          <div style={{ marginBottom: '15px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
              <span style={{ fontSize: '12px', color: '#7f8c8d' }}>Mobility Change (East)</span>
              <span style={{ fontSize: '12px', color: '#7f8c8d' }}>-6%</span>
            </div>
            <div style={{ width: '100%', height: '8px', backgroundColor: '#f1f1f1', borderRadius: '4px', overflow: 'hidden' }}>
              <div 
                style={{ 
                  width: '65%', 
                  height: '100%', 
                  backgroundColor: '#3498db',
                  transform: 'scaleX(0)',
                  transformOrigin: 'left',
                  animation: showComparison ? 'scaleIn 0.8s ease-out 0.4s forwards' : 'none',
                  borderRadius: '4px'
                }} 
              />
            </div>
          </div>
        </div>
      )}
      
      {showCallout && (
        <div style={{
          backgroundColor: '#EDF7FF',
          padding: '15px',
          margin: '15px',
          borderRadius: '8px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          animation: 'fadeIn 0.5s ease forwards',
          borderLeft: '4px solid #2D7DD2'
        }}>
          <h3 style={{ margin: '0 0 10px 0', fontSize: '16px', color: '#2c3e50' }}>Key Insight</h3>
          <p style={{ margin: '0 0 15px 0', fontSize: '14px', color: '#34495e', lineHeight: '1.4' }}>
            The East Wing has shown significant improvement in fall reduction (-22%) after implementing the new nighttime monitoring protocol. Consider expanding this approach to other wings.
          </p>
          <button style={{
            backgroundColor: '#2D7DD2',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            padding: '8px 15px',
            fontSize: '14px',
            cursor: 'pointer'
          }}>
            View Detailed Report
          </button>
        </div>
      )}
    </TabletLayout>
  );
};

export default AnimatedTabletScene6; 