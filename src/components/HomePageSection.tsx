import React, { useRef, useState, useEffect } from "react";
import { defaultConfig } from "@/config/videoConfig";
import { HomeSection, homeSections } from "@/data/homeSections";
import { useMobileHomeVideo } from "./mobile/MobileHomeVideoContext";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin"; // Import the ScrollToPlugin
import "@/styles/theater-mode.css";
import { timecodeToSeconds } from "@/lib/utils"; // Import the theater mode styles
import styles from "./HomePageSection.module.css";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

interface HomePageSectionProps {
    section: HomeSection;
    index?: number;
    sectionId?: string;
    nextSection?: HomeSection; // Changed from nextSectionId to nextSection
    nextSectionId?: string; // Keep for backward compatibility
}

const HomePageSection: React.FC<HomePageSectionProps> = ({
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
    const [hasSeenVideo, setHasSeenVideo] = useState(false);
    const [showImage, setShowImage] = useState(false);
    const [videoSrc, setVideoSrc] = useState(
        section.type === "video" ||
            section.type === "scrolly-video" ||
            section.type === "scrolly-video-fixed" ||
            section.type === "scroll-scrub-video"
            ? section.videoSrc || defaultConfig.videoSrc.split("?")[0]
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
    const hasSwappedSrc = useRef(false);

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
                        gsap.to(overlay, { opacity: 0.5, duration: 0.3 });
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
                        gsap.to(overlay, { opacity: 0.5, duration: 0.3 });
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
                            opacity: 0.5,
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
                            opacity: 0.5,
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
            ? section.video
                ? timecodeToSeconds(section.video.start)
                : 0
            : 0;
    const end =
        section.type === "video" ||
        section.type === "scrolly-video" ||
        section.type === "scrolly-video-fixed"
            ? section.video
                ? timecodeToSeconds(section.video.end)
                : 0
            : 0;

    // Initialize video and ScrollTrigger
    useEffect(() => {
        if (
            section.type !== "video" &&
            section.type !== "scrolly-video" &&
            section.type !== "scrolly-video-fixed" &&
            section.type !== "scroll-scrub-video"
        )
            return;
        const video = videoRef.current;
        if (!video) return;

        const initializeVideo = async () => {
            try {
                // Load the video
                await video.load();
                // Set initial time only if timing is specified
                if (end > 0) {
                    video.currentTime = start;
                } else if (section.type === "scroll-scrub-video") {
                    video.currentTime = 2.6; // Start from 2.6 seconds for scroll-scrub-video
                } else {
                    video.currentTime = 0; // Start from beginning for other videos
                }
                // Pause the video
                video.pause();
            } catch (error) {
                console.error("Error initializing video:", error);
            }
        };

        initializeVideo();

        // Handle scroll-scrub-video differently
        if (section.type === "scroll-scrub-video") {
            const videoContainer = video.parentElement;
            if (videoContainer) {
                // Calculate pin distance based on video duration (e.g., 1 second of video = 1 viewport height of scroll)
                const videoDurationMultiplier = video.duration || 9; // Default to 9 seconds for our product video
                const pinDistance = Math.max(
                    videoDurationMultiplier * 100,
                    window.innerHeight
                ); // At least 1 viewport height

                scrollTriggerRef.current = ScrollTrigger.create({
                    trigger: videoContainer,
                    start: "top top", // When video reaches top of viewport
                    end: `+=${pinDistance}`, // Pin distance based on video duration
                    pin: videoContainer, // Pin the video container
                    scrub: 1, // Smooth scrubbing
                    onUpdate: (self) => {
                        if (video.duration) {
                            // Start from 2 seconds and map scroll progress through the remaining duration
                            const startTime = 2.6; // Start from 2.6 seconds
                            const availableDuration =
                                video.duration - startTime;
                            const targetTime =
                                startTime + self.progress * availableDuration;
                            video.currentTime = targetTime;
                        }
                    },
                });
            }
        } else {
            // Original behavior for other video types
            scrollTriggerRef.current = ScrollTrigger.create({
                trigger: video,
                start: "top 80%",
                end:
                    section.type === "scrolly-video"
                        ? "bottom -20%"
                        : "bottom 20%",
                onEnter: () => {
                    // Restart from beginning when entering from top (scrolling down)
                    video.currentTime = end > 0 ? start : 0;
                    video.play();
                    setPlaying(true);
                },
                onEnterBack: () => {
                    // Just play from current position when entering from bottom (scrolling up)
                    video.play();
                    setPlaying(true);
                },
                onLeave: () => {
                    // Only pause regular video sections, let scrolly-video continue looping
                    if (section.type === "video") {
                        video.pause();
                        setPlaying(false);
                    }
                },
                onLeaveBack: () => {
                    // Only pause regular video sections, let scrolly-video continue looping
                    if (section.type === "video") {
                        video.pause();
                        setPlaying(false);
                    }
                },
            });
        }

        return () => {
            scrollTriggerRef.current?.kill();
        };
    }, [section.type, start, end]);

    // Swap video source when scrub reaches 90% (keep video, no image)
    useEffect(() => {
        if (section.type === "scroll-scrub-video") {
            const video = videoRef.current;
            if (!video) return;

            const handleTimeUpdate = () => {
                if (!video.duration) return;
                const progressRatio = video.currentTime / video.duration;
                if (progressRatio >= 0.9 && !hasSwappedSrc.current) {
                    hasSwappedSrc.current = true;
                    setVideoSrc("/videos/just-product.mp4");
                }
            };

            video.addEventListener("timeupdate", handleTimeUpdate);
            return () =>
                video.removeEventListener("timeupdate", handleTimeUpdate);
        }
    }, [section.id, section.type]);

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
            // Only apply timing restrictions if both start and end are specified
            if (end > 0) {
                if (video.currentTime < start) video.currentTime = start;
                if (video.currentTime > end) {
                    video.currentTime = start; // Loop back to start instead of pausing
                    // Keep playing, don't pause
                }
                setProgress((video.currentTime - start) / (end - start));
            } else {
                // For videos without timing restrictions, show natural progress
                setProgress(video.currentTime / (video.duration || 1));
            }
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
            if (end > 0 && video.currentTime >= end - 0.01) {
                video.currentTime = start;
            } else if (
                end === 0 &&
                video.currentTime >= (video.duration || 0) - 0.01
            ) {
                video.currentTime = 0; // Restart from beginning for videos without timing
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
                opacity: 0.7,
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
                        src={
                            videoSrc ||
                            section.videoSrc ||
                            defaultConfig.videoSrc.split("?")[0]
                        }
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

    if (section.type === "scroll-scrub-video") {
        return (
            <div id={sectionId} className={`${styles.scrubSection}`}>
                <video
                    ref={videoRef}
                    src={videoSrc || section.videoSrc}
                    className={styles.scrubVideo}
                    playsInline
                    muted
                    preload="auto"
                />
            </div>
        );
    }

    if (section.type === "image") {
        return (
            <div id={sectionId} className={styles.imageSection}>
                <img
                    src={section.imageSrc}
                    alt={section.title}
                    className={styles.fullBleedImage}
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
        const isLightTextBg = textSectionIndex % 2 === 0;

        if (isDesktop) {
            return (
                <div
                    id={sectionId}
                    className={`flex justify-center items-center ${
                        styles.textSectionDesktop
                    } ${isLightTextBg ? styles.bgLight : styles.bgGray}`}
                >
                    <div className={styles.textContainerDesktop}>
                        <div className={styles.textGridDesktop}>
                            {/* Left Column: Title */}
                            <div className={styles.textLeft}>
                                <h2 className={styles.desktopTitle}>
                                    {section.header}
                                </h2>
                            </div>
                            {/* Right Column: Content */}
                            <div className={styles.textRight}>
                                <div className={styles.textContentDesktop}>
                                    {section.content}
                                </div>
                                {section.buttonText && nextSectionId && (
                                    <div
                                        className={
                                            styles.learnMoreWrapperDesktop
                                        }
                                    >
                                        <button
                                            onClick={handleLearnMore}
                                            className={
                                                styles.learnMoreButtonDesktop
                                            }
                                        >
                                            <svg
                                                className={
                                                    styles.learnMoreIconDesktop
                                                }
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

        // Mobile only
        return (
            <div
                id={sectionId}
                className={`${styles.textSectionMobile} ${
                    isLightTextBg ? styles.bgLight : styles.bgGray
                }`}
            >
                {section.title && (
                    <div className={styles.mobileTitleContainer}>
                        <h3 className={styles.mobileTitle}>{section.title}</h3>
                    </div>
                )}
                <div className={styles.mobileContentContainer}>
                    {section.header && (
                        <h2 className={styles.mobileHeader}>
                            {section.header}
                        </h2>
                    )}
                    <div className={styles.mobileBody}>{section.content}</div>

                    {/* Learn more about button */}
                    {section.buttonText && nextSectionId && (
                        <button
                            onClick={handleLearnMore}
                            className={styles.learnMoreButtonMobile}
                        >
                            Learn about {section.buttonText}
                            <span className={styles.mobileArrow}>&#8250;</span>
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
    const isLightVideoBg = videoSectionIndex % 2 === 0;

    return (
        <div
            id={sectionId}
            className={`${styles.videoSection} ${
                isLightVideoBg ? styles.bgLight : styles.bgGray
            } relative`}
        >
            {/* Theater mode overlay is now a global component, removed from individual sections */}

            <div className="relative">
                {/* Conditional rendering: show image if it's the product video and user has scrolled away */}
                {showImage ? (
                    <img
                        src="/images/product.png"
                        alt="Product overview"
                        className={`w-full rounded-xl bg-black ${
                            isActiveVideo && theaterMode
                                ? "theater-mode-current-video"
                                : ""
                        } ${styles.productImage}`}
                    />
                ) : (
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
                )}

                {/* Dark overlay to make buttons more prominent */}
                <div className={styles.videoDarkOverlay} />

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
                            className={styles.progressCircle}
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

export default HomePageSection;
