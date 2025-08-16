import React, { useRef, useState, useEffect, useLayoutEffect } from "react";
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
import MobileNarrowText from "../mobile/MobileNarrowText";
import "../mobile/mobile-styles.css";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

interface DefaultSectionProps {
    entry: HomeSection;
    index?: number;
    sectionId?: string;
    nextSection?: HomeSection; // Changed from nextSectionId to nextSection
    nextSectionId?: string; // Keep for backward compatibility
}

const DefaultSection: React.FC<DefaultSectionProps> = ({
    entry,
    index,
    sectionId,
    nextSection,
    nextSectionId,
}) => {
    const [isDesktop, setIsDesktop] = useState(
        typeof window !== "undefined" ? window.innerWidth >= 1024 : true
    );
    const videoRef = useRef<HTMLVideoElement>(null);
    const overlayRef = useRef<HTMLDivElement>(null);
    const [playing, setPlaying] = useState(false);
    const [progress, setProgress] = useState(0); // 0 to 1
    const [hasSeenVideo, setHasSeenVideo] = useState(false);
    const [showImage, setShowImage] = useState(false);
    const [videoSrc, setVideoSrc] = useState(
        entry.type === "video" ||
            entry.type === "scrolly-video" ||
            entry.type === "scrolly-video-fixed" ||
            entry.type === "scroll-scrub-video"
            ? entry.videoSrc || defaultConfig.videoSrc.split("?")[0]
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

    // Use mobile-aware media type to avoid scrolly behavior on mobile per blueprint
    const effectiveType = isDesktop
        ? entry.type
        : entry.mobileMediaType || entry.type;

    useEffect(() => {
        if (
            (effectiveType === "scrolly-video" ||
                effectiveType === "scrolly-video-fixed") &&
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

            if (effectiveType === "scrolly-video-fixed") {
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
    }, [effectiveType]);

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
        effectiveType === "video" ||
        effectiveType === "scrolly-video" ||
        effectiveType === "scrolly-video-fixed"
            ? entry.video
                ? timecodeToSeconds(entry.video.start)
                : 0
            : 0;
    const end =
        effectiveType === "video" ||
        effectiveType === "scrolly-video" ||
        effectiveType === "scrolly-video-fixed"
            ? entry.video
                ? timecodeToSeconds(entry.video.end)
                : 0
            : 0;

    // Initialize video and ScrollTrigger
    useEffect(() => {
        if (
            effectiveType !== "video" &&
            effectiveType !== "scrolly-video" &&
            effectiveType !== "scrolly-video-fixed" &&
            effectiveType !== "scroll-scrub-video"
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
                } else if (effectiveType === "scroll-scrub-video") {
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
        if (effectiveType === "scroll-scrub-video") {
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
                    effectiveType === "scrolly-video"
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
                    if (effectiveType === "video") {
                        video.pause();
                        setPlaying(false);
                    }
                },
                onLeaveBack: () => {
                    // Only pause regular video sections, let scrolly-video continue looping
                    if (effectiveType === "video") {
                        video.pause();
                        setPlaying(false);
                    }
                },
            });
        }

        return () => {
            scrollTriggerRef.current?.kill();
        };
    }, [effectiveType, start, end]);

    // Swap video source when scrub reaches 90% (keep video, no image)
    useEffect(() => {
        if (effectiveType === "scroll-scrub-video") {
            const video = videoRef.current;
            if (!video) return;

            const handleTimeUpdate = () => {
                if (isDesktop) {
                    if (!video.duration) return;
                    const progressRatio = video.currentTime / video.duration;
                    if (progressRatio >= 0.9 && !hasSwappedSrc.current) {
                        hasSwappedSrc.current = true;
                        setVideoSrc("/videos/just-product.mp4");
                    }
                }
            };

            video.addEventListener("timeupdate", handleTimeUpdate);
            return () =>
                video.removeEventListener("timeupdate", handleTimeUpdate);
        }
    }, [entry.id, effectiveType, isDesktop]);

    // Restrict playback to [start, end] for video
    useEffect(() => {
        if (
            effectiveType !== "video" &&
            effectiveType !== "scrolly-video" &&
            effectiveType !== "scrolly-video-fixed"
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
    }, [start, end, effectiveType]);

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
        if (effectiveType !== "video" || !overlayRef.current) return;

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
    }, [theaterMode, effectiveType]);

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

    // Special mobile rendering for Efficiency section (ID 1.6)
    if (entry.id === 1.6 && !isDesktop) {
        const pairedText = homeSections.find((s) => s.id === 1);
        return (
            <div id={sectionId} className="mobile-apple-component">
                <DefaultSectionIntroText
                    variant="mobile"
                    smallTitle={"Efficiency"}
                    header={"Optimize your staff work and reduce their burden"}
                    isLightBg={true}
                />
                <DefaultSectionVideo
                    variant="mobile"
                    sectionId={sectionId}
                    videoRef={videoRef}
                    videoSrc={entry.videoSrc || "/videos/optimize-staff.mp4"}
                    isActiveVideo={isActiveVideo}
                    theaterMode={theaterMode}
                    progress={progress}
                    playing={playing}
                    onTogglePlay={togglePlay}
                />
                <DefaultSectionDetails
                    variant="mobile"
                    mobileTitle={"Do more with less."}
                    content={
                        <>
                            <p>
                                Use predictive insights to address potential
                                patient complications
                            </p>
                            <p>Reduce Administrative tasks</p>
                            <p>Improved Operational Efficiencies</p>
                        </>
                    }
                    isLightBg={true}
                    learnMoreEnabled={Boolean(
                        pairedText?.buttonText && nextSectionId
                    )}
                    learnMoreLabel={
                        pairedText?.buttonText
                            ? `+ Learn more about ${pairedText.buttonText}`
                            : "+ Learn more"
                    }
                    onLearnMore={handleLearnMore}
                />
            </div>
        );
    }

    // Special mobile rendering for Real-time Alerts section (ID 2)
    if (entry.id === 2 && !isDesktop) {
        return (
            <div id={sectionId} className="mobile-apple-component white-bg">
                {/* Part 1: Text above video */}
                <div className="mobile-apple-part1">
                    <div className="mobile-apple-small-title">
                        Real-time Alerts
                    </div>
                    <h2 className="mobile-apple-subtitle">
                        Alert your staff as things happen
                    </h2>
                </div>

                {/* Part 2: Video */}
                <div className="mobile-apple-video-container">
                    <div className="mobile-apple-video">
                        <video
                            ref={videoRef}
                            src={
                                entry.videoSrc || "/videos/real-time-alerts.mp4"
                            }
                            playsInline
                            muted
                            autoPlay
                            loop
                            controls={false}
                        />
                    </div>
                </div>

                {/* Part 3: Content section */}
                <div className="mobile-apple-part3">
                    <h3 className="mobile-apple-title">Real-time Alerts</h3>
                    <div className="mobile-apple-content">
                        <p>
                            Receive immediate alerts when a resident experiences
                            a fall, ensuring faster assistance and peace of
                            mind.
                        </p>
                        <p>
                            Stay informed about unusual movement patterns that
                            could signal health or safety concerns.
                        </p>
                        <p>
                            Enhance resident safety and staff efficiency with
                            real-time notifications tailored for elderly care.
                        </p>
                    </div>
                    {defaultConfig.showLearnMoreButtons && (
                        <button className="mobile-apple-button">
                            + Learn more about Real-time Alerts
                        </button>
                    )}
                </div>
            </div>
        );
    }

    // Special mobile rendering for Privacy section (ID 3.2)
    if (entry.id === 3.2 && !isDesktop) {
        return (
            <div id={sectionId} className="mobile-apple-component">
                {/* Part 1: Text above video */}
                <div className="mobile-apple-part1">
                    <div className="mobile-apple-small-title">Privacy</div>
                    <h2 className="mobile-apple-subtitle">
                        Monitoring every movement without compromising privacy
                    </h2>
                </div>

                {/* Part 2: Video */}
                <div className="mobile-apple-video-container">
                    <div className="mobile-apple-video">
                        <video
                            ref={videoRef}
                            src={entry.videoSrc || "/videos/privacy.mp4"}
                            playsInline
                            muted
                            autoPlay
                            loop
                            controls={false}
                        />
                    </div>
                </div>

                {/* Part 3: Content section */}
                <div className="mobile-apple-part3">
                    <h3 className="mobile-apple-title">
                        No cameras. No wearables. Privacy.
                    </h3>
                    <div className="mobile-apple-content">
                        <p>Empower the care team with automated alerts.</p>
                        <p>
                            Monitor residents' well-being without invasive
                            cameras or uncomfortable wearables.
                        </p>
                        <p>
                            Respect privacy while ensuring comprehensive care
                            monitoring.
                        </p>
                    </div>
                    {defaultConfig.showLearnMoreButtons && (
                        <button className="mobile-apple-button">
                            + Learn more about how we protect privacy
                        </button>
                    )}
                </div>
            </div>
        );
    }

    // Special mobile rendering for AI Insights section (ID 4)
    if (entry.id === 4 && !isDesktop) {
        return (
            <div id={sectionId} className="mobile-apple-component white-bg">
                {/* Part 1: Text above video */}
                <div className="mobile-apple-part1">
                    <div className="mobile-apple-small-title">
                        AI Revolution
                    </div>
                    <h2 className="mobile-apple-subtitle">
                        Stay ahead with cutting-edge AI insights from our
                        sensors and an array of smart data
                    </h2>
                </div>

                {/* Part 2: Video */}
                <div className="mobile-apple-video-container">
                    <div className="mobile-apple-video">
                        <video
                            ref={videoRef}
                            src={entry.videoSrc || "/videos/ai-insights.mp4"}
                            playsInline
                            muted
                            autoPlay
                            loop
                            controls={false}
                        />
                    </div>
                </div>

                {/* Part 3: Content section */}
                <div className="mobile-apple-part3">
                    <h3 className="mobile-apple-title">
                        Actionable insights. Smarter staffing. Safer residents.
                    </h3>
                    <div className="mobile-apple-content">
                        <p>Analyze trends to detect risk.</p>
                        <p>Enhancing staff efficiency</p>
                        <p>Ensure Care Plan Compliance</p>
                    </div>
                    {defaultConfig.showLearnMoreButtons && (
                        <button className="mobile-apple-button">
                            + Learn more about AI insights
                        </button>
                    )}
                </div>
            </div>
        );
    }

    // Special mobile rendering for Personalized Care section (ID 6)
    if (entry.id === 6 && !isDesktop) {
        return (
            <div id={sectionId} className="mobile-apple-component">
                {/* Part 1: Text above video */}
                <div className="mobile-apple-part1">
                    <div className="mobile-apple-small-title">
                        Personalize care
                    </div>
                    <h2 className="mobile-apple-subtitle">
                        Experience the power of immediate, accurate insights for
                        truly personalized care.
                    </h2>
                </div>

                {/* Part 2: Video */}
                <div className="mobile-apple-video-container">
                    <div className="mobile-apple-video">
                        <video
                            ref={videoRef}
                            src={
                                entry.videoSrc || "/videos/personalize-care.mp4"
                            }
                            playsInline
                            muted
                            autoPlay
                            loop
                            controls={false}
                        />
                    </div>
                </div>

                {/* Part 3: Content section */}
                <div className="mobile-apple-part3">
                    <h3 className="mobile-apple-title">
                        The right strategy. At the right return.
                    </h3>
                    <div className="mobile-apple-content">
                        <p>
                            Uncover hidden efficiencies that reduce unnecessary
                            labor hours and care mismatches.
                        </p>
                        <p>
                            Align care levels with reimbursement potential to
                            support justified rate increases.
                        </p>
                        <p>
                            Optimize NOI by transforming real-time insights into
                            smarter operational decisions.
                        </p>
                    </div>
                    {defaultConfig.showLearnMoreButtons && (
                        <button className="mobile-apple-button">
                            + Learn more about Personalized Care
                        </button>
                    )}
                </div>
            </div>
        );
    }

    // Special mobile rendering for Increase NOI section (ID 8)
    if (entry.id === 8 && !isDesktop) {
        return (
            <div id={sectionId} className="mobile-apple-component white-bg">
                {/* Part 1: Text above video */}
                <div className="mobile-apple-part1">
                    <div className="mobile-apple-small-title">Improve NOI</div>
                    <h2 className="mobile-apple-subtitle">
                        Boost your NOI and maximize returns through trusted,
                        data-driven care plans.
                    </h2>
                </div>

                {/* Part 2: Video */}
                <div className="mobile-apple-video-container">
                    <div className="mobile-apple-video">
                        <video
                            ref={videoRef}
                            src={entry.videoSrc || "/videos/increase-noi.mp4"}
                            playsInline
                            muted
                            autoPlay
                            loop
                            controls={false}
                        />
                    </div>
                </div>

                {/* Part 3: Content section */}
                <div className="mobile-apple-part3">
                    <h3 className="mobile-apple-title">Built to scale.</h3>
                    <div className="mobile-apple-content">
                        <p>
                            Turn insights into enterprise-wide transformation.
                        </p>
                        <p>
                            Maximize returns through data-driven care
                            optimization.
                        </p>
                        <p>
                            Scale efficient operations across your entire
                            facility network.
                        </p>
                    </div>
                    {defaultConfig.showLearnMoreButtons && (
                        <button className="mobile-apple-button">
                            + Learn more about increase NOI
                        </button>
                    )}
                </div>
            </div>
        );
    }

    if (
        effectiveType === "scrolly-video" ||
        effectiveType === "scrolly-video-fixed"
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
                            entry.videoSrc ||
                            defaultConfig.videoSrc.split("?")[0]
                        }
                        className="w-full h-full object-cover"
                        playsInline
                        muted
                        loop
                    />
                </div>
                <div className="scrolly-text">{entry.content}</div>
            </div>
        );
    }

    // Generic mobile layout for scrolly-video: text then plain 16:9 video
    if (
        !isDesktop &&
        (entry.type === "scrolly-video" ||
            entry.type === "scrolly-video-fixed") &&
        effectiveType === "video"
    ) {
        // Part 1: Text section (narrow or default)
        const textSection = (
            <div key={`${sectionId}-text`}>
                {entry.mobileVariant === "narrow-text" ? (
                    <MobileNarrowText section={entry} />
                ) : (
                    <div className="mobile-hero-section">
                        <div className="mobile-hero-content">
                            {entry.content}
                        </div>
                    </div>
                )}
            </div>
        );

        // Part 2: Plain 16:9 video
        const videoSection = (
            <div
                key={`${sectionId}-video`}
                className="mobile-apple-video-container"
            >
                <div className="mobile-apple-video">
                    <video
                        ref={videoRef}
                        src={
                            videoSrc ||
                            entry.videoSrc ||
                            defaultConfig.videoSrc.split("?")[0]
                        }
                        className="w-full h-full object-cover"
                        playsInline
                        muted
                        autoPlay
                        loop
                    />
                </div>
            </div>
        );

        return (
            <div id={sectionId}>
                {textSection}
                {videoSection}
            </div>
        );
    }

    if (effectiveType === "scroll-scrub-video") {
        return (
            <div id={sectionId} className={`${styles.scrubSection}`}>
                <video
                    ref={videoRef}
                    src={videoSrc || entry.videoSrc}
                    className={styles.scrubVideo}
                    playsInline
                    muted
                    preload="auto"
                />
            </div>
        );
    }

    if (entry.type === "image") {
        return (
            <div id={sectionId} className={styles.imageSection}>
                <img
                    src={entry.imageSrc}
                    alt={entry.title}
                    className={styles.fullBleedImage}
                />
            </div>
        );
    }

    if (entry.type === "text") {
        // Temporary deduplication: hide standalone text parts on mobile until data is consolidated
        const hideTextOnMobile =
            !isDesktop &&
            (entry.id === 1 ||
                entry.id === 3 ||
                entry.id === 3.5 ||
                entry.id === 5 ||
                entry.id === 7 ||
                entry.id === 9);
        if (hideTextOnMobile) return null;
        // Get all text sections to calculate proper zebra striping
        const textSections = homeSections.filter((s) => s.type === "text");
        // Find index of current section within text sections array
        const textSectionIndex = textSections.findIndex(
            (s) => s.id === entry.id
        );
        // Determine background color based on text section index
        const isLightTextBg = textSectionIndex % 2 === 0;

        if (isDesktop) {
            // Desktop: render IntroText (Part 1) block for this "text" section
            return (
                <DefaultSectionIntroText
                    sectionId={sectionId}
                    header={entry.header}
                    content={entry.content}
                    learnMoreEnabled={Boolean(
                        entry.buttonText && nextSectionId
                    )}
                    learnMoreLabel={
                        entry.buttonText
                            ? `Learn about ${entry.buttonText}`
                            : undefined
                    }
                    onLearnMore={handleLearnMore}
                    isLightBg={isLightTextBg}
                />
            );
        }

        // Mobile only - Check for narrow text variant
        if (entry.mobileVariant === "narrow-text") {
            return <MobileNarrowText section={entry} />;
        }

        // Default mobile text rendering
        return (
            <div
                id={sectionId}
                className={`${styles.textSectionMobile} ${
                    isLightTextBg ? styles.bgLight : styles.bgGray
                }`}
            >
                {entry.title && (
                    <div className={styles.mobileTitleContainer}>
                        <h3 className={styles.mobileTitle}>{entry.title}</h3>
                    </div>
                )}
                <div className={styles.mobileContentContainer}>
                    {entry.header && (
                        <h2 className={styles.mobileHeader}>{entry.header}</h2>
                    )}
                    <div className={styles.mobileBody}>{entry.content}</div>

                    {/* Learn more about button */}
                    {defaultConfig.showLearnMoreButtons &&
                        entry.buttonText &&
                        nextSectionId && (
                            <button
                                onClick={handleLearnMore}
                                className={styles.learnMoreButtonMobile}
                            >
                                Learn about {entry.buttonText}
                                <span className={styles.mobileArrow}>
                                    &#8250;
                                </span>
                            </button>
                        )}
                </div>
            </div>
        );
    }

    // Video section rendering (Part 2)
    const videoSections = homeSections.filter((s) => s.type === "video");
    const videoSectionIndex = videoSections.findIndex((s) => s.id === entry.id);
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
    if (isDesktop && effectiveType === "video") {
        const detailsSource = entry.detailsSectionId
            ? homeSections.find((s) => s.id === entry.detailsSectionId)
            : undefined;
        const detailsHeader = detailsSource?.title || entry.title;
        const detailsContent = detailsSource?.content || entry.content;
        return (
            <>
                {videoNode}
                <DefaultSectionDetails
                    sectionId={`${sectionId}-details`}
                    header={detailsHeader}
                    content={detailsContent}
                    isLightBg={isLightVideoBg}
                />
            </>
        );
    }

    return videoNode;
};

export default DefaultSection;
