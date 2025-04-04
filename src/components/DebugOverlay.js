import React from 'react';

/**
 * Debug overlay component to display animation and scene information
 * @param {Object} props - Component props
 * @param {number} props.scrollProgress - Current scroll progress (0-100)
 * @param {number} props.animationProgress - Current animation progress (0-100)
 * @param {Object} props.scene - Current scene object
 * @param {number} props.sceneIndex - Current scene index
 */
const DebugOverlay = ({ scrollProgress, animationProgress, scene, sceneIndex }) => {
  return (
    <div className="debug-overlay">
      <div className="debug-overlay-item">Scroll: {Math.round(scrollProgress * 100)}%</div>
      <div className="debug-overlay-item">Animation: {Math.round(animationProgress)}%</div>
      <div className="debug-overlay-item">Scene: {scene?.title || 'None'} (Index: {sceneIndex})</div>
    </div>
  );
};

export default DebugOverlay; 