import React, { useState, useEffect } from "react";
import TabletLayout from "./TabletLayout";
import "./animations.css";

const AnimatedTabletScene1_5 = ({ scrollProgress = 0, scene }) => {
    // Animation state based on scroll position
    const [animationState, setAnimationState] = useState({
        showQueryResponse: false,
        showNote: false,
        focusedChart: false,
    });

    // Update animation state based on scroll progress
    useEffect(() => {
        setAnimationState({
            showQueryResponse: scrollProgress >= 20,
            showNote: scrollProgress >= 60,
            focusedChart: scrollProgress >= 30 && scrollProgress <= 70,
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
        const focusScaleFactor = animationState.focusedChart ? 1.25 : 1;

        return (
            <div
                className={`fall-chart ${
                    animationState.showQueryResponse ? "visible" : ""
                } ${animationState.focusedChart ? "focused" : ""}`}
                style={{
                    marginTop: "16px",
                    position: "relative",
                    height: `${chartHeight * focusScaleFactor}px`,
                    marginBottom: animationState.focusedChart ? "24px" : "16px",
                    opacity: animationState.showQueryResponse ? 1 : 0,
                    transition:
                        "opacity 0.8s ease, height 0.5s ease, margin 0.5s ease, transform 0.5s ease",
                    transform: animationState.focusedChart
                        ? "scale(1.1)"
                        : "scale(1)",
                    transformOrigin: "center center",
                    zIndex: animationState.focusedChart ? 10 : 1,
                    boxShadow: animationState.focusedChart
                        ? "0 4px 12px rgba(0,0,0,0.15)"
                        : "none",
                    borderRadius: animationState.focusedChart ? "8px" : "0",
                    padding: animationState.focusedChart ? "12px" : "0",
                    backgroundColor: animationState.focusedChart
                        ? "rgba(255,255,255,0.95)"
                        : "transparent",
                }}
            >
                {/* Y-axis label */}
                <div
                    style={{
                        position: "absolute",
                        left: animationState.focusedChart ? "-24px" : "-18px",
                        top: "50%",
                        transform: "rotate(-90deg) translateX(50%)",
                        fontSize: animationState.focusedChart ? "12px" : "10px",
                        color: "#6C757D",
                        whiteSpace: "nowrap",
                        fontWeight: animationState.focusedChart
                            ? "bold"
                            : "normal",
                        transition: "all 0.5s ease",
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
                        backgroundSize: `100% ${
                            (chartHeight * focusScaleFactor) / 3
                        }px`,
                        transition: "all 0.5s ease",
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
                        transition: "all 0.5s ease",
                    }}
                >
                    {fallData.map((fall, index) => (
                        <div
                            key={index}
                            style={{
                                width: `${barWidth * focusScaleFactor}px`,
                                marginRight: `${
                                    barSpacing * focusScaleFactor
                                }px`,
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                transition: "all 0.5s ease",
                            }}
                        >
                            <div
                                style={{
                                    width: "100%",
                                    height: `${
                                        fall.height * focusScaleFactor
                                    }px`,
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
                                    }s, transform 0.8s ease ${
                                        0.1 * index
                                    }s, height 0.5s ease, width 0.5s ease`,
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
                                            fontSize:
                                                animationState.focusedChart
                                                    ? "10px"
                                                    : "8px",
                                            padding: animationState.focusedChart
                                                ? "2px 6px"
                                                : "1px 4px",
                                            borderRadius: "3px",
                                            whiteSpace: "nowrap",
                                            opacity:
                                                animationState.showQueryResponse
                                                    ? 1
                                                    : 0,
                                            transition: `opacity 0.8s ease ${
                                                0.1 * index + 0.3
                                            }s, font-size 0.5s ease, padding 0.5s ease`,
                                        }}
                                    >
                                        Hidden
                                    </div>
                                )}
                            </div>
                            <div
                                style={{
                                    transform: "rotate(-45deg)",
                                    fontSize: animationState.focusedChart
                                        ? "10px"
                                        : "8px",
                                    marginTop: "4px",
                                    whiteSpace: "nowrap",
                                    color: "#343A40",
                                    fontWeight: animationState.focusedChart
                                        ? "bold"
                                        : "normal",
                                    opacity: animationState.showQueryResponse
                                        ? 1
                                        : 0,
                                    transition: `opacity 0.8s ease ${
                                        0.1 * index + 0.2
                                    }s, font-size 0.5s ease, font-weight 0.5s ease`,
                                }}
                            >
                                {fall.day}
                            </div>
                            <div
                                style={{
                                    fontSize: animationState.focusedChart
                                        ? "9px"
                                        : "7px",
                                    color: "#6C757D",
                                    marginTop: "1px",
                                    opacity: animationState.showQueryResponse
                                        ? 1
                                        : 0,
                                    transition: `opacity 0.8s ease ${
                                        0.1 * index + 0.2
                                    }s, font-size 0.5s ease`,
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
                        transition:
                            "opacity 0.8s ease 0.7s, font-size 0.5s ease",
                        fontSize: animationState.focusedChart ? "11px" : "9px",
                    }}
                >
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            marginRight: "8px",
                            transition: "all 0.5s ease",
                        }}
                    >
                        <div
                            style={{
                                width: animationState.focusedChart
                                    ? "10px"
                                    : "8px",
                                height: animationState.focusedChart
                                    ? "10px"
                                    : "8px",
                                backgroundColor: "#E63946",
                                marginRight: "4px",
                                borderRadius: "2px",
                                transition: "all 0.5s ease",
                            }}
                        ></div>
                        <span>Hidden</span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center" }}>
                        <div
                            style={{
                                width: animationState.focusedChart
                                    ? "10px"
                                    : "8px",
                                height: animationState.focusedChart
                                    ? "10px"
                                    : "8px",
                                backgroundColor: "#3EBD93",
                                marginRight: "4px",
                                borderRadius: "2px",
                                transition: "all 0.5s ease",
                            }}
                        ></div>
                        <span>Detected</span>
                    </div>
                </div>

                {/* Focus indicator text */}
                {animationState.focusedChart && (
                    <div
                        style={{
                            position: "absolute",
                            top: "-30px",
                            left: "50%",
                            transform: "translateX(-50%)",
                            color: "#2D7DD2",
                            fontSize: "12px",
                            fontWeight: "bold",
                            backgroundColor: "rgba(45, 125, 210, 0.1)",
                            padding: "4px 8px",
                            borderRadius: "4px",
                            opacity: 1,
                            animation: "pulse 2s infinite",
                        }}
                    >
                    </div>
                )}
            </div>
        );
    };

 

    // Add some keyframe animations to CSS
    useEffect(() => {
        const style = document.createElement("style");
        style.textContent = `
            @keyframes pulse {
                0% { opacity: 0.7; }
                50% { opacity: 1; }
                100% { opacity: 0.7; }
            }
            
            .fall-chart.focused::before {
                content: '';
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: rgba(0,0,0,0.1);
                z-index: -1;
                pointer-events: none;
            }
        `;
        document.head.appendChild(style);
        return () => {
            document.head.removeChild(style);
        };
    }, []);

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
                    overflow: animationState.focusedChart ? "hidden" : "auto",
                }}
            >
                <h3
                    style={{
                        fontSize: animationState.focusedChart ? "18px" : "16px",
                        margin: "0 0 4px 0",
                        color: "#333",
                        transition: "font-size 0.5s ease",
                        opacity: animationState.focusedChart ? 0.7 : 1,
                    }}
                >
                    Fall Analysis for Joe (Room 208)
                </h3>

                <div
                    style={{
                        fontSize: "12px",
                        color: "#6C757D",
                        marginBottom: "10px",
                        opacity: animationState.focusedChart ? 0.7 : 1,
                        transition: "opacity 0.5s ease",
                    }}
                >
                    May 1 - May 30, 2023
                </div>

                {/* Falls chart */}
                {renderFallsChart()}
            </div>
        </TabletLayout>
    );
};

export default AnimatedTabletScene1_5;
