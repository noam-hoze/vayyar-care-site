"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { useVideoTime } from "@/contexts/VideoTimeContext";
import { videoConfig } from "@/config/videoConfig";
import ContactForm from "@/components/ContactForm";

interface BreatherProps {
    appearAtTime: number;
    disappearAtTime?: number;
    title: React.ReactNode;
    content: React.ReactNode;
    style?: React.CSSProperties;
    buttonText?: string;
    scrollToTimeValue?: number;
}

const Breather = ({
    appearAtTime,
    disappearAtTime,
    title,
    content,
    style,
    buttonText,
    scrollToTimeValue,
}: BreatherProps) => {
    const [isVisible, setIsVisible] = useState(false);
    const { videoDuration, currentTime, scrollToTime } = useVideoTime();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const breatherRef = useRef<HTMLDivElement>(null);
    const breatherHeight = useRef<number>(0);
    const lastTopPosition = useRef<number | null>(null);
    const animationFrameId = useRef<number | null>(null);
    const hasInitialized = useRef<boolean>(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    // Handle button click to scroll to specified time
    const handleButtonClick = () => {
        if (scrollToTimeValue !== undefined) {
            scrollToTime(scrollToTimeValue);
        } else {
            openModal();
        }
    };

    const calculatePosition = useCallback(
        (time: number) => {
            if (!videoDuration) return null;

            let targetSceneIndex = 0;
            let progressWithinScene = 0;

            for (let i = 0; i < videoConfig.sceneTiming.length; i++) {
                const currentScene = videoConfig.sceneTiming[i];
                const nextScene = videoConfig.sceneTiming[i + 1];
                const sceneStart = currentScene.videoTime ?? 0;
                const sceneEnd = nextScene?.videoTime ?? videoDuration;

                if (time >= sceneStart && time < sceneEnd) {
                    targetSceneIndex = currentScene.scene;
                    progressWithinScene =
                        (time - sceneStart) / (sceneEnd - sceneStart);
                    break;
                }

                if (!nextScene && time >= sceneStart) {
                    targetSceneIndex = currentScene.scene;
                    progressWithinScene = 1;
                    break;
                }
            }

            progressWithinScene = Math.max(0, Math.min(1, progressWithinScene));
            const windowHeight = window.innerHeight;
            return (
                targetSceneIndex * windowHeight +
                progressWithinScene * windowHeight
            );
        },
        [videoDuration]
    );

    useEffect(() => {
        if (breatherRef.current && isVisible) {
            const height = breatherRef.current.offsetHeight;
            breatherHeight.current = height;
        }
    }, [isVisible]);

    useEffect(() => {
        return () => {
            hasInitialized.current = false;
            lastTopPosition.current = null;
            if (animationFrameId.current) {
                cancelAnimationFrame(animationFrameId.current);
                animationFrameId.current = null;
            }
        };
    }, [appearAtTime, disappearAtTime]);

    const animateToTarget = useCallback(
        (targetPosition: number) => {
            if (!breatherRef.current || !isVisible) return;

            if (animationFrameId.current) {
                cancelAnimationFrame(animationFrameId.current);
            }

            const animate = () => {
                if (!breatherRef.current || !isVisible) {
                    if (animationFrameId.current) {
                        cancelAnimationFrame(animationFrameId.current);
                        animationFrameId.current = null;
                    }
                    return;
                }

                if (
                    lastTopPosition.current !== null &&
                    Math.abs(lastTopPosition.current - targetPosition) < 0.5
                ) {
                    lastTopPosition.current = targetPosition;
                    breatherRef.current.style.top = `${targetPosition}px`;
                    animationFrameId.current = null;
                    return;
                }

                if (lastTopPosition.current !== null) {
                    const easeFactor = 0.12;
                    const newPosition =
                        lastTopPosition.current +
                        (targetPosition - lastTopPosition.current) * easeFactor;

                    lastTopPosition.current = newPosition;
                    breatherRef.current.style.top = `${newPosition}px`;
                    animationFrameId.current = requestAnimationFrame(animate);
                }
            };
            animate();
        },
        [isVisible]
    );

    const initializeBreather = useCallback(() => {
        if (hasInitialized.current || !breatherRef.current) return;
        const appearPosition = calculatePosition(appearAtTime);
        if (appearPosition === null) return;
        const initialPosition = appearPosition + window.innerHeight;
        breatherRef.current.style.top = `${initialPosition}px`;
        lastTopPosition.current = initialPosition;
        hasInitialized.current = true;
    }, [appearAtTime, calculatePosition]);

    useEffect(() => {
        if (!videoDuration) return;

        const shouldBeVisible =
            currentTime >= appearAtTime &&
            (disappearAtTime === undefined || currentTime <= disappearAtTime);

        if (shouldBeVisible && !isVisible) {
            setIsVisible(true);
        } else if (!shouldBeVisible && isVisible) {
            setIsVisible(false);
            hasInitialized.current = false;
            lastTopPosition.current = null;
            if (animationFrameId.current) {
                cancelAnimationFrame(animationFrameId.current);
                animationFrameId.current = null;
            }
        }

        if (shouldBeVisible && isVisible) {
            if (!hasInitialized.current) {
                initializeBreather();
                return;
            }

            const appearPosition = calculatePosition(appearAtTime);
            if (appearPosition === null) return;

            let topPosition = appearPosition + window.innerHeight;

            if (
                disappearAtTime &&
                currentTime >= appearAtTime &&
                currentTime <= disappearAtTime
            ) {
                const progress =
                    (currentTime - appearAtTime) /
                    (disappearAtTime - appearAtTime);
                const startY = appearPosition + window.innerHeight;
                const endY =
                    calculatePosition(disappearAtTime) || appearPosition;
                const fullExitY = endY - breatherHeight.current;
                const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
                const easedProgress = easeOutCubic(progress);
                topPosition = startY + easedProgress * (fullExitY - startY);
            }

            if (
                lastTopPosition.current === null ||
                Math.abs(lastTopPosition.current - topPosition) > 0.5
            ) {
                animateToTarget(topPosition);
            }
        }

        return () => {
            if (animationFrameId.current) {
                cancelAnimationFrame(animationFrameId.current);
                animationFrameId.current = null;
            }
        };
    }, [
        currentTime,
        appearAtTime,
        disappearAtTime,
        videoDuration,
        isVisible,
        calculatePosition,
        animateToTarget,
        initializeBreather,
    ]);

    useEffect(() => {
        document.body.style.overflow = isModalOpen ? "hidden" : "auto";
        return () => {
            document.body.style.overflow = "auto";
        };
    }, [isModalOpen]);

    if (!isVisible) return null;

    return (
        <>
            <div
                ref={breatherRef}
                data-breather="true"
                data-time={`${appearAtTime}-${disappearAtTime ?? ""}`}
                style={{
                    position: "absolute",
                    left: 0,
                    width: "100%",
                    zIndex: 10,
                    backgroundColor: "#fff",
                    color: "#1d1d1f",
                    padding: "128px 0",
                    willChange: "top",
                    minHeight: "50vh",
                    opacity: hasInitialized.current ? 1 : 0,
                    transition: "opacity 0.2s ease-in",
                    fontFamily:
                        "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
                    ...style,
                }}
                className={"flex justify-center items-center"}
            >
                <div
                    style={{
                        maxWidth: "980px",
                        margin: "0 auto",
                        padding: "0 22px",
                    }}
                >
                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(5, 1fr)",
                            gap: "64px",
                            alignItems: "start",
                        }}
                    >
                        {/* Left Column: Title */}
                        <div style={{ gridColumn: "span 2 / span 2" }}>
                            <h2
                                style={{
                                    fontSize: "28px",
                                    fontWeight: "700",
                                    lineHeight: 1.1,
                                    letterSpacing: "0em",
                                    margin: 0,
                                }}
                            >
                                {title}
                            </h2>
                        </div>
                        {/* Right Column: Content */}
                        <div
                            style={{
                                gridColumn: "span 3 / span 3",
                                marginTop: "4px",
                            }}
                        >
                            <div
                                style={{
                                    fontSize: "18px",
                                    color: "#6e6e73",
                                    lineHeight: 1.47,
                                    fontWeight: 700,
                                }}
                            >
                                {content}
                            </div>
                            <div style={{ marginTop: "20px" }}>
                                <button
                                    onClick={handleButtonClick}
                                    style={{
                                        marginTop: "20px",
                                        display: "inline-flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        gap: "8px",
                                        padding: "12px 24px",
                                        fontSize: "17px",
                                        fontWeight: "600",
                                        color: "#fff",
                                        backgroundColor: "#f56300",
                                        borderRadius: "9999px",
                                        border: "none",
                                        cursor: "pointer",
                                    }}
                                >
                                    <svg
                                        style={{
                                            width: "20px",
                                            height: "20px",
                                        }}
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                    <span>Learn about {buttonText}</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {isModalOpen && (
                <ContactForm isOpen={isModalOpen} onClose={closeModal} />
            )}
        </>
    );
};

export default Breather;
