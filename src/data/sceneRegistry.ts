/**
 * Central registry of scene identifiers
 * Use these constants whenever referring to scenes to ensure consistency
 */
export const SCENES = {
    MORNING_SHIFT: 0,
    JOHNS_SUMMARY: 1,
    FALL_EVENT: 2,
    DOCUMENT_EVENT: 3,
    // VP_CLINICAL: 4,
    // VP_FAMILY: 5,
};

// Helper function to validate a scene index is valid
export function isValidScene(sceneIndex: number): boolean {
    return Object.values(SCENES).includes(sceneIndex);
}

// Get the scene name for debugging purposes
export function getSceneName(sceneIndex: number): string | undefined {
    const entry = Object.entries(SCENES).find(
        ([_, value]) => value === sceneIndex
    );
    return entry ? entry[0] : undefined;
}

// Get total number of scenes
export function getTotalScenes() {
    return Object.keys(SCENES).length;
}

// The number of scenes we want to display in the app
export const MAX_SCENES = 4;
