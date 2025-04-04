import React from 'react';
import StatusPanel from './StatusPanel';
import InputBar from './InputBar';
import './mobile-styles.css';

const StartShift = ({ data, onViewWatchlist }) => {
  // Define styles
  const styles = {
    container: {
      fontFamily: 'San Francisco, Roboto, Helvetica, Arial, sans-serif',
      backgroundColor: '#F8F9FA',
      height: '100%',
      width: '100%',
      position: 'relative',
      overflow: 'hidden',
      borderRadius: '36px'
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '16px',
      borderBottom: '1px solid #E0E0E0',
      backgroundColor: 'white'
    },
    logo: {
      fontWeight: 'bold',
      fontSize: '18px',
      color: '#2D7DD2'
    },
    rightHeader: {
      display: 'flex',
      alignItems: 'center'
    },
    time: {
      marginRight: '12px',
      fontSize: '14px',
      color: '#6C757D'
    },
    avatar: {
      width: '30px',
      height: '30px',
      borderRadius: '50%',
      backgroundColor: '#E0E0E0',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    content: {
      padding: '16px',
      paddingBottom: '80px', // Space for input bar
      overflowY: 'auto',
      height: 'calc(100% - 60px)', // Subtract header height
      boxSizing: 'border-box'
    },
    botName: {
      margin: '16px 0 8px',
      fontSize: '14px',
      color: '#6C757D'
    },
    messageBox: {
      backgroundColor: 'white',
      borderRadius: '12px',
      padding: '16px',
      boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
      marginBottom: '16px'
    },
    greeting: {
      marginBottom: '16px',
      fontSize: '14px'
    },
    summaryBox: {
      backgroundColor: 'white',
      borderRadius: '12px',
      padding: '16px',
      boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
      marginBottom: '16px'
    },
    summaryTitle: {
      fontWeight: 'bold',
      marginBottom: '12px',
      fontSize: '16px'
    },
    summaryList: {
      listStyle: 'none',
      padding: 0,
      margin: 0
    },
    summaryItem: {
      padding: '8px 0',
      borderBottom: '1px solid #F0F0F0',
      fontSize: '14px',
      position: 'relative',
      paddingLeft: '16px'
    },
    bullet: {
      position: 'absolute',
      left: 0,
      top: '12px'
    },
    actionButton: {
      backgroundColor: '#38B6FF',
      color: 'white',
      border: 'none',
      padding: '10px 20px',
      borderRadius: '20px',
      fontSize: '14px',
      fontWeight: '500',
      cursor: 'pointer',
      marginTop: '12px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    }
  };

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <div style={styles.logo}>VAYYAR</div>
        <div style={styles.rightHeader}>
          <div style={styles.time}>9:41 AM</div>
          <div style={styles.avatar}>👤</div>
        </div>
      </div>

      {/* Main Content */}
      <div style={styles.content} className="mobile-content">
        {/* Status Panel */}
        <StatusPanel 
          alerts={data.alerts} 
          critical={data.critical} 
          monitored={data.monitored} 
        />

        {/* Bot Name */}
        <div style={styles.botName}>VayyarCare</div>

        {/* Greeting Message */}
        <div style={styles.messageBox}>
          <div style={styles.greeting}>
            Good morning, Sarah. Here's your shift summary.
          </div>
        </div>

        {/* Summary Box */}
        <div style={styles.summaryBox}>
          <div style={styles.summaryTitle}>Shift Summary:</div>
          <ul style={styles.summaryList}>
            {data.summaryItems.map((item, index) => (
              <li key={index} style={styles.summaryItem}>
                <span style={styles.bullet}>•</span> {item}
              </li>
            ))}
          </ul>
          <button 
            style={styles.actionButton}
            onClick={onViewWatchlist}
          >
            View Watchlist
          </button>
        </div>
      </div>

      {/* Input Bar */}
      <InputBar />
    </div>
  );
};

export default StartShift; 