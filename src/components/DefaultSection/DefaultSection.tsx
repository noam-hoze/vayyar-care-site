import React, { useRef, useState, useEffect } from "react";
import { defaultConfig } from "@/config/videoConfig";
import { HomeSection, homeSections } from "@/data/homeSections";
import { useMobileHomeVideo } from "../mobile/MobileHomeVideoContext";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin"; // Import the ScrollToPlugin
import "@/styles/theater-mode.css";
import { timecodeToSeconds } from "@/lib/utils"; // Import the theater mode styles
import styles from "./DefaultSection.module.css";
import DefaultSectionIntroText from "../DefaultSection/DefaultSectionIntroText";
import DefaultSectionVideo from "../DefaultSection/DefaultSectionVideo";
import DefaultSectionDetails from "../DefaultSection/DefaultSectionDetails";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

interface HomePageSectionProps {
    section: HomeSection;
    index?: number;
    sectionId?: string;
    nextSection?: HomeSection; // Changed from nextSectionId to nextSection
    nextSectionId?: string; // Keep for backward compatibility
}

const DefaultSection: React.FC<HomePageSectionProps> = ({
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
            // Desktop: render IntroText (Part 1) block for this "text" section
            return (
                <DefaultSectionIntroText
                    sectionId={sectionId}
                    header={section.header}
                    content={section.content}
                    learnMoreEnabled={Boolean(
                        section.buttonText && nextSectionId
                    )}
                    learnMoreLabel={
                        section.buttonText
                            ? `Learn about ${section.buttonText}`
                            : undefined
                    }
                    onLearnMore={handleLearnMore}
                    isLightBg={isLightTextBg}
                />
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

    // Video section rendering (Part 2)
    const videoSections = homeSections.filter((s) => s.type === "video");
    const videoSectionIndex = videoSections.findIndex(
        (s) => s.id === section.id
    );
    const isLightVideoBg = videoSectionIndex % 2 === 0;

    const videoNode = (
        <DefaultSectionVideo
            sectionId={sectionId}
            videoRef={videoRef}
            videoSrc={videoSrc}
            isActiveVideo={isActiveVideo}
            theaterMode={theaterMode}
            progress={progress}
            playing={playing}
            onTogglePlay={togglePlay}
            showImage={showImage}
            productImageSrc="/images/product.png"
            isExitVisible={isActiveVideo && theaterMode}
            onExitTheater={() => setTheaterMode(false)}
        />
    );

    // Desktop now also renders Part 3 (details) immediately after the video
    if (isDesktop && section.type === "video") {
        const videoSections = homeSections.filter((s) => s.type === "video");
        const videoSectionIndex = videoSections.findIndex(
            (s) => s.id === section.id
        );
        const isLightVideoBg = videoSectionIndex % 2 === 0;
        return (
            <>
                {videoNode}
                <DefaultSectionDetails
                    sectionId={`${sectionId}-details`}
                    header={section.title}
                    content={section.content}
                    isLightBg={isLightVideoBg}
                />
            </>
        );
    }

    return videoNode;
};

export default DefaultSection;
