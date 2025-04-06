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

                <div
                    className="tablet-screen"
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        height: "100%",
                        width: "100%",
                        overflow: "hidden",
                        margin: "0 auto",
                    }}
                >
                    {/* Header */}
                    <div
                        className="tablet-layout-header"
                        style={{
                            flexShrink: 0,
                            padding: "10px 16px",
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            borderBottom: "1px solid #F0F0F0",
                        }}
                    >
                        <div className="tablet-layout-header-logo">
                            <img
                                src="/images/vayyar-logo.png"
                                alt="Vayyar"
                                style={{ height: "24px", width: "auto" }}
                            />
                        </div>
                        <div
                            className="tablet-layout-header-info"
                            style={{
                                display: "flex",
                                alignItems: "center",
                            }}
                        >
                            <div
                                className="tablet-layout-header-time"
                                style={{
                                    marginRight: "10px",
                                    fontSize: "14px",
                                    color: "#666",
                                }}
                            >
                                {time}
                            </div>
                            <div
                                className="tablet-layout-header-avatar"
                                style={{
                                    width: "32px",
                                    height: "32px",
                                    borderRadius: "50%",
                                    overflow: "hidden",
                                }}
                            >
                                <img
                                    src="/images/nurse.jpg"
                                    alt="Nurse"
                                    style={{
                                        width: "100%",
                                        height: "100%",
                                        objectFit: "cover",
                                    }}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Metrics Panel */}
                    {showMetrics && (
                        <div
                            className="tablet-layout-metrics"
                            style={{
                                flexShrink: 0,
                                display: "flex",
                                justifyContent: "space-around",
                                padding: "10px 0",
                                backgroundColor: "#FDFDFD",
                                borderBottom: "1px solid #F0F0F0",
                                boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
                            }}
                        >
                            <div
                                className="tablet-layout-metrics-item"
                                style={{
                                    flex: 1,
                                    textAlign: "center",
                                }}
                            >
                                <div
                                    className="tablet-layout-metrics-item-value"
                                    style={{
                                        fontSize: "18px",
                                        fontWeight: "bold",
                                    }}
                                >
                                    0
                                </div>
                                <div
                                    className="tablet-layout-metrics-item-label"
                                    style={{
                                        fontSize: "12px",
                                        color: "#666",
                                    }}
                                >
                                    Alerts
                                </div>
                            </div>

                            <div
                                className="tablet-layout-metrics-divider"
                                style={{
                                    width: "1px",
                                    backgroundColor: "#E0E0E0",
                                    margin: "0 8px",
                                }}
                            ></div>

                            <div
                                className="tablet-layout-metrics-item"
                                style={{
                                    flex: 1,
                                    textAlign: "center",
                                }}
                            >
                                <div
                                    className={`tablet-layout-metrics-item-value ${
                                        criticalMetric > 0 ? "alert" : "normal"
                                    }`}
                                    style={{
                                        fontSize: "18px",
                                        fontWeight: "bold",
                                        color:
                                            criticalMetric > 0
                                                ? "#E63946"
                                                : "inherit",
                                    }}
                                >
                                    {criticalMetric}
                                </div>
                                <div
                                    className="tablet-layout-metrics-item-label"
                                    style={{
                                        fontSize: "12px",
                                        color: "#666",
                                    }}
                                >
                                    Critical
                                </div>
                            </div>

                            <div
                                className="tablet-layout-metrics-divider"
                                style={{
                                    width: "1px",
                                    backgroundColor: "#E0E0E0",
                                    margin: "0 8px",
                                }}
                            ></div>

                            <div
                                className="tablet-layout-metrics-item"
                                style={{
                                    flex: 1,
                                    textAlign: "center",
                                }}
                            >
                                <div
                                    className="tablet-layout-metrics-item-value monitored"
                                    style={{
                                        fontSize: "18px",
                                        fontWeight: "bold",
                                        color: "#3EBD93",
                                    }}
                                >
                                    100%
                                </div>
                                <div
                                    className="tablet-layout-metrics-item-label"
                                    style={{
                                        fontSize: "12px",
                                        color: "#666",
                                    }}
                                >
                                    Monitored
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Content Area */}
                    <div
                        className={contentClassString}
                        style={{
                            flex: 1,
                            overflow: "hidden",
                            padding: "12px 10px",
                            display: "flex",
                            flexDirection: "column",
                            scrollbarWidth: "none" /* Firefox */,
                            msOverflowStyle: "none" /* IE and Edge */,
                            WebkitOverflowScrolling: "touch",
                        }}
                    >
                        {children}
                    </div>

                    {/* Chat Input */}
                    {showChatInput && (
                        <div
                            className="tablet-layout-chat-input"
                            style={{
                                flexShrink: 0,
                                padding: "10px",
                                borderTop: "1px solid #F0F0F0",
                            }}
                        >
                            <div
                                className="tablet-layout-chat-input-container"
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    border: "1px solid #E0E0E0",
                                    borderRadius: "24px",
                                    overflow: "hidden",
                                    backgroundColor: "white",
                                }}
                            >
                                <input
                                    type="text"
                                    placeholder="Message VayyarCare..."
                                    value={inputValue}
                                    readOnly
                                    style={{
                                        flex: 1,
                                        border: "none",
                                        padding: "10px 16px",
                                        fontSize: "14px",
                                        outline: "none",
                                    }}
                                />
                                <button
                                    style={{
                                        width: "38px",
                                        height: "38px",
                                        borderRadius: "50%",
                                        backgroundColor: "#2D7DD2",
                                        color: "white",
                                        border: "none",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        fontWeight: "bold",
                                        cursor: "pointer",
                                    }}
                                >
                                    ↑
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default TabletLayout;
