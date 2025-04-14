import React, { ReactNode } from "react";
import { Scene } from "../types"; // Corrected import path

// Remove local Scene interface definition
/*
interface Scene {
    content?: ReactNode[]; // Expect content to be an array of renderable items
    [key: string]: any;
}
*/

interface SceneInstructionsProps {
    scene: Scene; // Use imported Scene
}

const SceneInstructions: React.FC<SceneInstructionsProps> = ({ scene }) => {
    const renderContent = () => {
        if (!scene.content || !Array.isArray(scene.content)) return null;

        return (
            <div
                style={{
                    backgroundColor: "#fff",
                    borderRadius: "8px",
                    padding: "1rem 1.5rem",
                    marginTop: "1rem",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                }}
            >
                {scene.content.map(
                    (
                        item: ReactNode,
                        index: number // Added types
                    ) => (
                        <div
                            key={index}
                            style={{
                                padding: "0.5rem 0",
                                borderBottom:
                                    index < (scene.content?.length ?? 0) - 1
                                        ? "1px solid #eee"
                                        : "none", // Added null check for length
                            }}
                        >
                            {item}
                        </div>
                    )
                )}
            </div>
        );
    };

    return renderContent();
};

export default SceneInstructions;
