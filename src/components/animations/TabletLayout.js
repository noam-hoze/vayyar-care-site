import React from "react";
import "./animations.css";

/**
 * Reusable tablet layout component that provides the common structure for all scenes
 * @param {object} props - Component props
 * @param {React.ReactNode} props.children - Content to render inside the tablet
 * @param {string} props.time - Time to display in header
 * @param {boolean} props.showChatInput - Whether to show the chat input (defaults to false)
 * @param {boolean} props.showMetrics - Whether to show the metrics panel (defaults to false)
 * @param {number} props.criticalMetric - Value to display in Critical metric (defaults to 0)
 * @param {string} props.inputValue - Text to display in the chat input field (defaults to empty string)
 */
const TabletLayout = ({
    children,
    time = "9:41 AM",
    showChatInput = false,
    showMetrics = false,
    criticalMetric = 0,
    inputValue = "",
}) => {
    // Determine content class modifiers based on what is shown
    const contentClassModifiers = [];
    if (showChatInput) contentClassModifiers.push("with-chat");
    if (showMetrics) contentClassModifiers.push("with-metrics");
    if (showChatInput && showMetrics)
        contentClassModifiers.push("with-chat-and-metrics");

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

                    {/* Content area */}
                    <div className={contentClassString}>{children}</div>

                    {/* Chat input */}
                    {showChatInput && (
                        <div className="tablet-layout-input">
                            <input
                                type="text"
                                className="tablet-layout-input-field"
                                placeholder="Ask Vayyar something..."
                                value={inputValue}
                                readOnly
                            />
                            <button className="tablet-layout-input-button">
                                <i className="fa fa-paper-plane"></i>
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default TabletLayout;
