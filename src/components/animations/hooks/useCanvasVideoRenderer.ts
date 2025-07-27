import { useEffect, RefObject } from "react";

export function useCanvasVideoRenderer(
    videoRef: RefObject<HTMLVideoElement | null>,
    canvasRef: RefObject<HTMLCanvasElement | null>
) {
    useEffect(() => {
        const video = videoRef.current;
        const canvas = canvasRef.current;
        if (!video || !canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let active = true;
        let animationFrameId: number;

        const resizeCanvas = () => {
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
        };

        const drawFrame = () => {
            if (!active || !ctx) return;
            ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        };

        // Type assertion for experimental API
        const videoWithFrameCallback = video as HTMLVideoElement & {
            requestVideoFrameCallback: (
                callback: FrameRequestCallback
            ) => number;
        };

        if ("requestVideoFrameCallback" in video) {
            const renderLoop = () => {
                if (!active) return;
                videoWithFrameCallback.requestVideoFrameCallback(() => {
                    drawFrame();
                    renderLoop();
                });
            };
            renderLoop();
        } else {
            const renderLoop = () => {
                if (!active) return;
                drawFrame();
                animationFrameId = requestAnimationFrame(renderLoop);
            };
            renderLoop();
        }

        video.addEventListener("loadedmetadata", resizeCanvas);

        return () => {
            active = false;
            if (animationFrameId) {
                cancelAnimationFrame(animationFrameId);
            }
            video.removeEventListener("loadedmetadata", resizeCanvas);
        };
    }, [videoRef, canvasRef]);
}
