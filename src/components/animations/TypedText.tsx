import React, { useState, useEffect } from "react";

interface TypedTextProps {
    text: string;
    progress?: number;
    showCursor?: boolean;
    onComplete?: () => void;
    className?: string;
}

// A component that animates text as if it's being typed based on scroll progress
const TypedText: React.FC<TypedTextProps> = ({
    text,
    progress = 0, // 0-100 scroll progress
    showCursor = true,
    onComplete = () => {},
    className = "",
}) => {
    const [displayedText, setDisplayedText] = useState("");

    useEffect(() => {
        // Calculate how many characters to show based on progress
        if (text) {
            const charactersToShow = Math.floor((progress / 100) * text.length);
            const newDisplayedText = text.substring(
                0,
                Math.min(charactersToShow, text.length)
            );
            setDisplayedText(newDisplayedText);

            // Call onComplete when all text is displayed
            if (charactersToShow >= text.length) {
                onComplete();
            }
        } else {
            setDisplayedText("");
        }
    }, [text, progress, onComplete]);

    return (
        <span className={`typed-text ${className}`}>
            {displayedText}
            {showCursor && text && displayedText.length < text.length && (
                <span className="typed-text-cursor">|</span>
            )}
        </span>
    );
};

export default TypedText;
