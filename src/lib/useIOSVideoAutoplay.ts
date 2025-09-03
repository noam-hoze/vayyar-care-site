import { useEffect, useRef } from "react";

interface IOSVideoAutoplayOptions {
    enabled?: boolean;
    logPrefix?: string;
}

export const useIOSVideoAutoplay = (
    videoRef: React.MutableRefObject<HTMLVideoElement | null>,
    options: IOSVideoAutoplayOptions = {}
) => {
    const { enabled = true, logPrefix = "Video" } = options;
    const cleanupRef = useRef<(() => void) | null>(null);

    useEffect(() => {
        if (!enabled || !videoRef.current) return;

        const v = videoRef.current;

        // Make sure properties are set before loading
        v.muted = true;
        (v as any).playsInline = true; // property
        v.setAttribute("playsinline", ""); // attr for iOS
        v.setAttribute("webkit-playsinline", ""); // legacy iOS

        const tryPlay = () =>
            v.play().catch((e) => {
                console.log(`${logPrefix} play() blocked:`, e?.message);
            });

        const onCanPlay = () => tryPlay();
        const onTouchOnce = () => {
            tryPlay();
            window.removeEventListener("touchstart", onTouchOnce);
        };

        v.addEventListener("canplay", onCanPlay, { once: true });
        // Fallback: first touch anywhere triggers play
        window.addEventListener("touchstart", onTouchOnce, { once: true });

        // If already ready, attempt immediately
        if (v.readyState >= 2) tryPlay();

        // Store cleanup function
        cleanupRef.current = () => {
            v.removeEventListener("canplay", onCanPlay);
            window.removeEventListener("touchstart", onTouchOnce);
        };

        return cleanupRef.current;
    }, [videoRef, enabled, logPrefix]);

    // Return cleanup function for manual cleanup if needed
    return {
        cleanup: () => cleanupRef.current?.(),
    };
};

// Hook for multiple videos (like in ProductSection)
export const useIOSVideoAutoplayMultiple = (
    videoRefs: React.MutableRefObject<(HTMLVideoElement | null)[]>,
    options: IOSVideoAutoplayOptions = {}
) => {
    const { enabled = true, logPrefix = "Modal video" } = options;

    useEffect(() => {
        if (!enabled) return;

        const videos = videoRefs.current;
        const cleanupFunctions: (() => void)[] = [];

        videos.forEach((video, index) => {
            if (!video) return;

            // Make sure properties are set before loading
            video.muted = true;
            (video as any).playsInline = true; // property
            video.setAttribute("playsinline", ""); // attr for iOS
            video.setAttribute("webkit-playsinline", ""); // legacy iOS

            const tryPlay = () =>
                video.play().catch((e) => {
                    console.log(
                        `${logPrefix} ${index} play() blocked:`,
                        e?.message
                    );
                });

            const onCanPlay = () => tryPlay();
            const onTouchOnce = () => {
                tryPlay();
                window.removeEventListener("touchstart", onTouchOnce);
            };

            video.addEventListener("canplay", onCanPlay, { once: true });
            // Fallback: first touch anywhere triggers play
            window.addEventListener("touchstart", onTouchOnce, { once: true });

            // If already ready, attempt immediately
            if (video.readyState >= 2) tryPlay();

            cleanupFunctions.push(() => {
                video.removeEventListener("canplay", onCanPlay);
                window.removeEventListener("touchstart", onTouchOnce);
            });
        });

        return () => {
            cleanupFunctions.forEach((cleanup) => cleanup());
            window.removeEventListener("touchstart", () => {});
        };
    }, [videoRefs, enabled, logPrefix]);
};
