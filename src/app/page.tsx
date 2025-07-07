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
                    fontFamily:
                        "SF Pro Display, SF Pro Icons, Helvetica Neue, Helvetica, Arial, sans-serif",
                    fontSize: "38px",
                    textAlign: "center",
                    maxWidth: "900px",
                    margin: "0 auto",
                    lineHeight: "1.5",
                    fontWeight: "700",
                }}
            >
                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        marginBottom: "0.75rem",
                    }}
                >
                    <span>
                        Vayyar's technology records the daily life of your
                        residents without camera or sound
                    </span>
                </div>
                <br />
                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        marginBottom: "0.75rem",
                    }}
                >
                    <span>
                        So you can improve the care you provide while increasing
                        your NOI and your staff's efficiency
                    </span>
                </div>
                <br />
                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        marginBottom: "0.75rem",
                    }}
                >
                    <span>The Era of AI-based care is here</span>
                </div>
            </div>
        ),
        startTime: 4 + 23 / 30,
        endTime: 7,
        isScrolling: true,
        style: {
            // fontSize: "clamp(2.5rem, 6vw, 5rem)", // Removed to use the size defined in the text component
        },
        dimMultiplier: 0.5,
    },
    {
        id: 90,
        text: (
            <div>
                <h1
                    style={{
                        margin: "0 auto",
                        fontSize: "2rem",
                        textAlign: "center",
                        fontFamily:
                            "SF Pro Display, SF Pro Icons, Helvetica Neue, Helvetica, Arial, sans-serif",
                    }}
                >
                    <span style={{ fontSize: "20px" }}>Efficiency </span> <br />
                    <span style={{ fontSize: "38px", lineHeight: "20px" }}>
                        Optimize your staff work <br />
                        and reduce their burden
                    </span>{" "}
                </h1>
            </div>
        ),
        startTime: 8,
        endTime: 10,
        style: {
            fontSize: "clamp(2.5rem, 6vw, 5rem)",
            transition: "opacity 0.3s ease-in-out",
        },
        dimMultiplier: 0.2,
    },
    {
        id: 91,
        text: (
            <div>
                <h1
                    style={{
                        margin: "0 auto",
                        fontSize: "2rem",
                        textAlign: "center",
                        fontFamily:
                            "SF Pro Display, SF Pro Icons, Helvetica Neue, Helvetica, Arial, sans-serif",
                    }}
                >
                    <span style={{ fontSize: "20px" }}>Real-time Alerts </span>{" "}
                    <br />
                    <span style={{ fontSize: "38px", lineHeight: "20px" }}>
                        Alert your staff as things happen
                    </span>{" "}
                </h1>
            </div>
        ),
        startTime: 31,
        endTime: 35,
        style: {
            fontSize: "clamp(2.5rem, 6vw, 5rem)",
            transition: "opacity 0.3s ease-in-out",
        },
        dimMultiplier: 0.2,
    },
    {
        id: 92,
        text: (
            <div>
                <h1
                    style={{
                        margin: "0 auto",
                        fontSize: "2rem",
                        textAlign: "center",
                        fontFamily:
                            "SF Pro Display, SF Pro Icons, Helvetica Neue, Helvetica, Arial, sans-serif",
                    }}
                >
                    <span style={{ fontSize: "20px" }}>Privacy </span> <br />
                    <span style={{ fontSize: "38px", lineHeight: "20px" }}>
                        Monitoring every movement <br />
                        without compromising privacy.{" "}
                    </span>{" "}
                </h1>
            </div>
        ),
        startTime: 49,
        endTime: 54,
        style: {
            fontSize: "clamp(2.5rem, 6vw, 5rem)",
            transition: "opacity 0.3s ease-in-out",
        },
        dimMultiplier: 0.2,
    },
    {
        id: 93,
        text: (
            <div>
                <h1
                    style={{
                        margin: "0 auto",
                        fontSize: "2rem",
                        textAlign: "center",
                        fontFamily:
                            "SF Pro Display, SF Pro Icons, Helvetica Neue, Helvetica, Arial, sans-serif",
                    }}
                >
                    <span style={{ fontSize: "20px" }}>AI Revolution </span>{" "}
                    <br />
                    <span style={{ fontSize: "38px", lineHeight: "20px" }}>
                        Stay ahead with cutting-edge AI insights from our
                        <br /> sensors and an array of smart data, all right at
                        <br /> your fingertips without compromising privacy.{" "}
                    </span>{" "}
                </h1>
            </div>
        ),
        startTime: 79,
        endTime: 82,
        style: {
            fontSize: "clamp(2.5rem, 6vw, 5rem)",
            transition: "opacity 0.3s ease-in-out",
        },
        dimMultiplier: 0.2,
    },
    {
        id: 94,
        text: (
            <div>
                <h1
                    style={{
                        margin: "0 auto",
                        fontSize: "2rem",
                        textAlign: "center",
                        fontFamily:
                            "SF Pro Display, SF Pro Icons, Helvetica Neue, Helvetica, Arial, sans-serif",
                    }}
                >
                    <span style={{ fontSize: "20px" }}>Personalize care </span>{" "}
                    <br />
                    <span style={{ fontSize: "38px", lineHeight: "20px" }}>
                        Experience the power of immediate, <br />
                        accurate insights for truly personalized care.
                    </span>{" "}
                </h1>
            </div>
        ),
        startTime: 98,
        endTime: 102,
        style: {
            fontSize: "clamp(2.5rem, 6vw, 5rem)",
            transition: "opacity 0.3s ease-in-out",
        },
        dimMultiplier: 0.2,
    },
    {
        id: 95,
        text: (
            <div>
                <h1
                    style={{
                        margin: "0 auto",
                        fontSize: "2rem",
                        textAlign: "center",
                        fontFamily:
                            "SF Pro Display, SF Pro Icons, Helvetica Neue, Helvetica, Arial, sans-serif",
                    }}
                >
                    <span style={{ fontSize: "20px" }}> Improve NOI </span>{" "}
                    <br />
                    <span style={{ fontSize: "38px", lineHeight: "20px" }}>
                        Boost your NOI and maximize returns through <br />
                        trusted, data-driven care plans.
                    </span>{" "}
                </h1>
            </div>
        ),
        startTime: 2 * 60 + 24 + videoConfig.compensation + 8 / 30,
        endTime: 2 * 60 + 34 + videoConfig.compensation + 20 / 30,
        style: {
            fontSize: "clamp(2.5rem, 6vw, 5rem)",
            transition: "opacity 0.3s ease-in-out",
        },
        dimMultiplier: 0.2,
    },
    {
        id: 96,
        text: (
            <div>
                <h1
                    style={{
                        margin: "0 auto",
                        fontSize: "2rem",
                        textAlign: "center",
                        fontFamily:
                            "SF Pro Display, SF Pro Icons, Helvetica Neue, Helvetica, Arial, sans-serif",
                    }}
                >
                    <span style={{ fontSize: "20px" }}>
                        {" "}
                        Prosper. Care. Protect.{" "}
                    </span>{" "}
                    <br />
                    <span style={{ fontSize: "38px", lineHeight: "20px" }}>
                        Unlock Vayyar’s AI insights to optimize your business,
                        <br />
                        elevate care, and grow your bottom line.
                    </span>{" "}
                </h1>
            </div>
        ),
        startTime: 2 * 60 + 47 + videoConfig.compensation + 0 / 30,
        endTime: 2 * 60 + 53 + videoConfig.compensation + 29 / 30,
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
                            Increase NOI &nbsp;·&nbsp; Improve Care
                            &nbsp;·&nbsp; Maintain Privacy
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
