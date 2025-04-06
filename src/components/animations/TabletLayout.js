import React, { useState, useEffect } from "react";
import "./animations.css";

/**
 * Reusable tablet layout component that provides the common structure for all scenes
 * with a standardized animation flow for chat interactions
 * @param {object} props - Component props
 * @param {React.ReactNode} props.children - Content to render inside the tablet (visual response or additional content)
 * @param {string} props.time - Time to display in header
 * @param {boolean} props.showMetrics - Whether to show the metrics panel (defaults to false)
 * @param {number} props.criticalMetric - Value to display in Critical metric (defaults to 0)
 * @param {string} props.query - User query text
 * @param {string} props.textResponse - Text response from VayyarCare (if response is text-based)
 * @param {number} props.scrollProgress - Current scroll progress (0-100)
 * @param {number} props.queryStartThreshold - Scroll progress at which to start typing query (defaults to 10)
 * @param {number} props.queryCompleteThreshold - Scroll progress at which query is complete (defaults to 30)
 * @param {number} props.responseStartThreshold - Scroll progress at which to show response (defaults to 40)
 */
const TabletLayout = ({
    children,
    time = "9:41 AM",
    showMetrics = false,
    criticalMetric = 0,
    query = "",
    textResponse = "",
    scrollProgress = 0,
    queryStartThreshold = 10,
    queryCompleteThreshold = 30,
    responseStartThreshold = 40,
}) => {
    // State for animation control
    const [animationState, setAnimationState] = useState({
        showTypingQuery: false,
        showQueryBubble: false,
        showResponse: false,
        currentInputValue: "",
    });

    // Calculate animation state based on scroll progress
    useEffect(() => {
        // Calculate how much of the query to show as typing progresses
        const queryProgress = Math.min(
            1,
            Math.max(
                0,
                (scrollProgress - queryStartThreshold) /
                    (queryCompleteThreshold - queryStartThreshold)
            )
        );
        const inputValue = query.substring(
            0,
            Math.floor(queryProgress * query.length)
        );

        setAnimationState({
            showTypingQuery:
                scrollProgress >= queryStartThreshold &&
                scrollProgress < queryCompleteThreshold,
            showQueryBubble: scrollProgress >= queryCompleteThreshold,
            showResponse: scrollProgress >= responseStartThreshold,
            currentInputValue: inputValue,
        });
    }, [
        scrollProgress,
        query,
        queryStartThreshold,
        queryCompleteThreshold,
        responseStartThreshold,
    ]);

    // Determine content class modifiers based on what is shown
    const contentClassModifiers = [];
    if (true) contentClassModifiers.push("with-chat"); // Always show chat input
    if (showMetrics) contentClassModifiers.push("with-metrics");
    if (showMetrics) contentClassModifiers.push("with-chat-and-metrics");

    // Create content class string
    const contentClassString = `tablet-layout-content ${contentClassModifiers.join(
        " "
    )}`;

    return (
        <div className="tablet-container">
            <div className="tablet-frame">
                <div className="tablet-notch"></div>

                <div className="tablet-screen">
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
                        {/* Show query bubble if complete */}
                        {animationState.showQueryBubble && (
                            <div className="animated-tablet-user-message">
                                <div className="animated-tablet-user-message-text">
                                    {query}
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
                        {animationState.showResponse && children}
                    </div>

                    {/* Chat input - always visible */}
                    <div className="tablet-layout-input">
                        <input
                            type="text"
                            className="tablet-layout-input-field"
                            placeholder="Ask Vayyar something..."
                            value={
                                animationState.showTypingQuery
                                    ? animationState.currentInputValue
                                    : ""
                            }
                            readOnly
                        />
                        <button className="tablet-layout-input-button">
                            <i className="fa fa-paper-plane"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TabletLayout;
