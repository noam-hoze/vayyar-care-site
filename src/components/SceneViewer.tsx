"use client";
import React, { useState, useEffect, useMemo, useRef } from "react";
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
    STORAGE_KEY,
    defaultConfig,
} from "../config/videoConfig";
import { SCENES } from "../data/sceneRegistry";
import { Scene } from "@/types";
import Link from "next/link";
import { useVideoTime } from "@/contexts/VideoTimeContext";
import ChatGpt from "./ChatGpt";
import { chatGptConfig } from "../config/chatGptConfig";

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
    const { setCurrentTime: setGlobalCurrentTime, setVideoDuration } =
        useVideoTime();
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

    // Video reference
    const videoRef = useRef<HTMLVideoElement>(null);

    // State for the video source URL, initialized to null for SSR safety
    const [currentVideoSrc, setCurrentVideoSrc] = useState<string | null>(null);

    // State for extra descriptions shown based on scroll percentage
    const [extraDescriptionText, setExtraDescriptionText] = useState("");

    // State to track title visibility for animation
    const [isTitleVisible, setIsTitleVisible] = useState(false);

    // State to track when the wipe animation should trigger
    const [shouldWipe, setShouldWipe] = useState(false);

    // NEW: State for ChatGPT component instances
    const [chatGptInstances, setChatGptInstances] = useState<Record<number, number>>({});

    // Renamed local states for time and frame display
    const [displayTime, setDisplayTime] = useState(0);
    const [displayFrame, setDisplayFrame] = useState(0);
    const frameRate = 30;

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
        let initialSrc = defaultConfig.videoSrc; // Start with default
        // Check if running in browser
        if (typeof window !== "undefined") {
            try {
                const savedVideo = localStorage.getItem(STORAGE_KEY);
                if (savedVideo) {
                    // Validate if it's a Firebase URL (or your expected format)
                    if (
                        savedVideo.startsWith(
                            "https://firebasestorage.googleapis.com"
                        )
                    ) {
                        initialSrc = savedVideo;
                    } else {
                        // Clear invalid entry if needed
                        localStorage.removeItem(STORAGE_KEY);
                    }
                }
            } catch (error) {
                console.error(
                    "Error loading saved video in SceneViewer:",
                    error
                );
            }
        }
        // Set state after checking. Use null if the resulting src is empty.
        setCurrentVideoSrc(initialSrc || null);
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
        const video = videoRef.current;
        // Ensure video exists AND the source is loaded before manipulating time
        if (!video || !currentVideoSrc) return;

        // Debug current scene
        // console.log("Current scene:", scene.scene, "Scene index:", index);

        // Function to update video time based on scroll progress
        const updateVideoTime = () => {
            const sceneTimings = videoConfig.sceneTiming;
            if (!sceneTimings || !video.duration || isNaN(video.duration))
                return; // Add NaN check

            // console.log("Current scroll progress:", subScrollProgress);
            // console.log("Current scene index:", index);

            const currentSceneTiming = sceneTimings.find(
                (t) => t.scene === index
            ) as SceneTiming | undefined; // Cast result to SceneTiming | undefined

            if (!currentSceneTiming) {
                console.warn("Scene timing not found for index:", index);
                return;
            }

            // Check if scrollingPercentage exists BEFORE trying to use it
            if (currentSceneTiming.scrollingPercentage) {
                const scrollPercentage = Math.floor(subScrollProgress * 100);
                const percentagePoints = Object.keys(
                    currentSceneTiming.scrollingPercentage // Safe to access now
                )
                    .map(Number)
                    .sort((a, b) => a - b);

                let lowerPoint = percentagePoints[0];
                let upperPoint = percentagePoints[percentagePoints.length - 1];

                for (let i = 0; i < percentagePoints.length; i++) {
                    if (scrollPercentage >= percentagePoints[i]) {
                        lowerPoint = percentagePoints[i];
                    }
                    if (scrollPercentage <= percentagePoints[i]) {
                        upperPoint = percentagePoints[i];
                        break;
                    }
                }

                // Access safely using the check above and type assertion
                const percentageData = currentSceneTiming.scrollingPercentage; // Assign for clarity
                const lowerData =
                    percentageData?.[lowerPoint as keyof typeof percentageData];
                const upperData =
                    percentageData?.[upperPoint as keyof typeof percentageData];

                if (!lowerData || !upperData) {
                    console.warn(
                        "Invalid percentage points data for interpolation:",
                        lowerPoint,
                        upperPoint,
                        percentageData
                    );
                    // Fallback to simple videoTime if percentage data is bad
                    video.currentTime = currentSceneTiming.videoTime ?? 0;
                    return;
                }

                const lowerTime = lowerData.videoTime;
                const upperTime = upperData.videoTime;

                let factor = 0;
                if (upperPoint > lowerPoint) {
                    factor =
                        (scrollPercentage - lowerPoint) /
                        (upperPoint - lowerPoint);
                }
                factor = Math.max(0, Math.min(1, factor)); // Ensure factor is between 0 and 1

                const videoTime = lowerTime + (upperTime - lowerTime) * factor;

                if (!isNaN(videoTime)) {
                    video.currentTime = videoTime;
                    // console.log(
                    //     "Setting video time to:",
                    //     videoTime,
                    //     "using percentage mapping"
                    // );
                }
            } else {
                // Handle cases WITHOUT scrollingPercentage
                const nextSceneIndex = index + 1;
                const nextSceneTiming = sceneTimings.find(
                    (t) => t.scene === nextSceneIndex
                ) as SceneTiming | undefined; // Cast result

                let videoTime: number;
                const startTime = currentSceneTiming.videoTime ?? 0;

                if (nextSceneTiming) {
                    let nextSceneStartTime: number;
                    // Check if NEXT scene has scrollingPercentage
                    if (nextSceneTiming.scrollingPercentage) {
                        const percentageData =
                            nextSceneTiming.scrollingPercentage;
                        const firstPercentage = Math.min(
                            ...Object.keys(percentageData).map(Number)
                        );
                        const firstPercentageData =
                            percentageData[
                                firstPercentage as keyof typeof percentageData
                            ];

                        if (firstPercentageData) {
                            nextSceneStartTime = firstPercentageData.videoTime;
                        } else {
                            console.warn(
                                "Could not find video time for first percentage:",
                                firstPercentage,
                                nextSceneTiming.scrollingPercentage
                            );
                            // Fallback if data missing for first percentage
                            nextSceneStartTime =
                                nextSceneTiming.videoTime ?? startTime;
                        }
                    } else {
                        // If next scene also doesn't have percentage mapping
                        nextSceneStartTime =
                            nextSceneTiming.videoTime ?? startTime;
                    }

                    if (isNaN(nextSceneStartTime)) {
                        console.warn(
                            "Invalid next scene start time for interpolation.",
                            nextSceneStartTime
                        );
                        videoTime = startTime;
                    } else {
                        videoTime =
                            startTime +
                            (nextSceneStartTime - startTime) *
                                subScrollProgress;
                    }
                } else {
                    // Last scene
                    const endTime = video.duration;
                    if (isNaN(endTime)) {
                        console.warn(
                            "Invalid end time for last scene interpolation."
                        );
                        videoTime = startTime;
                    } else {
                        videoTime =
                            startTime +
                            (endTime - startTime) * subScrollProgress;
                    }
                }

                if (isNaN(videoTime)) {
                    videoTime = startTime;
                } else if (!isNaN(video.duration)) {
                    videoTime = Math.max(
                        0,
                        Math.min(video.duration, videoTime)
                    );
                }

                video.currentTime = videoTime;
                // console.log(
                //     "Setting video time to:",
                //     videoTime,
                //     "using traditional mapping"
                // );
            }
        };

        // Call immediately and add listener
        updateVideoTime();
        // No need for scroll listener here as progress is passed via props

        // Cleanup function - not strictly needed if progress updates trigger re-render
        // return () => window.removeEventListener('scroll', handleScroll);
    }, [scene, index, subScrollProgress, currentVideoSrc]); // Add currentVideoSrc dependency

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

    // This useEffect updates context and local display time from video element
    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        const updateTimeAndFrame = () => {
            const time = video.currentTime;
            const frame = Math.floor((time % 1) * frameRate);

            setGlobalCurrentTime(time); // Update context
            setDisplayTime(time); // Update local state for display
            setDisplayFrame(frame); // Update local state for display
        };

        video.addEventListener("timeupdate", updateTimeAndFrame);
        // Also call on loadedmetadata to set initial time in context if video doesn't auto-play from 0
        video.addEventListener("loadedmetadata", updateTimeAndFrame);

        return () => {
            video.removeEventListener("timeupdate", updateTimeAndFrame);
            video.removeEventListener("loadedmetadata", updateTimeAndFrame);
        };
    }, [setGlobalCurrentTime, frameRate]); // Dependency: context's setter

    // NEW: Effect to handle ChatGPT instances visibility based on time and mode
    useEffect(() => {
        const newInstances: Record<number, number> = {};

        chatGptConfig.forEach((instance, index) => {
            const fadeInStartTime = instance.appearTime;
            const fadeInEndTime = instance.appearTime + (instance.fadeDuration || 0.2);
            const fadeOutStartTime = instance.disappearTime - (instance.fadeDuration || 0.2);
            const fadeOutEndTime = instance.disappearTime;

            let opacity = 0;

            if (displayTime >= fadeInStartTime && displayTime < fadeInEndTime) {
                opacity = (displayTime - fadeInStartTime) / (instance.fadeDuration || 0.2);
            } else if (displayTime >= fadeInEndTime && displayTime < fadeOutStartTime) {
                opacity = 1;
            } else if (displayTime >= fadeOutStartTime && displayTime < fadeOutEndTime) {
                opacity = 1 - (displayTime - fadeOutStartTime) / (instance.fadeDuration || 0.2);
            } else if (displayTime >= fadeOutEndTime && displayTime < fadeOutEndTime + 0.5 && instance.animation?.type === 'slide') {
                // Keep component with 0 opacity during the slide-out animation
                opacity = 0.00001; // Tiny value to keep component rendered but invisible
            }

            newInstances[index] = opacity;
        });

        setChatGptInstances(newInstances);
    }, [displayTime]);

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
            <video
                ref={videoRef}
                src={currentVideoSrc ?? undefined}
                className="absolute top-0 left-0 w-full h-full object-cover z-[-10]" // Fullscreen, behind content, NEGATIVE Z-INDEX
                playsInline
                preload="auto"
                muted
                onLoadedMetadata={() => {
                    if (videoRef.current) {
                        console.log(
                            "Video metadata loaded, duration:",
                            videoRef.current?.duration
                        );
                        setVideoDuration(videoRef.current.duration); // Update context with video duration
                        // Initial time update in case 'timeupdate' doesn't fire immediately or video is paused at a non-zero time
                        const initialTime = videoRef.current.currentTime;
                        setGlobalCurrentTime(initialTime);
                        setDisplayTime(initialTime);
                        setDisplayFrame(
                            Math.floor((initialTime % 1) * frameRate)
                        );
                    }
                }}
            />

            {/* Timecode Display uses local displayTime and displayFrame */}
            <div className="absolute bottom-4 right-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded font-mono text-sm z-20">
                {formatTimecode(displayTime, displayFrame)}
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

            {/* NEW: Render ChatGPT instances */}
            {Object.entries(chatGptInstances).map(([instanceIndexStr, opacity]) => {
                if (opacity <= 0) return null;

                const instanceIndex = parseInt(instanceIndexStr);
                const instance = chatGptConfig[instanceIndex];

                return (
                    <div
                        key={`chatgpt-instance-${instanceIndex}`}
                        style={{
                            position: "absolute",
                            opacity: instance.animation?.type === 'slide' ? 1 : opacity, // Full opacity for slide animations
                            transition: instance.animation?.type === 'slide'
                                ? `transform ${instance.animation?.duration || 0.3}s ease-in-out`
                                : `opacity ${instance.animation?.duration || 0.3}s ease-in-out`,
                            transform: (() => {
                                // Apply transform for slide animations
                                if (instance.animation?.type === 'slide') {
                                    const isAppearing = opacity < 1 && opacity > 0 && displayTime < instance.appearTime + (instance.fadeDuration || 0.2);
                                    const isDisappearing = opacity < 1 && displayTime >= instance.disappearTime - (instance.fadeDuration || 0.2);

                                    // Use larger offset to ensure component starts completely off-screen
                                    const offset = 2000; // Much larger value to ensure it's off-screen

                                    if (instance.animation?.direction === 'left-to-right') {
                                        // Left-to-right: always starts and ends at left border
                                        if (isAppearing) {
                                            // Appear animation - slide from left to position
                                            const slideValue = -offset + (opacity * offset);
                                            return `translateX(${slideValue}px)`;
                                        } else if (isDisappearing) {
                                            // Disappear animation - slide from position to left
                                            const disappearProgress = 1 - opacity;
                                            const slideValue = -disappearProgress * offset;
                                            return `translateX(${slideValue}px)`;
                                        }
                                        return 'translateX(0)';
                                    } else if (instance.animation?.direction === 'right-to-left') {
                                        // Right-to-left: always starts and ends at right border
                                        if (isAppearing) {
                                            // Appear animation - slide from right to position
                                            const slideValue = offset - (opacity * offset);
                                            return `translateX(${slideValue}px)`;
                                        } else if (isDisappearing) {
                                            // Disappear animation - slide from position to right
                                            const disappearProgress = 1 - opacity;
                                            const slideValue = disappearProgress * offset;
                                            return `translateX(${slideValue}px)`;
                                        }
                                        return 'translateX(0)';
                                    }
                                }
                                return 'none';
                            })(),
                            zIndex: instance.zIndex || 20,
                            top: instance.position?.top || 0,
                            left: instance.position?.left,
                            right: instance.position?.right,
                            bottom: instance.position?.bottom,
                            width: instance.position?.width || "100%",
                            height: instance.position?.height || "100%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            overflow: "hidden", // Prevent content from being visible outside container
                        }}
                        className={instance.content?.customClass}
                    >
                        <ChatGpt
                            mode={instance.mode}
                            customMessage={instance.content?.message}
                            animation={instance.animation}
                            showPhoneBackground={instance.showPhoneBackground}
                        />
                    </div>
                );
            })}

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
