import React, { useState, useEffect, useRef } from "react";
import { scrollToSection } from "@/lib/scrollUtils";
import { useIOSVideoAutoplay } from "@/lib/useIOSVideoAutoplay";

const VAYYAR_BLUE = "#06aeef";
const ORANGE = "#f56300";

const HomePageHeroSection: React.FC = () => {
    const [hasSeenHero, setHasSeenHero] = useState(false);
    const heroSectionRef = useRef<HTMLElement>(null);
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const [isMobile, setIsMobile] = useState<boolean | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);

    // Mapping for hero section items to their corresponding sections
    const heroItemMapping = {
        "Optimize Staff": "section-1", // Staff Optimization
        "Transform Care": "section-5", // AI insights
        "Operational Efficiency": "section-9", // Increase NOI
    };

    const handleItemClick = (itemName: keyof typeof heroItemMapping) => {
        scrollToSection(heroItemMapping[itemName]);
    };

    // Track when user has passed through the hero section
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                // When hero section leaves viewport from the top (user scrolled past it)
                if (!entry.isIntersecting && entry.boundingClientRect.top < 0) {
                    setHasSeenHero(true);
                }
            },
            { threshold: 0, rootMargin: "-10px 0px 0px 0px" } // Trigger slightly after leaving
        );

        if (heroSectionRef.current) {
            observer.observe(heroSectionRef.current);
        }

        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };

        // Set initial state immediately
        setIsMobile(window.innerWidth < 768);

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // iOS Safari optimization
    useIOSVideoAutoplay(videoRef, { logPrefix: "Hero video" });

    // Track video playing state
    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        const handlePlay = () => setIsPlaying(true);
        const handlePause = () => setIsPlaying(false);
        const handleEnded = () => setIsPlaying(false);
        const handleLoadedData = () => {
            // Initialize state based on video's initial state
            setIsPlaying(!video.paused);
        };

        video.addEventListener("play", handlePlay);
        video.addEventListener("pause", handlePause);
        video.addEventListener("ended", handleEnded);
        video.addEventListener("loadeddata", handleLoadedData);

        // Set initial state
        if (video.readyState >= 1) {
            setIsPlaying(!video.paused);
        }

        return () => {
            video.removeEventListener("play", handlePlay);
            video.removeEventListener("pause", handlePause);
            video.removeEventListener("ended", handleEnded);
            video.removeEventListener("loadeddata", handleLoadedData);
        };
    }, []);

    // Determine which video to show - don't render video until we know device type
    const videoSrc =
        isMobile === null
            ? null
            : isMobile
            ? "/videos/hero-section-mobile.mp4"
            : "/videos/hero-section.mp4";

    return (
        <section
            ref={heroSectionRef}
            style={{
                width: "100%",
                height: "100vh",
                minHeight: "100svh",
                position: "relative",
                boxSizing: "border-box",
                overflow: "hidden",
                textAlign: "center",
                color: "#fff",
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-end",
                alignItems: "center",
                paddingBottom: "15vh",
                marginTop: "calc(var(--spacing) * -16)",
            }}
        >
            {videoSrc && (
                <>
                    <video
                        ref={videoRef}
                        key={videoSrc} // Force re-mount when video changes
                        autoPlay
                        muted
                        playsInline
                        src={videoSrc}
                        preload="auto"
                        style={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            zIndex: 0,
                            pointerEvents: "none",
                        }}
                    />

                    {/* Simple grey play button - mobile only */}
                    {isMobile && (
                        <button
                            onClick={() => {
                                const video = videoRef.current;
                                if (!video) return;
                                if (video.paused) {
                                    video.play();
                                    setIsPlaying(true);
                                } else {
                                    video.pause();
                                    setIsPlaying(false);
                                }
                            }}
                            style={{
                                position: "absolute",
                                top: "100px",
                                right: "20px",
                                width: "50px",
                                height: "50px",
                                borderRadius: "50%",
                                backgroundColor: "transparent",
                                border: "3px solid grey",
                                cursor: "pointer",
                                zIndex: 20,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                padding: 0,
                            }}
                        >
                            {isPlaying ? (
                                // Pause icon (two vertical bars)
                                <div
                                    style={{
                                        display: "flex",
                                        gap: "3px",
                                        alignItems: "center",
                                    }}
                                >
                                    <div
                                        style={{
                                            width: "4px",
                                            height: "16px",
                                            backgroundColor: "grey",
                                            borderRadius: "1px",
                                        }}
                                    />
                                    <div
                                        style={{
                                            width: "4px",
                                            height: "16px",
                                            backgroundColor: "grey",
                                            borderRadius: "1px",
                                        }}
                                    />
                                </div>
                            ) : (
                                // Play icon (triangle)
                                <div
                                    style={{
                                        width: 0,
                                        height: 0,
                                        borderLeft: "12px solid grey",
                                        borderTop: "8px solid transparent",
                                        borderBottom: "8px solid transparent",
                                        marginLeft: "2px",
                                    }}
                                />
                            )}
                        </button>
                    )}
                </>
            )}
            {/* Dark overlay to make buttons more prominent */}
            <div
                style={{
                    position: "absolute",
                    inset: 0,
                    zIndex: 1.5,
                    pointerEvents: "none",
                }}
            />
        </section>
    );
};

export default HomePageHeroSection;
