"use client";
import React, { useState, useEffect, useMemo, useRef, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AnimatedTabletScene1 from "./animations/AnimatedTabletScene1";
import AnimatedTabletScene2 from "./animations/AnimatedTabletScene2";
// Removed unused scene imports
// import AnimatedTabletScene3 from "./animations/AnimatedTabletScene3";
// import AnimatedTabletScene4 from "./animations/AnimatedTabletScene4";
// import AnimatedTabletScene5 from "./animations/AnimatedTabletScene5";
import {
    videoConfig,
    SceneTiming,
    VIDEO_CHUNKS,
} from "../config/videoConfig";
import { SCENES } from "../data/sceneRegistry";
import { Scene } from "@/types";
import Link from "next/link";
import VideoPlayer from './VideoPlayer';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

interface SceneViewerProps {
    scene: Scene;
    index?: number;
    subScrollProgress?: number;
}

const SceneViewer: React.FC<SceneViewerProps> = ({
    scene,
    index = 0,
    subScrollProgress = 0,
}) => {
    // Flag to control debug info visibility
    const showDebugInfo = false; // Set to false to hide debug info

    // Calculate sub-scroll progress for animations
    const [animationProgress, setAnimationProgress] = useState(0);

    // State to track if callout should be visible
    const [showCallout, setShowCallout] = useState(false);

    // Track previous scene index to detect changes
    const prevIndexRef = useRef(index);

    // State to control scene card animation
    const [animateCard, setAnimateCard] = useState(true);

    // State for extra descriptions shown based on scroll percentage
    const [extraDescriptionText, setExtraDescriptionText] = useState("");

    // State to track title visibility for animation
    const [isTitleVisible, setIsTitleVisible] = useState(false);

    // State to track when the wipe animation should trigger
    const [shouldWipe, setShouldWipe] = useState(false);

    // State for current time and frame
    const [currentTime, setCurrentTime] = useState(0);
    const [currentFrame, setCurrentFrame] = useState(0);
    const frameRate = 30; // Assuming 30fps, adjust if your video has a different frame rate
    const lastSetTimeRef = useRef<number>(0);

    // Memoize the time update handler
    const handleTimeUpdate = useCallback((time: number) => {
        // Only update if the time has changed significantly (more than 0.1 seconds)
        if (Math.abs(time - lastSetTimeRef.current) > 0.1) {
            lastSetTimeRef.current = time;
            setCurrentTime(time);
        }
    }, []);

    // Function to format timecode
    const formatTimecode = (time: number, frame: number) => {
        const hours = Math.floor(time / 3600);
        const minutes = Math.floor((time % 3600) / 60);
        const seconds = Math.floor(time % 60);
        return `${hours.toString().padStart(2, "0")}:${minutes
            .toString()
            .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}:${frame
            .toString()
            .padStart(2, "0")}`;
    };

    // Load video source from localStorage on client-side mount
    useEffect(() => {
        setCurrentTime(0);
    }, []); // Empty dependency array runs only once on mount

    // Handle extra descriptions that show at specific scroll percentages
    useEffect(() => {
        // Check if there's a percentageText property in the scene
        if (scene.percentageText) {
            // Get the scroll percentage (0-100)
            const scrollPercentage = Math.floor(subScrollProgress * 100);

            // Find all percentages that are less than or equal to the current percentage
            const matchingPercentages = Object.keys(scene.percentageText)
                .map(Number)
                .filter((percentage) => percentage <= scrollPercentage)
                .sort((a, b) => b - a); // Sort in descending order

            // Get the highest matching percentage
            const highestMatch = matchingPercentages[0];

            // Set the extra description text if there's a match
            if (
                highestMatch !== undefined &&
                scene.percentageText[highestMatch]
            ) {
                setExtraDescriptionText(
                    scene.percentageText[highestMatch].text
                );
            } else {
                setExtraDescriptionText("");
            }
        } else {
            setExtraDescriptionText("");
        }
    }, [scene, subScrollProgress]);

    // Determine title visibility and wipe trigger based on scroll
    useEffect(() => {
        const currentPercentage = subScrollProgress * 100;
        const showAt = scene.showUpAt ?? 0;
        const disappearAt = scene.disappearAt ?? 100;
        const wipeAt = scene.wipeStartAt ?? showAt; // Default wipe start to showUpAt

        setIsTitleVisible(
            currentPercentage >= showAt && currentPercentage < disappearAt
        );
        setShouldWipe(currentPercentage >= wipeAt); // Set wipe based on wipeAt percentage
    }, [
        subScrollProgress,
        scene.showUpAt,
        scene.disappearAt,
        scene.wipeStartAt,
    ]);

    // Set up video scroll control
    useEffect(() => {
        const sceneTimings = videoConfig.sceneTiming;
        if (!sceneTimings) return;

        console.log("Current scroll progress:", subScrollProgress);
        console.log("Current scene index:", index);

        const currentSceneTiming = sceneTimings.find(
            (t) => t.scene === index
        ) as SceneTiming | undefined;

        if (!currentSceneTiming) {
            console.warn("Scene timing not found for index:", index);
            return;
        }

        // Get the next scene timing for interpolation
        const nextSceneIndex = index + 1;
        const nextSceneTiming = sceneTimings.find(
            (t) => t.scene === nextSceneIndex
        ) as SceneTiming | undefined;

        let videoTime: number;
        const startTime = currentSceneTiming.videoTime ?? 0;

        if (nextSceneTiming) {
            // If we have a next scene, interpolate between current and next scene times
            const nextSceneTime = nextSceneTiming.videoTime ?? startTime;
            videoTime = startTime + (nextSceneTime - startTime) * subScrollProgress;
        } else {
            // If this is the last scene, use the total video duration
            videoTime = startTime + (VIDEO_CHUNKS.totalDuration - startTime) * subScrollProgress;
        }

        // Ensure videoTime is within bounds
        videoTime = Math.max(0, Math.min(VIDEO_CHUNKS.totalDuration, videoTime));
        
        console.log("Setting video time to:", videoTime, "based on scroll progress:", subScrollProgress);
        setCurrentTime(videoTime);
    }, [index, subScrollProgress]);

    // Update frame based on current time
    useEffect(() => {
        setCurrentFrame(Math.floor(currentTime * frameRate));
    }, [currentTime]);

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
            scene.calloutDisplayPercentage || "80"
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
            [SCENES.FALL_EVENT]: AnimatedTabletScene2,
            // Removed references to non-existent scenes:
            // [SCENES.DOCUMENT_EVENT]: AnimatedTabletScene3,
            // [SCENES.VP_CLINICAL]: AnimatedTabletScene4,
            // [SCENES.VP_FAMILY]: AnimatedTabletScene5,
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

    // Helper function to render title with specific word highlighted and animated
    const renderHighlightedTitle = (
        title: string | undefined,
        shouldAnimateWipe: boolean
    ) => {
        if (!title) return null;
        const parts = title.split("VayyarCare");
        if (parts.length !== 2) {
            return title;
        }
        return (
            <>
                {parts[0]}
                {/* Outer span establishes relative positioning and contains black text implicitly */}
                <span className="relative inline-block">
                    {/* Black text underneath (rendered by the outer span's content) */}
                    VayyarCare
                    {/* Absolutely positioned blue overlay span */}
                    <span
                        className={`
                            absolute top-0 left-0 h-full 
                            text-blue-600 
                            overflow-hidden whitespace-nowrap 
                            transition-[width] duration-700 ease-in-out
                            ${shouldAnimateWipe ? "w-full" : "w-0"}
                        `}
                    >
                        VayyarCare {/* Blue text inside the clipped overlay */}
                    </span>
                </span>
                {parts[1]}
            </>
        );
    };

    return (
        <div className="scene-container sticky top-0 left-0 w-screen h-screen box-border overflow-hidden z-0">
            {/* Fullscreen Video Background */}
            <div className="video-container absolute inset-0 w-full h-full">
                <VideoPlayer
                    currentTime={currentTime}
                    onTimeUpdate={handleTimeUpdate}
                />
            </div>

            {/* Timecode Display */}
            <div className="absolute bottom-4 right-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded font-mono text-sm z-20">
                {formatTimecode(currentTime, currentFrame)}
            </div>

            {/* Overlay Content - Positioned on the right */}
            <div className="absolute top-1/2 right-8 transform -translate-y-1/2 w-auto max-w-[30%] z-10">
                {/* Story box */}
                <div
                    className={`scene-description-container hidden mb-4 
                                transition-all duration-1000 ease-in-out 
                                ${
                                    // Determine visibility and position based on isTitleVisible state
                                    isTitleVisible // Use the state variable here
                                        ? "opacity-100 translate-y-0" // State: Visible and in position
                                        : "opacity-0 translate-y-3" // State: Hidden and slightly offset
                                }`}
                >
                    {/* Title - Larger and Bold */}
                    {scene.title && (
                        <h2 className="text-4xl font-semibold mb-3 text-black">
                            {renderHighlightedTitle(scene.title, shouldWipe)}
                        </h2>
                    )}
                    {/* Description - Smaller */}
                    {scene.description && (
                        <p className="text-lg text-gray-800">
                            {scene.description}
                            {extraDescriptionText && (
                                <span className="extra-description-text block mt-4 opacity-0 text-white animate-fadeInForwards">
                                    {extraDescriptionText}
                                </span>
                            )}
                        </p>
                    )}
                    {/* CTA Button - Moved outside the P tag below */}
                    <div
                        className={`absolute bottom-3 right-3 transition-opacity duration-500 ease-in-out ${
                            // Conditionally set opacity based on cta.showUpAt
                            subScrollProgress * 100 >=
                            (scene.cta?.showUpAt ?? scene.showUpAt ?? 0)
                                ? "opacity-100"
                                : "opacity-0"
                        }`}
                    >
                        {scene.cta && scene.cta.text && (
                            <Link
                                href={scene.cta.link || "#"}
                                className="inline-block px-5 py-2 bg-blue-600 text-white rounded-full text-sm font-medium hover:bg-blue-700 transition duration-150 ease-in-out"
                            >
                                {scene.cta.text}
                            </Link>
                        )}
                    </div>
                </div>

                {/* Callout */}
                {scene.subtitle && scene.subtitle.trim() !== "" && (
                    <div className="scene-callout-wrapper">
                        <div
                            className={`scene-callout ${
                                showCallout ? "visible" : "hidden"
                            } ${
                                animateCard ? "animate-in" : "reset-animation"
                            }`}
                        >
                            <h3>{scene.subtitle}</h3>
                            <div className="scene-callout-underline"></div>
                        </div>
                    </div>
                )}
            </div>

            {/* Tablet Wrapper - Currently hidden */}
            <div className="tablet-wrapper absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 hidden">
                {tabletComponent}
            </div>

            {/* STANDALONE DEBUG INFO - BOTTOM CENTER */}
            {showDebugInfo && (
                <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-[9999] bg-black/80 text-white p-3 rounded-md shadow-lg text-xs font-mono">
                    <div>
                        Scene: {scene.title || "None"} (Index: {index})
                    </div>
                    <div>Scroll%: {Math.round(subScrollProgress * 100)}%</div>
                </div>
            )}
        </div>
    );
};

export default SceneViewer;
