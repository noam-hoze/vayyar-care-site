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
