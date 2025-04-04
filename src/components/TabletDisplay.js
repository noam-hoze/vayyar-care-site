import React from 'react';

const TabletDisplay = ({ scene }) => {
  // Healthcare-themed colors
  const colors = {
    primary: '#2D7DD2', // Blue - primary brand color
    secondary: '#38B6FF', // Light blue - secondary brand color
    accent: '#EAF2F8', // Very light blue - background accent
    success: '#3EBD93', // Teal green - positive indicators
    warning: '#F39C12', // Amber - warning indicators
    danger: '#E74C3C', // Red - urgent alerts
    gray: '#F8F9FA', // Light gray - background
    darkGray: '#6C757D', // Dark gray - text
    white: '#FFFFFF', // White
    textPrimary: '#212529', // Near black - primary text
    textSecondary: '#495057', // Dark gray - secondary text
  };
  
  const getAlertLevel = (content) => {
    if (content.includes('Fall detected') || content.includes('Unsupervised bed exit')) 
      return 'high';
    if (content.includes('decline') || content.includes('flagged')) 
      return 'medium';
    return 'low';
  };
  
  const getAlertIcon = (content) => {
    if (content.includes('Fall')) return '⚠️';
    if (content.includes('Bathroom')) return '🚻';
    if (content.includes('Gait') || content.includes('mobility')) return '👣';
    if (content.includes('Immobility')) return '🛌';
    return '📊';
  };
  
  const getAlertColor = (level) => {
    switch(level) {
      case 'high': return colors.danger;
      case 'medium': return colors.warning;
      case 'low': return colors.primary;
      default: return colors.primary;
    }
  };

  return (
    <div style={{
      position: 'relative',
      maxWidth: 260,
      width: '100%',
      margin: '0 auto',
      zIndex: 10,
      height: '100%',
      maxHeight: '64vh',
      display: 'flex',
      alignItems: 'flex-start',
      paddingTop: '2vh'
    }}>
      {/* Phone Frame Shadow */}
      <div style={{
        position: 'absolute',
        width: '85%',
        height: '15px',
        bottom: '-15px',
        left: '50%',
        transform: 'translateX(-50%)',
        background: 'radial-gradient(ellipse at center, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0) 70%)',
        borderRadius: '50%',
        zIndex: 1
      }}></div>
    
      {/* Camera */}
      <div style={{
        position: 'absolute',
        width: '8px',
        height: '8px',
        borderRadius: '50%',
        background: '#222',
        top: 'calc(2vh + 15px)',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 2
      }}></div>
      
      {/* Speaker */}
      <div style={{
        position: 'absolute',
        width: '60px',
        height: '4px',
        borderRadius: '4px',
        background: '#222',
        top: 'calc(2vh + 17px)',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 2
      }}></div>
      
      {/* Phone Body */}
      <div style={{
        background: colors.white,
        padding: '2.5rem 1rem 2rem',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.6rem',
        position: 'relative',
        border: '10px solid #333',
        borderRadius: '36px',
        boxShadow: 'inset 0 0 10px rgba(0,0,0,0.1), 0 10px 40px rgba(0,0,0,0.2)',
        height: 'calc(100% - 4vh)',
        aspectRatio: '9/19',
        boxSizing: 'border-box',
        overflowY: 'hidden'
      }}>
        {/* Status Bar */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          fontSize: '0.7rem',
          color: colors.darkGray,
          marginBottom: '0.4rem',
          position: 'sticky',
          top: 0,
          background: colors.white,
          padding: '0 0 5px 0',
          zIndex: 3
        }}>
          <div>9:41</div>
          <div style={{ display: 'flex', gap: '5px' }}>
            <span>4G</span>
            <span>100%</span>
          </div>
        </div>
        
        {/* App Header */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          marginBottom: '1.2rem',
        }}>
          <div style={{
            width: '36px',
            height: '36px',
            borderRadius: '8px',
            background: colors.white,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: '12px',
            overflow: 'hidden',
          }}>
            <img 
              src="/images/vayyar-logo.png" 
              alt="Vayyar"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'contain'
              }}
            />
          </div>
          <div style={{
            fontSize: '1.2rem',
            fontWeight: '700',
            color: colors.textPrimary,
          }}>
            {scene.subtitle ? scene.subtitle.split('+')[0].trim() : ''}
          </div>
        </div>
        
        {/* Summary Stats Bar */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          background: colors.accent,
          padding: '0.5rem 0.7rem',
          borderRadius: '12px',
          marginBottom: '0.8rem',
        }}>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}>
            <div style={{ fontSize: '0.9rem', fontWeight: '700', color: colors.primary }}>
              {(scene.content || []).length}
            </div>
            <div style={{ fontSize: '0.6rem', color: colors.darkGray }}>Alerts</div>
          </div>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '0 0.7rem',
            borderLeft: `1px solid ${colors.primary}20`,
            borderRight: `1px solid ${colors.primary}20`,
          }}>
            <div style={{ fontSize: '0.9rem', fontWeight: '700', color: getAlertColor('high') }}>
              {(scene.content || []).filter(c => getAlertLevel(c) === 'high').length}
            </div>
            <div style={{ fontSize: '0.6rem', color: colors.darkGray }}>Critical</div>
          </div>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}>
            <div style={{ fontSize: '0.9rem', fontWeight: '700', color: colors.success }}>100%</div>
            <div style={{ fontSize: '0.6rem', color: colors.darkGray }}>Monitored</div>
          </div>
        </div>
        
        {/* Alerts Section */}
        <div style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          gap: '0.7rem'
        }}>
          {(scene.content || []).map((line, i) => {
            const alertLevel = getAlertLevel(line);
            const alertColor = getAlertColor(alertLevel);
            const icon = getAlertIcon(line);
            
            return (
              <div 
                key={i} 
                style={{ 
                  margin: 0, 
                  fontSize: '0.8rem', 
                  lineHeight: '1.4',
                  padding: '0.7rem 0.8rem',
                  borderRadius: '10px',
                  background: colors.white,
                  boxShadow: '0 1px 5px rgba(0,0,0,0.05)',
                  border: `1px solid ${colors.gray}`,
                  borderLeft: `4px solid ${alertColor}`,
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '0.5rem',
                  position: 'relative',
                }}
              >
                <div style={{
                  width: '24px',
                  height: '24px',
                  borderRadius: '50%',
                  background: `${alertColor}15`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '12px',
                }}>
                  {icon}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: '600', color: colors.textPrimary }}>{line.split('–')[0]}</div>
                  {line.includes('–') && (
                    <div style={{ fontSize: '0.75rem', color: colors.textSecondary, marginTop: '2px' }}>
                      {line.split('–')[1]}
                    </div>
                  )}
                </div>
                <div style={{
                  position: 'absolute',
                  top: '0.5rem',
                  right: '0.6rem',
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  background: alertColor,
                }}></div>
              </div>
            );
          })}
        </div>
        
        {/* Home Button/Bar */}
        <div style={{
          width: '80px',
          height: '4px',
          borderRadius: '2px',
          background: '#777',
          position: 'absolute',
          bottom: '10px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 2
        }}></div>
      </div>

      {/* Phone Side Buttons */}
      <div style={{
        position: 'absolute',
        width: '3px',
        height: '25px',
        background: '#222',
        top: 'calc(2vh + 100px)',
        right: '-3px',
        borderRadius: '0 2px 2px 0'
      }}></div>
      <div style={{
        position: 'absolute',
        width: '3px',
        height: '50px',
        background: '#222',
        top: 'calc(2vh + 150px)',
        left: '-3px',
        borderRadius: '2px 0 0 2px'
      }}></div>
    </div>
  );
};

export default TabletDisplay; 