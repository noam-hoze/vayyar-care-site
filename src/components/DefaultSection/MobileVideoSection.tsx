import React, { useEffect } from "react";
import { HomeSection } from "@/data/homeSections";
import VideoControls from "./VideoControls";
import { useIOSVideoAutoplay } from "@/lib/useIOSVideoAutoplay";
import { Stream, StreamPlayerApi } from "@cloudflare/stream-react";

interface MobileVideoSectionProps {
    entry: HomeSection;
    sectionId: string;
    videoRef: React.MutableRefObject<HTMLVideoElement | null>;
    streamRef: React.MutableRefObject<StreamPlayerApi | null>;
    ringSvgRef: React.MutableRefObject<SVGSVGElement | null>;
    ringProgressRef: React.MutableRefObject<SVGCircleElement | null>;
    playing: boolean;
    handleManualPlayPause: () => void;
    nextSectionId?: string;
    handleLearnMore: () => void;
    smallTitle: string;
    subtitle: string;
    videoSrc: string;
    detailsTitle: string;
    detailsContent: React.ReactNode;
    backgroundClass?: string;
    isLightBg?: boolean;
    learnMoreEnabled?: boolean;
    learnMoreLabel?: string;
    textStyle?: "regular" | "narrow";
}

const MobileVideoSection: React.FC<MobileVideoSectionProps> = ({
    entry,
    sectionId,
    videoRef,
    streamRef,
    ringSvgRef,
    ringProgressRef,
    playing,
    handleManualPlayPause,
    nextSectionId,
    handleLearnMore,
    smallTitle,
    subtitle,
    videoSrc,
    detailsTitle,
    detailsContent,
    backgroundClass = "",
    isLightBg = true,
    learnMoreEnabled = false,
    learnMoreLabel = "+ Learn more",
    textStyle = "regular",
}) => {
    // iOS Safari optimization for native video; harmless no-op when ref is null
    useIOSVideoAutoplay(videoRef, { logPrefix: "MobileVideoSection" });

    return (
        <div
            id={sectionId}
            className={`mobile-apple-component ${backgroundClass}`}
        >
            {/* Part 1: Text above video */}
            {textStyle === "narrow" ? (
                // Narrow text: show full content
                <div className="mobile-narrow-text-section">
                    <div className="mobile-narrow-text-container">
                        <div className="mobile-narrow-body">
                            {entry.content}
                        </div>
                    </div>
                </div>
            ) : (
                // Regular text: show extracted title/subtitle
                <div className="mobile-apple-part1">
                    <div className="mobile-apple-small-title">{smallTitle}</div>
                    <h2 className="mobile-apple-subtitle">{subtitle}</h2>
                </div>
            )}

            {/* Part 2: Video */}
            <div className="mobile-apple-video-container">
                <div className="mobile-apple-video">
                    {videoSrc.startsWith('videos/') ? (
                        <video
                            ref={videoRef}
                            src={videoSrc}
                            className="w-full h-full object-cover"
                            muted
                            autoPlay
                            loop
                            playsInline
                            preload="auto"
                        />
                    ) : (
                        <Stream
                            streamRef={
                                streamRef as React.MutableRefObject<
                                    StreamPlayerApi | undefined
                                >
                            }
                            src={videoSrc}
                            className="w-full h-full object-cover"
                            muted
                            autoplay
                            loop
                            preload="auto"
                        />
                    )}
                    <VideoControls
                        ringSvgRef={ringSvgRef}
                        ringProgressRef={ringProgressRef}
                        playing={playing}
                        handleManualPlayPause={handleManualPlayPause}
                        positioning="absolute"
                    />
                </div>
            </div>

            {/* Part 3: Content section (only for regular text style) */}
            {textStyle === "regular" && (
                <div className="mobile-apple-part3">
                    <h3 className="mobile-apple-title">{detailsTitle}</h3>
                    <div className="mobile-apple-content">{detailsContent}</div>
                    {learnMoreEnabled && nextSectionId && (
                        <button className="mobile-apple-button">
                            {learnMoreLabel}
                        </button>
                    )}
                </div>
            )}
        </div>
    );
};

export default MobileVideoSection;
