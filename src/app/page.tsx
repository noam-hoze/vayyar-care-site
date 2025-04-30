"use client"; // Mark this as a Client Component

import { useState, useEffect } from "react";
import { scenes } from "@/data/scenes"; // Use alias
import SceneViewer from "@/components/SceneViewer"; // Use alias
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MAX_SCENES, isValidScene, SCENES } from "@/data/sceneRegistry"; // Use alias

// Register GSAP plugins - needs to be done in a client component or useEffect
gsap.registerPlugin(ScrollTrigger);

// Renamed function to match Next.js convention (can be any name, but default export is the page)
export default function HomePage() {
    const [index, setIndex] = useState(0);
    const [subScrollProgress, setSubScrollProgress] = useState(0);
    // const scrollableRef = useRef(null); // Commented out as it's unused

    // Setup GSAP smooth scrolling - Reverted to original logic
    useEffect(() => {
        const smoothness = 0.08;
        let currentY = 0;
        let targetY = window.scrollY;
        let rafId: number | null = null;

        function updateScroll() {
            currentY += (targetY - currentY) * smoothness;
            // Apply scroll to window for now, might need adjustment
            window.scrollTo(0, currentY);
            rafId = requestAnimationFrame(updateScroll);
        }

        function handleWheel(e: WheelEvent) {
            e.preventDefault();

            const windowHeight = window.innerHeight;
            const currentSceneIndex = Math.min(
                MAX_SCENES - 1,
                Math.floor(window.scrollY / windowHeight)
            );
            const sceneStartY = currentSceneIndex * windowHeight;
            const currentSubScroll =
                (window.scrollY - sceneStartY) / windowHeight;

            //const isFallChartScene = currentSceneIndex === SCENES.FALL_EVENT;
            const isVpFamilyScene = currentSceneIndex === SCENES.VP_FAMILY;
            let speedMultiplier = 0.1;

            // if (
            //     isFallChartScene &&
            //     currentSubScroll >= 0.75 &&
            //     currentSubScroll <= 0.84
            // ) {
            //     speedMultiplier = 0.004;
            // }
            if (isVpFamilyScene) {
                if (currentSubScroll > 0.3 && currentSubScroll < 0.4) {
                    speedMultiplier = 0.01;
                } else if (currentSubScroll > 0.55 && currentSubScroll < 0.65) {
                    speedMultiplier = 0.01;
                } else if (currentSubScroll > 0.75 && currentSubScroll < 0.85) {
                    speedMultiplier = 0.01;
                }
            }

            // Important: Update targetY considering the *actual* scrollable height
            // In Next.js, this might not be document.body.scrollHeight if layout handles scroll
            const scrollableHeight = document.documentElement.scrollHeight; // Or specific element
            targetY = Math.max(
                0,
                Math.min(
                    scrollableHeight - windowHeight,
                    targetY + e.deltaY * speedMultiplier
                )
            );

            if (rafId === null) {
                rafId = requestAnimationFrame(updateScroll);
            }
        }

        // Attach listener to window for now
        const scrollableElement = window;
        scrollableElement.addEventListener("wheel", handleWheel, {
            passive: false,
        });
        rafId = requestAnimationFrame(updateScroll);

        return () => {
            scrollableElement.removeEventListener("wheel", handleWheel);
            if (rafId !== null) {
                cancelAnimationFrame(rafId);
            }
        };
    }, []);

    // Scroll progress calculation
    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY;
            const windowHeight = window.innerHeight;
            // const totalHeight = MAX_SCENES * windowHeight; // Commented out as it's unused

            const newIndex = Math.min(
                MAX_SCENES - 1,
                Math.floor(scrollY / windowHeight)
            );

            let newSubScroll = 0;
            if (isValidScene(newIndex)) {
                const sceneStartY = newIndex * windowHeight;
                newSubScroll = Math.max(
                    0,
                    Math.min(1, (scrollY - sceneStartY) / windowHeight)
                );

                // Only update state if values have changed
                if (newIndex !== index) {
                    setIndex(newIndex);
                }
                // Add a small tolerance for floating point comparison if needed
                if (newSubScroll !== subScrollProgress) {
                    setSubScrollProgress(newSubScroll);
                }
            } else if (scrollY <= 0) {
                // Only update state if values have changed
                if (0 !== index) {
                    setIndex(0);
                }
                if (0 !== subScrollProgress) {
                    setSubScrollProgress(0);
                }
            }
        };

        window.addEventListener("scroll", handleScroll);
        handleScroll(); // Initial calculation
        return () => window.removeEventListener("scroll", handleScroll);
        // Add index and subScrollProgress as dependencies to get their current values in the checks
    }, [index, subScrollProgress]);

    const scene = scenes.find((s) => s.scene === index) || scenes[0];

    // Note: height calculation might move or change based on scroll implementation
    const scenesContainerHeight = `${MAX_SCENES * 100}vh`;

    return (
        // Removed the outer .app div, as body/html are handled by layout.tsx
        // Removed scrollableRef for now, as scrolling is on window
        <>
            {/* Scene navigation dots removed */}

            {/* Main container for scenes */}
            <div
                className="scenes-container relative w-full"
                style={{ height: scenesContainerHeight }} // Height set based on number of scenes
            >
                <SceneViewer
                    scene={scene}
                    index={index}
                    subScrollProgress={subScrollProgress}
                />
            </div>
        </>
    );
}
