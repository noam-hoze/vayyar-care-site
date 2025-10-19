import { useRef, useState, useEffect } from "react";
import { HomeSection } from "@/data/homeSections";
import { StreamPlayerApi } from "@cloudflare/stream-react";
import { cloudflareStreamUids } from "@/config/streamConfig";
import { useMobileHomeVideo } from "../mobile/MobileHomeVideoContext";

interface VideoStateReturn {
    playing: boolean;
    progress: number;
    streamRef: React.MutableRefObject<StreamPlayerApi | null>;
    videoRef: React.MutableRefObject<HTMLVideoElement | null>;
    ringSvgRef: React.MutableRefObject<SVGSVGElement | null>;
    ringProgressRef: React.MutableRefObject<SVGCircleElement | null>;
    handleManualPlayPause: () => void;
    videoSrc: string;
}

export const useVideoState = (
    entry: HomeSection,
    isDesktop: boolean
): VideoStateReturn => {
    const [playing, setPlaying] = useState(true); // Both desktop and mobile videos autoplay
    const [progress, setProgress] = useState(0);
    const [videoSrc, setVideoSrc] = useState("");
    const streamRef = useRef<StreamPlayerApi | null>(null);
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const ringSvgRef = useRef<SVGSVGElement | null>(null);
    const ringProgressRef = useRef<SVGCircleElement | null>(null);

    const { manualOverrideIndex, requestPlay } = useMobileHomeVideo();

    // Video source setup
    useEffect(() => {
        if (
            entry.type === "video" ||
            entry.type === "scrolly-video" ||
            entry.type === "scrolly-video-fixed" ||
            entry.type === "scroll-scrub-video"
        ) {
            // Prefer mobile source on mobile, but fall back to desktop source if missing
            const preferredSrc = !isDesktop ? entry.mobileVideoSrc : entry.videoSrc;
            const baseSrc = preferredSrc || entry.videoSrc || entry.mobileVideoSrc || "";

            if (!baseSrc) {
                setVideoSrc("");
                return;
            }

            const fileName = (baseSrc || "").split("/").pop()?.split("?")[0];

            if (
                fileName &&
                cloudflareStreamUids[
                    fileName as keyof typeof cloudflareStreamUids
                ]
            ) {
                setVideoSrc(
                    cloudflareStreamUids[
                        fileName as keyof typeof cloudflareStreamUids
                    ]
                );
                return;
            }

            setVideoSrc(baseSrc);
        } else {
            setVideoSrc("");
        }
    }, [isDesktop, entry.type, entry.videoSrc, entry.mobileVideoSrc]);

    // Progress tracking
    useEffect(() => {
        let raf = 0;
        let smoothed = 0;
        let lastNow = performance.now();
        let lastVideoTime = 0;
        let frameCount = 0;

        const BASE_SMOOTHING = 0.12;

        const tick = () => {
            const now = performance.now();
            const dt = Math.min(0.25, (now - lastNow) / 1000);
            lastNow = now;

            let currentTime = 0;
            let duration = 0;

            const streamVideo = streamRef.current as unknown as {
                currentTime?: number;
                duration?: number;
            } | null;

            if (streamVideo?.duration && streamVideo.duration > 0) {
                currentTime = streamVideo.currentTime ?? 0;
                duration = streamVideo.duration;
            } else {
                const htmlVideo = videoRef.current;
                if (htmlVideo?.duration && htmlVideo.duration > 0) {
                    currentTime = htmlVideo.currentTime;
                    duration = htmlVideo.duration;
                }
            }

            if (duration > 0) {
                if (currentTime < lastVideoTime - 0.05) smoothed = 0;
                lastVideoTime = currentTime;

                const target = currentTime / duration;
                const alpha = 1 - Math.pow(1 - BASE_SMOOTHING, dt * 60);
                smoothed += (target - smoothed) * alpha;

                // Update the ring animation
                const ring = ringProgressRef.current;
                if (ring) {
                    ring.style.setProperty("--p", smoothed.toFixed(4));
                }

                if ((frameCount++ & 7) === 0) setProgress(smoothed);
            }

            raf = requestAnimationFrame(tick);
        };

        raf = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(raf);
    }, [videoSrc]);

    const handleManualPlayPause = () => {
        const videoElement = streamRef.current || videoRef.current;
        if (videoElement) {
            if (playing) {
                videoElement.pause();
                setPlaying(false);
            } else {
                videoElement.play();
                setPlaying(true);
            }
        }
    };

    return {
        playing,
        progress,
        streamRef,
        videoRef,
        ringSvgRef,
        ringProgressRef,
        handleManualPlayPause,
        videoSrc,
    };
};
