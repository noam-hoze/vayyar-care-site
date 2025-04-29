import { SCENES, MAX_SCENES } from "../data/sceneRegistry";

// Storage key for local storage
export const STORAGE_KEY = "vayyar_custom_video";

// Default video configuration
export const defaultConfig = {
    // How many viewport heights to scroll through
    scrollMultiplier: MAX_SCENES,

    // Controls the smoothness of video scrubbing (higher = smoother but more delayed)
    scrubSmoothness: 1,

    // Video source path
    videoSrc: "", // Default video path

    // Timing configuration for each scene
    // These times should match your video timestamps
    sceneTiming: [
        { scene: SCENES.MORNING_SHIFT, videoTime: 0 }, // Scene 0 starts at 0s
        { scene: SCENES.FALL_CHART, videoTime: 5}, // Scene 1 starts at 3s
        { scene: SCENES.DOCUMENT_EVENT, videoTime: 10 },
        { scene: SCENES.VP_CLINICAL, videoTime: 30 },
    ],
};

// Check if there's a saved custom video URL in localStorage
const loadSavedVideo = () => {
    try {
        // Add check for window object
        if (typeof window !== "undefined") {
            const savedVideo = localStorage.getItem(STORAGE_KEY);
            if (savedVideo) {
                // Check if URL starts with 'https://' to identify Firebase Storage URLs
                if (
                    savedVideo.startsWith(
                        "https://firebasestorage.googleapis.com"
                    )
                ) {
                    return savedVideo;
                }
                // For backward compatibility with old localStorage data
                else {
                    // If it's an object URL or other format, reset to default
                    localStorage.removeItem(STORAGE_KEY);
                }
            }
        }
    } catch (error) {
        console.error("Error loading saved video:", error);
    }
    // Return default if not found or not in browser
    return defaultConfig.videoSrc;
};

// Create a mutable copy of the configuration
export const videoConfig = {
    ...defaultConfig,
    // Call loadSavedVideo here, it handles the window check
    videoSrc: loadSavedVideo(),
};

// Interface for individual scene timing
export interface SceneTiming {
    scene: number;
    videoTime?: number;
    scrollingPercentage?: Record<number, { videoTime: number }>;
}

// Interface for the entire video configuration
export interface VideoConfig {
    videoSrc: string | null;
    sceneTiming: SceneTiming[];
    scrubSmoothness?: number;
}

// Function to update the video source
export const updateVideoSource = (newSource: string): void => {
    videoConfig.videoSrc = newSource;

    try {
        // Add check for window object
        if (typeof window !== "undefined") {
            localStorage.setItem(STORAGE_KEY, newSource);
        }
    } catch (error) {
        console.error("Error saving video source to localStorage:", error);
    }
};

// Function to reset to default video
export const resetToDefaultVideo = () => {
    videoConfig.videoSrc = defaultConfig.videoSrc;

    try {
        // Add check for window object
        if (typeof window !== "undefined") {
            // Remove from localStorage
            localStorage.removeItem(STORAGE_KEY);
        }
    } catch (error) {
        console.error("Error removing saved video:", error);
    }

    // Return the updated config for chaining
    return videoConfig;
};

// Function to check if a custom video is active
export const isCustomVideoActive = (): boolean => {
    // This function doesn't access localStorage, no change needed
    return videoConfig.videoSrc !== defaultConfig.videoSrc;
};

// Function to clear the video source and localStorage
export const clearVideoSource = () => {
    try {
        // Add check for window object
        if (typeof window !== "undefined") {
            localStorage.removeItem(STORAGE_KEY);
        }
        videoConfig.videoSrc = ""; // Still clear the config value
        console.log("Video source cleared successfully");
    } catch (error) {
        console.error("Error removing video source from localStorage:", error);
    }

    return videoConfig;
};

// Initialize video source on load - DEFER this
// const initializeVideoSource = (): void => {
//     try {
//         // Add check for window object
//         if (typeof window !== 'undefined') {
//             const storedUrl = localStorage.getItem(STORAGE_KEY);
//             if (storedUrl) {
//                 videoConfig.videoSrc = storedUrl;
//             }
//         }
//     } catch (error) {
//         console.error("Error reading video source from localStorage:", error);
//     }
// };

// // Call initialization - REMOVE this call from module scope
// initializeVideoSource();
