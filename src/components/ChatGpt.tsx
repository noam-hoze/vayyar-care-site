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

type Mode = "desktop" | "mobile";

const SuggestionButton = ({
    icon: Icon,
    text,
    mode = "desktop",
}: {
    icon: React.ElementType;
    text: string;
    mode?: Mode;
}) => (
    <div
        style={{
            background: "#F9F9F9",
            border: "1px solid #EAEAEA",
            borderRadius: "14px",
            color: "#1D1D1F",
            padding: "12px",
            width: mode === "mobile" ? "100%" : "auto",
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
                fontSize: mode === "mobile" ? "12px" : "14px",
                fontWeight: 400,
                whiteSpace: "nowrap",
            }}
        >
            {text}
        </p>
    </div>
);

interface ChatGptProps {
    customMessage: string;
    mode?: Mode;
    customClass?: string;
    showPhoneBackground?: boolean; // New flag to control phone image display
    animation?: {
        type: 'fade' | 'slide';
        direction?: 'left-to-right' | 'right-to-left';
        duration?: number;
    };
}

const ChatGpt: React.FC<ChatGptProps> = ({ mode = "desktop", customMessage = "", showPhoneBackground = false }) => {
    const isMobile = mode === "mobile";

    return (
        <div
            style={{
                width: "100%",
                height: "100%",
                background: isMobile && showPhoneBackground
                    ? `url('/images/phone_14_01.svg') no-repeat center center`
                    : "transparent",
                backgroundSize: isMobile ? "contain" : "auto",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: isMobile ? "space-between" : "center",
                fontFamily:
                    "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
                position: "relative",
            }}
        >
            {/* Actual content container with proper positioning */}
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: isMobile ? "12px" : "20px",
                    width: isMobile ? "100%" : "initial",
                    height: isMobile ? "100%" : "initial",
                    maxWidth: "75%",
                    maxHeight: "75%",
                    position: isMobile ? "absolute" : "relative",
                    top: isMobile ? "50%" : "auto",
                    left: isMobile ? "50%" : "auto",
                    transform: isMobile ? "translate(-50%, -50%)" : "none",
                    padding: isMobile ? "0" : "auto",
                }}
                className={"content-container"}
            >
                <div style={{ textAlign: "center", margin: isMobile ? "auto" : "initial", }}>
                    <div
                        style={{
                            fontSize: isMobile ? "24px" : "38px",
                            fontWeight: "400",
                            color: "#1D1D1F",
                        }}
                    >
                        {customMessage}
                    </div>
                </div>

                <div
                    style={{
                        width: isMobile ? "100%" : "720px",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: isMobile ? "16px" : "24px",
                    }}
                >
                    <div
                        style={{
                            background: "#F0F0F0",
                            borderRadius: isMobile ? "24px" : "32px",
                            padding: isMobile ? "6px" : "8px",
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
                                fontSize: isMobile ? "16px" : "20px",
                                padding: isMobile ? "8px 16px" : "12px 20px",
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
                                    borderRadius: isMobile ? "20px" : "24px",
                                    color: "#1D1D1F",
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "8px",
                                    padding: isMobile ? "8px 16px" : "12px 20px",
                                    cursor: "default",
                                    fontSize: isMobile ? "14px" : "16px",
                                    fontWeight: 500,
                                }}
                            >
                                <Icon
                                    path="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3zM16 11a1 1 0 0 1-1 1h-1v3a1 1 0 0 1-2 0v-3H9a1 1 0 0 1 0-2h1V4a1 1 0 0 1 2 0v5h1a1 1 0 0 1 1 1z"
                                    size={isMobile ? 16 : 18}
                                    color="#1D1D1F"
                                />
                                Voice
                            </button>
                        </div>
                    </div>
                </div>
                {!isMobile && <div
                    style={{
                        display: "flex",
                        flexDirection: isMobile ? "column" : "row",
                        justifyContent: "center",
                        alignItems: isMobile ? "stretch" : "center",
                        gap: isMobile ? "8px" : "16px",
                        width: "100%",
                    }}
                >
                    <SuggestionButton
                        icon={ClipboardDocumentListIcon}
                        text="Shift Summary"
                        mode={mode}
                    />
                    <SuggestionButton
                        icon={ClockIcon}
                        text="Fall History"
                        mode={mode}
                    />
                    <SuggestionButton
                        icon={ChartBarIcon}
                        text="Resident Patterns"
                        mode={mode}
                    />
                    <SuggestionButton
                        icon={LightBulbIcon}
                        text="AI Insights"
                        mode={mode}
                    />
                </div>}
            </div>
        </div>
    );
};

export default ChatGpt;
