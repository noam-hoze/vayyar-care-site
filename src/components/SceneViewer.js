import React, { useState, useEffect, useMemo, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SceneInstructions from "./SceneInstructions";
import AnimatedTablet from "./animations/AnimatedTablet";
import AnimatedTabletScene1_5 from "./animations/AnimatedTabletScene1_5";
import AnimatedTabletScene2 from "./animations/AnimatedTabletScene2";
import AnimatedTabletScene3 from "./animations/AnimatedTabletScene3";
import AnimatedTabletScene4 from "./animations/AnimatedTabletScene4";
import AnimatedTabletScene5 from "./animations/AnimatedTabletScene5";
import AnimatedTabletScene6 from "./animations/AnimatedTabletScene6";
import AnimatedTabletScene7 from "./animations/AnimatedTabletScene7";
import AnimatedTabletScene8 from "./animations/AnimatedTabletScene8";
import AnimatedTabletScene9 from "./animations/AnimatedTabletScene9";
import ContinuousChatScene from "./animations/ContinuousChatScene";
import DebugOverlay from "./DebugOverlay";
import { videoConfig } from "../config/videoConfig";

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

    // Define tablet components map
    const tabletComponentsMap = useMemo(
        () => ({
            0: ContinuousChatScene,
            1: AnimatedTabletScene1_5,
            2: AnimatedTabletScene2,
            3: AnimatedTabletScene3,
            4: AnimatedTabletScene4,
            5: AnimatedTabletScene5,
            6: AnimatedTabletScene6,
            7: AnimatedTabletScene7,
            8: AnimatedTabletScene9,
        }),
        []
    );

    // Memoized render tablet component
    const tabletComponent = useMemo(() => {
        const TabletComponent = tabletComponentsMap[index] || AnimatedTablet;
        return (
            <TabletComponent scene={scene} scrollProgress={animationProgress} />
        );
    }, [index, scene, animationProgress, tabletComponentsMap]);

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
