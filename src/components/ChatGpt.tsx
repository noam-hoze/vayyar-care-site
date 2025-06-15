import React from "react";
import {
    ClipboardDocumentListIcon,
    ClockIcon,
    ChartBarIcon,
    LightBulbIcon,
} from "@heroicons/react/24/outline";

const Icon = ({
    path,
    size = 16,
    color = "currentColor",
}: {
    path: string;
    size?: number;
    color?: string;
}) => (
    <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill={color}
        xmlns="http://www.w3.org/2000/svg"
    >
        <path d={path} />
    </svg>
);

const SuggestionButton = ({
    icon: Icon,
    text,
}: {
    icon: React.ElementType;
    text: string;
}) => (
    <div
        style={{
            background: "#F9F9F9",
            border: "1px solid #EAEAEA",
            borderRadius: "14px",
            color: "#1D1D1F",
            padding: "12px",
            width: "auto",
            height: "auto",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: "8px",
            fontFamily:
                "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
            cursor: "default",
            pointerEvents: "none",
        }}
    >
        <Icon style={{ width: "18px", height: "18px", color: "#1D1D1F" }} />
        <p
            style={{
                margin: 0,
                fontSize: "14px",
                fontWeight: 400,
                whiteSpace: "nowrap",
            }}
        >
            {text}
        </p>
    </div>
);

const ChatGpt = () => {
    return (
        <div
            style={{
                width: "100%",
                height: "100%",
                background: "transparent",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                fontFamily:
                    "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
                gap: "20px",
            }}
        >
            <div style={{ textAlign: "center" }}>
                <div
                    style={{
                        fontSize: "38px",
                        fontWeight: "400",
                        color: "#1D1D1F",
                    }}
                >
                    Hi Alice, how can I help?
                </div>
            </div>

            <div
                style={{
                    width: "720px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "24px",
                }}
            >
                <div
                    style={{
                        background: "#F0F0F0",
                        borderRadius: "32px",
                        padding: "8px",
                        display: "flex",
                        alignItems: "center",
                        width: "100%",
                        border: "1px solid #E0E0E0",
                    }}
                >
                    <div
                        style={{
                            flexGrow: 1,
                            background: "transparent",
                            border: "none",
                            color: "#8E8E93",
                            fontSize: "20px",
                            padding: "12px 20px",
                            outline: "none",
                        }}
                    >
                        Ask anything
                    </div>
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "8px",
                        }}
                    >
                        <button
                            disabled
                            style={{
                                background: "#E5E5E7",
                                border: "none",
                                borderRadius: "24px",
                                color: "#1D1D1F",
                                display: "flex",
                                alignItems: "center",
                                gap: "8px",
                                padding: "12px 20px",
                                cursor: "default",
                                fontSize: "16px",
                                fontWeight: 500,
                            }}
                        >
                            <Icon
                                path="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3zM16 11a1 1 0 0 1-1 1h-1v3a1 1 0 0 1-2 0v-3H9a1 1 0 0 1 0-2h1V4a1 1 0 0 1 2 0v5h1a1 1 0 0 1 1 1z"
                                size={18}
                                color="#1D1D1F"
                            />
                            Voice
                        </button>
                    </div>
                </div>
                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        gap: "16px",
                    }}
                >
                    <SuggestionButton
                        icon={ClipboardDocumentListIcon}
                        text="Shift Summary"
                    />
                    <SuggestionButton icon={ClockIcon} text="Fall History" />
                    <SuggestionButton
                        icon={ChartBarIcon}
                        text="Resident Patterns"
                    />
                    <SuggestionButton icon={LightBulbIcon} text="AI Insights" />
                </div>
            </div>
        </div>
    );
};

export default ChatGpt;
