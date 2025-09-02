import { SCENES, MAX_SCENES } from "../data/sceneRegistry";

// Storage key for local storage
export const STORAGE_KEY = "vayyar_custom_video";

// Default video configuration
export const defaultConfig = {
    frameRate: 30,
    // How many viewport heights to scroll through
    scrollMultiplier: MAX_SCENES,

    // Controls the smoothness of video scrubbing (higher = smoother but more delayed)
    scrubSmoothness: 1,

    // Global UI toggles
    showLearnMoreButtons: false,
};


// Create a mutable copy of the configuration
export const videoConfig = {
    ...defaultConfig,
    // The videoSrc from defaultConfig will now be the initial value.
    videoSrc: "", // Initialize with an empty string
};






