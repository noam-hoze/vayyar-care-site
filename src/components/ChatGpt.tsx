import React from "react";

const ChatGpt = () => {
    return (
        <div
            style={{
                width: "100%",
                height: "100%",
                background: "white",
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-end", // Aligns content to the bottom
                padding: "1.5rem",
                borderRadius: "12px", // To match a monitor's bezel
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            }}
        >
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.75rem",
                }}
            >
                <input
                    type="text"
                    placeholder="Send a message..."
                    style={{
                        flexGrow: 1,
                        padding: "0.875rem 1rem",
                        border: "1px solid #d1d5db",
                        borderRadius: "0.75rem",
                        fontSize: "1rem",
                        outline: "none",
                        boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
                    }}
                />
                <button
                    style={{
                        padding: "0.75rem",
                        border: "none",
                        backgroundColor: "#000",
                        color: "white",
                        borderRadius: "0.75rem",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path d="M7 11l5-5 5 5M12 18V6" />
                    </svg>
                </button>
            </div>
        </div>
    );
};

export default ChatGpt;
