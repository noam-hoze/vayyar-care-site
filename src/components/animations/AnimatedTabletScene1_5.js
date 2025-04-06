import React, { useState, useEffect } from "react";
import TabletLayout from "./TabletLayout";
import "./animations.css";

const AnimatedTabletScene1_5 = ({ scrollProgress = 0, scene }) => {
    // Animation state based on scroll position
    const [animationState, setAnimationState] = useState({
        showQueryResponse: false,
        showNote: false,
    });

    // Update animation state based on scroll progress
    useEffect(() => {
        setAnimationState({
            showQueryResponse: scrollProgress >= 20,
            showNote: scrollProgress >= 60,
        });
    }, [scrollProgress]);

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

    // Render the bar chart for falls
    const renderFallsChart = () => {
        const chartHeight = 120;
        const barWidth = 28;
        const barSpacing = 8;

        return (
            <div
                className={animationState.showQueryResponse ? "visible" : ""}
                style={{
                    marginTop: "16px",
                    position: "relative",
                    height: `${chartHeight}px`,
                    marginBottom: "16px",
                    opacity: animationState.showQueryResponse ? 1 : 0,
                    transition: "opacity 0.8s ease",
                }}
            >
                {/* Y-axis label */}
                <div
                    style={{
                        position: "absolute",
                        left: "-18px",
                        top: "50%",
                        transform: "rotate(-90deg) translateX(50%)",
                        fontSize: "10px",
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
                                    opacity: animationState.showQueryResponse
                                        ? 1
                                        : 0,
                                    transform: animationState.showQueryResponse
                                        ? "translateY(0)"
                                        : "translateY(20px)",
                                    transition: `opacity 0.8s ease ${
                                        0.1 * index
                                    }s, transform 0.8s ease ${0.1 * index}s`,
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
                                                animationState.showQueryResponse
                                                    ? 1
                                                    : 0,
                                            transition: `opacity 0.8s ease ${
                                                0.1 * index + 0.3
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
                                    opacity: animationState.showQueryResponse
                                        ? 1
                                        : 0,
                                    transition: `opacity 0.8s ease ${
                                        0.1 * index + 0.2
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
                                    opacity: animationState.showQueryResponse
                                        ? 1
                                        : 0,
                                    transition: `opacity 0.8s ease ${
                                        0.1 * index + 0.2
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
                        opacity: animationState.showQueryResponse ? 1 : 0,
                        transition: "opacity 0.8s ease 0.7s",
                        fontSize: "9px",
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

    // Render the user note
    const renderUserNote = () => (
        <div
            className={`fade-in ${animationState.showNote ? "visible" : ""}`}
            style={{
                padding: "10px",
                marginTop: "10px",
                borderRadius: "6px",
                backgroundColor: "#F8F9FA",
                boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
                borderLeft: "3px solid #2D7DD2",
                animation: "fadeIn 0.5s ease",
                fontSize: "12px",
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
            <div>Enter Joe to a program that strengthens his muscle</div>
        </div>
    );

    return (
        <TabletLayout
            showMetrics={true}
            time="10:15 AM"
            showChatInput={true}
            inputValue=""
        >
            <div
                style={{
                    position: "relative",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    padding: "0 8px",
                }}
            >
                <h3
                    style={{
                        fontSize: "16px",
                        margin: "0 0 4px 0",
                        color: "#333",
                    }}
                >
                    Fall Analysis for Joe (Room 208)
                </h3>

                <div
                    style={{
                        fontSize: "12px",
                        color: "#6C757D",
                        marginBottom: "10px",
                    }}
                >
                    May 1 - May 30, 2023
                </div>

                {/* Falls chart */}
                {renderFallsChart()}

                {/* Summary */}
                <div
                    className={`fade-in ${
                        animationState.showQueryResponse ? "visible" : ""
                    }`}
                    style={{
                        fontSize: "12px",
                        color: "#343A40",
                        lineHeight: "1.3",
                        animation: "fadeIn 0.8s ease",
                    }}
                >
                    <strong>Analysis:</strong> Joe has experienced 7 falls in
                    the past month, with 5 of them being undetected by staff.
                    All incidents occurred during nighttime hours, primarily
                    between 12 AM and 4 AM.
                </div>

                {/* User note */}
                {animationState.showNote && renderUserNote()}
            </div>
        </TabletLayout>
    );
};

export default AnimatedTabletScene1_5;
