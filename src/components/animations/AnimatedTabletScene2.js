import React, { useState, useEffect } from "react";
import TabletLayout from "./TabletLayout";
import "./animations.css";

const AnimatedTabletScene2 = ({ scrollProgress = 0, scene }) => {
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
                    height: `${chartHeight * focusScaleFactor}px`,
                }}
            >
                {/* Y-axis label */}
                <div className="y-axis-label">Falls</div>

                {/* Chart grid lines */}
                <div
                    className="chart-grid"
                    style={{
                        backgroundSize: `100% ${
                            (chartHeight * focusScaleFactor) / 3
                        }px`,
                    }}
                />

                {/* Bars for fall events */}
                <div className="bars-container">
                    {fallData.map((fall, index) => (
                        <div
                            key={index}
                            className="bar-item"
                            style={{
                                width: `${barWidth * focusScaleFactor}px`,
                                marginRight: `${
                                    barSpacing * focusScaleFactor
                                }px`,
                            }}
                        >
                            <div
                                className={`bar ${
                                    fall.detected ? "detected" : "hidden"
                                } ${
                                    animationState.showQueryResponse
                                        ? "visible"
                                        : ""
                                }`}
                                style={{
                                    height: `${
                                        fall.height * focusScaleFactor
                                    }px`,
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
                                        className="hidden-label"
                                        style={{
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
                                className="day-label"
                                style={{
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
                                className="time-label"
                                style={{
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
                    className="chart-legend"
                    style={{
                        opacity: animationState.showQueryResponse ? 1 : 0,
                    }}
                >
                    <div className="legend-item">
                        <div className="legend-color hidden"></div>
                        <span>Hidden</span>
                    </div>
                    <div className="legend-item">
                        <div className="legend-color detected"></div>
                        <span>Detected</span>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <TabletLayout
            showMetrics={true}
            time="10:15 AM"
            showChatInput={true}
            inputValue=""
        >
            <div
                className={`scene-content-container ${
                    animationState.focusedChart ? "focused-chart" : ""
                }`}
            >
                <h3 className="scene-title">
                    Fall Analysis for Joe (Room 208)
                </h3>

                <div className="scene-date">May 1 - May 30, 2023</div>

                {/* Falls chart */}
                {renderFallsChart()}
            </div>
        </TabletLayout>
    );
};

export default AnimatedTabletScene2;
