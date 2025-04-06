import React from "react";
import TabletLayout from "./TabletLayout";
import "./animations.css";

const AnimatedTabletScene5 = ({ scrollProgress = 0, scene }) => {
    // Current scene query (which is a continuation from scene 4)
    const currentQuery = "Show me Ray's full diagnosis";

    // No next query since this is the last scene
    const nextQuery = "";

    // Check if specific components should be shown based on scroll progress
    const showMobility = scrollProgress >= 10;
    const showSleepData = scrollProgress >= 30;
    const showFallRisk = scrollProgress >= 50;
    const showRecommendation = scrollProgress >= 75;

    // Mobility data for Ray
    const mobilityData = [
        { month: "Jan", steps: 1245, outOfRoom: 8 },
        { month: "Feb", steps: 1102, outOfRoom: 6 },
        { month: "Mar", steps: 876, outOfRoom: 5 },
        { month: "Apr", steps: 932, outOfRoom: 4 },
        { month: "May", steps: 721, outOfRoom: 3 },
        { month: "Jun", steps: 653, outOfRoom: 2 },
        { month: "Jul", steps: 540, outOfRoom: 1 },
    ];

    // Sleep data for Ray
    const sleepData = [
        { day: "Mon", hours: 4.8, interruptions: 6 },
        { day: "Tue", hours: 5.1, interruptions: 5 },
        { day: "Wed", hours: 4.5, interruptions: 7 },
        { day: "Thu", hours: 5.3, interruptions: 4 },
        { day: "Fri", hours: 4.2, interruptions: 8 },
        { day: "Sat", hours: 5.0, interruptions: 6 },
        { day: "Sun", hours: 4.7, interruptions: 7 },
    ];

    // Fall risk factors and scores
    const fallRiskData = {
        mobilityScore: 72,
        balanceScore: 65,
        medicationRisk: 58,
        nighttimeActivity: 86,
        previousFalls: 3,
        overall: 78,
    };

    // Render mobility chart
    const renderMobilityChart = () => {
        const maxSteps = Math.max(...mobilityData.map((d) => d.steps));
        const barWidth = 25;
        const barSpacing = 10;
        const chartHeight = 120;

        return (
            <div
                className="data-visualization-container"
                style={{
                    opacity: showMobility ? 1 : 0,
                    transform: showMobility
                        ? "translateY(0)"
                        : "translateY(20px)",
                    transition: "opacity 0.5s ease, transform 0.5s ease",
                }}
            >
                <div
                    className="bar-chart-container"
                    style={{
                        height: `${chartHeight}px`,
                        position: "relative",
                        paddingTop: "10px",
                    }}
                >
                    {mobilityData.map((data, index) => (
                        <div
                            key={index}
                            className="bar-column"
                            style={{
                                width: `${barWidth}px`,
                                marginRight: `${barSpacing}px`,
                            }}
                        >
                            <div
                                className="bar-value"
                                style={{
                                    marginBottom: "8px",
                                    fontWeight: "500",
                                }}
                            >
                                {data.steps}
                            </div>
                            <div
                                className="bar"
                                style={{
                                    height: `${
                                        (data.steps / maxSteps) *
                                        chartHeight *
                                        0.8
                                    }px`,
                                    backgroundColor: "#4a86e8",
                                    transition: "height 0.5s ease",
                                }}
                            ></div>
                            <div className="bar-label">{data.month}</div>
                            <div className="secondary-label">
                                {data.outOfRoom} trips
                            </div>
                        </div>
                    ))}
                </div>

                <div className="chart-insights">
                    <div className="insight-item">
                        <span className="insight-label">Average Steps:</span>
                        <span className="insight-value">
                            {Math.round(
                                mobilityData.reduce(
                                    (acc, data) => acc + data.steps,
                                    0
                                ) / mobilityData.length
                            )}
                        </span>
                    </div>
                    <div className="insight-item">
                        <span className="insight-label">
                            Room Exits (Total):
                        </span>
                        <span className="insight-value">
                            {mobilityData.reduce(
                                (acc, data) => acc + data.outOfRoom,
                                0
                            )}
                        </span>
                    </div>
                    <div className="insight-item">
                        <span className="insight-label">Mobility Trend:</span>
                        <span className="insight-value declining">
                            Declining (-57%)
                        </span>
                    </div>
                </div>
            </div>
        );
    };

    // Render sleep data
    const renderSleepData = () => {
        const maxHours = 8; // For scale
        const barWidth = 25; // Reduced from 30
        const barSpacing = 10; // Reduced from 15
        const chartHeight = 120; // Reduced from 150

        return (
            <div
                className="data-visualization-container"
                style={{
                    opacity: showSleepData ? 1 : 0,
                    transform: showSleepData
                        ? "translateY(0)"
                        : "translateY(20px)",
                    transition: "opacity 0.5s ease, transform 0.5s ease",
                    marginTop: "10px",
                }}
            >
                <h3
                    className="chart-title"
                    style={{ marginBottom: "15px", fontSize: "14px" }}
                >
                    Sleep Quality Analysis
                </h3>

                <div
                    className="bar-chart-container"
                    style={{
                        height: `${chartHeight}px`,
                        marginTop: "5px",
                        position: "relative",
                        paddingTop: "10px",
                    }}
                >
                    {sleepData.map((day, index) => (
                        <div
                            key={index}
                            className="bar-column"
                            style={{
                                width: `${barWidth}px`,
                                marginRight: `${barSpacing}px`,
                            }}
                        >
                            <div
                                className="bar-value"
                                style={{
                                    marginBottom: "8px",
                                    fontWeight: "500",
                                }}
                            >
                                {day.hours}h
                            </div>
                            <div
                                className="bar"
                                style={{
                                    height: `${
                                        (day.hours / maxHours) *
                                        chartHeight *
                                        0.8
                                    }px`,
                                    backgroundColor: "#7986cb",
                                    transition: "height 0.5s ease",
                                }}
                            ></div>
                            <div className="bar-label">{day.day}</div>
                            <div className="secondary-label">
                                {day.interruptions} int.
                            </div>
                        </div>
                    ))}
                </div>

                <div className="chart-insights">
                    <div className="insight-item">
                        <span className="insight-label">Average Sleep:</span>
                        <span className="insight-value">
                            {sleepData.reduce(
                                (acc, day) => acc + day.hours,
                                0
                            ) / sleepData.length}
                            h
                        </span>
                    </div>
                    <div className="insight-item">
                        <span className="insight-label">
                            Avg. Interruptions:
                        </span>
                        <span className="insight-value">
                            {Math.round(
                                sleepData.reduce(
                                    (acc, day) => acc + day.interruptions,
                                    0
                                ) / sleepData.length
                            )}{" "}
                            times
                        </span>
                    </div>
                    <div className="insight-item">
                        <span className="insight-label">Recommended:</span>
                        <span className="insight-value">7-8 hours</span>
                    </div>
                </div>
            </div>
        );
    };

    // Render fall risk assessment
    const renderFallRisk = () => {
        return (
            <div
                className="data-visualization-container"
                style={{
                    opacity: showFallRisk ? 1 : 0,
                    transform: showFallRisk
                        ? "translateY(0)"
                        : "translateY(20px)",
                    transition: "opacity 0.5s ease, transform 0.5s ease",
                    marginTop: "10px",
                }}
            >
                <h3
                    className="chart-title"
                    style={{ marginBottom: "15px", fontSize: "14px" }}
                >
                    Fall Risk Assessment
                </h3>

                <div
                    className="risk-factors-container"
                    style={{ marginTop: "5px" }}
                >
                    {Object.entries(fallRiskData).map(([key, value], index) => {
                        if (key === "overall") return null;

                        const label = key
                            .replace(/([A-Z])/g, " $1")
                            .replace(/^./, (str) => str.toUpperCase());

                        const getColor = (score) => {
                            if (score >= 70) return "#e63946";
                            if (score >= 50) return "#f4a261";
                            return "#2a9d8f";
                        };

                        return (
                            <div key={index} className="risk-factor">
                                <div className="risk-factor-label">{label}</div>
                                <div className="risk-factor-bar-container">
                                    <div
                                        className="risk-factor-bar"
                                        style={{
                                            width: `${value}%`,
                                            backgroundColor: getColor(value),
                                            transition: "width 0.8s ease",
                                        }}
                                    ></div>
                                </div>
                                <div className="risk-factor-value">{value}</div>
                            </div>
                        );
                    })}
                </div>

                <div className="overall-risk">
                    <div className="overall-risk-label">Overall Fall Risk:</div>
                    <div
                        className="overall-risk-value"
                        style={{ color: "#e63946", fontWeight: "bold" }}
                    >
                        {fallRiskData.overall}% - HIGH
                    </div>
                </div>

                <div className="previous-falls">
                    <div className="previous-falls-label">
                        Previous Falls (90 days):
                    </div>
                    <div className="previous-falls-count">
                        {fallRiskData.previousFalls}
                    </div>
                </div>
            </div>
        );
    };

    // Visual response content that will be displayed
    const visualResponse = (
        <div className="scene-content-container">
            <div style={{ padding: "15px" }}>
                <div
                    className="resident-header"
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: "20px",
                        marginTop: "10px",
                    }}
                >
                    <div>
                        <h2 style={{ margin: "0 0 5px 0" }}>Ray Johnson</h2>
                        <p
                            style={{
                                margin: "0",
                                color: "#6c757d",
                                fontSize: "14px",
                            }}
                        >
                            Room 208 • Age 84 • 3 years residency
                        </p>
                    </div>
                    <div
                        className="risk-badge"
                        style={{
                            backgroundColor: "#e63946",
                            color: "white",
                            padding: "5px 10px",
                            borderRadius: "4px",
                            fontSize: "12px",
                            fontWeight: "bold",
                        }}
                    >
                        HIGH RISK
                    </div>
                </div>

                {/* Mobility Chart */}
                {renderMobilityChart()}

                {/* Sleep Data */}
                {renderSleepData()}

                {/* Fall Risk */}
                {renderFallRisk()}
            </div>
        </div>
    );

    return (
        <TabletLayout
            showMetrics={true}
            time="2:30 PM"
            currentQuery={currentQuery}
            nextQuery={nextQuery}
            scrollProgress={scrollProgress}
            queryStartThreshold={-50}
            queryCompleteThreshold={0}
            responseStartThreshold={10}
            transitionStartThreshold={95}
            contentTransitionThreshold={100}
            scene={scene}
            criticalMetric={1}
        >
            {visualResponse}
        </TabletLayout>
    );
};

export default AnimatedTabletScene5;
