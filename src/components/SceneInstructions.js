import React from 'react';

const SceneInstructions = ({ scene }) => {
  const renderContent = () => {
    if (!scene.content) return null;
    
    return (
      <div style={{
        backgroundColor: 'white',
        padding: '1.5rem',
        borderRadius: '12px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      }}>
        {scene.content.map((item, index) => (
          <div key={index} style={{
            padding: '0.5rem 0',
            borderBottom: index < scene.content.length - 1 ? '1px solid #eee' : 'none'
          }}>
            {item}
          </div>
        ))}
      </div>
    );
  };
  
  return (
    <div>
      {scene.description && (
        <p style={{
          fontSize: '1rem',
          lineHeight: '1.6',
          marginBottom: '2rem',
          color: '#495057'
        }}>
          {scene.description}
        </p>
      )}
      
      {renderContent()}
    </div>
  );
};

export default SceneInstructions; 