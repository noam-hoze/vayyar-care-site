import { useState, useEffect } from "react";

// Define the shape of the thresholds object
interface Thresholds {
    [key: string]: number | [number, number | undefined]; // Key is animation name, value is threshold or [start, end]
}

// Define the shape of the hook's configuration object
export interface UseTabletSceneOptions {
    thresholds?: Thresholds;
    scrollProgress?: number;
}

// Define the shape of the returned animation state object
export interface AnimationState {
    [key: string]: boolean; // Key is animation name, value is whether it's active
}

/**
 * Custom hook for managing animation states based on scroll progress
 * @param {Object} config - Configuration object
 * @param {Object} config.thresholds - Scroll position thresholds for each animation state
 * @param {number} scrollProgress - Current scroll progress (0-100)
 * @returns {Object} Animation state object with boolean flags
 */
const useTabletScene = ({
    thresholds = {},
    scrollProgress = 0,
}: UseTabletSceneOptions): {
    animationState: AnimationState;
    getProgressInRange: (start: number, end: number) => number;
} => {
    // Create state object based on thresholds, explicitly typed
    const [animationState, setAnimationState] = useState<AnimationState>(
        Object.keys(thresholds).reduce<AnimationState>((acc, key) => {
            acc[key] = false;
            return acc;
        }, {})
    );

    // Update animation state based on scroll progress
    useEffect(() => {
        const newState = Object.keys(thresholds).reduce<AnimationState>(
            (acc, key) => {
                const thresholdValue = thresholds[key];
                // Check if this animation should be activated
                if (Array.isArray(thresholdValue)) {
                    // If threshold is [start, end], show when scrollProgress is between start and end
                    const [start, end] = thresholdValue;
                    acc[key] =
                        scrollProgress >= start &&
                        (end === undefined || scrollProgress < end);
                } else if (typeof thresholdValue === "number") {
                    // If threshold is a single value, show when scrollProgress is >= that value
                    acc[key] = scrollProgress >= thresholdValue;
                }
                return acc;
            },
            {}
        );

        setAnimationState(newState);
    }, [scrollProgress, thresholds]);

    // Helper functions
    const getProgressInRange = (start: number, end: number): number => {
        // Added types
        // Calculate progress percentage within a specific range
        if (scrollProgress < start) return 0;
        if (scrollProgress >= end) return 100;
        // Avoid division by zero if start and end are the same
        if (end === start) return scrollProgress >= start ? 100 : 0;
        return ((scrollProgress - start) / (end - start)) * 100;
    };

    return {
        animationState,
        getProgressInRange,
    };
};

export default useTabletScene;
