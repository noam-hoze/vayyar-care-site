import React, { useRef, useState, useEffect } from "react";
import { defaultConfig } from "@/config/videoConfig";
import { HomeSection, homeSections } from "@/data/homeSections";
import { useMobileHomeVideo } from "./MobileHomeVideoContext";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin"; // Import the ScrollToPlugin
import "@/styles/theater-mode.css";
import { timecodeToSeconds } from "@/lib/utils"; // Import the theater mode styles

// Register both ScrollTrigger and ScrollToPlugin
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

interface MobileHomeSectionProps {
    section: HomeSection;
    index?: number;
    sectionId?: string;
    nextSection?: HomeSection; // Changed from nextSectionId to nextSection
    nextSectionId?: string; // Keep for backward compatibility
}

const MobileHomeSection: React.FC<MobileHomeSectionProps> = ({
    section,
    index,
    sectionId,
    nextSection,
    nextSectionId,
}) => {
    const [isDesktop, setIsDesktop] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);
    const overlayRef = useRef<HTMLDivElement>(null);
    const [playing, setPlaying] = useState(false);
    const [progress, setProgress] = useState(0); // 0 to 1
    const [videoSrc, setVideoSrc] = useState(
        section.type === "video" ||
            section.type === "scrolly-video" ||
            section.type === "scrolly-video-fixed"
            ? defaultConfig.videoSrc.split("?")[0]
            : ""
    );
    const {
        manualOverrideIndex,
        requestPlay,
        clearManualOverride,
        theaterMode,
        setTheaterMode,
        activeVideoId,
    } = useMobileHomeVideo();
    const scrollTriggerRef = useRef<ScrollTrigger | null>(null);
    const isActiveVideo = activeVideoId === sectionId;
    const scrollyContainerRef = useRef(null);
    const scrollyOverlayRef = useRef(null);

    useEffect(() => {
        if (
            (section.type === "scrolly-video" ||
                section.type === "scrolly-video-fixed") &&
            scrollyContainerRef.current &&
            scrollyOverlayRef.current
        ) {
            const paragraphs = gsap.utils.toArray(
                ".scrolly-text p"
            ) as HTMLElement[];
            const overlay = scrollyOverlayRef.current;

            const firstParagraph = (
                scrollyContainerRef.current as HTMLElement
            )?.querySelector(".scrolly-text p:first-child");
            const textContainer = (
                scrollyContainerRef.current as HTMLElement
            )?.querySelector(".scrolly-text");

            if (section.type === "scrolly-video-fixed") {
                // NEW BEHAVIOR: Fixed text that appears immediately, then scrolls out

                // Set text to be immediately visible and fixed
                gsap.set(paragraphs, { opacity: 1, y: 0 });
                gsap.set(overlay, { opacity: 0 });

                // Text appears immediately when section enters viewport (Apple-style)
                const showTextTrigger = ScrollTrigger.create({
                    trigger: scrollyContainerRef.current,
                    start: "top bottom",
                    onEnter: () => {
                        gsap.to(overlay, { opacity: 0.8, duration: 0.3 });
                    },
                    onLeaveBack: () => {
                        gsap.to(overlay, { opacity: 0, duration: 0.3 });
                    },
                });

                // After user has seen the text, start scroll-out animation
                const scrollOutTrigger = ScrollTrigger.create({
                    trigger: scrollyContainerRef.current,
                    start: "top 20%", // Start scroll-out when section is well into view
                    end: "bottom 20%",
                    onEnter: () => {
                        gsap.to(overlay, { opacity: 0, duration: 0.5 });
                    },
                    onLeave: () => {
                        gsap.to(overlay, { opacity: 0, duration: 0.3 });
                    },
                    onEnterBack: () => {
                        gsap.to(overlay, { opacity: 0.8, duration: 0.3 });
                    },
                });

                return () => {
                    showTextTrigger?.kill();
                    scrollOutTrigger?.kill();
                };
            } else {
                // ORIGINAL BEHAVIOR: Regular scrolly-video

                // Set paragraphs to be immediately visible (no fade-in animation)
                gsap.set(paragraphs, { opacity: 1, y: 0 });
                gsap.set(overlay, { opacity: 0 });

                // Create overlay with subtle fade in/out
                const overlayTrigger = ScrollTrigger.create({
                    trigger: firstParagraph, // Target ONLY the first paragraph
                    start: "top 90%", // Text appears much sooner - when top hits 90% down viewport
                    onEnter: () => {
                        gsap.to(overlay, {
                            opacity: 0.8,
                            duration: 0.3,
                            ease: "power2.out",
                        }); // Quick fade in
                    },
                    onLeave: () => {
                        gsap.to(overlay, {
                            opacity: 0,
                            duration: 0.3,
                            ease: "power2.out",
                        }); // Quick fade out
                    },
                    onEnterBack: () => {
                        gsap.to(overlay, {
                            opacity: 0.8,
                            duration: 0.3,
                            ease: "power2.out",
                        }); // Quick fade in when scrolling back
                    },
                    onLeaveBack: () => {
                        gsap.to(overlay, {
                            opacity: 0,
                            duration: 0.3,
                            ease: "power2.out",
                        }); // Quick fade out when scrolling back up
                    },
                });

                return () => {
                    overlayTrigger?.kill();
                };
            }
        }
    }, [section.type]);

    useEffect(() => {
        const checkDesktop = () => {
            setIsDesktop(window.innerWidth >= 1024);
        };
        checkDesktop();
        window.addEventListener("resize", checkDesktop);
        return () => window.removeEventListener("resize", checkDesktop);
    }, []);

    // Only relevant for video sections
    const start =
        section.type === "video" ||
        section.type === "scrolly-video" ||
        section.type === "scrolly-video-fixed"
            ? timecodeToSeconds(section.video!.start)
            : 0;
    const end =
        section.type === "video" ||
        section.type === "scrolly-video" ||
        section.type === "scrolly-video-fixed"
            ? timecodeToSeconds(section.video!.end)
            : 0;

    // Initialize video and ScrollTrigger
    useEffect(() => {
        if (
            section.type !== "video" &&
            section.type !== "scrolly-video" &&
            section.type !== "scrolly-video-fixed"
        )
            return;
        const video = videoRef.current;
        if (!video) return;

        const initializeVideo = async () => {
            try {
                // Load the video
                await video.load();
                // Set initial time
                video.currentTime = start;
                // Pause the video
                video.pause();
            } catch (error) {
                console.error("Error initializing video:", error);
            }
        };

        initializeVideo();

        // Create ScrollTrigger
        scrollTriggerRef.current = ScrollTrigger.create({
            trigger: video,
            start: "top 80%",
            end: "bottom 20%",
            onEnter: () => {
                // Always restart from beginning when entering viewport
                video.currentTime = start;
                video.play();
                setPlaying(true);
            },
            onEnterBack: () => {
                // Always restart from beginning when entering viewport
                video.currentTime = start;
                video.play();
                setPlaying(true);
            },
            onLeave: () => {
                // Pause video when leaving viewport so it can restart fresh
                video.pause();
                setPlaying(false);
            },
            onLeaveBack: () => {
                // Pause video when leaving viewport so it can restart fresh
                video.pause();
                setPlaying(false);
            },
        });

        return () => {
            scrollTriggerRef.current?.kill();
        };
    }, [section.type, start, end]);

    // Restrict playback to [start, end] for video
    useEffect(() => {
        if (
            section.type !== "video" &&
            section.type !== "scrolly-video" &&
            section.type !== "scrolly-video-fixed"
        )
            return;
        const video = videoRef.current;
        if (!video) return;

        const onTimeUpdate = () => {
            if (video.currentTime < start) video.currentTime = start;
            if (video.currentTime > end) {
                video.currentTime = start; // Loop back to start instead of pausing
                // Keep playing, don't pause
            }
            setProgress((video.currentTime - start) / (end - start));
        };

        video.addEventListener("timeupdate", onTimeUpdate);
        return () => video.removeEventListener("timeupdate", onTimeUpdate);
    }, [start, end, section.type]);

    // Manual play/pause handler
    const togglePlay = () => {
        if (typeof index !== "number") return;
        const video = videoRef.current;
        if (!video) return;

        if (playing) {
            video.pause();
            setPlaying(false);
            if (manualOverrideIndex === index) {
                clearManualOverride();
            }
        } else {
            requestPlay(index, { manual: true });
            if (video.currentTime >= end - 0.01) {
                video.currentTime = start;
            }
            video.play();
            setPlaying(true);
        }
    };

    // Add body class for theater mode to hide all videos
    useEffect(() => {
        if (theaterMode) {
            document.body.classList.add("theater-mode-active");
        } else {
            document.body.classList.remove("theater-mode-active");
        }

        return () => {
            document.body.classList.remove("theater-mode-active");
        };
    }, [theaterMode]);

    // Animate theater mode overlay
    useEffect(() => {
        if (section.type !== "video" || !overlayRef.current) return;

        if (theaterMode) {
            gsap.to(overlayRef.current, {
                opacity: 0.9,
                duration: 0.5,
                display: "block",
                ease: "power2.inOut",
            });
        } else {
            gsap.to(overlayRef.current, {
                opacity: 0,
                duration: 0.5,
                ease: "power2.inOut",
                onComplete: () => {
                    if (overlayRef.current) {
                        overlayRef.current.style.display = "none";
                    }
                },
            });
        }
    }, [theaterMode, section.type]);

    // Handle scroll to next section and enable theater mode
    const handleLearnMore = () => {
        // Check if we have nextSection or need to fallback to nextSectionId
        if (nextSection || nextSectionId) {
            // Get the DOM element for the section
            const nextSectionElement = nextSectionId
                ? document.getElementById(nextSectionId)
                : null;
            if (nextSectionElement) {
                // Use nextSection directly if available, otherwise use the fallback
                const nextSectionData =
                    nextSection ||
                    (nextSectionId
                        ? homeSections[
                              parseInt(nextSectionId.split("-")[1], 10)
                          ]
                        : null);

                if (nextSectionData) {
                    // Get start time directly from the nextSection object
                    const nextSectionStartTime =
                        nextSectionData.type === "video"
                            ? timecodeToSeconds(nextSectionData.video!.start)
                            : 0;

                    // Find the video element in the next section and reset it to start
                    const videoElement =
                        nextSectionElement.querySelector("video");
                    if (videoElement) {
                        // Use the correct start time from the next section
                        videoElement.currentTime = nextSectionStartTime;
                        // Set playing state to ensure video starts playing
                        videoElement.play();
                    }

                    // Enable theater mode immediately so fade-in starts in parallel with scrolling
                    setTheaterMode(true, nextSectionId);

                    nextSectionElement.scrollIntoView({
                        behavior: "smooth",
                        block: "center",
                        inline: "center",
                    });
                }
            }
        }
    };

    if (
        section.type === "scrolly-video" ||
        section.type === "scrolly-video-fixed"
    ) {
        return (
            <div
                id={sectionId}
                ref={scrollyContainerRef}
                className="scrolly-container"
            >
                <div ref={scrollyOverlayRef} className="scrolly-overlay"></div>
                <div className="scrolly-video">
                    <video
                        ref={videoRef}
                        src={videoSrc || defaultConfig.videoSrc.split("?")[0]}
                        className="w-full h-full object-cover"
                        playsInline
                        muted
                        loop
                    />
                </div>
                <div className="scrolly-text">{section.content}</div>
            </div>
        );
    }

    if (section.type === "image") {
        return (
            <div
                id={sectionId}
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    padding: "60px 20px",
                    backgroundColor: "#ffffff",
                    minHeight: "50vh",
                    scrollMarginTop: "64px",
                }}
            >
                <img
                    src={section.imageSrc}
                    alt={section.title}
                    style={{
                        maxWidth: "100%",
                        maxHeight: "80vh",
                        objectFit: "contain",
                        borderRadius: "12px",
                        boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                    }}
                />
            </div>
        );
    }

    if (section.type === "text") {
        // Get all text sections to calculate proper zebra striping
        const textSections = homeSections.filter((s) => s.type === "text");
        // Find index of current section within text sections array
        const textSectionIndex = textSections.findIndex(
            (s) => s.id === section.id
        );
        // Determine background color based on text section index
        const sectionBgColor =
            textSectionIndex % 2 === 0 ? "#ffffff" : "#f5f5f7";

        if (isDesktop) {
            return (
                <div
                    id={sectionId}
                    className="flex justify-center items-center"
                    style={{
                        width: "100%",
                        zIndex: 10,
                        backgroundColor: sectionBgColor,
                        color: "#1d1d1f",
                        padding: "128px 0",
                        minHeight: "50vh",
                        scrollMarginTop: "64px",
                        fontFamily:
                            "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
                    }}
                >
                    <div
                        style={{
                            maxWidth: "980px",
                            margin: "0 auto",
                            padding: "0 22px",
                        }}
                    >
                        <div
                            style={{
                                display: "grid",
                                gridTemplateColumns: "repeat(5, 1fr)",
                                gap: "64px",
                                alignItems: "start",
                            }}
                        >
                            {/* Left Column: Title */}
                            <div style={{ gridColumn: "span 2 / span 2" }}>
                                <h2
                                    style={{
                                        fontSize: "28px",
                                        fontWeight: "700",
                                        lineHeight: 1.1,
                                        letterSpacing: "0em",
                                        margin: 0,
                                    }}
                                >
                                    {section.header}
                                </h2>
                            </div>
                            {/* Right Column: Content */}
                            <div
                                style={{
                                    gridColumn: "span 3 / span 3",
                                    marginTop: "4px",
                                }}
                            >
                                <div
                                    style={{
                                        fontSize: "18px",
                                        color: "#6e6e73",
                                        lineHeight: 1.47,
                                        fontWeight: 700,
                                    }}
                                >
                                    {section.content}
                                </div>
                                {section.buttonText && nextSectionId && (
                                    <div style={{ marginTop: "20px" }}>
                                        <button
                                            onClick={handleLearnMore}
                                            style={{
                                                marginTop: "20px",
                                                display: "inline-flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                gap: "10px", // Increased from 8px
                                                padding: "16px 32px", // Increased from 12px 24px
                                                fontSize: "19px", // Increased from 17px
                                                fontWeight: "600",
                                                color: "#fff",
                                                backgroundColor: "#f56300",
                                                borderRadius: "9999px",
                                                border: "none",
                                                cursor: "pointer",
                                                boxShadow:
                                                    "0 4px 12px rgba(245, 99, 0, 0.3)", // Added shadow for more prominence
                                                transition: "all 0.2s ease",
                                            }}
                                        >
                                            <svg
                                                style={{
                                                    width: "20px",
                                                    height: "20px",
                                                }}
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 20 20"
                                                fill="currentColor"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                            <span>
                                                Learn about {section.buttonText}
                                            </span>
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            );
        }

        return (
            <div
                id={sectionId}
                style={{
                    fontSize: 18,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    scrollMarginTop: "64px",
                    backgroundColor: sectionBgColor,
                }}
            >
                {section.title && (
                    <div
                        style={{
                            padding: "60px 24px 30px",
                            textAlign: "center",
                            borderBottom: "1px solid rgba(0,0,0,0.08)",
                        }}
                    >
                        <h3
                            style={{
                                fontSize: "2.2rem",
                                fontWeight: "bold",
                                color: "#171717",
                                marginBottom: "0",
                            }}
                        >
                            {section.title}
                        </h3>
                    </div>
                )}
                <div style={{ padding: "40px 24px 24px" }}>
                    {section.header && (
                        <h2
                            style={{
                                fontSize: "clamp(1.8rem, 5vw, 2.5rem)",
                                fontWeight: "bold",
                                marginBottom: "24px",
                                lineHeight: "1.2",
                            }}
                        >
                            {section.header}
                        </h2>
                    )}
                    <div style={{ lineHeight: "1.6" }}>{section.content}</div>

                    {/* Learn more about button */}
                    {section.buttonText && nextSectionId && (
                        <button
                            onClick={handleLearnMore}
                            style={{
                                marginTop: "24px",
                                backgroundColor: "#FF7A00", // Changed from #05aae9 to orange #FF7A00
                                color: "white",
                                border: "none",
                                borderRadius: "8px",
                                padding: "16px 28px", // Increased from 12px 20px
                                fontSize: "18px", // Increased from 16px
                                fontWeight: "bold",
                                cursor: "pointer",
                                alignSelf: "flex-start",
                                display: "flex",
                                alignItems: "center",
                                gap: "10px", // Increased from 8px
                                boxShadow: "0 4px 12px rgba(255, 122, 0, 0.3)", // Added shadow for more prominence
                                transition: "all 0.2s ease",
                            }}
                        >
                            Learn about {section.buttonText}
                            <span style={{ fontWeight: "bold" }}>&#8250;</span>
                        </button>
                    )}
                </div>
            </div>
        );
    }

    // Video section rendering
    const videoSections = homeSections.filter((s) => s.type === "video");
    const videoSectionIndex = videoSections.findIndex(
        (s) => s.id === section.id
    );
    const videoBgColor = videoSectionIndex % 2 === 0 ? "#ffffff" : "#f5f5f7";

    return (
        <div
            id={sectionId}
            className="relative"
            style={{
                scrollMarginTop: "64px",
                backgroundColor: videoBgColor,
            }}
        >
            {/* Theater mode overlay is now a global component, removed from individual sections */}

            <div className="relative">
                <video
                    ref={videoRef}
                    src={videoSrc}
                    className={`w-full rounded-xl bg-black ${
                        isActiveVideo && theaterMode
                            ? "theater-mode-current-video"
                            : ""
                    }`}
                    controls={false}
                    playsInline
                    muted
                    preload="auto"
                    data-section-video="true"
                />

                {/* Dark overlay to make buttons more prominent */}
                <div
                    className="absolute inset-0 rounded-xl pointer-events-none"
                    style={{
                        background:
                            "linear-gradient(135deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.1) 100%)",
                        zIndex: 1,
                    }}
                />

                {/* Exit theater mode button - only show for active video */}
                {isActiveVideo && theaterMode && (
                    <button
                        onClick={() => setTheaterMode(false)}
                        className="theater-mode-controls absolute top-3 left-3 flex items-center justify-center w-8 h-8 rounded-full bg-black/50 text-white cursor-pointer"
                        aria-label="Exit theater mode"
                    >
                        ✕
                    </button>
                )}

                {/* Play/Pause button with circular progress */}
                <div className="theater-mode-controls absolute top-3 right-3 w-12 h-12 flex items-center justify-center">
                    <svg
                        width={48}
                        height={48}
                        className="absolute top-0 left-0 -rotate-90"
                    >
                        <circle
                            cx={24}
                            cy={24}
                            r={20}
                            stroke="rgba(255,255,255,0.25)"
                            strokeWidth={4}
                            fill="none"
                        />
                        <circle
                            cx={24}
                            cy={24}
                            r={20}
                            stroke="#fff"
                            strokeWidth={4}
                            fill="none"
                            strokeDasharray={2 * Math.PI * 20}
                            strokeDashoffset={
                                2 *
                                Math.PI *
                                20 *
                                (1 - Math.max(0, Math.min(1, progress)))
                            }
                            style={{
                                transition: "stroke-dashoffset 0.2s linear",
                            }}
                            strokeLinecap="round"
                        />
                    </svg>
                    <button
                        onClick={togglePlay}
                        className="relative bg-transparent border-0 rounded-full w-10 h-10 text-white text-xl flex items-center justify-center cursor-pointer z-10"
                        aria-label={playing ? "Pause video" : "Play video"}
                    >
                        {playing ? (
                            <span className="font-bold">&#10073;&#10073;</span> // Pause icon
                        ) : (
                            <span className="font-bold">&#9654;</span> // Play icon
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MobileHomeSection;
