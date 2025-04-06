import React, { useState, useEffect, useMemo, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AnimatedTabletScene1 from "./animations/AnimatedTabletScene1";
import AnimatedTabletScene2 from "./animations/AnimatedTabletScene2";
import AnimatedTabletScene3 from "./animations/AnimatedTabletScene3";
import AnimatedTabletScene4 from "./animations/AnimatedTabletScene4";
import AnimatedTabletScene5 from "./animations/AnimatedTabletScene5";
import DebugOverlay from "./DebugOverlay";
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

        // Create GSAP timeline for video scrubbing
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: ".scenes-container",
                start: "top top",
                end: "bottom bottom",
                scrub: videoConfig.scrubSmoothness,
            },
        });

        // Set up video time control
        const setupVideoControl = () => {
            tl.fromTo(
                video,
                {
                    currentTime: 0,
                },
                {
                    currentTime: video.duration || 1,
                    ease: "none",
                }
            );
        };

        // Wait for video metadata to load before setting up the timeline
        if (video.readyState >= 2) {
            setupVideoControl();
        } else {
            video.addEventListener("loadedmetadata", setupVideoControl);
        }

        return () => {
            video.removeEventListener("loadedmetadata", setupVideoControl);
            tl.kill();
        };
    }, []);

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
            [SCENES.VC_CLINICAL]: AnimatedTabletScene4,
            [SCENES.VP_FAMILY]: AnimatedTabletScene5,
        }),
        [SCENES]
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

    return (
        <div
            className="scene-container"
            style={{ color: scene.color || "#000" }}
        >
            <DebugOverlay
                scrollProgress={subScrollProgress}
                animationProgress={animationProgress}
                scene={scene}
                sceneIndex={index}
            />

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
                                            animationFillMode: "forwards",
                                        }}
                                    >
                                        {extraDescriptionText}
                                    </span>
                                )}
                            </p>
                        </div>

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

                <div className="tablet-wrapper">{tabletComponent}</div>
            </div>
        </div>
    );
};

export default SceneViewer;
