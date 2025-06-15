import React from "react";

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
    icon,
    text,
    subtext,
}: {
    icon: string;
    text: string;
    subtext?: string;
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
        <Icon path={icon} size={18} color="#1D1D1F" />
        <p
            style={{
                margin: 0,
                fontSize: "14px",
                fontWeight: 400,
                whiteSpace: "nowrap",
            }}
        >
            {[text, subtext].filter(Boolean).join(" ")}
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
                        icon="M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z"
                        text="Shift Summary"
                    />
                    <SuggestionButton
                        icon="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4V6h16v12zM7 15h10v-2H7v2zm5-4H7v-2h5v2z"
                        text="Fall History"
                    />
                    <SuggestionButton
                        icon="M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zM16 18H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"
                        text="Resident Patterns"
                    />
                    <SuggestionButton
                        icon="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v2h-2zm0 4h2v6h-2z"
                        text="AI Insights"
                    />
                </div>
            </div>
        </div>
    );
};

export default ChatGpt;
