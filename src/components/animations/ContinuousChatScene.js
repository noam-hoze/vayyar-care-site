import React, { useState, useEffect, useRef } from "react";
import TabletLayout from "./TabletLayout";
import TypedText from "./TypedText";
import TypingIndicator from "./TypingIndicator";
import "./animations.css";

// Define the Vayyar blue color as a constant for reuse
const VAYYAR_BLUE = "rgba(5, 170, 233, 1)";

const ContinuousChatScene = ({ scrollProgress = 0, scene }) => {
    // Animation state based on scroll progress
    const [animationState, setAnimationState] = useState({
        showFirstUserQuestion: false,
        showBotTypingForSummary: false,
        showBotSummaryResponse: false,
        showSummaryList: false,
        showSecondUserTyping: false,
        showSecondUserQuestion: false,
        showBotTypingForFalls: false,
        showFallsResponse: false,
        showFallsChart: false,
        showFallsAnalysis: false,
        showUserNote: false,
    });

    // Ref for the chat container to handle scrolling
    const chatContainerRef = useRef(null);

    // Conversation data
    const firstUserMessage = "Show me yesterday's summary";
    const botSummaryGreeting = "Good morning Alice! Here's your shift summary.";
    const summaryItems = scene.content || [
        "Room 302: Resident shows signs of unsteady walking",
        "Room 214: Bathroom visits increased 40% overnight",
        "Room 117: Sleep quality decreased to 68%",
    ];
    const secondUserMessage =
        "Give me a breakdown of Joe's hidden falls in the past month?";

    // Fall data for the chart
    const fallData = [
        { day: "May 2", time: "2:34 AM", detected: false, height: 60 },
        { day: "May 5", time: "3:12 AM", detected: false, height: 50 },
        { day: "May 9", time: "4:05 AM", detected: true, height: 45 },
        { day: "May 14", time: "1:47 AM", detected: false, height: 75 },
        { day: "May 18", time: "2:52 AM", detected: false, height: 42 },
        { day: "May 23", time: "3:28 AM", detected: true, height: 55 },
        { day: "May 27", time: "12:19 AM", detected: false, height: 35 },
    ];

    // Input text state for typewriter effect
    const [firstInputProgress, setFirstInputProgress] = useState(0);
    const [secondInputProgress, setSecondInputProgress] = useState(0);

    // Define a completely separate function for handling the animation states
    const getAnimationStates = (progress) => {
        return {
            // First sequence animations
            showFirstUserQuestion: progress >= 5,
            // Direct transition to response with a slight delay (was 15, now 12)
            showBotSummaryResponse: progress >= 12,
            showSummaryList: progress >= 16, // Small delay after response appears

            // Second sequence animations
            showSecondUserTyping: progress >= 55 && progress < 65,
            showSecondUserQuestion: progress >= 65,
            // Direct transition to response with a slight delay (was 75, now 72)
            showFallsResponse: progress >= 72,
            showFallsChart: progress >= 76, // Small delay after response appears
            showFallsAnalysis: progress >= 82,
            showUserNote: progress >= 88,
        };
    };

    // Update animation state based on scroll progress
    useEffect(() => {
        // First sequence (0-50% of scroll)
        const firstSequenceProgress = Math.min(
            1,
            Math.max(0, scrollProgress / 50)
        );

        // Calculate typing progress for first message
        const firstTypingProgress = Math.min(
            1,
            Math.max(0, firstSequenceProgress * 5 - 0.2)
        );
        setFirstInputProgress(firstTypingProgress);

        // Second sequence (50-95% of scroll)
        // End at 95% to leave room for transition to next scene
        const secondSequenceProgress = Math.min(
            1,
            Math.max(0, (scrollProgress - 50) / 45)
        );

        // Calculate typing progress for second message
        const secondTypingProgress = Math.min(
            1,
            Math.max(0, secondSequenceProgress * 5 - 0.5)
        );
        setSecondInputProgress(secondTypingProgress);

        // Set animation states based on scroll progress with non-overlapping ranges
        const newState = getAnimationStates(scrollProgress);
        // Explicitly make sure typing indicators are never true
        newState.showBotTypingForSummary = false;
        newState.showBotTypingForFalls = false;
        setAnimationState(newState);

        // Auto-scroll chat container based on content
        if (chatContainerRef.current) {
            // Calculate scroll amount based on which messages are showing
            let scrollAmount = 0;

            if (scrollProgress > 50) {
                // Gradually scroll up as second sequence progresses
                // Cap at 200px to prevent over-scrolling
                scrollAmount = Math.min(200, (scrollProgress - 50) * 4);

                // If we're approaching the end of this scene, start fading out
                if (scrollProgress > 95) {
                    chatContainerRef.current.style.opacity =
                        1 - (scrollProgress - 95) * 20;
                } else {
                    chatContainerRef.current.style.opacity = 1;
                }
            }

            chatContainerRef.current.scrollTop = scrollAmount;
        }
    }, [scrollProgress, scene.content]);

    useEffect(() => {
        // Add CSS to hide scrollbars
        const style = document.createElement("style");
        style.textContent = `
            .chat-container::-webkit-scrollbar {
                display: none;
            }
        `;
        document.head.appendChild(style);

        return () => {
            document.head.removeChild(style);
        };
    }, []);

    // Render the summary list items
    const renderSummaryItems = () => (
        <div className="chat-summary-list">
            {summaryItems.map((item, index) => (
                <div
                    key={index}
                    className="chat-summary-item"
                    style={{
                        opacity: animationState.showSummaryList ? 1 : 0,
                        transform: animationState.showSummaryList
                            ? "translateY(0)"
                            : "translateY(10px)",
                        transition: `opacity 0.3s ease ${
                            index * 0.1 + 0.2
                        }s, transform 0.3s ease ${index * 0.1 + 0.2}s`,
                    }}
                >
                    <span className="chat-summary-bullet">•</span>
                    {item}
                </div>
            ))}
        </div>
    );

    // Render the falls chart
    const renderFallsChart = () => {
        const chartHeight = 120;
        const barWidth = 28;
        const barSpacing = 8;

        return (
            <div
                className="falls-chart"
                style={{
                    marginTop: "10px",
                    position: "relative",
                    height: `${chartHeight}px`,
                    width: "100%",
                    opacity: animationState.showFallsChart ? 1 : 0,
                    transform: animationState.showFallsChart
                        ? "translateY(0)"
                        : "translateY(20px)",
                    transition: "opacity 0.8s ease, transform 0.8s ease",
                }}
            >
                <div
                    style={{
                        position: "absolute",
                        left: "-14px",
                        top: "50%",
                        transform: "rotate(-90deg) translateX(50%)",
                        fontSize: "9px",
                        color: "#6C757D",
                        whiteSpace: "nowrap",
                    }}
                >
                    Falls
                </div>

                {/* Chart grid lines */}
                <div
                    style={{
                        position: "absolute",
                        top: 0,
                        left: "15px",
                        right: 0,
                        height: "100%",
                        borderLeft: "1px solid #E0E0E0",
                        borderBottom: "1px solid #E0E0E0",
                        backgroundImage:
                            "linear-gradient(to bottom, #F8F9FA 1px, transparent 1px)",
                        backgroundSize: `100% ${chartHeight / 3}px`,
                    }}
                />

                {/* Bars for fall events */}
                <div
                    style={{
                        display: "flex",
                        position: "absolute",
                        bottom: 0,
                        left: "15px",
                        height: "100%",
                        alignItems: "flex-end",
                    }}
                >
                    {fallData.map((fall, index) => (
                        <div
                            key={index}
                            style={{
                                width: `${barWidth}px`,
                                marginRight: `${barSpacing}px`,
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                            }}
                        >
                            <div
                                style={{
                                    width: "100%",
                                    height: `${fall.height}px`,
                                    backgroundColor: fall.detected
                                        ? "#3EBD93"
                                        : "#E63946",
                                    borderRadius: "3px 3px 0 0",
                                    position: "relative",
                                    opacity: animationState.showFallsChart
                                        ? 1
                                        : 0,
                                    transform: animationState.showFallsChart
                                        ? "translateY(0)"
                                        : "translateY(20px)",
                                    transition: `opacity 0.5s ease ${
                                        0.05 * index
                                    }s, transform 0.5s ease ${0.05 * index}s`,
                                }}
                            >
                                {!fall.detected && (
                                    <div
                                        style={{
                                            position: "absolute",
                                            top: "-16px",
                                            left: "50%",
                                            transform: "translateX(-50%)",
                                            backgroundColor: "#E63946",
                                            color: "white",
                                            fontSize: "8px",
                                            padding: "1px 4px",
                                            borderRadius: "3px",
                                            whiteSpace: "nowrap",
                                            opacity:
                                                animationState.showFallsChart
                                                    ? 1
                                                    : 0,
                                            transition: `opacity 0.5s ease ${
                                                0.05 * index + 0.2
                                            }s`,
                                        }}
                                    >
                                        Hidden
                                    </div>
                                )}
                            </div>
                            <div
                                style={{
                                    transform: "rotate(-45deg)",
                                    fontSize: "8px",
                                    marginTop: "4px",
                                    whiteSpace: "nowrap",
                                    color: "#343A40",
                                    opacity: animationState.showFallsChart
                                        ? 1
                                        : 0,
                                    transition: `opacity 0.5s ease ${
                                        0.05 * index + 0.1
                                    }s`,
                                }}
                            >
                                {fall.day}
                            </div>
                            <div
                                style={{
                                    fontSize: "7px",
                                    color: "#6C757D",
                                    marginTop: "1px",
                                    opacity: animationState.showFallsChart
                                        ? 1
                                        : 0,
                                    transition: `opacity 0.5s ease ${
                                        0.05 * index + 0.1
                                    }s`,
                                }}
                            >
                                {fall.time}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Legend */}
                <div
                    style={{
                        display: "flex",
                        justifyContent: "flex-end",
                        position: "absolute",
                        top: "-5px",
                        right: "0",
                        opacity: animationState.showFallsChart ? 1 : 0,
                        transition: "opacity 0.5s ease 0.3s",
                        fontSize: "8px",
                    }}
                >
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            marginRight: "8px",
                        }}
                    >
                        <div
                            style={{
                                width: "8px",
                                height: "8px",
                                backgroundColor: "#E63946",
                                marginRight: "4px",
                                borderRadius: "2px",
                            }}
                        ></div>
                        <span>Hidden</span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center" }}>
                        <div
                            style={{
                                width: "8px",
                                height: "8px",
                                backgroundColor: "#3EBD93",
                                marginRight: "4px",
                                borderRadius: "2px",
                            }}
                        ></div>
                        <span>Detected</span>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <TabletLayout
            showMetrics={true}
            time="9:42 AM"
            showChatInput={true}
            inputValue={
                animationState.showSecondUserTyping
                    ? secondUserMessage.substring(
                          0,
                          Math.floor(
                              secondInputProgress * secondUserMessage.length
                          )
                      )
                    : animationState.showFirstUserQuestion
                    ? ""
                    : firstUserMessage.substring(
                          0,
                          Math.floor(
                              firstInputProgress * firstUserMessage.length
                          )
                      )
            }
        >
            <div
                ref={chatContainerRef}
                className="chat-container"
                style={{
                    display: "flex",
                    flexDirection: "column",
                    height: "100%",
                    overflow: "auto",
                    paddingTop: "10px",
                    paddingBottom: "10px",
                    scrollbarWidth: "none" /* Firefox */,
                    msOverflowStyle: "none" /* IE and Edge */,
                    WebkitOverflowScrolling: "touch",
                }}
            >
                {/* First Question and Response Section */}
                <div
                    style={{
                        marginBottom: animationState.showSecondUserQuestion
                            ? "15px"
                            : "0",
                    }}
                >
                    {/* First User Message */}
                    {animationState.showFirstUserQuestion && (
                        <div
                            className="user-message-bubble"
                            style={{
                                alignSelf: "flex-end",
                                backgroundColor: VAYYAR_BLUE,
                                padding: "8px 12px",
                                borderRadius: "12px",
                                borderTopRightRadius: "4px",
                                maxWidth: "80%",
                                marginLeft: "auto",
                                marginBottom: "8px",
                                boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
                                fontSize: "14px",
                                position: "relative",
                                opacity: 1,
                                transform: "translateY(0)",
                                transition:
                                    "opacity 0.3s ease, transform 0.3s ease",
                                color: "white",
                            }}
                        >
                            <div style={{ marginBottom: "2px" }}>
                                {firstUserMessage}
                            </div>
                            <div
                                style={{
                                    fontSize: "10px",
                                    color: "rgba(255, 255, 255, 0.9)",
                                    textAlign: "right",
                                }}
                            >
                                9:41 AM
                            </div>
                        </div>
                    )}

                    {/* Bot Summary Response */}
                    {animationState.showBotSummaryResponse && (
                        <div
                            className="bot-message-bubble"
                            style={{
                                alignSelf: "flex-start",
                                backgroundColor: "white",
                                padding: "10px 12px",
                                borderRadius: "12px",
                                borderTopLeftRadius: "4px",
                                maxWidth: "85%",
                                marginBottom: "4px",
                                boxShadow: "0 1px 2px rgba(0,0,0,0.1)",
                                fontSize: "14px",
                            }}
                        >
                            <div>{botSummaryGreeting}</div>
                            <div
                                style={{
                                    fontSize: "10px",
                                    color: "#8E8E93",
                                    marginTop: "2px",
                                }}
                            >
                                9:42 AM
                            </div>
                        </div>
                    )}

                    {/* Summary List */}
                    {animationState.showBotSummaryResponse && (
                        <div
                            style={{
                                alignSelf: "flex-start",
                                backgroundColor: "white",
                                padding: "10px 12px",
                                borderRadius: "12px",
                                width: "85%",
                                marginBottom: "8px",
                                boxShadow: "0 1px 2px rgba(0,0,0,0.1)",
                                fontSize: "14px",
                            }}
                        >
                            <div
                                style={{
                                    fontWeight: "bold",
                                    marginBottom: "8px",
                                    opacity: animationState.showSummaryList
                                        ? 1
                                        : 0,
                                    transition: "opacity 0.3s ease 0.1s",
                                }}
                            >
                                Shift Summary
                            </div>
                            {renderSummaryItems()}
                        </div>
                    )}
                </div>

                {/* Second Question and Response Section */}
                <div>
                    {/* Second User Message */}
                    {animationState.showSecondUserQuestion && (
                        <div
                            className="user-message-bubble"
                            style={{
                                alignSelf: "flex-end",
                                backgroundColor: VAYYAR_BLUE,
                                padding: "8px 12px",
                                borderRadius: "12px",
                                borderTopRightRadius: "4px",
                                maxWidth: "80%",
                                marginLeft: "auto",
                                marginBottom: "8px",
                                boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
                                fontSize: "14px",
                                opacity: 1,
                                transform: "translateY(0)",
                                transition:
                                    "opacity 0.3s ease, transform 0.3s ease",
                                color: "white",
                            }}
                        >
                            <div style={{ marginBottom: "2px" }}>
                                {secondUserMessage}
                            </div>
                            <div
                                style={{
                                    fontSize: "10px",
                                    color: "rgba(255, 255, 255, 0.9)",
                                    textAlign: "right",
                                }}
                            >
                                9:45 AM
                            </div>
                        </div>
                    )}

                    {/* Bot Falls Response */}
                    {animationState.showFallsResponse && (
                        <div
                            className="bot-message-bubble"
                            style={{
                                alignSelf: "flex-start",
                                backgroundColor: "white",
                                padding: "10px 12px",
                                borderRadius: "12px",
                                borderTopLeftRadius: "4px",
                                width: "85%",
                                marginBottom: "8px",
                                boxShadow: "0 1px 2px rgba(0,0,0,0.1)",
                                fontSize: "14px",
                            }}
                        >
                            <div
                                style={{
                                    fontWeight: "bold",
                                    marginBottom: "6px",
                                    fontSize: "15px",
                                    opacity: animationState.showFallsResponse
                                        ? 1
                                        : 0,
                                    transition: "opacity 0.3s ease",
                                }}
                            >
                                Fall Analysis for Joe (Room 208)
                            </div>
                            <div
                                style={{
                                    color: "#666",
                                    fontSize: "12px",
                                    marginBottom: "10px",
                                    opacity: animationState.showFallsResponse
                                        ? 1
                                        : 0,
                                    transition: "opacity 0.3s ease 0.1s",
                                }}
                            >
                                May 1 - May 30, 2023
                            </div>

                            {/* Falls Chart */}
                            {renderFallsChart()}

                            {/* Falls Analysis Text */}
                            {animationState.showFallsAnalysis && (
                                <div
                                    style={{
                                        marginTop: "12px",
                                        fontSize: "13px",
                                        lineHeight: "1.3",
                                        opacity:
                                            animationState.showFallsAnalysis
                                                ? 1
                                                : 0,
                                        transform:
                                            animationState.showFallsAnalysis
                                                ? "translateY(0)"
                                                : "translateY(10px)",
                                        transition:
                                            "opacity 0.5s ease, transform 0.5s ease",
                                    }}
                                >
                                    <strong>Analysis:</strong> Joe has
                                    experienced 7 falls in the past month, with
                                    5 of them being undetected by staff. All
                                    incidents occurred during nighttime hours,
                                    primarily between 12 AM and 4 AM.
                                </div>
                            )}

                            {/* User note */}
                            {animationState.showUserNote && (
                                <div
                                    style={{
                                        marginTop: "15px",
                                        padding: "8px 10px",
                                        backgroundColor: "#F8F9FA",
                                        borderRadius: "6px",
                                        borderLeft: "3px solid #2D7DD2",
                                        fontSize: "12px",
                                        opacity: animationState.showUserNote
                                            ? 1
                                            : 0,
                                        transform: animationState.showUserNote
                                            ? "translateY(0)"
                                            : "translateY(10px)",
                                        transition:
                                            "opacity 0.5s ease, transform 0.5s ease",
                                    }}
                                >
                                    <div
                                        style={{
                                            fontWeight: "bold",
                                            marginBottom: "3px",
                                        }}
                                    >
                                        Note to self:
                                    </div>
                                    <div>
                                        Enter Joe to a program that strengthens
                                        his muscle
                                    </div>
                                </div>
                            )}

                            <div
                                style={{
                                    fontSize: "10px",
                                    color: "#8E8E93",
                                    marginTop: "10px",
                                    textAlign: "left",
                                }}
                            >
                                9:46 AM
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </TabletLayout>
    );
};

export default ContinuousChatScene;
