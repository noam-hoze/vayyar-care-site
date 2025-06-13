"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { useVideoTime } from "@/contexts/VideoTimeContext";
import { videoConfig } from "@/config/videoConfig";
import { useDemoModal } from "@/contexts/DemoModalContext";
import ContactModal from "@/components/ContactModal";

interface BreatherProps {
    appearAtTime: number; // The video timecode when the div should appear (in seconds)
    disappearAtTime?: number; // The video timecode when the div should be scrolled out (in seconds)
    title?: string;
    content?: React.ReactNode;
    children?: React.ReactNode;
    style?: React.CSSProperties;
}

const Breather = ({
    appearAtTime,
    disappearAtTime,
    title,
    content,
    children,
    style
}: BreatherProps) => {
    const [isVisible, setIsVisible] = useState(false);
    const { videoDuration, currentTime } = useVideoTime();
    const { isDemoModalOpen, setIsDemoModalOpen } = useDemoModal();
    const breatherRef = useRef<HTMLDivElement>(null);
    const breatherHeight = useRef<number>(0);
    const lastTopPosition = useRef<number | null>(null);
    const targetTopPosition = useRef<number | null>(null);
    const animationFrameId = useRef<number | null>(null);
    const hasInitialized = useRef<boolean>(false);

    // Calculate the position based on video time
    const calculatePosition = useCallback((time: number) => {
        if (!videoDuration) return null;

        // Find which scene contains the timecode
        let targetSceneIndex = 0;
        let progressWithinScene = 0;

        for (let i = 0; i < videoConfig.sceneTiming.length; i++) {
            const currentScene = videoConfig.sceneTiming[i];
            const nextScene = videoConfig.sceneTiming[i + 1];

            const sceneStart = currentScene.videoTime ?? 0;
            const sceneEnd = nextScene?.videoTime ?? videoDuration;

            if (time >= sceneStart && time < sceneEnd) {
                targetSceneIndex = currentScene.scene;
                progressWithinScene = (time - sceneStart) / (sceneEnd - sceneStart);
                break;
            }

            if (!nextScene && time >= sceneStart) {
                targetSceneIndex = currentScene.scene;
                progressWithinScene = 1;
                break;
            }
        }

        // Clamp progress between 0 and 1
        progressWithinScene = Math.max(0, Math.min(1, progressWithinScene));

        // Convert to scroll position
        const windowHeight = window.innerHeight;
        return targetSceneIndex * windowHeight + progressWithinScene * windowHeight;
    }, [videoDuration]);

    // Measure the breather height when it's rendered
    useEffect(() => {
        if (breatherRef.current && isVisible) {
            // Get actual height of the breather element
            const height = breatherRef.current.offsetHeight;
            breatherHeight.current = height;
        }
    }, [isVisible]);

    // Reset state when component unmounts or when props change significantly
    useEffect(() => {
        return () => {
            // Clean up when component unmounts
            hasInitialized.current = false;
            lastTopPosition.current = null;
            if (animationFrameId.current) {
                cancelAnimationFrame(animationFrameId.current);
                animationFrameId.current = null;
            }
        };
    }, [appearAtTime, disappearAtTime]); // Reset when timecodes change

    // Handle breather initialization - crucial to prevent jumping
    const initializeBreather = useCallback(() => {
        if (hasInitialized.current || !breatherRef.current) return;

        // Always start at the bottom of the viewport for a consistent entry
        const appearPosition = calculatePosition(appearAtTime);
        if (appearPosition === null) return;

        const initialPosition = appearPosition + window.innerHeight;
        breatherRef.current.style.top = `${initialPosition}px`;
        lastTopPosition.current = initialPosition;
        hasInitialized.current = true;

        // Apply any progress if already between appear and disappear times
        if (disappearAtTime && currentTime > appearAtTime && currentTime <= disappearAtTime) {
            // Schedule the first animation frame after a brief delay to ensure
            // the initial position has been properly rendered
            setTimeout(() => {
                const progress = Math.min(1, (currentTime - appearAtTime) / (disappearAtTime - appearAtTime));
                const endY = calculatePosition(disappearAtTime) || appearPosition;
                const fullExitY = endY - breatherHeight.current;

                // Cubic easing for natural movement
                const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
                const easedProgress = easeOutCubic(progress);

                const targetPosition = initialPosition + easedProgress * (fullExitY - initialPosition);

                // Start smooth animation to the correct position
                animateToTarget(targetPosition);
            }, 50); // Small delay to ensure DOM updates
        }
    }, [appearAtTime, disappearAtTime, calculatePosition, currentTime]);

    // Separated animation function for clarity
    const animateToTarget = useCallback((targetPosition: number) => {
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

            // If we're close enough to target, snap to it
            if (lastTopPosition.current !== null && Math.abs(lastTopPosition.current - targetPosition) < 0.5) {
                lastTopPosition.current = targetPosition;
                breatherRef.current.style.top = `${targetPosition}px`;
                animationFrameId.current = null;
                return;
            }

            // Smoothly interpolate with easing
            if (lastTopPosition.current !== null) {
                // More consistent easing factor for smoother motion
                const easeFactor = 0.12;
                const newPosition = lastTopPosition.current + (targetPosition - lastTopPosition.current) * easeFactor;

                lastTopPosition.current = newPosition;
                breatherRef.current.style.top = `${newPosition}px`;

                animationFrameId.current = requestAnimationFrame(animate);
            }
        };

        animate();
    }, [isVisible]);

    // Handle visibility and positioning
    useEffect(() => {
        if (!videoDuration) return;

        // Determine visibility based on current time
        const shouldBeVisible = currentTime >= appearAtTime &&
            (disappearAtTime === undefined || currentTime <= disappearAtTime);

        if (shouldBeVisible && !isVisible) {
            // When first becoming visible
            setIsVisible(true);
        } else if (!shouldBeVisible && isVisible) {
            // When becoming invisible
            setIsVisible(false);
            hasInitialized.current = false;
            lastTopPosition.current = null;

            if (animationFrameId.current) {
                cancelAnimationFrame(animationFrameId.current);
                animationFrameId.current = null;
            }
        }

        // Handle positioning once visible
        if (shouldBeVisible && isVisible) {
            // First-time initialization
            if (!hasInitialized.current) {
                initializeBreather();
                return;
            }

            // Regular positioning updates
            const appearPosition = calculatePosition(appearAtTime);
            if (appearPosition === null) return;

            // Base position (bottom of viewport)
            let topPosition = appearPosition + window.innerHeight;

            // Calculate progress and apply scroll-out effect if needed
            if (disappearAtTime && currentTime >= appearAtTime && currentTime <= disappearAtTime) {
                const progress = (currentTime - appearAtTime) / (disappearAtTime - appearAtTime);
                const startY = appearPosition + window.innerHeight;
                const endY = calculatePosition(disappearAtTime) || appearPosition;
                const fullExitY = endY - breatherHeight.current;

                // Cubic easing for natural movement
                const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
                const easedProgress = easeOutCubic(progress);

                topPosition = startY + easedProgress * (fullExitY - startY);
            }

            // Only animate if position changed significantly
            if (lastTopPosition.current === null || Math.abs(lastTopPosition.current - topPosition) > 0.5) {
                targetTopPosition.current = topPosition;
                animateToTarget(topPosition);
            }
        }

        // Clean up animation on unmount
        return () => {
            if (animationFrameId.current) {
                cancelAnimationFrame(animationFrameId.current);
                animationFrameId.current = null;
            }
        };
    }, [currentTime, appearAtTime, disappearAtTime, videoDuration, isVisible, calculatePosition, animateToTarget, initializeBreather]);

    // Handle modal controls
    const openContactModal = () => {
        setIsDemoModalOpen(true);
    };

    const handleContactModalClose = () => {
        setIsDemoModalOpen(false);
    };

    // Control body scroll when modal is open
    useEffect(() => {
        document.body.style.overflow = isDemoModalOpen ? "hidden" : "auto";
        return () => {
            document.body.style.overflow = "auto";
        };
    }, [isDemoModalOpen]);

    if (!isVisible) return null;

    // Define a blue accent color for highlights
    const VAYYAR_BLUE = "#06aeef";

    return (
        <div
            ref={breatherRef}
            data-breather="true"
            data-time={`${appearAtTime}-${disappearAtTime}`}
            style={{
                position: 'absolute',
                left: 0,
                width: '100%',
                zIndex: 10,
                willChange: 'top', // Performance optimization for animations
                opacity: hasInitialized.current ? 1 : 0, // Only show after properly positioned
                transition: 'opacity 0.2s ease-in',
                ...style
            }}
        >
            {children || (
                <div style={{
                    background: '#FFFFFF',
                    padding: '250px 0',
                    width: '100%',
                    boxShadow: '0 -4px 8px rgba(0, 0, 0, 0.1)',
                }}>
                    <div style={{
                        maxWidth: '1200px',
                        margin: '0 auto',
                        padding: '0 32px',
                        display: 'flex',
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                        gap: '4rem',
                    }}>
                        {/* Left Column - Title */}
                        <div style={{
                            flex: '1 1 300px',
                        }}>
                            {title && (
                                <h2 style={{
                                    fontSize: "clamp(2.5rem, 5vw, 3.5rem)",
                                    fontWeight: "800",
                                    marginBottom: '0.7em',
                                    fontFamily: "Manrope, Inter, sans-serif",
                                    lineHeight: 1.2,
                                    color: '#111827'
                                }}>
                                    <span style={{ color: VAYYAR_BLUE }}>
                                        {title.split(' ')[0]}
                                    </span>
                                    {title.includes(' ') ? ' ' + title.split(' ').slice(1).join(' ') : ''}
                                </h2>
                            )}
                        </div>

                        {/* Right Column - Content and Button */}
                        <div style={{
                            flex: '1 1 500px',
                            display: 'flex',
                            flexDirection: 'column',
                        }}>
                            {content && (
                                <h3 style={{
                                    fontSize: "clamp(1.25rem, 2.5vw, 1.75rem)",
                                    fontWeight: "300",
                                    lineHeight: "1.6",
                                    color: '#333333',
                                    fontFamily: "Manrope, Inter, sans-serif",
                                }}>
                                    {content}
                                </h3>
                            )}

                            {/* Book a Demo Button */}
                            <div style={{ marginTop: '2rem' }}>
                                <button
                                    onClick={openContactModal}
                                    className="relative text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-opacity-80 transition-all duration-150 ease-in-out flex items-center justify-center overflow-hidden transform hover:scale-105 cursor-pointer"
                                    style={{ backgroundColor: "#FFA500" }}
                                >
                                    <span className="inline-block">Book a Demo</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Contact Modal */}
            {isDemoModalOpen && (
                <ContactModal
                    isOpen={isDemoModalOpen}
                    onClose={handleContactModalClose}
                />
            )}
        </div>
    );
};

export default Breather;
