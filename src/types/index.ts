export interface Scene {
    scene: number; // Identifier from SCENES enum
    title?: string;
    description?: string;
    calloutDisplayPercentage?: string; // e.g., "80"
    content?: string[]; // Array of strings, e.g., bullet points
    percentageText?: {
        [key: number]: { text: string }; // e.g., { 70: { text: "..." } }
    };
    showUpAt?: number; // Percentage (0-100) when description starts fading in
    disappearAt?: number; // Percentage (0-100) when description starts fading out
    layout?: string; // e.g., "two-column"
    color?: string; // e.g., "#000"
    subtitle?: string;
    wipeStartAt?: number; // Percentage (0-100) when color wipe animation should start
    // Add any other properties observed in scenes.ts data
    cta?: { text: string; link?: string; showUpAt?: number }; // Added showUpAt inside cta definition
}
