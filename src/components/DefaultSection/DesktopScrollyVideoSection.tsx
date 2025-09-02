import React from "react";
import { HomeSection } from "@/data/homeSections";
import styles from "./DefaultSection.module.css";
import { Stream, StreamPlayerApi } from "@cloudflare/stream-react";

interface DesktopScrollyVideoSectionProps {
    entry: HomeSection;
    sectionId: string;
    scrollyContainerRef: React.MutableRefObject<HTMLDivElement | null>;
    scrollyOverlayRef: React.MutableRefObject<HTMLDivElement | null>;
    streamRef: React.MutableRefObject<StreamPlayerApi | null>;
    ringSvgRef: React.MutableRefObject<SVGSVGElement | null>;
    ringProgressRef: React.MutableRefObject<SVGCircleElement | null>;
    playing: boolean;
    handleManualPlayPause: () => void;
    videoSrc: string;
}

const DesktopScrollyVideoSection: React.FC<DesktopScrollyVideoSectionProps> = ({
    entry,
    sectionId,
    scrollyContainerRef,
    scrollyOverlayRef,
    streamRef,
    ringSvgRef,
    ringProgressRef,
    playing,
    handleManualPlayPause,
    videoSrc,
}) => {
    return (
        <div
            id={sectionId}
            ref={scrollyContainerRef}
            className="scrolly-container"
        >
            <div className="scrolly-video">
                <div ref={scrollyOverlayRef} className="scrolly-overlay"></div>
                <div className={styles.localStickyControls}>
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
                                ref={ringProgressRef}
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
                <Stream
                    streamRef={
                        streamRef as React.MutableRefObject<
                            StreamPlayerApi | undefined
                        >
                    }
                    src={videoSrc}
                    className="w-full h-full object-cover"
                    muted
                    loop={true} // All scrolly videos should loop
                    preload="auto"
                />
            </div>
            <div className="scrolly-text" style={{ pointerEvents: "none" }}>
                {entry.content}
            </div>
        </div>
    );
};

export default DesktopScrollyVideoSection;
