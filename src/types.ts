import { ReactNode } from "react";

// Centralized Scene interface
export interface Scene {
    scene: number;
    title?: string;
    subtitle?: string; // Added from TabletDisplay usage
    description?: string;
    content?: ReactNode[] | string[]; // Allow string array (TabletDisplay) or ReactNode array (SceneInstructions)
    calloutDisplayPercentage?: string;
    extraDescription?: {
        title: string;
        content: string[];
    };
    percentageText?: Record<number, { text: string }>; // NEW: For SceneViewer
    // Add other potential scene properties if needed
    [key: string]: any; // Allow flexibility
}

// Centralized Priority type
export type Priority = "high" | "medium" | "low";

// Centralized CardData type (used by Watchlist and MobileApp)
export interface CardData {
    id: string | number;
    priority: Priority;
    icon: ReactNode;
    room: string;
    description: string;
}
