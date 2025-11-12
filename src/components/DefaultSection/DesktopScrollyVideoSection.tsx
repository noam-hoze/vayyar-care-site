import React from "react";
import { HomeSection } from "@/data/homeSections";
import { Stream, StreamPlayerApi } from "@cloudflare/stream-react";
import VideoControls from "./VideoControls";

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
                <VideoControls
                    ringSvgRef={ringSvgRef}
                    ringProgressRef={ringProgressRef}
                    playing={playing}
                    handleManualPlayPause={handleManualPlayPause}
                    positioning="sticky"
                />
                {videoSrc && (
                    videoSrc.startsWith('videos/') ? (
                        <video
                            ref={streamRef as unknown as React.MutableRefObject<HTMLVideoElement>}
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
                            loop={true}
                            preload="auto"
                        />
                    )
                )}
            </div>
            <div className="scrolly-text" style={{ pointerEvents: "none" }}>
                {entry.content}
            </div>
        </div>
    );
};

export default DesktopScrollyVideoSection;
