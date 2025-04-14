export interface Scene {
    scene: number; // Identifier from SCENES enum
    title?: string;
    description?: string;
    calloutDisplayPercentage?: string; // e.g., "80"
    content?: string[]; // Array of strings, e.g., bullet points
    percentageText?: {
        [key: number]: { text: string }; // e.g., { 70: { text: "..." } }
    };
    layout?: string; // e.g., "two-column"
    color?: string; // e.g., "#000"
    subtitle?: string;
    // Add any other properties observed in scenes.ts data
}
