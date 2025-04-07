import React, { useState, useEffect, useMemo, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AnimatedTabletScene1 from "./animations/AnimatedTabletScene1";
import AnimatedTabletScene2 from "./animations/AnimatedTabletScene2";
import AnimatedTabletScene3 from "./animations/AnimatedTabletScene3";
import AnimatedTabletScene4 from "./animations/AnimatedTabletScene4";
import AnimatedTabletScene5 from "./animations/AnimatedTabletScene5";
import DebugOverlay from "./DebugOverlay";
import VideoControl from "./VideoControl";
import { videoConfig } from "../config/videoConfig";
import { SCENES } from "../data/sceneRegistry";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const SceneViewer = ({ scene, index = 0, subScrollProgress = 0 }) => {
    // Calculate sub-scroll progress for animations
    const [animationProgress, setAnimationProgress] = useState(0);

    // State to track if callout should be visible
    const [showCallout, setShowCallout] = useState(false);

    // Track previous scene index to detect changes
    const prevIndexRef = useRef(index);

    // State to control scene card animation
    const [animateCard, setAnimateCard] = useState(true);

    // Video reference
    const videoRef = useRef(null);

    // State for extra descriptions shown based on scroll percentage
    const [extraDescriptionText, setExtraDescriptionText] = useState("");

    // State to control control panel visibility
    const [controlsCollapsed, setControlsCollapsed] = useState(true);

    // Handle extra descriptions that show at specific scroll percentages
    useEffect(() => {
        // Check if there's an extraDescription property in the scene
        if (scene.extraDescription) {
            // Get the scroll percentage (0-100)
            const scrollPercentage = Math.floor(subScrollProgress * 100);

            // Find all percentages that are less than or equal to the current percentage
            const matchingPercentages = Object.keys(scene.extraDescription)
                .map(Number)
                .filter((percentage) => percentage <= scrollPercentage)
                .sort((a, b) => b - a); // Sort in descending order

            // Get the highest matching percentage
            const highestMatch = matchingPercentages[0];

            // Set the extra description text if there's a match
            if (highestMatch !== undefined) {
                setExtraDescriptionText(
                    scene.extraDescription[highestMatch].text
                );
            } else {
                setExtraDescriptionText("");
            }
        } else {
            setExtraDescriptionText("");
        }
    }, [scene, subScrollProgress]);

    // Set up video scroll control
    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        // Debug current scene
        console.log("Current scene:", scene.scene, "Scene index:", index);

        // Function to update video time based on scroll progress
        const updateVideoTime = () => {
            // Map the scroll position directly to video time
            const sceneTimings = videoConfig.sceneTiming;

            if (!sceneTimings || !video.duration) return;

            console.log("Current scroll progress:", subScrollProgress);
            console.log("Current scene index:", index);

            // Get current scene timing
            const currentSceneTiming = sceneTimings.find(
                (t) => t.scene === index
            );

            if (!currentSceneTiming) {
                console.warn("Scene timing not found for index:", index);
                return;
            }

            // Handle new scrollingPercentage-based timing
            if (currentSceneTiming.scrollingPercentage) {
                // Get the scroll percentage (0-100)
                const scrollPercentage = Math.floor(subScrollProgress * 100);

                // Get the percentage points defined in the scrollingPercentage object
                const percentagePoints = Object.keys(
                    currentSceneTiming.scrollingPercentage
                )
                    .map(Number)
                    .sort((a, b) => a - b);

                // Find the surrounding percentage points for interpolation
                let lowerPoint = percentagePoints[0];
                let upperPoint = percentagePoints[percentagePoints.length - 1];

                // Find the points that bound the current scroll percentage
                for (let i = 0; i < percentagePoints.length; i++) {
                    if (scrollPercentage >= percentagePoints[i]) {
                        lowerPoint = percentagePoints[i];
                    }
                    if (scrollPercentage <= percentagePoints[i]) {
                        upperPoint = percentagePoints[i];
                        break;
                    }
                }

                // Get the video times for the surrounding percentage points
                const lowerTime =
                    currentSceneTiming.scrollingPercentage[lowerPoint]
                        .videoTime;
                const upperTime =
                    currentSceneTiming.scrollingPercentage[upperPoint]
                        .videoTime;

                // Calculate the interpolation factor (0-1) between the two percentage points
                let factor = 0;
                if (upperPoint > lowerPoint) {
                    factor =
                        (scrollPercentage - lowerPoint) /
                        (upperPoint - lowerPoint);
                }

                // Interpolate to get the exact video time
                const videoTime = lowerTime + (upperTime - lowerTime) * factor;

                // Set the video time
                if (!isNaN(videoTime)) {
                    video.currentTime = videoTime;
                    console.log(
                        "Setting video time to:",
                        videoTime,
                        "using percentage mapping"
                    );
                }
            } else {
                // Handle traditional scene timing with a single videoTime value
                const nextSceneIndex = index + 1;
                const nextSceneTiming = sceneTimings.find(
                    (t) => t.scene === nextSceneIndex
                );

                // Set the video time based on a linear interpolation
                let videoTime;

                if (nextSceneTiming) {
                    // If next scene has scrollingPercentage, use its first percentage point
                    let nextSceneStartTime;
                    if (nextSceneTiming.scrollingPercentage) {
                        // Get the first percentage point (lowest value)
                        const firstPercentage = Math.min(
                            ...Object.keys(
                                nextSceneTiming.scrollingPercentage
                            ).map(Number)
                        );
                        nextSceneStartTime =
                            nextSceneTiming.scrollingPercentage[firstPercentage]
                                .videoTime;
                    } else {
                        nextSceneStartTime = nextSceneTiming.videoTime;
                    }

                    // Interpolate between current and next scene times
                    const startTime = currentSceneTiming.videoTime;
                    videoTime =
                        startTime +
                        (nextSceneStartTime - startTime) * subScrollProgress;
                } else {
                    // Last scene - interpolate to the end of the video
                    const startTime = currentSceneTiming.videoTime;
                    const endTime = video.duration;
                    videoTime =
                        startTime + (endTime - startTime) * subScrollProgress;
                }

                // Set the video time
                if (!isNaN(videoTime)) {
                    video.currentTime = videoTime;
                    console.log(
                        "Setting video time to:",
                        videoTime,
                        "using traditional mapping"
                    );
                }
            }
        };

        // Set up a scroll trigger to update the video
        const scrollTrigger = ScrollTrigger.create({
            trigger: ".scenes-container",
            start: "top top",
            end: "bottom bottom",
            onUpdate: updateVideoTime,
            scrub: videoConfig.scrubSmoothness,
        });

        // Initial update
        updateVideoTime();

        return () => {
            scrollTrigger.kill();
        };
    }, [scene, index, subScrollProgress]);

    // Reset animations when scene changes
    useEffect(() => {
        if (prevIndexRef.current !== index) {
            setAnimateCard(false);
            setShowCallout(false);

            setTimeout(() => {
                setAnimateCard(true);
            }, 50);

            prevIndexRef.current = index;
        }
    }, [index]);

    // Handle animation progress and callout visibility
    useEffect(() => {
        setAnimationProgress(
            Math.min(100, Math.max(0, subScrollProgress * 100))
        );

        const calloutDisplayPercentage = parseFloat(
            scene.calloutDisplayPercentage || 80
        );

        if (animationProgress >= calloutDisplayPercentage) {
            setShowCallout(true);
        } else {
            setShowCallout(false);
        }
    }, [subScrollProgress, scene, animationProgress]);

    // Define tablet components map - use SCENES constants for keys
    const tabletComponentsMap = useMemo(
        () => ({
            [SCENES.MORNING_SHIFT]: AnimatedTabletScene1,
            [SCENES.FALL_CHART]: AnimatedTabletScene2,
            [SCENES.DOCUMENT_EVENT]: AnimatedTabletScene3,
            [SCENES.VP_CLINICAL]: AnimatedTabletScene4,
            [SCENES.VP_FAMILY]: AnimatedTabletScene5,
        }),
        []
    );

    // Memoized render tablet component
    const tabletComponent = useMemo(() => {
        // Get the scene index rather than using the array index
        const sceneIndex = scene.scene;
        const TabletComponent =
            tabletComponentsMap[sceneIndex] || AnimatedTabletScene1;
        return (
            <TabletComponent scene={scene} scrollProgress={animationProgress} />
        );
    }, [scene, animationProgress, tabletComponentsMap]);

    // Toggle control panel visibility
    const toggleControls = () => {
        setControlsCollapsed(!controlsCollapsed);
    };

    return (
        <div
            className="scene-container"
            style={{ color: scene.color || "#000" }}
        >
            {/* Unified control panel */}
            <div
                className={`control-panel ${
                    controlsCollapsed ? "collapsed" : ""
                }`}
            >
                <div className="control-panel-inner">
                    <div className="debug-section">
                        <div
                            className="debug-info"
                            style={{ marginTop: "-6px" }}
                        >
                            <div>Scene: {scene.title || "None"}</div>
                            <div>
                                Scroll: {Math.round(subScrollProgress * 100)}%
                            </div>
                        </div>
                    </div>
                    <div className="video-controls-section">
                        <VideoControl />
                    </div>
                </div>
                <button
                    className="toggle-controls-button"
                    onClick={toggleControls}
                >
                    {controlsCollapsed ? "⌄" : "⌃"}
                </button>
            </div>

            <div className="scene-content">
                <div className="scene-layout">
                    {/* Left column - Video */}
                    <div className="scene-image-column">
                        <video
                            ref={videoRef}
                            src={videoConfig.videoSrc}
                            className="scene-video"
                            playsInline
                            preload="auto"
                            muted
                        />
                    </div>

                    {/* Right column - Scene description and marketing callout */}
                    <div className="scene-content-column">
                        {/* Story box */}
                        <div
                            className={`scene-description-container ${
                                animateCard ? "animate-in" : "reset-animation"
                            }`}
                        >
                            <p className="scene-description-text">
                                {scene.description}
                                {extraDescriptionText && (
                                    <span
                                        className="extra-description-text"
                                        style={{
                                            display: "block",
                                            marginTop: "15px",
                                            animation:
                                                "fadeIn 0.8s ease forwards",
                                            opacity: 0,
                                            color: "white",
                                            animationFillMode: "forwards",
                                        }}
                                    >
                                        {extraDescriptionText}
                                    </span>
                                )}
                            </p>
                        </div>

                        {/* Controls container at the bottom */}
                        <div className="controls-container">
                            {/* Callout after the story box and upload control */}
                            {scene.subtitle && scene.subtitle.trim() !== "" && (
                                <div className="scene-callout-wrapper">
                                    <div
                                        className={`scene-callout ${
                                            showCallout ? "visible" : "hidden"
                                        } ${
                                            animateCard
                                                ? "animate-in"
                                                : "reset-animation"
                                        }`}
                                    >
                                        <h3>{scene.subtitle}</h3>
                                        <div className="scene-callout-underline"></div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="tablet-wrapper">{tabletComponent}</div>
            </div>
        </div>
    );
};

export default SceneViewer;
