import React from "react";
import TabletLayout from "./TabletLayout";
import "./animations.css";

const AnimatedTabletScene4 = ({ scrollProgress = 0, scene }) => {
    // Current scene query (which is a continuation from scene 3)
    const currentQuery = "Break down for me all of this month's trends";

    // No bridge query needed for the last scene
    const nextQuery = "";

    // Sample trend data
    const trends = [
        { month: "Jan", falls: 5, bathroom: 12, gait: 8 },
        { month: "Feb", falls: 7, bathroom: 14, gait: 7 },
        { month: "Mar", falls: 4, bathroom: 16, gait: 9 },
        { month: "Apr", falls: 6, bathroom: 15, gait: 6 },
        { month: "May", falls: 3, bathroom: 18, gait: 10 },
    ];

    const maxFalls = Math.max(...trends.map((t) => t.falls));
    const maxBathroom = Math.max(...trends.map((t) => t.bathroom));
    const maxGait = Math.max(...trends.map((t) => t.gait));

    // Check if specific components should be shown based on scroll progress
    const showHeader = scrollProgress >= 5;
    const showSummary = scrollProgress >= 15;
    const showTrends = scrollProgress >= 30;
    const showComparison = scrollProgress >= 50;
    const showCallout = scrollProgress >= 70;

    // Visual response that includes all the health report components
    const visualResponse = (
        <>
            {showSummary && (
                <div
                    style={{
                        backgroundColor: "#f8f9fa",
                        padding: "15px",
                        animation: "fadeIn 0.5s ease forwards",
                    }}
                >
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            marginBottom: "10px",
                        }}
                    >
                        <div
                            style={{
                                textAlign: "center",
                                flex: 1,
                                padding: "10px",
                                borderRadius: "8px",
                                backgroundColor: "white",
                                margin: "0 5px",
                                boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
                            }}
                        >
                            <div
                                style={{
                                    color: "#e74c3c",
                                    fontSize: "24px",
                                    fontWeight: "bold",
                                }}
                            >
                                -14%
                            </div>
                            <div style={{ color: "#7f8c8d", fontSize: "12px" }}>
                                Falls
                            </div>
                        </div>

                        <div
                            style={{
                                textAlign: "center",
                                flex: 1,
                                padding: "10px",
                                borderRadius: "8px",
                                backgroundColor: "white",
                                margin: "0 5px",
                                boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
                            }}
                        >
                            <div
                                style={{
                                    color: "#3498db",
                                    fontSize: "24px",
                                    fontWeight: "bold",
                                }}
                            >
                                +11%
                            </div>
                            <div style={{ color: "#7f8c8d", fontSize: "12px" }}>
                                Bathroom
                            </div>
                        </div>

                        <div
                            style={{
                                textAlign: "center",
                                flex: 1,
                                padding: "10px",
                                borderRadius: "8px",
                                backgroundColor: "white",
                                margin: "0 5px",
                                boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
                            }}
                        >
                            <div
                                style={{
                                    color: "#2ecc71",
                                    fontSize: "24px",
                                    fontWeight: "bold",
                                }}
                            >
                                +8%
                            </div>
                            <div style={{ color: "#7f8c8d", fontSize: "12px" }}>
                                Gait
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {showTrends && (
                <div
                    style={{
                        backgroundColor: "white",
                        padding: "15px",
                        margin: "15px",
                        borderRadius: "8px",
                        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                        animation: "fadeIn 0.5s ease forwards",
                    }}
                >
                    <h3
                        style={{
                            margin: "0 0 15px 0",
                            fontSize: "16px",
                            color: "#2c3e50",
                        }}
                    >
                        5-Month Trends
                    </h3>

                    <div
                        style={{
                            height: "200px",
                            position: "relative",
                            marginBottom: "25px",
                        }}
                    >
                        {/* X-axis */}
                        <div
                            style={{
                                position: "absolute",
                                bottom: 0,
                                left: 0,
                                right: 0,
                                borderTop: "1px solid #eee",
                            }}
                        >
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                }}
                            >
                                {trends.map((data, index) => (
                                    <div
                                        key={index}
                                        style={{
                                            flex: 1,
                                            textAlign: "center",
                                            fontSize: "10px",
                                            color: "#7f8c8d",
                                            paddingTop: "5px",
                                        }}
                                    >
                                        {data.month}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Line chart container */}
                        <div
                            style={{
                                position: "absolute",
                                bottom: "20px",
                                left: 0,
                                right: 0,
                                height: "90%",
                            }}
                        >
                            {/* Falls line */}
                            <svg
                                style={{
                                    position: "absolute",
                                    width: "100%",
                                    height: "100%",
                                    overflow: "visible",
                                }}
                            >
                                <polyline
                                    points={trends
                                        .map((data, index) => {
                                            const x =
                                                (index / (trends.length - 1)) *
                                                    100 +
                                                "%";
                                            const y =
                                                100 -
                                                (data.falls / maxFalls) * 100 +
                                                "%";
                                            return `${x},${y}`;
                                        })
                                        .join(" ")}
                                    fill="none"
                                    stroke="#e74c3c"
                                    strokeWidth="2"
                                    strokeLinejoin="round"
                                    style={{
                                        strokeDasharray: "1000",
                                        strokeDashoffset: showTrends
                                            ? "0"
                                            : "1000",
                                        transition:
                                            "stroke-dashoffset 1.5s ease",
                                    }}
                                />
                                {trends.map((data, index) => (
                                    <circle
                                        key={index}
                                        cx={
                                            (index / (trends.length - 1)) *
                                                100 +
                                            "%"
                                        }
                                        cy={
                                            100 -
                                            (data.falls / maxFalls) * 100 +
                                            "%"
                                        }
                                        r="3"
                                        fill="#e74c3c"
                                        style={{
                                            opacity: showTrends ? "1" : "0",
                                            transition: "opacity 0.5s ease",
                                        }}
                                    />
                                ))}
                            </svg>

                            {/* Bathroom line */}
                            <svg
                                style={{
                                    position: "absolute",
                                    width: "100%",
                                    height: "100%",
                                    overflow: "visible",
                                }}
                            >
                                <polyline
                                    points={trends
                                        .map((data, index) => {
                                            const x =
                                                (index / (trends.length - 1)) *
                                                    100 +
                                                "%";
                                            const y =
                                                100 -
                                                (data.bathroom / maxBathroom) *
                                                    100 +
                                                "%";
                                            return `${x},${y}`;
                                        })
                                        .join(" ")}
                                    fill="none"
                                    stroke="#3498db"
                                    strokeWidth="2"
                                    strokeLinejoin="round"
                                    style={{
                                        strokeDasharray: "1000",
                                        strokeDashoffset: showTrends
                                            ? "0"
                                            : "1000",
                                        transition:
                                            "stroke-dashoffset 1.5s ease 0.3s",
                                    }}
                                />
                                {trends.map((data, index) => (
                                    <circle
                                        key={index}
                                        cx={
                                            (index / (trends.length - 1)) *
                                                100 +
                                            "%"
                                        }
                                        cy={
                                            100 -
                                            (data.bathroom / maxBathroom) *
                                                100 +
                                            "%"
                                        }
                                        r="3"
                                        fill="#3498db"
                                        style={{
                                            opacity: showTrends ? "1" : "0",
                                            transition: "opacity 0.5s ease",
                                        }}
                                    />
                                ))}
                            </svg>

                            {/* Gait line */}
                            <svg
                                style={{
                                    position: "absolute",
                                    width: "100%",
                                    height: "100%",
                                    overflow: "visible",
                                }}
                            >
                                <polyline
                                    points={trends
                                        .map((data, index) => {
                                            const x =
                                                (index / (trends.length - 1)) *
                                                    100 +
                                                "%";
                                            const y =
                                                100 -
                                                (data.gait / maxGait) * 100 +
                                                "%";
                                            return `${x},${y}`;
                                        })
                                        .join(" ")}
                                    fill="none"
                                    stroke="#2ecc71"
                                    strokeWidth="2"
                                    strokeLinejoin="round"
                                    style={{
                                        strokeDasharray: "1000",
                                        strokeDashoffset: showTrends
                                            ? "0"
                                            : "1000",
                                        transition:
                                            "stroke-dashoffset 1.5s ease 0.6s",
                                    }}
                                />
                                {trends.map((data, index) => (
                                    <circle
                                        key={index}
                                        cx={
                                            (index / (trends.length - 1)) *
                                                100 +
                                            "%"
                                        }
                                        cy={
                                            100 -
                                            (data.gait / maxGait) * 100 +
                                            "%"
                                        }
                                        r="3"
                                        fill="#2ecc71"
                                        style={{
                                            opacity: showTrends ? "1" : "0",
                                            transition: "opacity 0.5s ease",
                                        }}
                                    />
                                ))}
                            </svg>
                        </div>
                    </div>

                    <div
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            gap: "15px",
                            marginTop: "5px",
                        }}
                    >
                        <div style={{ display: "flex", alignItems: "center" }}>
                            <div
                                style={{
                                    width: "10px",
                                    height: "10px",
                                    backgroundColor: "#e74c3c",
                                    borderRadius: "2px",
                                    marginRight: "5px",
                                }}
                            ></div>
                            <span
                                style={{ fontSize: "12px", color: "#7f8c8d" }}
                            >
                                Falls
                            </span>
                        </div>

                        <div style={{ display: "flex", alignItems: "center" }}>
                            <div
                                style={{
                                    width: "10px",
                                    height: "10px",
                                    backgroundColor: "#3498db",
                                    borderRadius: "2px",
                                    marginRight: "5px",
                                }}
                            ></div>
                            <span
                                style={{ fontSize: "12px", color: "#7f8c8d" }}
                            >
                                Bathroom
                            </span>
                        </div>

                        <div style={{ display: "flex", alignItems: "center" }}>
                            <div
                                style={{
                                    width: "10px",
                                    height: "10px",
                                    backgroundColor: "#2ecc71",
                                    borderRadius: "2px",
                                    marginRight: "5px",
                                }}
                            ></div>
                            <span
                                style={{ fontSize: "12px", color: "#7f8c8d" }}
                            >
                                Gait
                            </span>
                        </div>
                    </div>
                </div>
            )}

            {showComparison && (
                <div
                    style={{
                        backgroundColor: "white",
                        padding: "15px",
                        margin: "15px",
                        borderRadius: "8px",
                        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                        animation: "fadeIn 0.5s ease forwards",
                    }}
                >
                    <h3
                        style={{
                            margin: "0 0 15px 0",
                            fontSize: "16px",
                            color: "#2c3e50",
                        }}
                    >
                        Unit Comparison
                    </h3>

                    <div style={{ marginBottom: "15px" }}>
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                                marginBottom: "5px",
                            }}
                        >
                            <span
                                style={{ fontSize: "12px", color: "#7f8c8d" }}
                            >
                                Falls (East Wing)
                            </span>
                            <span
                                style={{ fontSize: "12px", color: "#7f8c8d" }}
                            >
                                -22%
                            </span>
                        </div>
                        <div
                            style={{
                                width: "100%",
                                height: "8px",
                                backgroundColor: "#f1f1f1",
                                borderRadius: "4px",
                                overflow: "hidden",
                            }}
                        >
                            <div
                                style={{
                                    width: "78%",
                                    height: "100%",
                                    backgroundColor: "#2ecc71",
                                    transform: "scaleX(0)",
                                    transformOrigin: "left",
                                    animation: showComparison
                                        ? "scaleIn 0.8s ease-out forwards"
                                        : "none",
                                    borderRadius: "4px",
                                }}
                            />
                        </div>
                    </div>

                    <div style={{ marginBottom: "15px" }}>
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                                marginBottom: "5px",
                            }}
                        >
                            <span
                                style={{ fontSize: "12px", color: "#7f8c8d" }}
                            >
                                Falls (West Wing)
                            </span>
                            <span
                                style={{ fontSize: "12px", color: "#7f8c8d" }}
                            >
                                -8%
                            </span>
                        </div>
                        <div
                            style={{
                                width: "100%",
                                height: "8px",
                                backgroundColor: "#f1f1f1",
                                borderRadius: "4px",
                                overflow: "hidden",
                            }}
                        >
                            <div
                                style={{
                                    width: "45%",
                                    height: "100%",
                                    backgroundColor: "#f39c12",
                                    transform: "scaleX(0)",
                                    transformOrigin: "left",
                                    animation: showComparison
                                        ? "scaleIn 0.8s ease-out 0.2s forwards"
                                        : "none",
                                    borderRadius: "4px",
                                }}
                            />
                        </div>
                    </div>
                </div>
            )}

            {showCallout && (
                <div
                    style={{
                        backgroundColor: "#EDF7FF",
                        padding: "15px",
                        margin: "15px",
                        borderRadius: "8px",
                        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                        animation: "fadeIn 0.5s ease forwards",
                        borderLeft: "4px solid #2D7DD2",
                    }}
                >
                    <h3
                        style={{
                            margin: "0 0 10px 0",
                            fontSize: "16px",
                            color: "#2c3e50",
                        }}
                    >
                        Key Insight
                    </h3>
                    <p
                        style={{
                            margin: "0 0 15px 0",
                            fontSize: "14px",
                            color: "#34495e",
                            lineHeight: "1.4",
                        }}
                    >
                        The East Wing has shown significant improvement in fall
                        reduction (-22%) after implementing the new nighttime
                        monitoring protocol. Consider expanding this approach to
                        other wings.
                    </p>
                    <button
                        style={{
                            backgroundColor: "#2D7DD2",
                            color: "white",
                            border: "none",
                            borderRadius: "4px",
                            padding: "8px 15px",
                            fontSize: "14px",
                            cursor: "pointer",
                        }}
                    >
                        View Detailed Report
                    </button>
                </div>
            )}
        </>
    );

    return (
        <TabletLayout
            time="10:15 AM"
            showMetrics={true}
            currentQuery={currentQuery}
            nextQuery={nextQuery}
            scrollProgress={scrollProgress}
            // Start with the query already showing since it comes from scene 3
            queryStartThreshold={-50} // Negative value far below 0 to ensure it never shows typing
            queryCompleteThreshold={0} // Show query bubble immediately from the start
            responseStartThreshold={10}
            transitionStartThreshold={999} // Set very high since there's no next scene
            contentTransitionThreshold={999} // Set very high since there's no next scene
        >
            {visualResponse}
        </TabletLayout>
    );
};

export default AnimatedTabletScene4;
