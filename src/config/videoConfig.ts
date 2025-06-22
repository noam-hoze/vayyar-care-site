import { SCENES, MAX_SCENES } from "../data/sceneRegistry";

// Storage key for local storage
export const STORAGE_KEY = "vayyar_custom_video";

// Video chunk configuration
export const VIDEO_CHUNKS = {
    get totalChunks() {
        return this.chunks.length;
    },
    get totalDuration() {
        return this.chunks.reduce((total, chunk) => total + chunk.duration, 0);
    },
    chunks: [
        {
            id: 0,
            path: '/videos/output-00.mp4',
            duration: 30,
            startTime: 0
        },
        {
            id: 1,
            path: '/videos/output-01.mp4',
            duration: 30,
            startTime: 30
        },
        {
            id: 2,
            path: '/videos/output-02.mp4',
            duration: 30,
            startTime: 60
        },
        {
            id: 3,
            path: '/videos/output-03.mp4',
            duration: 30,
            startTime: 90
        },
        {
            id: 4,
            path: '/videos/output-04.mp4',
            duration: 30,
            startTime: 120
        },
        {
            id: 5,
            path: '/videos/output-05.mp4',
            duration: 30,
            startTime: 150
        },
        {
            id: 6,
            path: '/videos/output-06.mp4',
            duration: 2,
            startTime: 180
        },
    ]
};

// Default video configuration
export const defaultConfig = {
    // How many viewport heights to scroll through
    scrollMultiplier: MAX_SCENES,

    // Controls the smoothness of video scrubbing (higher = smoother but more delayed)
    scrubSmoothness: 1,

    // Video source path - added timestamp for cache busting
    videoSrc: VIDEO_CHUNKS.chunks[0].path + `?t=${Date.now()}`,

    // Timing configuration for each scene
    // These times should match your video timestamps
    sceneTiming: [
        { scene: SCENES.MORNING_SHIFT, videoTime: 0 }, // Scene 0 starts at 0s
        { scene: SCENES.JOHNS_SUMMARY, videoTime: 7 }, // Scene 0 starts at 0s
        { scene: SCENES.FALL_EVENT, videoTime: 27 }, // Scene 1 starts at 3s
        // { scene: SCENES.DOCUMENT_EVENT, videoTime: 50 },
        // { scene: SCENES.VP_CLINICAL, videoTime: 70 },
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
    // The videoSrc from defaultConfig will now be the initial value.
};

// Interface for individual scene timing
export interface SceneTiming {
    scene: number;
    videoTime?: number;
    scrollingPercentage?: Record<number, { videoTime: number }>;
}

// Interface for video chunk
export interface VideoChunk {
    id: number;
    path: string;
    duration: number;
    startTime: number;
}

// Interface for the entire video configuration
export interface VideoConfig {
    videoSrc: string | null;
    sceneTiming: SceneTiming[];
    scrubSmoothness?: number;
    currentChunk?: VideoChunk;
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
