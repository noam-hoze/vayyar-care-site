import React, { useState, CSSProperties } from "react";

const InputBar = () => {
    const [inputText, setInputText] = useState("");

    // Define styles with explicit types
    const styles: { [key: string]: CSSProperties } = {
        container: {
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            padding: "12px 16px",
            backgroundColor: "white",
            borderTop: "1px solid #E0E0E0",
            display: "flex",
            alignItems: "center",
            borderBottomLeftRadius: "36px",
            borderBottomRightRadius: "36px",
        },
        input: {
            flex: 1,
            padding: "12px 16px",
            borderRadius: "24px",
            border: "1px solid #E0E0E0",
            fontSize: "14px",
            outline: "none",
        },
        micButton: {
            width: "38px",
            height: "38px",
            borderRadius: "50%",
            backgroundColor: "white",
            border: "1px solid #E0E0E0",
            marginLeft: "8px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
        },
        sendButton: {
            width: "38px",
            height: "38px",
            borderRadius: "50%",
            backgroundColor: "#2D7DD2",
            border: "none",
            marginLeft: "8px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            color: "white",
            fontSize: "18px",
        },
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputText(e.target.value);
    };

    const handleSubmit = () => {
        if (inputText.trim()) {
            // Handle sending message functionality here
            console.log("Sending message:", inputText);
            setInputText("");
        }
    };

    return (
        <div style={styles.container}>
            <input
                type="text"
                placeholder="Ask VayyarCare about your patients..."
                value={inputText}
                onChange={handleInputChange}
                style={styles.input}
            />
            <button style={styles.micButton}>🎤</button>
            <button
                style={styles.sendButton}
                onClick={handleSubmit}
                disabled={!inputText.trim()}
            >
                ▶
            </button>
        </div>
    );
};

export default InputBar;
