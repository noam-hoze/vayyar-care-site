import { useState, useEffect, useRef } from 'react';
import { scenes } from './data/scenes';
import SceneViewer from './components/SceneViewer';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const [index, setIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [subScrollProgress, setSubScrollProgress] = useState(0);
  const scrollableRef = useRef(null);
  
  // Setup GSAP smooth scrolling
  useEffect(() => {
    // Simple smooth scrolling with GSAP
    let smoothness = 0.08; // Lower = more resistance (0.05-0.5)
    let currentY = 0;
    let targetY = 0;
    let rafId = null;
    
    function updateScroll() {
      // Calculate smooth scrolling with easing
      currentY += (targetY - currentY) * smoothness;
      window.scrollTo(0, currentY);
      rafId = requestAnimationFrame(updateScroll);
    }
    
    function handleWheel(e) {
      // Prevent default scrolling
      e.preventDefault();
      
      // Update target position with reduced speed
      const speedMultiplier = 0.1; // Reduce scroll speed
      targetY = Math.max(0, Math.min(
        document.body.scrollHeight - window.innerHeight,
        targetY + (e.deltaY * speedMultiplier)
      ));
      
      // Start animation if not already running
      if (rafId === null) {
        rafId = requestAnimationFrame(updateScroll);
      }
    }
    
    // Add event listener to the scrollable container
    const scrollable = scrollableRef.current || window;
    scrollable.addEventListener('wheel', handleWheel, { passive: false });
    
    return () => {
      // Clean up
      scrollable.removeEventListener('wheel', handleWheel);
      cancelAnimationFrame(rafId);
    };
  }, []);
  
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const totalHeight = scenes.length * windowHeight;
      
      // Calculate progress percentage for visual indicators
      const newProgress = Math.min(100, (scrollY / (totalHeight - windowHeight)) * 100);
      setProgress(newProgress);
      
      // Set current scene index
      const newIndex = Math.min(
        scenes.length - 1,
        Math.floor(scrollY / windowHeight)
      );
      
      // Calculate sub-scroll progress within the current scene (0 to 1)
      const sceneStartY = newIndex * windowHeight;
      const subScroll = (scrollY - sceneStartY) / windowHeight;
      setSubScrollProgress(subScroll);
      
      setIndex(newIndex);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scene = scenes[index] || {};

  return (
    <div className="app" ref={scrollableRef}>
      {/* Scene navigation indicators */}
      <div className="scene-navigation">
        {scenes.map((s, i) => (
          <div 
            key={i}
            className={`scene-indicator ${i === index ? 'active' : ''}`}
            title={s.title}
          />
        ))}
      </div>
      
      {/* Progress indicator */}
      <div className="progress-bar-container">
        <div 
          className="progress-bar"
          style={{
            width: `${progress}%`
          }}
        />
      </div>
      
      {/* Main content */}
      <div className="scenes-container" style={{ height: `${(scenes.length) * 100}vh` }}>
        <SceneViewer 
          scene={scene} 
          index={index}
          subScrollProgress={subScrollProgress}
        />
      </div>
    </div>
  );
}
