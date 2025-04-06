import React, { useState, useEffect } from "react";
import "./animations.css";
import { SCENES } from "../../data/sceneRegistry";

/**
 * Reusable tablet layout component that provides the common structure for all scenes
 * with a standardized animation flow for chat interactions that bridge between scenes
 * @param {object} props - Component props
 * @param {React.ReactNode} props.children - Content to render inside the tablet (visual response for current scene)
 * @param {string} props.time - Time to display in header
 * @param {boolean} props.showMetrics - Whether to show the metrics panel (defaults to false)
 * @param {number} props.criticalMetric - Value to display in Critical metric (defaults to 0)
 * @param {string} props.currentQuery - Query text for current scene
 * @param {string} props.nextQuery - Query text for next scene (bridge query)
 * @param {string} props.textResponse - Text response from VayyarCare (if response is text-based)
 * @param {number} props.scrollProgress - Current scroll progress (0-100)
 * @param {number} props.queryStartThreshold - Scroll progress at which to start typing current query (defaults to 10)
 * @param {number} props.queryCompleteThreshold - Scroll progress at which query is complete (defaults to 30)
 * @param {number} props.responseStartThreshold - Scroll progress at which to show response (defaults to 40)
 * @param {number} props.transitionStartThreshold - Scroll progress at which to start typing next query (defaults to 85)
 * @param {number} props.contentTransitionThreshold - Scroll progress at which to transition content (defaults to 95)
 * @param {number} props.scene - Current scene ID from SCENES
 */
const TabletLayout = ({
    children,
    time = "9:41 AM",
    showMetrics = false,
    criticalMetric = 0,
    currentQuery = "",
    nextQuery = "",
    textResponse = "",
    scrollProgress = 0,
    queryStartThreshold = 10,
    queryCompleteThreshold = 30,
    responseStartThreshold = 40,
    transitionStartThreshold = 85,
    contentTransitionThreshold = 95,
    scene,
}) => {
    // State for animation control
    const [animationState, setAnimationState] = useState({
        showTypingCurrentQuery: false,
        showCurrentQueryBubble: false,
        showResponse: false,
        showTypingNextQuery: false,
        showNextQueryBubble: false,
        contentTransitioning: false,
        contentSliding: false,
        currentInputValue: "",
        nextInputValue: "",
        buttonClicked: false,
        bubbleAnimating: false,
    });

    // Calculate animation state based on scroll progress
    useEffect(() => {
        // Calculate how much of the current query to show as typing progresses
        const queryProgress = Math.min(
            1,
            Math.max(
                0,
                (scrollProgress - queryStartThreshold) /
                    (queryCompleteThreshold - queryStartThreshold)
            )
        );
        const currentInputValue = currentQuery.substring(
            0,
            Math.floor(queryProgress * currentQuery.length)
        );

        // Calculate how much of the next query to show as typing progresses
        const nextQueryProgress = Math.min(
            1,
            Math.max(
                0,
                (scrollProgress - transitionStartThreshold) /
                    (contentTransitionThreshold - transitionStartThreshold)
            )
        );
        const nextInputValue = nextQuery.substring(
            0,
            Math.floor(nextQueryProgress * nextQuery.length)
        );

        // Determine if we should show the typing animation
        const isTypingCurrentQuery =
            scrollProgress >= queryStartThreshold &&
            scrollProgress < queryCompleteThreshold &&
            !animationState.buttonClicked; // Don't show typing if button was clicked

        // Only show bubble after typing is complete AND when we're not in the next query transition yet
        // or if the send button was clicked
        const showCurrentQueryBubble =
            scrollProgress >= queryCompleteThreshold ||
            animationState.buttonClicked;

        setAnimationState((prevState) => ({
            ...prevState,
            showTypingCurrentQuery: isTypingCurrentQuery,
            showCurrentQueryBubble: showCurrentQueryBubble,
            showResponse:
                scrollProgress >= responseStartThreshold &&
                scrollProgress < contentTransitionThreshold,
            showTypingNextQuery:
                scrollProgress >= transitionStartThreshold &&
                scrollProgress < contentTransitionThreshold,
            showNextQueryBubble: scrollProgress >= contentTransitionThreshold,
            contentTransitioning: scrollProgress >= contentTransitionThreshold,
            currentInputValue,
            nextInputValue,
        }));
    }, [
        scrollProgress,
        currentQuery,
        nextQuery,
        queryStartThreshold,
        queryCompleteThreshold,
        responseStartThreshold,
        transitionStartThreshold,
        contentTransitionThreshold,
        animationState.buttonClicked,
    ]);

    // Handle the send button click
    const handleSendClick = () => {
        if (
            !animationState.buttonClicked &&
            !animationState.showCurrentQueryBubble &&
            currentQuery.length > 0
        ) {
            // First show the query in the input
            setAnimationState((prevState) => ({
                ...prevState,
                currentInputValue: currentQuery,
            }));

            // Short delay before triggering animation
            setTimeout(() => {
                // Start the animation sequence - slide everything up
                setAnimationState((prevState) => ({
                    ...prevState,
                    buttonClicked: true,
                    bubbleAnimating: true,
                    showResponse: true, // Keep response visible for animation
                    currentInputValue: "", // Clear the input field
                }));

                // After animation is complete, reset states
                setTimeout(() => {
                    setAnimationState((prevState) => ({
                        ...prevState,
                        bubbleAnimating: false,
                    }));
                }, 2000); // Match animation duration
            }, 300);
        }
    };

    // Determine content class modifiers based on what is shown
    const contentClassModifiers = [];
    contentClassModifiers.push("with-chat"); // Always show chat input
    if (showMetrics) contentClassModifiers.push("with-metrics");
    if (showMetrics) contentClassModifiers.push("with-chat-and-metrics");
    if (animationState.contentTransitioning)
        contentClassModifiers.push("transitioning");

    // Create content class string
    const contentClassString = `tablet-layout-content ${contentClassModifiers.join(
        " "
    )}`;

    // Render Fall Alert Banner
    const renderFallAlert = () => {
        // Only check for scrollProgress >= 75 for now (removing scene check for testing)
        const showFallAlert = scrollProgress >= 75;

        if (!showFallAlert) return null;

        return (
            <div
                className="tablet-layout-alert alert-banner alert-flicker"
                style={{
                    backgroundColor: "#E63946",
                    color: "white",
                    padding: "12px 15px",
                    margin: "0",
                    fontWeight: "bold",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    boxShadow: "0 4px 8px rgba(230, 57, 70, 0.3)",
                    zIndex: 1000,
                    position: "relative",
                    opacity: showFallAlert ? 1 : 0,
                    transform: showFallAlert
                        ? "translateY(0)"
                        : "translateY(-100%)",
                    transition: "opacity 0.3s ease, transform 0.3s ease",
                }}
            >
                <div style={{ display: "flex", alignItems: "center" }}>
                    <span style={{ marginRight: "10px", fontSize: "18px" }}>
                        ⚠️
                    </span>
                    <div>
                        <div style={{ fontSize: "14px" }}>FALL DETECTED</div>
                        <div style={{ fontSize: "12px", opacity: "0.9" }}>
                            Room 208 - John Smith - Just now
                        </div>
                    </div>
                </div>
                <div
                    style={{
                        backgroundColor: "rgba(255,255,255,0.2)",
                        padding: "5px 8px",
                        borderRadius: "4px",
                        fontSize: "12px",
                    }}
                >
                    URGENT
                </div>
            </div>
        );
    };

    return (
        <div className="tablet-container">
            <div className="tablet-frame">
                <div className="tablet-notch"></div>

                <div className="tablet-screen">
                    {/* Fall Alert - positioned at the very top */}
                    {renderFallAlert()}

                    {/* Header */}
                    <div className="tablet-layout-header">
                        <div className="tablet-layout-header-logo">
                            <img src="/images/vayyar-logo.png" alt="Vayyar" />
                        </div>
                        <div className="tablet-layout-header-info">
                            <div className="tablet-layout-header-time">
                                {time}
                            </div>
                            <div className="tablet-layout-header-avatar">
                                <img src="/images/nurse.jpg" alt="Nurse" />
                            </div>
                        </div>
                    </div>

                    {/* Metrics Panel */}
                    {showMetrics && (
                        <div className="tablet-layout-metrics">
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
                                    : animationState.bubbleAnimating
                                    ? "bubble-pushing"
                                    : ""
                            }`}
                            style={{
                                transform: animationState.contentTransitioning
                                    ? "translateY(-100%)"
                                    : "translateY(0)",
                                transition: "transform 1.5s ease-out",
                            }}
                        >
                            {/* Show current query bubble only after typing is complete or button is clicked */}
                            {animationState.showCurrentQueryBubble && (
                                <div
                                    className={`animated-tablet-user-message ${
                                        animationState.bubbleAnimating
                                            ? "button-triggered"
                                            : ""
                                    }`}
                                >
                                    <div className="animated-tablet-user-message-text">
                                        {currentQuery}
                                    </div>
                                    <div className="animated-tablet-user-message-timestamp">
                                        {time}
                                    </div>
                                </div>
                            )}

                            {/* Text response (if provided) */}
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

                            {/* Visual response or additional content */}
                            {animationState.showResponse &&
                                !animationState.contentTransitioning &&
                                children}
                        </div>

                        {/* Next query bubble (bridge to next scene) */}
                        {animationState.showNextQueryBubble && nextQuery && (
                            <div
                                className="animated-tablet-user-message next-query"
                                style={{
                                    opacity: animationState.showNextQueryBubble
                                        ? 1
                                        : 0,
                                    transform:
                                        animationState.showNextQueryBubble
                                            ? "translateY(0)"
                                            : "translateY(40px)",
                                    transition:
                                        "opacity 1.5s ease, transform 1.5s ease",
                                }}
                            >
                                <div className="animated-tablet-user-message-text">
                                    {nextQuery}
                                </div>
                                <div className="animated-tablet-user-message-timestamp">
                                    {time}
                                </div>
                            </div>
                        )}

                        {/* New bubble container that appears after content slides out */}
                        {animationState.bubbleAnimating && (
                            <div
                                className="new-message-container"
                                style={{
                                    position: "absolute",
                                    top: 0,
                                    left: 0,
                                    right: 0,
                                    bottom: 0,
                                    padding: "15px",
                                    display: "flex",
                                    flexDirection: "column",
                                    opacity: animationState.contentSliding
                                        ? 0
                                        : 1,
                                    transition: "opacity 0.3s ease-out",
                                    zIndex: 10,
                                }}
                            >
                                <div
                                    className={`animated-tablet-user-message ${
                                        animationState.bubbleAnimating
                                            ? "fresh-message"
                                            : ""
                                    }`}
                                >
                                    <div className="animated-tablet-user-message-text">
                                        {currentQuery}
                                    </div>
                                    <div className="animated-tablet-user-message-timestamp">
                                        {time}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Chat input - always visible */}
                    <div className="tablet-layout-input">
                        <input
                            type="text"
                            className="tablet-layout-input-field"
                            placeholder="Ask Vayyar something..."
                            value={
                                animationState.buttonClicked
                                    ? ""
                                    : animationState.showTypingNextQuery
                                    ? animationState.nextInputValue
                                    : animationState.showTypingCurrentQuery
                                    ? animationState.currentInputValue
                                    : ""
                            }
                            readOnly
                        />
                        <button
                            className="tablet-layout-input-button"
                            onClick={handleSendClick}
                        >
                            <i className="fa fa-paper-plane"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TabletLayout;
