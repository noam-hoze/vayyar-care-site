import React from "react";
import { HomeSection } from "@/data/homeSections";
import styles from "./DefaultSection.module.css";

interface MobileVideoSectionProps {
    entry: HomeSection;
    sectionId: string;
    videoRef: React.MutableRefObject<HTMLVideoElement | null>;
    ringSvgRef: React.MutableRefObject<SVGSVGElement | null>;
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
    ringSvgRef,
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
                    <video
                        ref={videoRef}
                        src={videoSrc}
                        playsInline
                        muted
                        autoPlay
                        loop
                        controls={false}
                    />
                    <div className={styles.mobileControls}>
                        <div className={styles.controlsBox}>
                            <svg
                                ref={ringSvgRef}
                                className={styles.ring}
                                viewBox="0 0 44 44"
                                aria-hidden="true"
                            >
                                <circle
                                    className={styles.ringTrack}
                                    cx="22"
                                    cy="22"
                                    r="20"
                                    pathLength={1}
                                />
                                <circle
                                    className={styles.ringProgress}
                                    cx="22"
                                    cy="22"
                                    r="20"
                                    pathLength={1}
                                />
                            </svg>
                            <button
                                className={styles.playPauseButton}
                                onClick={handleManualPlayPause}
                            >
                                {playing ? (
                                    <div className={styles.pauseIcon} />
                                ) : (
                                    <div className={styles.playIcon} />
                                )}
                            </button>
                        </div>
                    </div>
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
