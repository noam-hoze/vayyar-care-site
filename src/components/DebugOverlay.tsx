import React from "react";
import { Scene } from "../types"; // Corrected import path

// Remove local Scene interface definition
/*
interface Scene {
    title?: string;
    [key: string]: any;
}
*/

interface DebugOverlayProps {
    scrollProgress: number;
    animationProgress: number;
    scene: Scene | null | undefined; // Use imported Scene
    sceneIndex: number;
}

/**
 * Debug overlay component to display animation and scene information
 * @param {Object} props - Component props
 * @param {number} props.scrollProgress - Current scroll progress (0-100)
 * @param {number} props.animationProgress - Current animation progress (0-100)
 * @param {Object} props.scene - Current scene object
 * @param {number} props.sceneIndex - Current scene index
 */
const DebugOverlay: React.FC<DebugOverlayProps> = ({
    scrollProgress,
    animationProgress,
    scene,
    sceneIndex,
}) => {
    return (
        <div className="debug-overlay">
            <div className="debug-overlay-item">
                Scroll: {Math.round(scrollProgress * 100)}%
            </div>
            <div className="debug-overlay-item">
                Animation: {Math.round(animationProgress)}%
            </div>
            <div className="debug-overlay-item">
                Scene: {scene?.title || "None"} (Index: {sceneIndex})
            </div>
        </div>
    );
};

export default DebugOverlay;
