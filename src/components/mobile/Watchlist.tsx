import React, { CSSProperties, ReactNode } from "react";
import StatusPanel from "./StatusPanel";
import InputBar from "./InputBar";
import "./mobile-styles.css";

// Define types
type Priority = "high" | "medium" | "low";

interface WatchlistData {
    alerts: number;
    critical: number;
    monitored: number;
}

interface CardData {
    id: string | number;
    priority: Priority;
    icon: ReactNode;
    room: string;
    description: string;
}

interface WatchlistProps {
    data: WatchlistData;
    cards: CardData[];
    onBack: () => void;
}

interface IndicatorProps {
    style: CSSProperties;
    className: string;
}

const Watchlist: React.FC<WatchlistProps> = ({ data, cards, onBack }) => {
    // Define styles with explicit types
    const styles: { [key: string]: CSSProperties } = {
        container: {
            fontFamily: "San Francisco, Roboto, Helvetica, Arial, sans-serif",
            backgroundColor: "#F8F9FA",
            height: "100%",
            width: "100%",
            position: "relative",
            overflow: "hidden",
            borderRadius: "36px",
        },
        header: {
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "16px",
            borderBottom: "1px solid #E0E0E0",
            backgroundColor: "white",
        },
        backButton: {
            backgroundColor: "transparent",
            border: "none",
            fontSize: "20px",
            cursor: "pointer",
            padding: "0 10px",
        },
        title: {
            fontWeight: "bold",
            fontSize: "18px",
            flex: 1,
            textAlign: "center",
        },
        filterButton: {
            backgroundColor: "transparent",
            border: "none",
            fontSize: "18px",
            cursor: "pointer",
            padding: "0 10px",
        },
        content: {
            padding: "16px",
            paddingBottom: "80px", // Space for input bar
            overflowY: "auto",
            height: "calc(100% - 60px)", // Subtract header height
            boxSizing: "border-box",
        },
        cardList: {
            display: "flex",
            flexDirection: "column",
            gap: "16px",
            marginTop: "16px",
        },
        card: {
            backgroundColor: "white",
            borderRadius: "12px",
            boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
            overflow: "hidden",
            position: "relative",
        },
        cardHighPriority: {
            borderLeft: "4px solid #E74C3C",
        },
        cardMediumPriority: {
            borderLeft: "4px solid #F39C12",
        },
        cardLowPriority: {
            borderLeft: "4px solid #2D7DD2",
        },
        roomNumber: {
            fontSize: "24px",
            fontWeight: "bold",
            padding: "16px",
            paddingBottom: "8px",
        },
        description: {
            padding: "0 16px 16px",
            fontSize: "14px",
            color: "#212529",
        },
        indicator: {
            position: "absolute",
            top: "16px",
            right: "16px",
            width: "8px",
            height: "8px",
            borderRadius: "50%",
        },
        redIndicator: {
            backgroundColor: "#E74C3C",
        },
        orangeIndicator: {
            backgroundColor: "#F39C12",
        },
        blueIndicator: {
            backgroundColor: "#2D7DD2",
        },
        icon: {
            position: "absolute",
            top: "12px",
            right: "32px",
            fontSize: "20px",
        },
        actionButton: {
            backgroundColor: "transparent",
            color: "#38B6FF",
            border: "none",
            padding: "10px 20px",
            fontSize: "14px",
            fontWeight: "500",
            cursor: "pointer",
            textAlign: "right",
            display: "block",
            marginLeft: "auto",
        },
    };

    // Helper function to get card style based on priority
    const getCardStyle = (priority: Priority): CSSProperties => {
        switch (priority) {
            case "high":
                return styles.cardHighPriority;
            case "medium":
                return styles.cardMediumPriority;
            case "low":
                return styles.cardLowPriority;
            default:
                return styles.cardLowPriority;
        }
    };

    // Helper function to get indicator style and class based on priority
    const getIndicatorProps = (priority: Priority): IndicatorProps => {
        switch (priority) {
            case "high":
                return {
                    style: { ...styles.indicator, ...styles.redIndicator },
                    className: "pulse-red",
                };
            case "medium":
                return {
                    style: { ...styles.indicator, ...styles.orangeIndicator },
                    className: "",
                };
            case "low":
                return {
                    style: { ...styles.indicator, ...styles.blueIndicator },
                    className: "",
                };
            default:
                return {
                    style: { ...styles.indicator, ...styles.blueIndicator },
                    className: "",
                };
        }
    };

    return (
        <div style={styles.container}>
            {/* Header */}
            <div style={styles.header}>
                <button style={styles.backButton} onClick={onBack}>
                    ◀
                </button>
                <div style={styles.title}>WATCHLIST</div>
                <button style={styles.filterButton}>🔍</button>
            </div>

            {/* Main Content */}
            <div style={styles.content} className="mobile-content">
                {/* Status Panel */}
                <StatusPanel
                    alerts={data.alerts}
                    critical={data.critical}
                    monitored={data.monitored}
                />

                {/* Card List */}
                <div style={styles.cardList}>
                    {cards.map((card: CardData) => {
                        const indicatorProps = getIndicatorProps(card.priority);

                        return (
                            <div
                                key={card.id}
                                style={{
                                    ...styles.card,
                                    ...getCardStyle(card.priority),
                                }}
                            >
                                <div
                                    style={indicatorProps.style}
                                    className={indicatorProps.className}
                                ></div>
                                <div style={styles.icon}>{card.icon}</div>
                                <div style={styles.roomNumber}>{card.room}</div>
                                <div style={styles.description}>
                                    {card.description}
                                </div>
                                <button style={styles.actionButton}>
                                    View Details
                                </button>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Input Bar */}
            <InputBar />
        </div>
    );
};

export default Watchlist;
