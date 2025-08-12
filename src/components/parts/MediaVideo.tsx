import React, { MutableRefObject } from "react";
import styles from "../HomePageSection.module.css";

interface MediaVideoProps {
    sectionId?: string;
    videoRef: MutableRefObject<HTMLVideoElement | null>;
    videoSrc: string;
    isActiveVideo: boolean;
    theaterMode: boolean;
    progress: number;
    playing: boolean;
    onTogglePlay: () => void;
    // Optional elements used by desktop today
    showImage?: boolean;
    productImageSrc?: string;
    isExitVisible?: boolean;
    onExitTheater?: () => void;
}

const MediaVideo: React.FC<MediaVideoProps> = ({
    sectionId,
    videoRef,
    videoSrc,
    isActiveVideo,
    theaterMode,
    progress,
    playing,
    onTogglePlay,
    showImage,
    productImageSrc,
    isExitVisible,
    onExitTheater,
}) => {
    return (
        <div id={sectionId} className={`${styles.videoSection} relative`}>
            <div className="relative">
                {showImage ? (
                    <img
                        src={productImageSrc || "/images/product.png"}
                        alt="Product overview"
                        className={`w-full rounded-xl bg-black ${
                            isActiveVideo && theaterMode
                                ? "theater-mode-current-video"
                                : ""
                        } ${styles.productImage}`}
                    />
                ) : (
                    <video
                        ref={videoRef}
                        src={videoSrc}
                        className={`w-full rounded-xl bg-black ${
                            isActiveVideo && theaterMode
                                ? "theater-mode-current-video"
                                : ""
                        }`}
                        controls={false}
                        playsInline
                        muted
                        preload="auto"
                        data-section-video="true"
                    />
                )}

                <div className={styles.videoDarkOverlay} />

                {isExitVisible && (
                    <button
                        onClick={onExitTheater}
                        className="theater-mode-controls absolute top-3 left-3 flex items-center justify-center w-8 h-8 rounded-full bg-black/50 text-white cursor-pointer"
                        aria-label="Exit theater mode"
                    >
                        ✕
                    </button>
                )}

                <div className="theater-mode-controls absolute top-3 right-3 w-12 h-12 flex items-center justify-center">
                    <svg
                        width={48}
                        height={48}
                        className="absolute top-0 left-0 -rotate-90"
                    >
                        <circle
                            cx={24}
                            cy={24}
                            r={20}
                            stroke="rgba(255,255,255,0.25)"
                            strokeWidth={4}
                            fill="none"
                        />
                        <circle
                            cx={24}
                            cy={24}
                            r={20}
                            stroke="#fff"
                            strokeWidth={4}
                            fill="none"
                            strokeDasharray={2 * Math.PI * 20}
                            strokeDashoffset={
                                2 *
                                Math.PI *
                                20 *
                                (1 - Math.max(0, Math.min(1, progress)))
                            }
                            className={styles.progressCircle}
                            strokeLinecap="round"
                        />
                    </svg>
                    <button
                        onClick={onTogglePlay}
                        className="relative bg-transparent border-0 rounded-full w-10 h-10 text-white text-xl flex items-center justify-center cursor-pointer z-10"
                        aria-label={playing ? "Pause video" : "Play video"}
                    >
                        {playing ? (
                            <span className="font-bold">&#10073;&#10073;</span>
                        ) : (
                            <span className="font-bold">&#9654;</span>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MediaVideo;
