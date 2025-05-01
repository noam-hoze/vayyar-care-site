import React, { CSSProperties, ReactNode } from "react";
import { Scene } from "../types"; // Corrected import path

// Remove local Scene interface definition
/*
interface Scene {
    // ... (old definition)
}
*/

interface TabletDisplayProps {
    scene: Scene; // Use imported Scene
}

type AlertLevel = "high" | "medium" | "low";

const TabletDisplay: React.FC<TabletDisplayProps> = ({ scene }) => {
    // Healthcare-themed colors
    const colors = {
        primary: "#2D7DD2", // Blue - primary brand color
        secondary: "#38B6FF", // Light blue - secondary brand color
        accent: "#EAF2F8", // Very light blue - background accent
        success: "#3EBD93", // Teal green - positive indicators
        warning: "#F39C12", // Amber - warning indicators
        danger: "#E74C3C", // Red - urgent alerts
        gray: "#F8F9FA", // Light gray - background
        darkGray: "#6C757D", // Dark gray - text
        white: "#FFFFFF", // White
        textPrimary: "#212529", // Near black - primary text
        textSecondary: "#495057", // Dark gray - secondary text
    };

    const getAlertLevel = (content: string): AlertLevel => {
        if (!content) return "low";
        if (
            content.includes("Fall detected") ||
            content.includes("Unsupervised bed exit")
        )
            return "high";
        if (content.includes("decline") || content.includes("flagged"))
            return "medium";
        return "low";
    };

    const getAlertIcon = (content: string): string => {
        if (!content) return "📊";
        if (content.includes("Fall")) return "⚠️";
        if (content.includes("Bathroom")) return "🚻";
        if (content.includes("Gait") || content.includes("mobility"))
            return "👣";
        if (content.includes("Immobility")) return "��";
        return "📊";
    };

    const getAlertColor = (level: AlertLevel): string => {
        switch (level) {
            case "high":
                return colors.danger;
            case "medium":
                return colors.warning;
            case "low":
                return colors.primary;
            default:
                return colors.primary;
        }
    };

    // Use CSSProperties for styles
    const styles: { [key: string]: CSSProperties } = {
        outerContainer: {
            position: "relative",
            maxWidth: 260,
            width: "100%",
            margin: "0 auto",
            zIndex: 10,
            height: "100%",
            maxHeight: "64vh",
            display: "flex",
            alignItems: "flex-start",
            paddingTop: "2vh",
        },
        shadow: {
            position: "absolute",
            width: "85%",
            height: "15px",
            bottom: "-15px",
            left: "50%",
            transform: "translateX(-50%)",
            background:
                "radial-gradient(ellipse at center, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0) 70%)",
            borderRadius: "50%",
            zIndex: 1,
        },
        camera: {
            position: "absolute",
            width: "8px",
            height: "8px",
            borderRadius: "50%",
            background: "#222",
            top: "calc(2vh + 15px)",
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 2,
        },
        speaker: {
            position: "absolute",
            width: "60px",
            height: "4px",
            borderRadius: "4px",
            background: "#222",
            top: "calc(2vh + 17px)",
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 2,
        },
        phoneBody: {
            background: colors.white,
            padding: "2.5rem 1rem 2rem",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: "0.6rem",
            position: "relative",
            border: "10px solid #333",
            borderRadius: "36px",
            boxShadow:
                "inset 0 0 10px rgba(0,0,0,0.1), 0 10px 40px rgba(0,0,0,0.2)",
            height: "calc(100% - 4vh)",
            aspectRatio: "9/19",
            boxSizing: "border-box",
            overflowY: "hidden",
        },
        statusBar: {
            display: "flex",
            justifyContent: "space-between",
            fontSize: "0.7rem",
            color: colors.darkGray,
            marginBottom: "0.4rem",
            position: "sticky",
            top: 0,
            background: colors.white,
            padding: "0 0 5px 0",
            zIndex: 3,
        },
        appHeader: {
            display: "flex",
            alignItems: "center",
            marginBottom: "1.2rem",
        },
        appIconContainer: {
            width: "36px",
            height: "36px",
            borderRadius: "8px",
            background: colors.white,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginRight: "12px",
            overflow: "hidden",
        },
        appIcon: {
            width: "100%",
            height: "100%",
            objectFit: "contain",
        },
        appTitle: {
            fontSize: "1.2rem",
            fontWeight: 700, // Use number for fontWeight
            color: colors.textPrimary,
        },
        summaryStatsBar: {
            display: "flex",
            justifyContent: "space-between",
            background: colors.accent,
            padding: "0.5rem 0.7rem",
            borderRadius: "12px",
            marginBottom: "0.8rem",
        },
        statItem: {
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
        },
        statValue: {
            fontSize: "0.9rem",
            fontWeight: 700,
        },
        statLabel: {
            fontSize: "0.6rem",
            color: colors.darkGray,
        },
        statSeparator: {
            padding: "0 0.7rem",
            borderLeft: `1px solid ${colors.primary}20`,
            borderRight: `1px solid ${colors.primary}20`,
        },
        contentArea: {
            flexGrow: 1,
            overflowY: "auto",
            paddingRight: "5px", // Prevent scrollbar overlap
            display: "flex",
            flexDirection: "column",
            gap: "0.7rem",
        },
        alertItem: {
            display: "flex",
            alignItems: "center",
            padding: "0.6rem 0.8rem",
            borderRadius: "8px",
            background: colors.white,
            boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
        },
        alertIcon: {
            marginRight: "0.8rem",
            fontSize: "1.1rem",
        },
        alertContent: {
            flexGrow: 1,
            fontSize: "0.85rem",
            color: colors.textPrimary,
        },
        alertTime: {
            fontSize: "0.7rem",
            color: colors.textSecondary,
        },
    };

    return (
        <div style={styles.outerContainer}>
            {/* Phone Frame Shadow */}
            <div style={styles.shadow}></div>

            {/* Camera & Speaker */}
            <div style={styles.camera}></div>
            <div style={styles.speaker}></div>

            {/* Phone Body */}
            <div style={styles.phoneBody}>
                {/* Status Bar */}
                <div style={styles.statusBar}>
                    <div>9:41</div>
                    <div style={{ display: "flex", gap: "5px" }}>
                        <span>4G</span>
                        <span>100%</span>
                    </div>
                </div>

                {/* App Header */}
                <div style={styles.appHeader}>
                    <div style={styles.appIconContainer}>
                        <img
                            src={`${process.env.NEXT_PUBLIC_BASE_PATH}/images/vayyar-logo.png`}
                            alt="Vayyar"
                            style={styles.appIcon}
                        />
                    </div>
                    <div style={styles.appTitle}>
                        {scene.subtitle
                            ? scene.subtitle.split("+")[0].trim()
                            : ""}
                    </div>
                </div>

                {/* Summary Stats Bar */}
                <div style={styles.summaryStatsBar}>
                    <div style={styles.statItem}>
                        <div
                            style={{
                                ...styles.statValue,
                                color: colors.primary,
                            }}
                        >
                            {(scene.content || []).length}
                        </div>
                        <div style={styles.statLabel}>Alerts</div>
                    </div>
                    <div
                        style={{ ...styles.statItem, ...styles.statSeparator }}
                    >
                        <div
                            style={{
                                ...styles.statValue,
                                color: getAlertColor("high"),
                            }}
                        >
                            {
                                (scene.content || []).filter(
                                    (c): c is string =>
                                        typeof c === "string" &&
                                        getAlertLevel(c) === "high"
                                ).length
                            }
                        </div>
                        <div style={styles.statLabel}>Critical</div>
                    </div>
                    <div style={styles.statItem}>
                        <div
                            style={{
                                ...styles.statValue,
                                color: getAlertColor("medium"),
                            }}
                        >
                            {
                                (scene.content || []).filter(
                                    (c): c is string =>
                                        typeof c === "string" &&
                                        getAlertLevel(c) === "medium"
                                ).length
                            }
                        </div>
                        <div style={styles.statLabel}>Warning</div>
                    </div>
                </div>

                {/* Content Area */}
                <div
                    style={styles.contentArea}
                    className="tablet-content-scroll"
                >
                    {(scene.content || []).map((item: ReactNode, i: number) => {
                        if (typeof item !== "string") {
                            return (
                                <div key={i} style={styles.alertItem}>
                                    <div style={styles.alertContent}>
                                        {item}
                                    </div>
                                </div>
                            );
                        }
                        const line = item;
                        const alertLevel = getAlertLevel(line);
                        const alertColor = getAlertColor(alertLevel);
                        const icon = getAlertIcon(line);
                        return (
                            <div key={i} style={styles.alertItem}>
                                <div
                                    style={{
                                        ...styles.alertIcon,
                                        color: alertColor,
                                    }}
                                >
                                    {icon}
                                </div>
                                <div style={styles.alertContent}>{line}</div>
                                <div style={styles.alertTime}>Now</div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default TabletDisplay;
