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
import Breather from "@/components/Breather";
import {timecodeToSeconds} from "@/lib/utils";
import ContactModal from "@/components/ContactModal"; // Import the new Breather component

// Register GSAP plugins - needs to be done in a client component or useEffect
gsap.registerPlugin(ScrollTrigger);

const VAYYAR_BLUE = "#06aeef"; // Define Vayyar blue for use in styles
const HERO_FADE_OUT_TIME = 4 + 19 / 30; // 00:00:04:19 assuming 30fps

const TIMED_TEXTS_CONFIG: TimedTextConfigItem[] = [
    {
        id: 1,
        text: (
            <h1 style={{ margin: 0 }}>
                {/* <span style={{ color: VAYYAR_BLUE, marginRight: "1rem" }}>
                    ›
                </span>
                Smarter Care Plan */}
            </h1>
        ),
        startTime: 5 + 8 / 30,
        endTime: 5 + 22 / 30,
        style: {
            fontSize: "clamp(2.5rem, 6vw, 5rem)",
            transition: "opacity 0.3s ease-in-out",
        },
    },
    {
        id: 2,
        text: (
            <h1 style={{ margin: 0 }}>
                {/* <span style={{ color: VAYYAR_BLUE, marginRight: "1rem" }}>
                    ›
                </span>
                Improve NOI */}
            </h1>
        ),
        startTime: 5 + 24 / 30,
        endTime: 6 + 8 / 30,
        style: {
            fontSize: "clamp(2.5rem, 6vw, 5rem)",
            transition: "opacity 0.3s ease-in-out",
        },
    },
    {
        id: 3,
        text: (
            <h1 style={{ margin: 0 }}>
                {/* <span style={{ color: VAYYAR_BLUE, marginRight: "1rem" }}>
                    ›
                </span>
                AI-Powered Insights */}
            </h1>
        ),
        startTime: 6 + 14 / 30,
        endTime: 7 + 12 / 30,
        style: {
            fontSize: "clamp(2.5rem, 6vw, 5rem)",
            transition: "opacity 0.3s ease-in-out",
        },
    },
    // {
    //     id: 6, // New ID for the duplicated text
    //     text: (
    //         <>
    //             <h1
    //                 style={{
    //                     display: "block",
    //                     fontSize: "clamp(1.9rem, 3.8vw, 2.5rem)",
    //                     fontWeight: "800",
    //                     marginBottom: "0.4em",
    //                     textAlign: "center",
    //                 }}
    //             >
    //                 <span style={{ fontWeight: "300" }}>
    //                     Care with{" "}
    //                     <span style={{ color: "#06aeef", fontWeight: "800" }}>
    //                         Privacy
    //                     </span>{" "}
    //                     and Dignity
    //                 </span>
    //             </h1>
    //             <h3
    //                 style={{
    //                     display: "block",
    //                     fontSize: "clamp(1.4rem, 2.8vw, 2.2rem)",
    //                     fontWeight: "300",
    //                     lineHeight: "1.45",
    //                     textAlign: "center",
    //                 }}
    //             >
    //                 Enhanced Coverage, Optimal Privacy
    //             </h3>
    //         </>
    //     ),
    //     startTime: 48 + 22 / 30, // 00:00:48:22
    //     fadeInDuration: 0.5,
    //     visibleDuration: 9, // Same as the original id: 5
    //     fadeOutDuration: 0.5,
    //     isRightAligned: true,
    //     style: {
    //         fontFamily: "Manrope, Inter, sans-serif",
    //         fontWeight: "normal",
    //         color: "#FFFFFF",
    //         textShadow: "0px 2px 4px rgba(0, 0, 0, 0.4)",
    //         letterSpacing: "0.01em",
    //         maxWidth: "480px",
    //         transition: "opacity 0.5s ease-in-out",
    //     },
    // },
    {
        id: 7,
        text: (
            <h1 style={{ margin: 0 }}>
                Workforce Optimization
            </h1>
        ),
        startTime: 15 + 12 / 30,
        endTime: 26 + 5 / 30,
        style: {
            fontSize: "clamp(2.5rem, 6vw, 5rem)",
            transition: "opacity 0.3s ease-in-out",
        },
    },
    {
        id: 8,
        text: (
            <h1 style={{ margin: 0 }}>
                Realtime Alerts
            </h1>
        ),
        startTime: 45 + 15 / 30,
        endTime: 60 + 15 + 5 / 30,
        style: {
            fontSize: "clamp(2.5rem, 6vw, 5rem)",
            transition: "opacity 0.3s ease-in-out",
        },
    },
    {
        id: 9,
        text: (
            <h1 style={{ margin: 0 }}>
                AI Insights
            </h1>
        ),
        startTime: 60 + 45 + 18 / 30,
        endTime: 2 * 60 + 7 + 1 / 30,
        style: {
            fontSize: "clamp(2.5rem, 6vw, 5rem)",
            transition: "opacity 0.3s ease-in-out",
        },
    },
    {
        id: 10,
        text: (
            <h1 style={{ margin: 0 }}>
                Personalized Care
            </h1>
        ),
        startTime: 2 * 60 + 13 + 8 / 30,
        endTime: 2 * 60 + 50 + 19 / 30,
        style: {
            fontSize: "clamp(2.5rem, 6vw, 5rem)",
            transition: "opacity 0.3s ease-in-out",
        },
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
    const [timedTextsVisibility, setTimedTextsVisibility] = useState<{
        [key: number]: boolean;
    }>({});
    const targetY = useRef(typeof window !== "undefined" ? window.scrollY : 0);
    const currentY = useRef(typeof window !== "undefined" ? window.scrollY : 0);
    const rafId = useRef<number | null>(null);
    const isScrollingProgrammatically = useRef(false);

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

    const scene = scenes.find((s) => s.scene === index) || scenes[0];

    // Note: height calculation might move or change based on scroll implementation
    const scenesContainerHeight = `${MAX_SCENES * 100 + 100}vh`;

    const stackingTextConfigs = TIMED_TEXTS_CONFIG.filter((c) =>
        [1, 2, 3].includes(c.id)
    );
    const otherTextConfigs = TIMED_TEXTS_CONFIG.filter(
        (c) => ![1, 2, 3].includes(c.id)
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
                            sectionId={`section-${idx}`}
                            nextSectionId={`section-${idx + 1}`}
                        />
                    ))}
                    {/* Contact form section at the end of the page */}
                    <div id="contact-section" className="relative z-10" style={{height: "100vh"}}>
                        <ContactModal
                            isOpen={true}
                            asPageElement={true}
                        />
                    </div>
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
                            Optimize workstaff &nbsp;·&nbsp; Scale Faster
                            &nbsp;·&nbsp; Increase NOI
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
            {otherTextConfigs.map((config: TimedTextConfigItem) => {
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
                <SceneViewer
                    scene={scene}
                    index={index}
                    subScrollProgress={subScrollProgress}
                />
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
                            scrollToTimeValue={timecodeToSeconds(section.scrollToTimeValue!)}
                        />
                    );
                })}

            {/* Contact form section at the end of the page */}
            <div id="contact-section" className="relative z-10" style={{height: "100vh"}}>
                <ContactModal
                    isOpen={true}
                    asPageElement={true}
                />
            </div>
        </>
    );
}
