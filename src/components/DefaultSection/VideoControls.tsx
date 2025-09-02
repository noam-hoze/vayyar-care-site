import React from "react";
import styles from "./sectionRenderer.module.css";

interface VideoControlsProps {
    ringSvgRef: React.MutableRefObject<SVGSVGElement | null>;
    ringProgressRef: React.MutableRefObject<SVGCircleElement | null>;
    playing: boolean;
    handleManualPlayPause: () => void;
    positioning?: "sticky" | "absolute"; // Desktop = sticky, Mobile = absolute
}

const VideoControls: React.FC<VideoControlsProps> = ({
    ringSvgRef,
    ringProgressRef,
    playing,
    handleManualPlayPause,
    positioning = "sticky", // Default to sticky for backward compatibility
}) => {
    const containerClass =
        positioning === "sticky"
            ? styles.localStickyControls
            : styles.mobileControls;

    return (
        <div className={containerClass}>
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
    );
};

export default VideoControls;
