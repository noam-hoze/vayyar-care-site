import { useState, useEffect, useRef } from "react";
import { Routes, Route } from "react-router-dom";
import { scenes } from "./data/scenes";
import SceneViewer from "./components/SceneViewer";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MAX_SCENES, isValidScene, SCENES } from "./data/sceneRegistry";
import ClinicalPage from "./pages/clinical";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Component for the original homepage scroll logic
function HomePage() {
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
            // Apply scroll only if this component is actively managing scroll
            if (scrollableRef.current) {
                window.scrollTo(0, currentY);
            }
            rafId = requestAnimationFrame(updateScroll);
        }

        function handleWheel(e) {
            // Prevent default scrolling
            e.preventDefault();

            // Get current scene and sub-scroll progress
            const windowHeight = window.innerHeight;
            const currentSceneIndex = Math.min(
                MAX_SCENES - 1,
                Math.floor(window.scrollY / windowHeight)
            );
            const sceneStartY = currentSceneIndex * windowHeight;
            const currentSubScroll =
                (window.scrollY - sceneStartY) / windowHeight;

            // Check if we're in the FALL_CHART scene
            const isFallChartScene = currentSceneIndex === SCENES.FALL_CHART;
            // Check if we're in the VC_CLINICAL scene
            const isVpFamilyScene = currentSceneIndex === SCENES.VP_FAMILY;

            // Determine scroll speed multiplier
            let speedMultiplier = 0.1; // Default reduced speed

            // If in FALL_CHART scene between 75% and 84%, slow down dramatically
            if (
                isFallChartScene &&
                currentSubScroll >= 0.75 &&
                currentSubScroll <= 0.84
            ) {
                // Super slow scrolling for the alert resolution phase (25x slower)
                speedMultiplier = 0.004;
            }

            // Add variable speed for VC_CLINICAL scene (clinical data charts)
            if (isVpFamilyScene) {
                // Mobility chart (1st chart)
                if (currentSubScroll > 0.3 && currentSubScroll < 0.4) {
                    // Slow down after mobility chart completes for reading time
                    speedMultiplier = 0.01;
                }
                // Sleep chart (2nd chart)
                else if (currentSubScroll > 0.55 && currentSubScroll < 0.65) {
                    // Slow down after sleep chart completes for reading time
                    speedMultiplier = 0.01;
                }
                // Bathroom visits chart (3rd chart)
                else if (currentSubScroll > 0.75 && currentSubScroll < 0.85) {
                    // Slow down after bathroom visits chart completes for reading time
                    speedMultiplier = 0.01;
                }
            }

            // Update target position with reduced speed
            targetY = Math.max(
                0,
                Math.min(
                    document.body.scrollHeight - window.innerHeight,
                    targetY + e.deltaY * speedMultiplier
                )
            );

            // Start animation if not already running
            if (rafId === null) {
                rafId = requestAnimationFrame(updateScroll);
            }
        }

        // Attach listener only when HomePage is mounted
        const scrollableElement = window; // Use window directly for global scroll
        scrollableElement.addEventListener("wheel", handleWheel, {
            passive: false,
        });
        // Recalculate targetY on mount based on current scroll position
        targetY = window.scrollY;
        // Start scroll animation immediately
        rafId = requestAnimationFrame(updateScroll);

        return () => {
            // Clean up
            scrollableElement.removeEventListener("wheel", handleWheel);
            cancelAnimationFrame(rafId);
            // Reset scroll behavior when navigating away? Maybe not needed if page reloads.
        };
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY;
            const windowHeight = window.innerHeight;
            const totalHeight = MAX_SCENES * windowHeight;

            // Calculate progress percentage for visual indicators
            const newProgress = Math.min(
                100,
                (scrollY / (totalHeight - windowHeight)) * 100
            );
            setProgress(newProgress);

            // Set current scene index - limited to MAX_SCENES
            const newIndex = Math.min(
                MAX_SCENES - 1,
                Math.floor(scrollY / windowHeight)
            );

            // Validate the index is a valid scene
            if (isValidScene(newIndex)) {
                // Calculate sub-scroll progress within the current scene (0 to 1)
                const sceneStartY = newIndex * windowHeight;
                const subScroll = (scrollY - sceneStartY) / windowHeight;
                setSubScrollProgress(subScroll);

                setIndex(newIndex);
            }
        };

        window.addEventListener("scroll", handleScroll);
        // Initial calculation
        handleScroll();
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scene = scenes.find((s) => s.scene === index) || scenes[0];

    return (
        <div className="app homepage-scroll" ref={scrollableRef}>
            {/* Scene navigation indicators - only show for available scenes */}
            <div className="scene-navigation">
                {scenes.slice(0, MAX_SCENES).map((s, i) => (
                    <div
                        key={i}
                        className={`scene-indicator ${
                            s.scene === index ? "active" : ""
                        }`}
                        title={s.title || ""}
                    />
                ))}
            </div>

            {/* Progress indicator - Removed */}

            {/* Main content - set height based on MAX_SCENES */}
            <div
                className="scenes-container"
                style={{ height: `${MAX_SCENES * 100}vh` }}
            >
                <SceneViewer
                    scene={scene}
                    index={index}
                    subScrollProgress={subScrollProgress}
                />
            </div>
        </div>
    );
}

// Main App component now handles routing
export default function App() {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/clinical" element={<ClinicalPage />} />
            {/* Add other routes here as needed */}
        </Routes>
    );
}
