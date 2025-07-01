"use client"; // Mark this as a Client Component

import React, { useState, useEffect, useRef } from "react";
import { scenes } from "@/data/scenes"; // Use alias
import SceneViewer from "@/components/SceneViewer"; // Use alias
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MAX_SCENES, isValidScene, SCENES } from "@/data/sceneRegistry"; // Use alias
import { useVideoTime } from "@/contexts/VideoTimeContext"; // Import context hook
import { useDemoModal } from "@/contexts/DemoModalContext"; // Added import
import { videoConfig } from "@/config/videoConfig"; // Import videoConfig
import { homeSections, HomeSection } from "@/data/homeSections";
import MobileHomeSection from "@/components/mobile/MobileHomeSection";
import { MobileHomeVideoProvider } from "@/components/mobile/MobileHomeVideoContext";
import MobileHeroSection from "@/components/mobile/MobileHeroSection";
import TheaterModeOverlay from "@/components/mobile/TheaterModeOverlay"; // Import the TheaterModeOverlay component
import Breather from "@/components/Breather";
import { timecodeToSeconds } from "@/lib/utils";
import ContactModal from "@/components/ContactModal"; // Import the new Breather component

// Register GSAP plugins - needs to be done in a client component or useEffect
gsap.registerPlugin(ScrollTrigger);

const VAYYAR_BLUE = "#06aeef"; // Define Vayyar blue for use in styles
const HERO_FADE_OUT_TIME = 4 + 19 / 30; // 00:00:04:19 assuming 30fps

const TIMED_TEXTS_CONFIG: TimedTextConfigItem[] = [
    {
        id: 7,
        text: (
            <div
                style={{
                    fontSize: "2rem",
                    textAlign: "left",
                    maxWidth: "700px",
                    margin: "0 auto",
                    fontFamily:
                        "SF Pro Display, SF Pro Icons, Helvetica Neue, Helvetica, Arial, sans-serif",
                    lineHeight: "1.5",
                    fontWeight: "500",
                }}
            >
                <div
                    style={{
                        display: "flex",
                        alignItems: "flex-start",
                        marginBottom: "0.75rem",
                    }}
                >
                    <span
                        style={{
                            color: "#05aae9",
                            marginRight: "1rem",
                            lineHeight: "1",
                        }}
                    >
                        ›
                    </span>
                    <span>
                        Moves beyond “what” happened and helps teams understand
                        “why,” allowing for truly preventive and personalized
                        care.
                    </span>
                </div>
                <div
                    style={{
                        display: "flex",
                        alignItems: "flex-start",
                        marginBottom: "0.75rem",
                    }}
                >
                    <span
                        style={{
                            color: "#05aae9",
                            marginRight: "1rem",
                            lineHeight: "1",
                        }}
                    >
                        ›
                    </span>
                    <span>Comprehensive Touchless Data Collection</span>
                </div>
                <div
                    style={{
                        display: "flex",
                        alignItems: "flex-start",
                        marginBottom: "0.75rem",
                        marginLeft: "2.5rem",
                    }}
                >
                    <span
                        style={{
                            color: "#05aae9",
                            marginRight: "1rem",
                            lineHeight: "1",
                        }}
                    >
                        ›
                    </span>
                    <span>AI Driven</span>
                </div>
                <div
                    style={{
                        display: "flex",
                        alignItems: "flex-start",
                        marginBottom: "0.75rem",
                        marginLeft: "2.5rem",
                    }}
                >
                    <span
                        style={{
                            color: "#05aae9",
                            marginRight: "1rem",
                            lineHeight: "1",
                        }}
                    >
                        ›
                    </span>
                    <span>Mobility and Activity Levels</span>
                </div>
                <div
                    style={{
                        display: "flex",
                        alignItems: "flex-start",
                        marginBottom: "0.75rem",
                        marginLeft: "2.5rem",
                    }}
                >
                    <span
                        style={{
                            color: "#05aae9",
                            marginRight: "1rem",
                            lineHeight: "1",
                        }}
                    >
                        ›
                    </span>
                    <span>Time Spent In Bed</span>
                </div>
                <div
                    style={{
                        display: "flex",
                        alignItems: "flex-start",
                        marginLeft: "2.5rem",
                    }}
                >
                    <span
                        style={{
                            color: "#05aae9",
                            marginRight: "1rem",
                            lineHeight: "1",
                        }}
                    >
                        ›
                    </span>
                    <span>Bathroom Visits</span>
                </div>
            </div>
        ),
        startTime: 17 + 12 / 30,
        endTime: 26 + 5 / 30,
        isScrolling: true,
        style: {
            // fontSize: "clamp(2.5rem, 6vw, 5rem)", // Removed to use the size defined in the text component
        },
        dimMultiplier: 0.5,
    },
    {
        id: 8,
        text: (
            <div>
                <h3
                    style={{
                        margin: "0 auto",
                        fontSize: "28px",
                        textAlign: "center",
                        maxWidth: "800px",
                        fontFamily:
                            "SF Pro Display, SF Pro Icons, Helvetica Neue, Helvetica, Arial, sans-serif",
                    }}
                >
                    Dignity comes first{" "}
                </h3>
                <h1
                    style={{
                        margin: "0 auto",
                        fontSize: "40px",
                        textAlign: "center",
                        maxWidth: "800px",
                        fontFamily:
                            "SF Pro Display, SF Pro Icons, Helvetica Neue, Helvetica, Arial, sans-serif",
                    }}
                >
                    - Protect privacy while providing clarity
                    <br />- Analytics that safeguard dignity and provide
                    actionable data
                </h1>
            </div>
        ),
        startTime: 45 + 15 / 30,
        endTime: 67 + 2 / 30,
        style: {
            fontSize: "clamp(2.5rem, 6vw, 5rem)",
            transition: "opacity 0.3s ease-in-out",
        },
        dimMultiplier: 0.4,
    },
    {
        id: 9,
        text: (
            <div>
                <h3
                    style={{
                        margin: "0 auto",
                        fontSize: "28px",
                        textAlign: "center",
                        maxWidth: "800px",
                        fontFamily:
                            "SF Pro Display, SF Pro Icons, Helvetica Neue, Helvetica, Arial, sans-serif",
                    }}
                >
                    {/* See the context. */} Act with clarity.{" "}
                </h3>
                <h1
                    style={{
                        margin: "0 auto",
                        fontSize: "40px",
                        textAlign: "center",
                        maxWidth: "800px",
                        fontFamily:
                            "SF Pro Display, SF Pro Icons, Helvetica Neue, Helvetica, Arial, sans-serif",
                    }}
                >
                    Our AI reveals the patterns <br /> behind the incident.
                </h1>
            </div>
        ),
        startTime: 93 + 18 / 30,
        endTime: 105 + 0 / 30,
        style: {
            fontSize: "clamp(2.5rem, 6vw, 5rem)",
            transition: "opacity 0.3s ease-in-out",
        },
        dimMultiplier: 0.2,
    },
    {
        id: 10,
        text: (
            <div>
                <h3
                    style={{
                        margin: "0 auto",
                        fontSize: "28px",
                        textAlign: "center",
                        maxWidth: "800px",
                        fontFamily:
                            "SF Pro Display, SF Pro Icons, Helvetica Neue, Helvetica, Arial, sans-serif",
                    }}
                >
                    Confidence, earned.{" "}
                </h3>
                <h1
                    style={{
                        margin: "0 auto",
                        fontSize: "40px",
                        textAlign: "center",
                        maxWidth: "800px",
                        fontFamily:
                            "SF Pro Display, SF Pro Icons, Helvetica Neue, Helvetica, Arial, sans-serif",
                    }}
                >
                    Transparent insights turn uncertainty into trust, and trust
                    into action.
                </h1>
            </div>
        ),
        startTime: 2 * 60 + 18 + 8 / 30,
        endTime: 2 * 60 + 33 + 0 / 30,
        style: {
            fontSize: "clamp(2.5rem, 6vw, 5rem)",
            transition: "opacity 0.3s ease-in-out",
        },
        dimMultiplier: 0.2,
    },
    {
        id: 11,
        text: (
            <div>
                <h3
                    style={{
                        margin: "0 auto",
                        fontSize: "28px",
                        textAlign: "center",
                        maxWidth: "800px",
                        fontFamily:
                            "SF Pro Display, SF Pro Icons, Helvetica Neue, Helvetica, Arial, sans-serif",
                    }}
                >
                    {/* A new standard for care. */} Built to scale.{" "}
                </h3>
                <h1
                    style={{
                        margin: "0 auto",
                        fontSize: "40px",
                        textAlign: "center",
                        maxWidth: "800px",
                        fontFamily:
                            "SF Pro Display, SF Pro Icons, Helvetica Neue, Helvetica, Arial, sans-serif",
                    }}
                >
                    Turn insights into enterprise-wide transformation.
                </h1>
            </div>
        ),
        startTime: 2 * 60 + 40 + 0 / 30,
        endTime: 2 * 60 + 58 + 0 / 30,
        style: {
            fontSize: "clamp(2.5rem, 6vw, 5rem)",
            transition: "opacity 0.3s ease-in-out",
        },
        dimMultiplier: 0.2,
    },
];

interface TimedTextConfigItem {
    id: number;
    text: React.ReactNode;
    startTime: number;
    endTime?: number; // Optional for texts using duration logic
    fadeInDuration?: number;
    visibleDuration?: number;
    fadeOutDuration?: number;
    isRightAligned?: boolean;
    isScrolling?: boolean;
    dimMultiplier?: number;
    style: React.CSSProperties & {
        fontSize?: string;
        fontFamily?: string;
        fontWeight?: string | number;
        color?: string;
        textShadow?: string;
        lineHeight?: string;
        maxWidth?: string;
        whiteSpace?: React.CSSProperties["whiteSpace"];
        transition?: string;
    };
}

// Renamed function to match Next.js convention (can be any name, but default export is the page)
export default function HomePage() {
    // All hooks at the top, before any return or conditional
    const [isMobile, setIsMobile] = useState<null | boolean>(null);
    const [index, setIndex] = useState(0);
    const [subScrollProgress, setSubScrollProgress] = useState(0);
    const { registerScrollToTime, videoDuration, currentTime } = useVideoTime();
    const { isDemoModalOpen } = useDemoModal();
    const [shouldHeroFadeOut, setShouldHeroFadeOut] = useState(false);
    const [heroHasFadedOutOnce, setHeroHasFadedOutOnce] = useState(false);
    const [dimAmount, setDimAmount] = useState(0);
    const [timedTextsVisibility, setTimedTextsVisibility] = useState<{
        [key: number]: boolean;
    }>({});
    const targetY = useRef(typeof window !== "undefined" ? window.scrollY : 0);
    const currentY = useRef(typeof window !== "undefined" ? window.scrollY : 0);
    const rafId = useRef<number | null>(null);
    const isScrollingProgrammatically = useRef(false);

    const timeToScrollY = (time: number): number => {
        if (videoDuration === 0) return 0;

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

        const windowHeight =
            typeof window !== "undefined" ? window.innerHeight : 0;
        const scrollY =
            targetSceneIndex * windowHeight +
            progressWithinTargetScene * windowHeight;

        return scrollY;
    };

    useEffect(() => {
        // Function to check and update mobile state
        const checkMobile = () => {
            // 1024 is the breakpoint for desktop, to be synced with Tailwindcss layout breakpoints
            setIsMobile(document.documentElement.clientWidth < 1024);
        };

        // Initial check
        checkMobile();

        // Add resize event listener
        window.addEventListener("resize", checkMobile);

        // Cleanup
        return () => {
            window.removeEventListener("resize", checkMobile);
        };
    }, []);

    // Effect to trigger hero section fade-out/fade-in
    useEffect(() => {
        if (currentTime >= HERO_FADE_OUT_TIME) {
            if (!shouldHeroFadeOut) {
                // Transitioning to faded out
                setHeroHasFadedOutOnce(true);
            }
            setShouldHeroFadeOut(true);
        } else {
            setShouldHeroFadeOut(false); // Allow it to fade back in or remain visible
        }
    }, [currentTime, shouldHeroFadeOut]); // Added shouldHeroFadeOut

    // Effect to trigger timed texts fade-in/out
    useEffect(() => {
        const newVisibility: { [key: number]: boolean } = {};
        const stackingTextIds = [1, 2, 3];

        TIMED_TEXTS_CONFIG.forEach((config) => {
            if (stackingTextIds.includes(config.id)) {
                // For stacking texts, they become visible at their start time.
                // The parent container will handle the group's final disappearance.
                newVisibility[config.id] = currentTime >= config.startTime;
            } else if (config.fadeInDuration) {
                // New logic for texts with explicit durations
                const animationStartTime = config.startTime;
                const fullyVisibleTime =
                    animationStartTime + (config.fadeInDuration || 0);
                const startFadeOutTime =
                    fullyVisibleTime + (config.visibleDuration || 0);
                const animationEndTime =
                    startFadeOutTime + (config.fadeOutDuration || 0);
                newVisibility[config.id] =
                    currentTime >= animationStartTime &&
                    currentTime < animationEndTime;
            } else {
                // Original logic for texts with simple start/end
                newVisibility[config.id] =
                    currentTime >= config.startTime &&
                    currentTime < config.endTime!;
            }
        });
        setTimedTextsVisibility(newVisibility);
    }, [currentTime]);

    // Setup GSAP smooth scrolling (modified)
    useEffect(() => {
        if (isMobile) return; // Only run on desktop
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
            // const isVpFamilyScene = currentSceneIndex === SCENES.VP_FAMILY; // Commented out
            let speedMultiplier = 0.1;

            // if (
            //     isFallChartScene &&
            //     currentSubScroll >= 0.75 &&
            //     currentSubScroll <= 0.84
            // ) {
            //     speedMultiplier = 0.004;
            // }
            // if (isVpFamilyScene) { // Commented out block
            //     if (currentSubScroll > 0.3 && currentSubScroll < 0.4) {
            //         speedMultiplier = 0.01;
            //     } else if (currentSubScroll > 0.55 && currentSubScroll < 0.65) {
            //         speedMultiplier = 0.01;
            //     } else if (currentSubScroll > 0.75 && currentSubScroll < 0.85) {
            //         speedMultiplier = 0.01;
            //     }
            // }

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
    }, [isMobile, registerScrollToTime, videoDuration]); // Add isMobile as dependency

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

    // Effect to calculate scene dimming
    useEffect(() => {
        const textsForDimming = TIMED_TEXTS_CONFIG.filter(
            (c) => ![1, 2, 3].includes(c.id)
        );

        let maxOpacity = 0;
        let dimMultiplier = 0; // Default to 0, so no dimming if no text is active

        textsForDimming.forEach((config) => {
            if (!config.endTime) return;

            const duration = config.endTime - config.startTime;
            const progress = (currentTime - config.startTime) / duration;

            if (progress >= 0 && progress <= 1) {
                const fadeDurationAsProgress = 0.15; // Same as text fade
                let currentOpacity = 0;
                if (progress < fadeDurationAsProgress) {
                    currentOpacity = progress / fadeDurationAsProgress;
                } else if (progress > 1 - fadeDurationAsProgress) {
                    currentOpacity = (1 - progress) / fadeDurationAsProgress;
                } else {
                    currentOpacity = 1;
                }
                if (currentOpacity > maxOpacity) {
                    maxOpacity = currentOpacity;
                    dimMultiplier = config.dimMultiplier ?? 0.5; // Use configured value or default
                }
            }
        });

        setDimAmount(maxOpacity * dimMultiplier);
    }, [currentTime]);

    const scene = scenes.find((s) => s.scene === index) || scenes[0];

    // Note: height calculation might move or change based on scroll implementation
    const scenesContainerHeight = `${MAX_SCENES * 100 - 50}vh`;

    const stackingTextConfigs = TIMED_TEXTS_CONFIG.filter((c) =>
        [1, 2, 3].includes(c.id)
    );
    const otherTextConfigs = TIMED_TEXTS_CONFIG.filter(
        (c) => ![1, 2, 3].includes(c.id)
    );
    const scrollingTextConfigs = otherTextConfigs.filter((c) => c.isScrolling);
    const fixedOtherTextConfigs = otherTextConfigs.filter(
        (c) => !c.isScrolling
    );

    // Determine when the entire stacked group should be visible
    const firstStackingText =
        stackingTextConfigs.length > 0 ? stackingTextConfigs[0] : null;
    const lastStackingText =
        stackingTextConfigs.length > 0
            ? stackingTextConfigs[stackingTextConfigs.length - 1]
            : null;

    const isStackingGroupVisible =
        firstStackingText && lastStackingText
            ? currentTime >= firstStackingText.startTime &&
              currentTime < (lastStackingText.endTime || 0)
            : false;

    // Place this after all hooks
    if (isMobile === null) {
        return null;
    }

    if (isMobile) {
        return (
            <MobileHomeVideoProvider>
                <div style={{ margin: "0 auto", background: "#fff" }}>
                    <MobileHeroSection />
                    {homeSections.map((section, idx) => (
                        <MobileHomeSection
                            key={idx}
                            section={section}
                            index={idx}
                            sectionId={`section-${section.id}`}
                            nextSectionId={`section-${section.id + 1}`}
                        />
                    ))}
                    {/* Contact form section at the end of the page */}
                    <div
                        id="contact-section"
                        className="relative z-10"
                        style={{ height: "100vh" }}
                    >
                        <ContactModal isOpen={true} asPageElement={true} />
                    </div>

                    {/* Global theater mode overlay */}
                    <TheaterModeOverlay />
                </div>
            </MobileHomeVideoProvider>
        );
    }

    return (
        <>
            {/* Hero Section - Conditionally rendered based on Demo Modal state */}
            {!isDemoModalOpen && (
                <div
                    className={`fixed inset-0 flex flex-col justify-center items-center text-center z-50 pointer-events-none ${
                        shouldHeroFadeOut
                            ? "animate-hero-section-fade-out"
                            : heroHasFadedOutOnce
                            ? "animate-hero-section-fade-in"
                            : "" // Initially, h1/h2 animations control fade-in
                    }`}
                    style={{
                        // boxShadow: "0px 0px 80px 0px rgba(6, 174, 239, 0.6)", // REMOVED diagnostic blue shadow
                        transform: "translateY(0) !important",
                    }}
                >
                    {/* Inner container for text and cloud */}
                    <div
                        className="relative flex flex-col items-center justify-center p-8 group" // Added padding and group for potential future use
                        style={{
                            height: `calc(100% - 64px)`,
                            width: `100%`,
                            top: `73px`,
                        }}
                        // No box-shadow here anymore
                    >
                        {/* NEW Cloud Div */}
                        <div
                            className="absolute inset-[-40px] -z-10"
                            style={{
                                background:
                                    "linear-gradient(to bottom, rgba(1, 32, 64, 0.73),rgba(1, 32, 64, 0.43))",
                                opacity: Math.max(
                                    0,
                                    1 - (currentTime / HERO_FADE_OUT_TIME) * 1
                                ),
                                // filter: "blur(40px)",
                                // borderRadius: "50%", // For soft, organic edges
                            }}
                        ></div>

                        {/* Text elements - ensure they have a higher z-index implicitly or explicitly if needed */}
                        <h1
                            className="text-white font-bold tracking-tight leading-tight opacity-0 animate-fadeInSlow relative z-0"
                            style={{
                                fontSize: "clamp(3rem, 7vw, 5.5rem)",
                                textShadow:
                                    "0px 2px 4px rgba(0,0,0,0.5), 0px 4px 12px rgba(0,0,0,0.3)",
                                // transform: "translateY(0) !important", // Likely not needed due to parent flex
                            }}
                        >
                            Vayyar Care
                            <sup
                                style={{
                                    fontSize: "0.6em",
                                    top: "-0.5em",
                                    position: "relative",
                                    color: VAYYAR_BLUE,
                                    marginLeft: "0.1em",
                                    zIndex: -1,
                                }}
                            >
                                AI
                            </sup>
                        </h1>
                        <h2
                            className="text-white mt-4 tracking-wide font-light opacity-0 animate-fadeInSlower relative z-0"
                            style={{
                                fontSize: "clamp(1.25rem, 3vw, 2rem)",
                                textShadow: "0px 2px 12px rgba(0,0,0,0.5)",
                                // transform: "translateY(0) !important", // Likely not needed
                            }}
                        >
                            Optimize staff &nbsp;·&nbsp; Transform Care
                            &nbsp;·&nbsp; Operational Efficiency
                        </h2>
                    </div>{" "}
                    {/* END Inner container */}
                </div>
            )}

            {/* Timed Texts Section */}
            {/* 1. Container for stacking texts */}
            <div
                className="fixed inset-0 flex flex-col justify-center items-center text-white font-bold pointer-events-none z-40"
                style={{
                    opacity: isStackingGroupVisible ? 1 : 0,
                    transition: "opacity 0.3s ease-in-out", // Consistent transition for the group
                }}
            >
                <div style={{ textAlign: "left" }}>
                    {stackingTextConfigs.map((config) => (
                        <div
                            key={config.id}
                            style={{
                                ...config.style,
                                position: "relative", // Ensure stacking within the flex container
                                opacity: timedTextsVisibility[config.id]
                                    ? 1
                                    : 0,
                                textShadow:
                                    config.style.textShadow ||
                                    "0px 2px 8px rgba(0,0,0,0.7)", // Add back the shadow for contrast
                                // The transition is already in config.style, so it will apply on opacity change
                            }}
                        >
                            {config.text}
                        </div>
                    ))}
                </div>
            </div>

            {/* 2. Render other texts as before */}
            {fixedOtherTextConfigs.map((config: TimedTextConfigItem) => {
                if (config.isRightAligned) {
                    return (
                        <div
                            key={config.id}
                            className="fixed top-1/2 right-[5%] transform -translate-y-1/2 text-right text-white font-bold pointer-events-none z-40"
                            style={{
                                ...config.style,
                                opacity: timedTextsVisibility[config.id]
                                    ? 1
                                    : 0,
                                padding: "30px",
                            }}
                        >
                            <div
                                className="absolute -z-10"
                                style={{
                                    inset: "-30px",
                                    // background:
                                    //     "linear-gradient(to bottom, rgba(107, 106, 106, 0.33),rgba(65, 60, 60, 0.43))",
                                    backdropFilter: `contrast(0.4)`,
                                    // filter: "blur(35px)",
                                    // borderRadius: "30px",
                                }}
                            ></div>
                            {config.text}
                        </div>
                    );
                }
                // Default centered rendering for other texts
                return (
                    <div
                        key={config.id}
                        className="fixed inset-0 flex justify-center items-center text-center text-white font-bold pointer-events-none z-40"
                        style={{
                            ...config.style,
                            opacity: timedTextsVisibility[config.id] ? 1 : 0,
                            textShadow:
                                config.style.textShadow ||
                                "0px 2px 8px rgba(0,0,0,0.7)", // Keep original default if not specified in config
                        }}
                    >
                        {config.text}
                    </div>
                );
            })}

            {/* Main container for scenes */}
            <div
                className="scenes-container relative w-full"
                style={{ height: scenesContainerHeight }} // Height set based on number of scenes
            >
                <div
                    className="absolute inset-0 z-[5] pointer-events-none"
                    style={{
                        backgroundColor: `rgba(0, 0, 0, ${dimAmount})`, // Dim amount is now pre-calculated
                        transition: "background-color 0.1s ease-in-out", // A quick transition for smoothness
                    }}
                />
                <SceneViewer
                    scene={scene}
                    index={index}
                    subScrollProgress={subScrollProgress}
                />
                {/* Scrolling Texts */}
                {scrollingTextConfigs.map((config) => {
                    if (!config.endTime) return null;

                    // The text will be centered on screen at the midpoint of its duration
                    const yPos = timeToScrollY(
                        (config.startTime + config.endTime) / 2
                    );
                    const { transition, ...restOfStyle } = config.style;

                    const duration = config.endTime - config.startTime;
                    const progress =
                        (currentTime - config.startTime) / duration;

                    // Don't render if we are not in the time range for this text
                    if (progress < 0 || progress > 1) {
                        return null;
                    }

                    // Animate translateY from 60vh to -60vh. This makes the text
                    // travel from below the viewport to above it.
                    const transform = `translateY(${(0.5 - progress) * 120}vh)`;

                    // Fade in at the beginning and fade out at the end for a smoother appearance.
                    const fadeDurationAsProgress = 0.15; // Use 15% of the time for fade-in and 15% for fade-out.
                    let opacity = 1;
                    if (progress < fadeDurationAsProgress) {
                        opacity = progress / fadeDurationAsProgress;
                    } else if (progress > 1 - fadeDurationAsProgress) {
                        opacity = (1 - progress) / fadeDurationAsProgress;
                    }

                    return (
                        <div
                            key={config.id}
                            className="text-white font-bold pointer-events-none"
                            style={{
                                ...restOfStyle,
                                position: "absolute",
                                top: `${yPos}px`,
                                left: "0",
                                width: "100%",
                                height: "100vh",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                textAlign: "center",
                                opacity: opacity,
                                transform: transform,
                                zIndex: 10,
                                textShadow:
                                    config.style.textShadow ||
                                    "0px 2px 8px rgba(0,0,0,0.7)",
                            }}
                        >
                            {config.text}
                        </div>
                    );
                })}
            </div>

            {/* Breather components with homeSections data */}
            {homeSections
                .filter((section) => section.type === "text")
                .map((section, idx) => {
                    return (
                        <Breather
                            key={idx}
                            appearAtTime={section.text?.start || 0}
                            disappearAtTime={section.text?.end || 0}
                            title={section.header || section.title}
                            content={section.content}
                            buttonText={section.buttonText}
                            scrollToTimeValue={timecodeToSeconds(
                                section.scrollToTimeValue!
                            )}
                        />
                    );
                })}

            {/* Contact form section at the end of the page */}
            <div
                id="contact-section"
                className="relative z-10"
                style={{ height: "100vh" }}
            >
                <ContactModal isOpen={true} asPageElement={true} />
            </div>
        </>
    );
}
