import React from 'react';

const StatusPanel = ({ alerts, critical, monitored }) => {
  // Define styles
  const styles = {
    container: {
      display: 'flex',
      justifyContent: 'space-between',
      padding: '10px 16px',
      backgroundColor: 'white',
      borderRadius: '8px',
      boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
      margin: '10px 0',
      fontSize: '14px',
      fontWeight: '500'
    },
    statItem: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '0 10px'
    },
    statValue: {
      fontSize: '16px',
      fontWeight: 'bold',
      marginBottom: '2px'
    },
    statLabel: {
      fontSize: '12px',
      color: '#6C757D'
    },
    separator: {
      width: '1px',
      backgroundColor: 'rgba(45,125,210,0.2)',
      margin: '0 5px'
    },
    critical: {
      color: '#E74C3C'
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.statItem}>
        <div style={styles.statValue}>{alerts}</div>
        <div style={styles.statLabel}>Alerts</div>
      </div>
      
      <div style={styles.separator}></div>
      
      <div style={styles.statItem}>
        <div style={{...styles.statValue, ...(critical > 0 ? styles.critical : {})}}>
          {critical}
        </div>
        <div style={styles.statLabel}>Critical</div>
      </div>
      
      <div style={styles.separator}></div>
      
      <div style={styles.statItem}>
        <div style={{...styles.statValue, color: '#3EBD93'}}>{monitored}%</div>
        <div style={styles.statLabel}>Monitored</div>
      </div>
    </div>
  );
};

export default StatusPanel; 