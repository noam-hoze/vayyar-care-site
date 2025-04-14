import React from "react";
import { Scene } from "../types";

// Remove local Scene interface definition
/*
interface Scene {
    title?: string;
    description?: string;
    extraDescription?: { title: string; content: string[] };
    [key: string]: any;
}
*/

interface SceneInstructionsHeaderProps {
    scene: Scene;
}

const SceneInstructionsHeader: React.FC<SceneInstructionsHeaderProps> = ({
    scene,
}) => {
    return (
        <div
            style={{
                textAlign: "center",
                padding: "0 6vw",
            }}
        >
            <h1
                style={{
                    fontSize: "2.5rem",
                    margin: "0 0 0.5rem 0",
                    color: "#2D7DD2",
                }}
            >
                {scene.title}
            </h1>
            {scene.description && (
                <h2
                    style={{
                        fontSize: "1.2rem",
                        fontWeight: "normal",
                        margin: "0 0 1rem 0",
                        color: "#495057",
                    }}
                >
                    {scene.description}
                </h2>
            )}
            {scene.extraDescription && (
                <div className="extra-description">
                    <h2
                        style={{
                            fontSize: "1.2rem",
                            fontWeight: "normal",
                            margin: "0 0 1rem 0",
                            color: "#495057",
                        }}
                    >
                        {scene.extraDescription.title}
                    </h2>
                    <ul>
                        {scene.extraDescription.content.map(
                            (item: string, index: number) => (
                                <li key={index}>{item}</li>
                            )
                        )}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default SceneInstructionsHeader;
