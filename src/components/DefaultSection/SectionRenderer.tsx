import React, { useRef, useState, useEffect } from "react";
import { HomeSection, homeSections } from "@/data/homeSections";
import { useRewind } from "@/contexts/RewindContext";
import { useVideoState } from "./useVideoState";
import { useScrollAnimations } from "./useScrollAnimations";
import SectionRouter from "./SectionRouter";
import { useInView } from "react-intersection-observer";
import "../mobile/mobile-styles.css";

interface SectionRendererProps {
    entry?: HomeSection;
    index?: number;
    sectionId?: string;
    nextSectionId?: string;
}

const SectionRenderer: React.FC<SectionRendererProps> = ({
    entry,
    index,
    sectionId,
    nextSectionId,
}) => {
    // Handle section looping if no entry provided
    if (!entry) {
        return (
            <>
                {homeSections.map((sectionEntry, idx) => (
                    <SectionRenderer
                        key={idx}
                        entry={sectionEntry}
                        index={idx}
                        sectionId={`section-${sectionEntry.id}`}
                        nextSectionId={`section-${sectionEntry.id + 1}`}
                    />
                ))}
            </>
        );
    }

    // State management
    const [isDesktop, setIsDesktop] = useState(
        typeof window !== "undefined" ? window.innerWidth >= 1024 : true
    );

    // Refs for DOM elements
    const scrollyContainerRef = useRef<HTMLDivElement | null>(null);
    const scrollyOverlayRef = useRef<HTMLDivElement | null>(null);

    // Custom hooks for video and scroll logic
    const {
        playing,
        progress,
        streamRef,
        videoRef,
        ringSvgRef,
        ringProgressRef,
        handleManualPlayPause,
        videoSrc,
    } = useVideoState(entry, isDesktop);

    const scrollTriggerRef = useScrollAnimations(
        entry,
        isDesktop,
        { scrollyContainerRef, scrollyOverlayRef, streamRef },
        playing,
        () => {},
        videoSrc
    );

    // Intersection observer for efficiency section
    const { setHasSeenEfficiencySection } = useRewind();
    const { ref: intersectionRef, inView: sectionInView } = useInView({
        triggerOnce: false,
        threshold: 0.5,
    });

    // Handle efficiency section visibility
    useEffect(() => {
        if (entry.id === 1.6 && sectionInView) {
            setHasSeenEfficiencySection(true);
            const productVideo = document.querySelector(
                "#section-1\\.5 video"
            ) as HTMLVideoElement | null;
            if (productVideo) productVideo.currentTime = 0;
        } else if (entry.id === 0 && sectionInView) {
            setHasSeenEfficiencySection(false);
            const productVideo = document.querySelector(
                "#section-1\\.5 video"
            ) as HTMLVideoElement | null;
            if (productVideo) productVideo.currentTime = 0;
        }
    }, [sectionInView, entry.id, setHasSeenEfficiencySection]);

    // Responsive design handler
    useEffect(() => {
        const checkDesktop = () => setIsDesktop(window.innerWidth >= 1024);
        checkDesktop();
        window.addEventListener("resize", checkDesktop);
        return () => window.removeEventListener("resize", checkDesktop);
    }, []);

    // Navigation handler
    const handleLearnMore = () => {
        if (nextSectionId) {
            const nextSectionElement = document.getElementById(nextSectionId);
            if (nextSectionElement) {
                nextSectionElement.scrollIntoView({
                    behavior: "smooth",
                    block: "center",
                });
            }
        }
    };

    // Route to appropriate component based on entry properties
    return (
        <SectionRouter
            entry={entry}
            isDesktop={isDesktop}
            sectionId={sectionId || `section-${entry.id}`}
            nextSectionId={nextSectionId}
            videoRef={videoRef}
            ringSvgRef={ringSvgRef}
            ringProgressRef={ringProgressRef}
            scrollyContainerRef={scrollyContainerRef}
            scrollyOverlayRef={scrollyOverlayRef}
            streamRef={streamRef}
            playing={playing}
            progress={progress}
            handleManualPlayPause={handleManualPlayPause}
            handleLearnMore={handleLearnMore}
            videoSrc={videoSrc}
        />
    );
};

export default SectionRenderer;
