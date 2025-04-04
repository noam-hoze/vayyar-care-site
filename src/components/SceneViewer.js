import React, { useState, useEffect, useMemo, useRef } from 'react';
import SceneInstructions from './SceneInstructions';
import AnimatedTablet from './animations/AnimatedTablet';
import AnimatedTabletScene1_5 from './animations/AnimatedTabletScene1_5';
import AnimatedTabletScene2 from './animations/AnimatedTabletScene2';
import AnimatedTabletScene3 from './animations/AnimatedTabletScene3';
import AnimatedTabletScene4 from './animations/AnimatedTabletScene4';
import AnimatedTabletScene5 from './animations/AnimatedTabletScene5';
import AnimatedTabletScene6 from './animations/AnimatedTabletScene6';
import AnimatedTabletScene7 from './animations/AnimatedTabletScene7';
import AnimatedTabletScene8 from './animations/AnimatedTabletScene8';
import AnimatedTabletScene9 from './animations/AnimatedTabletScene9';
import DebugOverlay from './DebugOverlay';

const SceneViewer = ({ scene, index = 0, subScrollProgress = 0 }) => {
  // Calculate sub-scroll progress for animations
  const [animationProgress, setAnimationProgress] = useState(0);
  
  // State to track if callout should be visible
  const [showCallout, setShowCallout] = useState(false);
  
  // Track previous scene index to detect changes
  const prevIndexRef = useRef(index);
  
  // State to control scene card animation
  const [animateCard, setAnimateCard] = useState(true);
  
  // Reset animations when scene changes
  useEffect(() => {
    if (prevIndexRef.current !== index) {
      // Scene has changed
      setAnimateCard(false); // Remove animation classes
      setShowCallout(false); // Hide callout when scene changes
      
      // Reset them after a brief delay to trigger re-animation
      setTimeout(() => {
        setAnimateCard(true);
      }, 50);
      
      prevIndexRef.current = index;
    }
  }, [index]);
  
  // Use the passed subScrollProgress or calculate it if not provided
  useEffect(() => {
    setAnimationProgress(Math.min(100, Math.max(0, subScrollProgress * 100)));
    
    // Get the callout display percentage from the scene
    const calloutDisplayPercentage = parseFloat(scene.calloutDisplayPercentage || 80);
    
    // Show callout when we reach that percentage
    if (animationProgress >= calloutDisplayPercentage) {
      setShowCallout(true);
    } else {
      setShowCallout(false);
    }
  }, [subScrollProgress, scene, animationProgress]);
  
  // Define tablet components map
  const tabletComponentsMap = useMemo(() => ({
    0: AnimatedTablet,
    1: AnimatedTabletScene1_5,
    2: AnimatedTabletScene2,
    3: AnimatedTabletScene3,
    4: AnimatedTabletScene4,
    5: AnimatedTabletScene5,
    6: AnimatedTabletScene6,
    7: AnimatedTabletScene7,
    8: AnimatedTabletScene8,
    9: AnimatedTabletScene9,
  }), []);

  // Memoized render tablet component
  const tabletComponent = useMemo(() => {
    const TabletComponent = tabletComponentsMap[index] || AnimatedTablet;
    return (
      <TabletComponent
        scene={scene}
        scrollProgress={animationProgress}
      />
    );
  }, [index, scene, animationProgress, tabletComponentsMap]);
  
  return (
    <div className="scene-container" style={{ color: scene.color || '#000' }}>
      {/* Debug info */}
      <DebugOverlay 
        scrollProgress={subScrollProgress}
        animationProgress={animationProgress}
        scene={scene}
        sceneIndex={index}
      />

      {/* Scene content */}
      <div className="scene-content">
        
        {/* Two-column layout container */}
        <div className="scene-layout">
          {/* Left column - Image (full size) */}
          <div className="scene-image-column">
            <img 
              src={scene.backgroundImage} 
              alt={scene.title}
              className="scene-image-column-image"
            />
          </div>
          
          {/* Right column - Scene description and marketing callout */}
          <div className="scene-content-column">
            {/* Scene description container with animation reset on scene change */}
            <div className={`scene-description-container ${animateCard ? 'animate-in' : 'reset-animation'}`}>
              <p className="scene-description-text">
                {scene.description}
              </p>
            </div>
            
            {/* Only render the callout wrapper when there is a subtitle */}
            {scene.subtitle && scene.subtitle.trim() !== "" && (
              <div className="scene-callout-wrapper">
                {/* Marketing callout - only shown when showCallout is true */}
                <div className={`scene-callout ${showCallout ? 'visible' : 'hidden'} ${animateCard ? 'animate-in' : 'reset-animation'}`}>
                  <h3>{scene.subtitle}</h3>
                  <div className="scene-callout-underline"></div>
                </div>
              </div>
            )}
          </div>
        </div>
        
        {/* Animated tablet in the center */}
        <div className="tablet-wrapper">
          {tabletComponent}
        </div>
      </div>
    </div>
  );
};

export default SceneViewer; 