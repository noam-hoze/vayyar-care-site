import { useState, useEffect, useRef } from "react";
import { Routes, Route } from "react-router-dom";
import { scenes } from "./data/scenes";
import SceneViewer from "./components/SceneViewer";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MAX_SCENES, isValidScene, SCENES } from "./data/sceneRegistry";
import ClinicalPage from "./pages/clinical";
import ExecutivePage from "./pages/executive";
import MissionPage from "./pages/mission";
import AboutUsPage from "./pages/about-us";
import CustomersPage from "./pages/customers";
import MainLayout from "./components/MainLayout";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Component for the original homepage scroll logic
function HomePage() {
    const [index, setIndex] = useState(0);
    const [progress, setProgress] = useState(0);
    const [subScrollProgress, setSubScrollProgress] = useState(0);
    const scrollableRef = useRef(null);

    // Setup GSAP smooth scrolling - Reverted to original logic
    useEffect(() => {
        let smoothness = 0.08;
        let currentY = 0;
        let targetY = window.scrollY;
        let rafId = null;

        function updateScroll() {
            currentY += (targetY - currentY) * smoothness;
            window.scrollTo(0, currentY);
            rafId = requestAnimationFrame(updateScroll);
        }

        function handleWheel(e) {
            e.preventDefault();

            const windowHeight = window.innerHeight;
            // Use window.scrollY directly again
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

            // Update targetY, considering the full document scroll height
            targetY = Math.max(
                0,
                Math.min(
                    document.body.scrollHeight - windowHeight,
                    targetY + e.deltaY * speedMultiplier
                )
            );

            if (rafId === null) {
                rafId = requestAnimationFrame(updateScroll);
            }
        }

        const scrollableElement = window;
        scrollableElement.addEventListener("wheel", handleWheel, {
            passive: false,
        });
        rafId = requestAnimationFrame(updateScroll);

        return () => {
            scrollableElement.removeEventListener("wheel", handleWheel);
            cancelAnimationFrame(rafId);
        };
    }, []);

    // Revert scroll progress calculation
    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY;
            const windowHeight = window.innerHeight;
            const totalHeight = MAX_SCENES * windowHeight;

            const newProgress = Math.min(
                100,
                (scrollY / (totalHeight - windowHeight)) * 100
            );
            setProgress(isNaN(newProgress) ? 0 : newProgress);

            const newIndex = Math.min(
                MAX_SCENES - 1,
                Math.floor(scrollY / windowHeight)
            );

            if (isValidScene(newIndex)) {
                const sceneStartY = newIndex * windowHeight;
                const subScroll = (scrollY - sceneStartY) / windowHeight;
                setSubScrollProgress(Math.max(0, Math.min(1, subScroll)));
                setIndex(newIndex);
            } else if (scrollY <= 0) {
                setIndex(0);
                setSubScrollProgress(0);
            }
        };

        window.addEventListener("scroll", handleScroll);
        // Simple initial calculation
        handleScroll();
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scene = scenes.find((s) => s.scene === index) || scenes[0];

    // Add `relative` class to establish positioning context
    return (
        <div className="app homepage-scroll relative" ref={scrollableRef}>
            {/* scene-navigation likely uses absolute positioning, should be okay relative to this div */}
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
            {/* Add `relative` class here too */}
            <div
                className="scenes-container relative"
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
            {/* All routes use MainLayout (with NavBar) */}
            <Route path="/" element={<MainLayout />}>
                <Route index element={<HomePage />} />{" "}
                {/* Use index route for homepage */}
                <Route path="clinical" element={<ClinicalPage />} />
                <Route path="executive" element={<ExecutivePage />} />
                <Route path="mission" element={<MissionPage />} />
                <Route path="about-us" element={<AboutUsPage />} />
                <Route path="customers" element={<CustomersPage />} />
                {/* Add other routes needing the NavBar here */}
            </Route>
        </Routes>
    );
}
