import React, { useEffect, useState } from 'react';
import TabletLayout from './TabletLayout';
import './animations.css';

const AnimatedTabletScene5 = ({ scrollProgress = 0, scene }) => {
  const [showHeader, setShowHeader] = useState(false);
  const [showReports, setShowReports] = useState(false);
  const [showActions, setShowActions] = useState(false);
  const [approvedReports, setApprovedReports] = useState([false, false, false]);
  
  useEffect(() => {
    // Animate elements based on scroll progress
    setShowHeader(scrollProgress >= 15);
    setShowReports(scrollProgress >= 30);
    setShowActions(scrollProgress >= 60);
    
    // Show reports being approved sequentially
    const newApproved = [...approvedReports];
    if (scrollProgress >= 75) newApproved[0] = true;
    if (scrollProgress >= 85) newApproved[1] = true;
    if (scrollProgress >= 95) newApproved[2] = true;
    setApprovedReports(newApproved);
  }, [scrollProgress]);
  
  // Sample reports data
  const reports = [
    {
      title: "Fall Risk Assessment",
      patient: "John D. (Room 208)",
      summary: "Fall detected at 3:18 AM. Resident found disoriented and assisted back to bed. Vital signs stable.",
      recommendation: "Increase monitoring frequency to every 2 hours during nighttime."
    },
    {
      title: "Mobility Analysis",
      patient: "Alice M. (Room 306)",
      summary: "Gait decline of approximately 60% over past week. Speed reduced from 0.7m/s to 0.4m/s.",
      recommendation: "Schedule physical therapy evaluation and review medication side effects."
    },
    {
      title: "Bathroom Visit Pattern",
      patient: "Robert J. (Room 115)",
      summary: "Increased bathroom visits (5x in 5 hours). Normal baseline is 0-2 visits in same timeframe.",
      recommendation: "Check for UTI symptoms and increase fluid intake monitoring."
    }
  ];
  
  return (
    <TabletLayout time="4:30 PM" showChatInput={true} showMetrics={true}>
      <div className="documentation-header" style={{ 
        opacity: showHeader ? 1 : 0,
        transform: showHeader ? 'translateY(0)' : 'translateY(-20px)',
        transition: 'opacity 0.5s ease, transform 0.5s ease',
        padding: '15px',
        borderBottom: '1px solid #eee'
      }}>
        <h2 style={{ margin: '0 0 5px 0', color: '#2c3e50' }}>Documentation</h2>
        <p style={{ margin: '0', color: '#7f8c8d', fontSize: '14px' }}>
          Review automatically generated reports based on resident activity
        </p>
      </div>
      
      <div className="reports-container" style={{ padding: '15px' }}>
        {reports.map((report, index) => (
          <div 
            key={index}
            className="report-card"
            style={{
              opacity: showReports ? 1 : 0,
              transform: showReports ? 'translateY(0)' : 'translateY(20px)',
              transition: `opacity 0.5s ease ${index * 0.2}s, transform 0.5s ease ${index * 0.2}s`,
              backgroundColor: 'white',
              borderRadius: '8px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              padding: '15px',
              marginBottom: '15px',
              border: approvedReports[index] ? '1px solid #2ecc71' : '1px solid #e0e0e0',
              position: 'relative'
            }}
          >
            {approvedReports[index] && (
              <div style={{
                position: 'absolute',
                top: '10px',
                right: '10px',
                backgroundColor: '#2ecc71',
                color: 'white',
                padding: '3px 8px',
                borderRadius: '4px',
                fontSize: '12px',
                fontWeight: 'bold',
                animation: 'fadeIn 0.3s ease forwards'
              }}>
                APPROVED
              </div>
            )}
            
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between',
              alignItems: 'flex-start'
            }}>
              <h3 style={{ 
                margin: '0 0 10px 0',
                color: '#2c3e50',
                fontSize: '16px'
              }}>
                {report.title}
              </h3>
            </div>
            
            <div style={{
              fontSize: '14px',
              color: '#7f8c8d',
              marginBottom: '10px'
            }}>
              <strong>Patient:</strong> {report.patient}
            </div>
            
            <div style={{
              backgroundColor: '#f9f9f9',
              padding: '10px',
              borderRadius: '4px',
              marginBottom: '10px'
            }}>
              <p style={{ margin: '0 0 8px 0', fontSize: '14px' }}>
                <strong>Summary:</strong> {report.summary}
              </p>
              <p style={{ margin: '0', fontSize: '14px', color: '#2D7DD2' }}>
                <strong>Recommendation:</strong> {report.recommendation}
              </p>
            </div>
            
            {showActions && (
              <div style={{ 
                display: 'flex',
                justifyContent: 'flex-end',
                gap: '10px',
                marginTop: '10px',
                animation: 'fadeIn 0.3s ease forwards'
              }}>
                <button style={{
                  padding: '8px 15px',
                  backgroundColor: approvedReports[index] ? '#e0e0e0' : '#2ecc71',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  opacity: approvedReports[index] ? 0.5 : 1
                }}>
                  {approvedReports[index] ? 'Approved' : 'Approve'}
                </button>
                <button style={{
                  padding: '8px 15px',
                  backgroundColor: 'transparent',
                  color: '#7f8c8d',
                  border: '1px solid #e0e0e0',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}>
                  Edit
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
      
      {showActions && (
        <div style={{
          padding: '15px',
          borderTop: '1px solid #eee',
          display: 'flex',
          justifyContent: 'space-between',
          backgroundColor: '#f9f9f9',
          animation: 'slideInUp 0.5s ease forwards'
        }}>
          <div>
            <span style={{ fontSize: '14px', color: '#7f8c8d' }}>
              {approvedReports.filter(Boolean).length} of {reports.length} reports approved
            </span>
          </div>
          <button style={{
            padding: '8px 20px',
            backgroundColor: '#3498db',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontWeight: 'bold'
          }}>
            Submit All
          </button>
        </div>
      )}
    </TabletLayout>
  );
};

export default AnimatedTabletScene5; 