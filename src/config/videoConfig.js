import { SCENES, MAX_SCENES } from "../data/sceneRegistry";

// Configuration for video scroll behavior
export const videoConfig = {
    // How many viewport heights to scroll through
    scrollMultiplier: MAX_SCENES,

    // Controls the smoothness of video scrubbing (higher = smoother but more delayed)
    scrubSmoothness: 1,

    // Video source path
    videoSrc: "/videos/output_vid_960.mp4", // Update this with your video path

    // Timing configuration for each scene
    // These times should match your video timestamps
    sceneTiming: [
        { scene: SCENES.MORNING_SHIFT, videoTime: 0 }, // Scene 0 starts at 0s
        { scene: SCENES.FALL_CHART, videoTime: 5 }, // Scene 1 starts at 3s
        { scene: SCENES.DOCUMENT_EVENT, videoTime: 10 },
        { scene: SCENES.VC_CLINICAL, videoTime: 30 },
    ],
};
