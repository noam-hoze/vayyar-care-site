import React from 'react';

const SceneInstructionsHeader = ({ scene }) => {
  return (
    <div style={{
      textAlign: 'center',
      padding: '0 6vw'
    }}>
      <h1 style={{
        fontSize: '2.5rem',
        margin: '0 0 0.5rem 0',
        color: '#2D7DD2'
      }}>
        {scene.title}
      </h1>
      <h2 style={{
        fontSize: '1.2rem',
        fontWeight: 'normal',
        margin: '0 0 1rem 0',
        color: '#495057',
      }}>
        {scene.subtitle}
      </h2>
    </div>
  );
};

export default SceneInstructionsHeader; 