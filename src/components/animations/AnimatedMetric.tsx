import React, { useState, useEffect } from "react";

interface AnimatedMetricProps {
    start?: number;
    end: number; // Added type
    progress?: number; // 0-100 scroll progress
    onComplete?: () => void;
    className?: string;
    increasing?: boolean;
}

// A component that animates a number counting up or down based on scroll progress
const AnimatedMetric: React.FC<AnimatedMetricProps> = ({
    start = 0,
    end,
    progress = 0, // 0-100 scroll progress
    onComplete = () => {},
    className = "",
    increasing = true,
}) => {
    const [currentValue, setCurrentValue] = useState(start);

    useEffect(() => {
        // Calculate the current value based on progress
        if (progress >= 100) {
            setCurrentValue(end);
            onComplete();
        } else if (progress <= 0) {
            setCurrentValue(start);
        } else {
            // Use easing function for smoother progression
            const easedProgress = easeOutQuad(progress / 100);
            const newValue = start + Math.floor((end - start) * easedProgress);
            setCurrentValue(newValue);

            if (progress >= 99) {
                onComplete();
            }
        }
    }, [start, end, progress, onComplete]);

    // Easing function for smoother animation
    function easeOutQuad(t: number): number {
        return t * (2 - t);
    }

    // Determine direction class
    const directionClass = increasing
        ? "animated-metric-increasing"
        : "animated-metric-decreasing";

    return (
        <span className={`animated-metric ${directionClass} ${className}`}>
            <span className="animated-metric-value">{currentValue}</span>
        </span>
    );
};

export default AnimatedMetric;
