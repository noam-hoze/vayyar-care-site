import React, { useState, useEffect, useRef } from "react";
import { scrollToSection } from "@/lib/scrollUtils";

const VAYYAR_BLUE = "#06aeef";
const ORANGE = "#f56300";

const HeroSection: React.FC = () => {
    const [hasSeenHero, setHasSeenHero] = useState(false);
    const heroSectionRef = useRef<HTMLElement>(null);

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

    // Determine which video to show
    const videoSrc = "/videos/hero-section.mp4";

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
            <video
                key={videoSrc} // Force re-mount when video changes
                autoPlay
                muted
                playsInline
                src={videoSrc}
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

export default HeroSection;
