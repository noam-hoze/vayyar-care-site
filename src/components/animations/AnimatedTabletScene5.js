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
    const showSleepData = scrollProgress >= 40; // Shown later in the scroll
    const showBathroomVisits = scrollProgress >= 65; // New section for bathroom visits
    const showSummary = scrollProgress >= 85; // Final summary shown at the end

    // Get scroll-based animation progress for each section
    const getMobilityProgress = () => {
        if (scrollProgress < 10) return 0;
        if (scrollProgress > 30) return 100; // Complete earlier
        return ((scrollProgress - 10) / 20) * 100;
    };

    const getSleepProgress = () => {
        if (scrollProgress < 40) return 0;
        if (scrollProgress > 55) return 100; // Complete earlier
        return ((scrollProgress - 40) / 15) * 100;
    };

    const getBathroomProgress = () => {
        if (scrollProgress < 65) return 0;
        if (scrollProgress > 75) return 100; // Complete earlier
        return ((scrollProgress - 65) / 10) * 100;
    };

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

    // Bathroom visits data
    const bathroomVisits = [
        { timeRange: "12am-3am", visits: 2 },
        { timeRange: "3am-6am", visits: 3 },
        { timeRange: "6am-9am", visits: 1 },
        { timeRange: "9am-12pm", visits: 1 },
        { timeRange: "12pm-3pm", visits: 0 },
        { timeRange: "3pm-6pm", visits: 1 },
        { timeRange: "6pm-9pm", visits: 1 },
        { timeRange: "9pm-12am", visits: 2 },
    ];

    // Render mobility chart
    const renderMobilityChart = () => {
        const maxSteps = Math.max(...mobilityData.map((d) => d.steps));
        const barWidth = 25;
        const barSpacing = 10;
        const chartHeight = 140;
        const mobileProgress = getMobilityProgress();

        return (
            <div
                className="data-visualization-container"
                style={{
                    opacity: showMobility ? 1 : 0,
                    transform: showMobility
                        ? "translateY(0)"
                        : "translateY(20px)",
                    transition: "opacity 0.5s ease, transform 0.5s ease",
                    marginBottom: "20px",
                }}
            >
                <h3
                    className="chart-title"
                    style={{
                        margin: "0 0 60px 0",
                        paddingBottom: "10px",
                        borderBottom: "1px solid #ddd",
                        fontSize: "18px",
                        fontWeight: "500",
                        textAlign: "center",
                        clear: "both",
                    }}
                >
                    Mobility Report
                </h3>

                <div
                    className="bar-chart-container"
                    style={{
                        height: `${chartHeight}px`,
                        position: "relative",
                        paddingTop: "60px",
                        marginTop: "40px",
                    }}
                >
                    {mobilityData.map((data, index) => (
                        <div
                            key={index}
                            className="bar-column"
                            style={{
                                width: `${barWidth}px`,
                                marginRight: `${barSpacing}px`,
                                opacity: mobileProgress > index * 14 ? 1 : 0,
                                transform:
                                    mobileProgress > index * 14
                                        ? "translateY(0)"
                                        : "translateY(10px)",
                                transition: `opacity 0.5s ease ${
                                    index * 0.1
                                }s, transform 0.5s ease ${index * 0.1}s`,
                            }}
                        >
                            <div
                                className="bar-value"
                                style={{
                                    marginBottom: "8px",
                                    fontWeight: "500",
                                    position: "absolute",
                                    top: "-40px",
                                    width: "100%",
                                    textAlign: "center",
                                    fontSize: "14px",
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

                <div
                    className="chart-insights"
                    style={{
                        opacity: mobileProgress > 80 ? 1 : 0,
                        transition: "opacity 0.5s ease",
                    }}
                >
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
        const barWidth = 25;
        const barSpacing = 10;
        const chartHeight = 140;
        const sleepProgress = getSleepProgress();

        return (
            <div
                className="data-visualization-container"
                style={{
                    opacity: showSleepData ? 1 : 0,
                    transform: showSleepData
                        ? "translateY(0)"
                        : "translateY(20px)",
                    transition: "opacity 0.5s ease, transform 0.5s ease",
                    marginBottom: "20px",
                }}
            >
                <h3
                    className="chart-title"
                    style={{
                        margin: "0 0 60px 0",
                        paddingBottom: "10px",
                        borderBottom: "1px solid #ddd",
                        fontSize: "18px",
                        fontWeight: "500",
                        textAlign: "center",
                        clear: "both",
                    }}
                >
                    Sleep Quality Analysis
                </h3>

                <div
                    className="bar-chart-container"
                    style={{
                        height: `${chartHeight}px`,
                        marginTop: "40px",
                        position: "relative",
                        paddingTop: "60px",
                    }}
                >
                    {sleepData.map((day, index) => (
                        <div
                            key={index}
                            className="bar-column"
                            style={{
                                width: `${barWidth}px`,
                                marginRight: `${barSpacing}px`,
                                opacity: sleepProgress > index * 14 ? 1 : 0,
                                transform:
                                    sleepProgress > index * 14
                                        ? "translateY(0)"
                                        : "translateY(10px)",
                                transition: `opacity 0.5s ease ${
                                    index * 0.1
                                }s, transform 0.5s ease ${index * 0.1}s`,
                            }}
                        >
                            <div
                                className="bar-value"
                                style={{
                                    marginBottom: "8px",
                                    fontWeight: "500",
                                    position: "absolute",
                                    top: "-40px",
                                    width: "100%",
                                    textAlign: "center",
                                    fontSize: "14px",
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

                <div
                    className="chart-insights"
                    style={{
                        opacity: sleepProgress > 80 ? 1 : 0,
                        transition: "opacity 0.5s ease",
                    }}
                >
                    <div className="insight-item">
                        <span className="insight-label">Average Sleep:</span>
                        <span className="insight-value">
                            {(
                                sleepData.reduce(
                                    (acc, day) => acc + day.hours,
                                    0
                                ) / sleepData.length
                            ).toFixed(1)}
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

    // Render bathroom visits
    const renderBathroomVisits = () => {
        const maxVisits = Math.max(...bathroomVisits.map((d) => d.visits));
        const barWidth = 25;
        const barSpacing = 5;
        const chartHeight = 140;
        const bathroomProgress = getBathroomProgress();

        return (
            <div
                className="data-visualization-container"
                style={{
                    opacity: showBathroomVisits ? 1 : 0,
                    transform: showBathroomVisits
                        ? "translateY(0)"
                        : "translateY(20px)",
                    transition: "opacity 0.5s ease, transform 0.5s ease",
                    marginBottom: "20px",
                }}
            >
                <h3
                    className="chart-title"
                    style={{
                        margin: "0 0 60px 0",
                        paddingBottom: "10px",
                        borderBottom: "1px solid #ddd",
                        fontSize: "18px",
                        fontWeight: "500",
                        textAlign: "center",
                        clear: "both",
                    }}
                >
                    Bathroom Visit Pattern
                </h3>

                <div
                    className="bar-chart-container"
                    style={{
                        height: `${chartHeight}px`,
                        marginTop: "40px",
                        position: "relative",
                        paddingTop: "60px",
                    }}
                >
                    {bathroomVisits.map((data, index) => (
                        <div
                            key={index}
                            className="bar-column"
                            style={{
                                width: `${barWidth}px`,
                                marginRight: `${barSpacing}px`,
                                opacity: bathroomProgress > index * 12 ? 1 : 0,
                                transform:
                                    bathroomProgress > index * 12
                                        ? "translateY(0)"
                                        : "translateY(10px)",
                                transition: `opacity 0.5s ease ${
                                    index * 0.1
                                }s, transform 0.5s ease ${index * 0.1}s`,
                            }}
                        >
                            <div
                                className="bar-value"
                                style={{
                                    marginBottom: "8px",
                                    fontWeight: "500",
                                    position: "absolute",
                                    top: "-40px",
                                    width: "100%",
                                    textAlign: "center",
                                    fontSize: "14px",
                                }}
                            >
                                {data.visits}
                            </div>
                            <div
                                className="bar"
                                style={{
                                    height: `${
                                        (data.visits / maxVisits) *
                                        chartHeight *
                                        0.8
                                    }px`,
                                    backgroundColor: "#26a69a",
                                    transition: "height 0.5s ease",
                                }}
                            ></div>
                            <div
                                className="bar-label"
                                style={{ fontSize: "10px" }}
                            >
                                {data.timeRange}
                            </div>
                        </div>
                    ))}
                </div>

                <div
                    className="chart-insights"
                    style={{
                        opacity: bathroomProgress > 80 ? 1 : 0,
                        transition: "opacity 0.5s ease",
                    }}
                >
                    <div className="insight-item">
                        <span className="insight-label">Total Visits:</span>
                        <span className="insight-value">
                            {bathroomVisits.reduce(
                                (acc, data) => acc + data.visits,
                                0
                            )}
                        </span>
                    </div>
                    <div className="insight-item">
                        <span className="insight-label">Night Visits:</span>
                        <span className="insight-value">
                            {bathroomVisits
                                .slice(0, 2)
                                .concat(bathroomVisits.slice(7))
                                .reduce((acc, data) => acc + data.visits, 0)}
                        </span>
                    </div>
                    <div className="insight-item">
                        <span className="insight-label">Pattern:</span>
                        <span className="insight-value warning">
                            Frequent night visits
                        </span>
                    </div>
                </div>
            </div>
        );
    };

    // Render summary
    const renderSummary = () => {
        return (
            <div
                className="data-visualization-container risk-summary"
                style={{
                    opacity: showSummary ? 1 : 0,
                    transform: showSummary
                        ? "translateY(0)"
                        : "translateY(20px)",
                    transition: "opacity 0.5s ease, transform 0.5s ease",
                    marginTop: "20px",
                    backgroundColor: "#f8f9fa",
                    padding: "15px",
                    borderRadius: "8px",
                    border: "1px solid #e0e0e0",
                }}
            >
                <h3
                    className="chart-title"
                    style={{
                        marginBottom: "15px",
                        fontSize: "15px",
                        borderBottom: "1px solid #e0e0e0",
                        paddingBottom: "8px",
                    }}
                >
                    Risk Assessment Summary
                </h3>

                <div className="risk-summary-items">
                    <div
                        className="risk-summary-item"
                        style={{
                            marginBottom: "12px",
                            display: "flex",
                            alignItems: "center",
                        }}
                    >
                        <div
                            className="risk-indicator high"
                            style={{
                                width: "12px",
                                height: "12px",
                                borderRadius: "50%",
                                backgroundColor: "#e63946",
                                marginRight: "10px",
                            }}
                        ></div>
                        <div className="risk-summary-text">
                            <div
                                style={{ fontWeight: "500", fontSize: "14px" }}
                            >
                                Fall Risk: High (78%)
                            </div>
                            <div
                                style={{
                                    fontSize: "12px",
                                    color: "#666",
                                    marginTop: "2px",
                                }}
                            >
                                Declining mobility and frequent night bathroom
                                visits
                            </div>
                        </div>
                    </div>

                    <div
                        className="risk-summary-item"
                        style={{
                            marginBottom: "12px",
                            display: "flex",
                            alignItems: "center",
                        }}
                    >
                        <div
                            className="risk-indicator high"
                            style={{
                                width: "12px",
                                height: "12px",
                                borderRadius: "50%",
                                backgroundColor: "#e63946",
                                marginRight: "10px",
                            }}
                        ></div>
                        <div className="risk-summary-text">
                            <div
                                style={{ fontWeight: "500", fontSize: "14px" }}
                            >
                                Sleep Quality: Poor
                            </div>
                            <div
                                style={{
                                    fontSize: "12px",
                                    color: "#666",
                                    marginTop: "2px",
                                }}
                            >
                                Averaging only 4.8 hours with 6 interruptions
                                nightly
                            </div>
                        </div>
                    </div>

                    <div
                        className="risk-summary-item"
                        style={{
                            marginBottom: "12px",
                            display: "flex",
                            alignItems: "center",
                        }}
                    >
                        <div
                            className="risk-indicator medium"
                            style={{
                                width: "12px",
                                height: "12px",
                                borderRadius: "50%",
                                backgroundColor: "#f4a261",
                                marginRight: "10px",
                            }}
                        ></div>
                        <div className="risk-summary-text">
                            <div
                                style={{ fontWeight: "500", fontSize: "14px" }}
                            >
                                Mobility: Moderate Risk
                            </div>
                            <div
                                style={{
                                    fontSize: "12px",
                                    color: "#666",
                                    marginTop: "2px",
                                }}
                            >
                                57% decline in steps over past 6 months
                            </div>
                        </div>
                    </div>

                    <div
                        className="risk-summary-item"
                        style={{ display: "flex", alignItems: "center" }}
                    >
                        <div
                            className="risk-indicator high"
                            style={{
                                width: "12px",
                                height: "12px",
                                borderRadius: "50%",
                                backgroundColor: "#e63946",
                                marginRight: "10px",
                            }}
                        ></div>
                        <div className="risk-summary-text">
                            <div
                                style={{ fontWeight: "500", fontSize: "14px" }}
                            >
                                Nighttime Activity: High Risk
                            </div>
                            <div
                                style={{
                                    fontSize: "12px",
                                    color: "#666",
                                    marginTop: "2px",
                                }}
                            >
                                7 nighttime bathroom visits weekly
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    // Determine which report to show based on scroll progress
    const determineActiveReport = () => {
        if (scrollProgress >= 85) return "summary";
        if (scrollProgress >= 65) return "bathroom";
        if (scrollProgress >= 40) return "sleep";
        return "mobility"; // default
    };

    const activeReport = determineActiveReport();

    // Visual response content that will be displayed
    const visualResponse = (
        <div className="scene-content-container" style={{ padding: "0" }}>
            <div style={{ padding: "20px 15px 15px 15px" }}>
                <div
                    className="resident-header"
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: "40px",
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

                <div style={{ margin: "0 0 60px 0" }}>
                    {/* Show only the active report based on scroll position */}
                    {activeReport === "mobility" && renderMobilityChart()}
                    {activeReport === "sleep" && renderSleepData()}
                    {activeReport === "bathroom" && renderBathroomVisits()}
                    {activeReport === "summary" && renderSummary()}
                </div>
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
