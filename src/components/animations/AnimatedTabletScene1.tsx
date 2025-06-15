import React, { ReactNode } from "react";
import AnimatedMetric from "./AnimatedMetric";
import FadeInList from "./FadeInList";
import TabletLayout from "./TabletLayout";
import { Scene } from "../../types"; // Import Scene from types.ts
import "./animations.css";

// Define the Vayyar blue color as a constant for reuse
const VAYYAR_BLUE = "rgba(5, 170, 233, 1)";

interface AnimatedTabletScene1Props {
    scrollProgress?: number;
    scene: Scene; // Use imported Scene
}

const AnimatedTabletScene1: React.FC<AnimatedTabletScene1Props> = ({
    scrollProgress = 0,
    scene,
}) => {
    // Current scene query and response
    const currentQuery = "Show me yesterday's summary";
    const textResponse = "Good morning Alice! Here's your shift summary.";

    // Bridge query to scene 2
    const nextQuery = "Show me Joe's fall analysis for May";

    // Ensure summaryItems is an array of ReactNode or default to empty array
    const summaryItems: ReactNode[] = Array.isArray(scene.content)
        ? scene.content
        : [];

    // Render the summary item with appropriate styling - item is ReactNode
    const renderSummaryItem = (
        item: ReactNode,
        index: number // Accept ReactNode
    ) => (
        <div key={index} className="animated-tablet-summary-item">
            <span className="animated-tablet-summary-item-bullet">•</span>
            {item}
        </div>
    );

    // Calculate progress for the summary items fade-in
    const calculateSummaryProgress = () => {
        // Show summary items starting at 65% scroll
        if (scrollProgress < 65) return 0;
        // Complete showing all items by 85% scroll
        return Math.min(100, Math.max(0, ((scrollProgress - 65) / 20) * 100));
    };

    // Visual response content that will be displayed after the query
    const visualResponse = (
        <>
            {scrollProgress >= 60 && (
                <div className="animated-tablet-summary-title">
                    Shift Summary
                </div>
            )}

            {scrollProgress >= 65 && (
                <div className="animated-tablet-summary-container">
                    <FadeInList
                        items={summaryItems}
                        renderItem={renderSummaryItem}
                        progress={calculateSummaryProgress()}
                        delayBetween={150}
                    />
                </div>
            )}
        </>
    );

    return (
        <TabletLayout
            scene={scene}
            showMetrics={true}
            time="9:41 AM"
            currentQuery={currentQuery}
            nextQuery={nextQuery}
            textResponse={textResponse}
            scrollProgress={scrollProgress}
            queryStartThreshold={10}
            queryCompleteThreshold={25}
            responseStartThreshold={35}
            transitionStartThreshold={85}
            contentTransitionThreshold={95}
            showChatInput={true}
        >
            {visualResponse}
        </TabletLayout>
    );
};

export default AnimatedTabletScene1;
