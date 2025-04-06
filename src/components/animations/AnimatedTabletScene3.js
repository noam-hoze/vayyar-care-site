import React from "react";
import TabletLayout from "./TabletLayout";
import "./animations.css";

const AnimatedTabletScene3 = ({ scrollProgress = 0, scene }) => {
    // Current scene query (which is a continuation from scene 2)
    const currentQuery = "Show me the fall report for John in Room 208";

    // Bridge query to scene 4
    const nextQuery = "Show me John's monthly health trends";

    // Check if specific components should be shown based on scroll progress
    const showReport = scrollProgress >= 30;
    const buttonActive = scrollProgress >= 60;
    const isApproved = scrollProgress >= 85;

    // Visual response that includes the full report card
    const visualResponse = (
        <div className="reports-container" style={{ padding: "15px" }}>
            <div
                className="report-card"
                style={{
                    opacity: showReport ? 1 : 0,
                    transform: showReport
                        ? "translateY(0)"
                        : "translateY(20px)",
                    transition: "opacity 0.5s ease, transform 0.5s ease",
                    backgroundColor: "white",
                    borderRadius: "8px",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                    padding: "15px",
                    marginBottom: "15px",
                    border: isApproved
                        ? "1px solid #2ecc71"
                        : "1px solid #e0e0e0",
                    position: "relative",
                }}
            >
                {/* Approved tag - only shows in the final stage */}
                {isApproved && (
                    <div
                        style={{
                            position: "absolute",
                            top: "10px",
                            right: "10px",
                            backgroundColor: "#2ecc71",
                            color: "white",
                            padding: "3px 8px",
                            borderRadius: "4px",
                            fontSize: "12px",
                            fontWeight: "bold",
                            animation: "fadeIn 0.3s ease forwards",
                        }}
                    >
                        APPROVED
                    </div>
                )}

                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                    }}
                >
                    <h3
                        style={{
                            margin: "0 0 10px 0",
                            color: "#2c3e50",
                            fontSize: "16px",
                        }}
                    >
                        Fall Event Report
                    </h3>
                </div>

                <div
                    style={{
                        fontSize: "14px",
                        color: "#7f8c8d",
                        marginBottom: "10px",
                    }}
                >
                    <strong>Patient:</strong> John D. (Room 208)
                </div>

                <div
                    style={{
                        backgroundColor: "#f9f9f9",
                        padding: "10px",
                        borderRadius: "4px",
                        marginBottom: "10px",
                    }}
                >
                    <p
                        style={{
                            margin: "0 0 8px 0",
                            fontSize: "14px",
                        }}
                    >
                        <strong>Summary:</strong> Fall detected at 3:18 AM.
                        Resident found disoriented and assisted back to bed.
                        Vital signs stable.
                    </p>
                </div>

                {/* Buttons are always present but change state */}
                <div
                    style={{
                        display: "flex",
                        justifyContent: "flex-end",
                        gap: "10px",
                        marginTop: "10px",
                        opacity: showReport ? 1 : 0,
                        transition: "opacity 0.5s ease",
                    }}
                >
                    {!isApproved ? (
                        <>
                            <button
                                style={{
                                    padding: "8px 15px",
                                    backgroundColor: buttonActive
                                        ? "#2ecc71"
                                        : "#e0e0e0",
                                    color: "white",
                                    border: "none",
                                    borderRadius: "4px",
                                    cursor: buttonActive
                                        ? "pointer"
                                        : "default",
                                    transition: "background-color 0.3s ease",
                                }}
                            >
                                Approve
                            </button>
                            <button
                                style={{
                                    padding: "8px 15px",
                                    backgroundColor: "transparent",
                                    color: "#7f8c8d",
                                    border: "1px solid #e0e0e0",
                                    borderRadius: "4px",
                                    cursor: buttonActive
                                        ? "pointer"
                                        : "default",
                                    opacity: buttonActive ? 1 : 0.5,
                                    transition: "opacity 0.3s ease",
                                }}
                            >
                                Edit
                            </button>
                        </>
                    ) : (
                        <button
                            style={{
                                padding: "8px 15px",
                                backgroundColor: "#e0e0e0",
                                color: "white",
                                border: "none",
                                borderRadius: "4px",
                                cursor: "default",
                                opacity: 0.5,
                                transition:
                                    "opacity 0.3s ease, background-color 0.3s ease",
                            }}
                        >
                            Approved
                        </button>
                    )}
                </div>
            </div>
        </div>
    );

    return (
        <TabletLayout
            time="4:30 PM"
            showMetrics={true}
            currentQuery={currentQuery}
            nextQuery={nextQuery}
            scrollProgress={scrollProgress}
            // Start with the query already showing since it comes from scene 2
            queryStartThreshold={-50}
            queryCompleteThreshold={0}
            responseStartThreshold={10}
            transitionStartThreshold={85}
            contentTransitionThreshold={95}
        >
            {visualResponse}
        </TabletLayout>
    );
};

export default AnimatedTabletScene3;
