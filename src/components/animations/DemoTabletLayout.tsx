import React, { useState, useEffect, ReactNode } from "react";
import "./animations.css";
import { SCENES } from "../../data/sceneRegistry";

// Define Scene interface if not already defined/imported
interface Scene {
    scene?: number; // Optional scene ID
    [key: string]: unknown; // Use 'unknown' for better type safety
}

// Export the props interface for DemoTabletLayout
export interface DemoTabletLayoutProps {
    children: ReactNode;
    time?: string;
    showMetrics?: boolean;
    criticalMetric?: number;
    currentQuery?: string; // For bubble display
    nextQuery?: string; // For bubble display
    textResponse?: string; // For bubble display
    scrollProgress?: number; // For bubble animations
    queryCompleteThreshold?: number;
    responseStartThreshold?: number;
    transitionStartThreshold?: number;
    contentTransitionThreshold?: number;
    scene: Scene; // Required scene info

    // --- Props for interactive input ---
    inputValue: string;
    onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onSend: () => void;
    inputPlaceholder?: string;
    showSendButtonHint?: boolean;
    onHideHint?: () => void;
}

/**
 * Reusable tablet layout component specifically for the Demo page.
 * Provides the standard tablet frame and manages chat bubble animations.
 * Includes an interactive input field at the bottom, controlled by props.
 */
const DemoTabletLayout: React.FC<DemoTabletLayoutProps> = ({
    children,
    time = "9:41 AM",
    showMetrics = false,
    criticalMetric = 0,
    currentQuery = "",
    nextQuery = "",
    textResponse = "",
    scrollProgress = 0,
    queryCompleteThreshold = 30,
    responseStartThreshold = 40,
    transitionStartThreshold = 85,
    contentTransitionThreshold = 95,
    scene,
    // --- Destructure new input props ---
    inputValue,
    onInputChange,
    onSend,
    inputPlaceholder = "Ask Vayyar something...",
    showSendButtonHint = false,
    onHideHint,
}) => {
    // State for animation control (simplified for bubbles)
    const [animationState, setAnimationState] = useState({
        showCurrentQueryBubble: false,
        showResponse: false,
        showNextQueryBubble: false,
        contentTransitioning: false,
        // Removed states related to internal input animations
    });

    // State for alert resolution
    const [alertResolved, setAlertResolved] = useState(false);

    // Calculate animation state based on scroll progress (for bubbles)
    useEffect(() => {
        const showCurrentQueryBubble = scrollProgress >= queryCompleteThreshold;
        const showResponse =
            scrollProgress >= responseStartThreshold &&
            scrollProgress < contentTransitionThreshold;
        const showNextQueryBubble =
            scrollProgress >= contentTransitionThreshold;
        const contentTransitioning =
            scrollProgress >= contentTransitionThreshold;

        setAnimationState((prevState) => ({
            ...prevState,
            showCurrentQueryBubble,
            showResponse,
            showNextQueryBubble,
            contentTransitioning,
        }));

        const sceneId =
            typeof scene === "object" && scene !== null ? scene.scene : scene;
        if (
            sceneId === SCENES.FALL_EVENT &&
            scrollProgress >= 83 &&
            scrollProgress <= 84 &&
            !alertResolved
        ) {
            setAlertResolved(true);
        }
    }, [
        scrollProgress,
        queryCompleteThreshold,
        responseStartThreshold,
        transitionStartThreshold,
        contentTransitionThreshold,
        scene,
        alertResolved,
    ]);

    // Handle Enter key press on the internal input
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && inputValue.trim()) {
            onSend(); // Use the passed-in onSend handler
            onHideHint?.(); // Also hide hint on send via Enter
        }
    };

    // --- Modified Input Change Handler ---
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        onInputChange(event); // Call original handler passed via props
        onHideHint?.(); // Call the hide hint handler
    };

    // Determine content class modifiers
    const contentClassModifiers = [];
    contentClassModifiers.push("with-chat"); // Assume chat layout is always needed
    if (showMetrics) contentClassModifiers.push("with-metrics");
    if (showMetrics) contentClassModifiers.push("with-chat-and-metrics");
    if (animationState.contentTransitioning)
        contentClassModifiers.push("transitioning");
    const contentClassString = `tablet-layout-content ${contentClassModifiers.join(
        " "
    )}`;

    // Render Fall Alert Banner (same as original)
    const renderFallAlert = () => {
        // ... (fall alert rendering logic remains the same) ...
        const sceneId =
            typeof scene === "object" && scene !== null ? scene.scene : scene;
        const showFallAlert =
            sceneId === SCENES.FALL_EVENT && scrollProgress >= 75;
        if (!showFallAlert) return null;
        return (
            <div /* ... alert attributes ... */>
                {/* ... alert content ... */}
            </div>
        );
    };

    return (
        <div className="tablet-container">
            <div className="tablet-frame">
                <div className="tablet-notch"></div>
                <div className="tablet-screen">
                    {renderFallAlert()}

                    {/* Header (same as original) */}
                    <div className="tablet-layout-header">
                        <div className="tablet-layout-header-logo">
                            <img src="/images/vayyar-logo.png" alt="Vayyar" />
                        </div>
                        <div className="tablet-layout-header-info">
                            <div className="tablet-layout-header-avatar">
                                <img src="/images/nurse.jpg" alt="Nurse" />
                            </div>
                        </div>
                    </div>

                    {/* Metrics Panel (same as original) */}
                    {showMetrics && (
                        <div className="tablet-layout-metrics">
                            {/* ... metrics items ... */}
                            <div className="tablet-layout-metrics-item">
                                <div className="tablet-layout-metrics-item-value">
                                    0
                                </div>
                                <div className="tablet-layout-metrics-item-label">
                                    Alerts
                                </div>
                            </div>
                            <div className="tablet-layout-metrics-divider"></div>
                            <div className="tablet-layout-metrics-item">
                                <div
                                    className={`tablet-layout-metrics-item-value ${
                                        criticalMetric > 0 ? "alert" : "normal"
                                    }`}
                                >
                                    {criticalMetric}
                                </div>
                                <div className="tablet-layout-metrics-item-label">
                                    Critical
                                </div>
                            </div>
                            <div className="tablet-layout-metrics-divider"></div>
                            <div className="tablet-layout-metrics-item">
                                <div className="tablet-layout-metrics-item-value">
                                    {criticalMetric > 0 ? 7 : 8}
                                </div>
                                <div className="tablet-layout-metrics-item-label">
                                    Monitored
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Content area with chat bubbles and responses */}
                    <div className={contentClassString}>
                        <div
                            className={`chat-content-container ${
                                animationState.contentTransitioning
                                    ? "transition-out"
                                    : ""
                            }`}
                            style={{
                                transform: animationState.contentTransitioning
                                    ? "translateY(-100%)"
                                    : "translateY(0)",
                                transition: "transform 1.5s ease-out",
                            }}
                        >
                            {/* Show current query bubble */}
                            {animationState.showCurrentQueryBubble &&
                                currentQuery && (
                                    <div className="animated-tablet-user-message">
                                        <div className="animated-tablet-user-message-text">
                                            {currentQuery}
                                        </div>
                                        <div className="animated-tablet-user-message-timestamp">
                                            {time}
                                        </div>
                                    </div>
                                )}

                            {/* Text response */}
                            {animationState.showResponse && textResponse && (
                                <div className="animated-tablet-bot-message">
                                    <div className="animated-tablet-bot-message-text">
                                        {textResponse}
                                    </div>
                                    <div className="animated-tablet-bot-message-timestamp">
                                        {time}
                                    </div>
                                </div>
                            )}

                            {/* Child content (Only chat history now) */}
                            {!animationState.contentTransitioning && children}
                        </div>

                        {/* Next query bubble */}
                        {animationState.showNextQueryBubble && nextQuery && (
                            <div
                                className="animated-tablet-user-message next-query" /* ... styles ... */
                            >
                                <div className="animated-tablet-user-message-text">
                                    {nextQuery}
                                </div>
                                <div className="animated-tablet-user-message-timestamp">
                                    {time}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* --- MODIFIED Chat Input Section --- */}
                    <div
                        className="tablet-layout-input"
                        style={{ position: "relative" }}
                    >
                        {/* --- Bouncing Arrow Hint --- */}
                        {showSendButtonHint && (
                            <svg
                                className="send-hint-arrow"
                                width="32"
                                height="32"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                style={{
                                    position: "absolute",
                                    bottom: "60px",
                                    right: "19px",
                                    color: "#E74C3C",
                                    pointerEvents: "none",
                                    zIndex: 10,
                                    filter: "drop-shadow(0 2px 2px rgba(0,0,0,0.3))",
                                }}
                            >
                                <path
                                    d="M12 5L12 19"
                                    stroke="currentColor"
                                    strokeWidth="2.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                <path
                                    d="M7 14L12 19L17 14"
                                    stroke="currentColor"
                                    strokeWidth="2.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        )}
                        {/* --- End Bouncing Arrow Hint --- */}

                        <input
                            type="text"
                            className="tablet-layout-input-field"
                            placeholder={inputPlaceholder}
                            value={inputValue}
                            onChange={handleInputChange}
                            onKeyDown={handleKeyDown}
                        />
                        <button
                            className="tablet-layout-input-button"
                            onClick={() => {
                                onSend();
                                onHideHint?.();
                            }}
                            disabled={!inputValue.trim()}
                            aria-label="Send message"
                        >
                            <img
                                src="/images/vayyar-logo-white.png"
                                alt="Vayyar"
                                style={{
                                    width: "60%",
                                    height: "60%",
                                    objectFit: "contain",
                                }}
                            />
                        </button>
                    </div>
                    {/* --- END Modified Chat Input Section --- */}
                </div>{" "}
                {/* End tablet-screen */}
            </div>{" "}
            {/* End tablet-frame */}
        </div> // End tablet-container
    );
};

export default DemoTabletLayout;
