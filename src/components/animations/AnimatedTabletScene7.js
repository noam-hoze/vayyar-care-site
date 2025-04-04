import React, { useEffect, useState } from 'react';
import TabletLayout from './TabletLayout';
import './animations.css';

const AnimatedTabletScene7 = ({ scrollProgress = 0, scene }) => {
  const [showHeader, setShowHeader] = useState(false);
  const [showSummary, setShowSummary] = useState(false);
  const [showActivities, setShowActivities] = useState(false);
  const [showActions, setShowActions] = useState(false);
  const [showComplete, setShowComplete] = useState(false);
  
  useEffect(() => {
    // Animate elements based on scroll progress
    setShowHeader(scrollProgress >= 15);
    setShowSummary(scrollProgress >= 30);
    setShowActivities(scrollProgress >= 50);
    setShowActions(scrollProgress >= 70);
    setShowComplete(scrollProgress >= 90);
  }, [scrollProgress]);
  
  return (
    <TabletLayout time="7:45 PM" showChatInput={true} showMetrics={true}>
      <div className="handoff-header" style={{ 
        opacity: showHeader ? 1 : 0,
        transform: showHeader ? 'translateY(0)' : 'translateY(-20px)',
        transition: 'opacity 0.5s ease, transform 0.5s ease',
        padding: '15px',
        borderBottom: '1px solid #eee'
      }}>
        <h2 style={{ margin: '0 0 5px 0', color: '#2c3e50' }}>Shift Handoff</h2>
        <p style={{ margin: '0', color: '#7f8c8d', fontSize: '14px' }}>
          Day Shift → Evening Shift | 7:45 PM
        </p>
      </div>
      
      {showSummary && (
        <div style={{
          padding: '15px',
          animation: 'fadeIn 0.5s ease forwards'
        }}>
          <div style={{
            backgroundColor: '#f8f9fa', 
            padding: '15px',
            borderRadius: '8px',
            marginBottom: '15px'
          }}>
            <h3 style={{ margin: '0 0 10px 0', fontSize: '16px', color: '#2c3e50' }}>
              Shift Overview
            </h3>
            <div style={{ fontSize: '14px', color: '#34495e', lineHeight: '1.5' }}>
              <p style={{ margin: '0 0 10px 0' }}>
                Day shift completed with 5 total alerts. All incidents have been addressed and documented.
              </p>
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between',
                marginTop: '15px' 
              }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#e74c3c' }}>3</div>
                  <div style={{ fontSize: '12px', color: '#7f8c8d' }}>Falls</div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#f39c12' }}>1</div>
                  <div style={{ fontSize: '12px', color: '#7f8c8d' }}>Mobility</div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#3498db' }}>1</div>
                  <div style={{ fontSize: '12px', color: '#7f8c8d' }}>Bathroom</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {showActivities && (
        <div style={{
          padding: '0 15px 15px 15px',
          animation: 'fadeIn 0.5s ease forwards'
        }}>
          <h3 style={{ margin: '0 0 10px 0', fontSize: '16px', color: '#2c3e50' }}>
            Resident Activities
          </h3>
          
          {[
            {
              room: "208",
              name: "John D.",
              type: "Fall",
              time: "3:18 AM",
              summary: "Resident found disoriented after fall. Vital signs stable. Increased monitoring during night."
            },
            {
              room: "306",
              name: "Alice M.",
              type: "Mobility",
              time: "10:25 AM",
              summary: "Gait speed decline noted. PT evaluation scheduled for tomorrow."
            },
            {
              room: "115",
              name: "Robert J.",
              type: "Bathroom",
              time: "2:45 PM",
              summary: "Increased bathroom visits. UTI suspected. Urine sample collected."
            }
          ].map((activity, index) => (
            <div 
              key={index}
              style={{
                backgroundColor: 'white',
                borderRadius: '8px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                padding: '15px',
                marginBottom: '10px',
                opacity: showActivities ? 1 : 0,
                transform: showActivities ? 'translateY(0)' : 'translateY(20px)',
                transition: `opacity 0.5s ease ${index * 0.2}s, transform 0.5s ease ${index * 0.2}s`
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
                    Room {activity.room}
                  </span>
                  <span style={{ color: '#7f8c8d' }}>• {activity.name}</span>
                </div>
                <div style={{ 
                  color: '#7f8c8d',
                  fontSize: '12px' 
                }}>
                  {activity.time}
                </div>
              </div>
              
              <div style={{ 
                display: 'flex',
                alignItems: 'center',
                marginBottom: '8px'
              }}>
                <div style={{
                  padding: '4px 8px',
                  borderRadius: '4px',
                  fontSize: '12px',
                  fontWeight: 'bold',
                  backgroundColor: 
                    activity.type === 'Fall' ? '#fdedeb' :
                    activity.type === 'Mobility' ? '#fef5e9' : '#eaf7fd',
                  color: 
                    activity.type === 'Fall' ? '#e74c3c' :
                    activity.type === 'Mobility' ? '#f39c12' : '#3498db',
                }}>
                  {activity.type}
                </div>
              </div>
              
              <div style={{ fontSize: '14px', color: '#34495e' }}>
                {activity.summary}
              </div>
            </div>
          ))}
        </div>
      )}
      
      {showActions && (
        <div style={{
          padding: '0 15px 15px 15px',
          animation: 'fadeIn 0.5s ease forwards'
        }}>
          <h3 style={{ margin: '0 0 10px 0', fontSize: '16px', color: '#2c3e50' }}>
            Pending Actions
          </h3>
          
          <div style={{
            backgroundColor: 'white',
            borderRadius: '8px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            padding: '15px',
            marginBottom: '10px'
          }}>
            <ul style={{ 
              margin: '0',
              paddingLeft: '20px',
              fontSize: '14px',
              color: '#34495e',
              lineHeight: '1.5'
            }}>
              <li>Follow up on Room 115 UTI test results</li>
              <li>Ensure PT evaluation happens for Room 306</li>
              <li>Medication review for Room 208 scheduled tomorrow</li>
            </ul>
          </div>
        </div>
      )}
      
      {showComplete && (
        <div style={{
          position: 'sticky',
          bottom: 0,
          left: 0,
          right: 0,
          padding: '15px',
          backgroundColor: '#f9f9f9',
          borderTop: '1px solid #eee',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          animation: 'slideInUp 0.5s ease forwards'
        }}>
          <div>
            <div style={{ fontSize: '14px', color: '#2c3e50', fontWeight: 'bold' }}>
              Alice N.
            </div>
            <div style={{ fontSize: '12px', color: '#7f8c8d' }}>
              Day Shift Lead
            </div>
          </div>
          
          <button style={{
            backgroundColor: '#2ecc71',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            padding: '10px 20px',
            fontWeight: 'bold',
            cursor: 'pointer'
          }}>
            Complete Handoff
          </button>
        </div>
      )}
    </TabletLayout>
  );
};

export default AnimatedTabletScene7; 