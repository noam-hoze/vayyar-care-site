"use client"; // Mark this as a Client Component

import { useState, useEffect, useRef } from "react";
import { scenes } from "@/data/scenes"; // Use alias
import SceneViewer from "@/components/SceneViewer"; // Use alias
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MAX_SCENES, isValidScene, SCENES } from "@/data/sceneRegistry"; // Use alias
import { useVideoTime } from "@/contexts/VideoTimeContext"; // Import context hook
import { videoConfig } from "@/config/videoConfig"; // Import videoConfig

// Register GSAP plugins - needs to be done in a client component or useEffect
gsap.registerPlugin(ScrollTrigger);

// Renamed function to match Next.js convention (can be any name, but default export is the page)
export default function HomePage() {
    const [index, setIndex] = useState(0);
    const [subScrollProgress, setSubScrollProgress] = useState(0);
    // const scrollableRef = useRef(null); // Commented out as it's unused

    const { registerScrollToTime, videoDuration } = useVideoTime(); // Get registration function and videoDuration

    // Refs for smooth scrolling logic, lifted from useEffect
    const targetY = useRef(typeof window !== "undefined" ? window.scrollY : 0);
    const currentY = useRef(typeof window !== "undefined" ? window.scrollY : 0);
    const rafId = useRef<number | null>(null);
    const isScrollingProgrammatically = useRef(false); // Flag to manage programmatic scroll

    // Setup GSAP smooth scrolling (modified)
    useEffect(() => {
        const smoothness = 0.08;
        // targetY, currentY, and rafId are now refs

        function updateScroll() {
            currentY.current +=
                (targetY.current - currentY.current) * smoothness;
            window.scrollTo(0, currentY.current);

            // Stop RAF if close enough and not programmatically scrolling
            if (
                Math.abs(targetY.current - currentY.current) < 0.1 &&
                !isScrollingProgrammatically.current
            ) {
                if (rafId.current !== null) {
                    cancelAnimationFrame(rafId.current);
                    rafId.current = null;
                }
            } else {
                rafId.current = requestAnimationFrame(updateScroll);
            }
        }

        // Start the loop if not already started (e.g. after programmatic scroll ends)
        const startScrollLoop = () => {
            if (rafId.current === null) {
                rafId.current = requestAnimationFrame(updateScroll);
            }
        };

        function handleWheel(e: WheelEvent) {
            e.preventDefault();
            isScrollingProgrammatically.current = false; // User scroll overrides programmatic scroll

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
            targetY.current = Math.max(
                0,
                Math.min(
                    scrollableHeight - windowHeight,
                    targetY.current + e.deltaY * speedMultiplier
                )
            );
            startScrollLoop();
        }

        // Initialize targetY and currentY on mount
        if (typeof window !== "undefined") {
            targetY.current = window.scrollY;
            currentY.current = window.scrollY;
        }

        const scrollableElement = window;
        scrollableElement.addEventListener("wheel", handleWheel, {
            passive: false,
        });
        // rafId.current = requestAnimationFrame(updateScroll); // Start loop initially or based on interaction
        // Start loop if initial target and current are different, or always if preferred
        startScrollLoop();

        // Register the actual scrollToTime function
        const actualScrollToTime = (time: number) => {
            if (videoDuration === 0) return;
            isScrollingProgrammatically.current = true; // Set flag

            let targetSceneIndex = 0;
            let progressWithinTargetScene = 0;

            // Find the scene and progress for the given time
            for (let i = 0; i < videoConfig.sceneTiming.length; i++) {
                const currentSceneInfo = videoConfig.sceneTiming[i];
                const nextSceneInfo = videoConfig.sceneTiming[i + 1];

                const sceneStartTime = currentSceneInfo.videoTime ?? 0;
                const sceneEndTime = nextSceneInfo?.videoTime ?? videoDuration; // Use videoDuration for the last scene

                if (time >= sceneStartTime && time < sceneEndTime) {
                    targetSceneIndex = currentSceneInfo.scene; // Assuming scene in config matches index directly, or map if needed
                    if (sceneEndTime - sceneStartTime > 0) {
                        progressWithinTargetScene =
                            (time - sceneStartTime) /
                            (sceneEndTime - sceneStartTime);
                    } else {
                        progressWithinTargetScene = 0; // Avoid division by zero if scene duration is 0
                    }
                    break;
                }
                // If time is beyond the start of the last configured scene, snap to it
                if (!nextSceneInfo && time >= sceneStartTime) {
                    targetSceneIndex = currentSceneInfo.scene;
                    progressWithinTargetScene = 0; // Or 1, depending on desired behavior at exact end time
                    break;
                }
            }

            progressWithinTargetScene = Math.max(
                0,
                Math.min(1, progressWithinTargetScene)
            ); // Clamp

            const windowHeight = window.innerHeight;
            const newTargetScrollY =
                targetSceneIndex * windowHeight +
                progressWithinTargetScene * windowHeight;

            targetY.current = Math.max(
                0,
                Math.min(
                    document.documentElement.scrollHeight - windowHeight,
                    newTargetScrollY
                )
            );

            startScrollLoop(); // Ensure scroll loop is active

            // After a short delay, unset the programmatic scroll flag to allow RAF to stop if target is reached
            setTimeout(() => {
                isScrollingProgrammatically.current = false;
            }, smoothness * 1000 + 100); // Delay slightly longer than one frame of smoothing
        };

        registerScrollToTime(actualScrollToTime);

        return () => {
            scrollableElement.removeEventListener("wheel", handleWheel);
            if (rafId.current !== null) {
                cancelAnimationFrame(rafId.current);
                rafId.current = null;
            }
        };
    }, [registerScrollToTime, videoDuration]); // Add videoDuration as dependency

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
                if (Math.abs(newSubScroll - subScrollProgress) > 0.0001) {
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
