import React from "react";
import TabletLayout, { TabletLayoutProps } from "./TabletLayout";
import useTabletScene, {
    AnimationState,
    UseTabletSceneOptions,
} from "./hooks/useTabletScene";
import { Scene } from "../../types";

interface RenderContentParams {
    animationState: AnimationState;
    getProgressInRange: (start: number, end: number) => number;
    scene: Scene;
    scrollProgress: number;
}

interface BaseAnimatedTabletSceneProps {
    scrollProgress?: number;
    scene: Scene;
    thresholds?: UseTabletSceneOptions["thresholds"];
    tabletLayoutProps?: Partial<TabletLayoutProps>;
    renderContent: (params: RenderContentParams) => React.ReactNode;
}

/**
 * Base component for all animated tablet scenes
 * @param {Object} props - Component props
 * @param {number} props.scrollProgress - Scroll progress (0-100)
 * @param {Object} props.scene - Scene data
 * @param {Object} props.thresholds - Animation thresholds
 * @param {Object} props.tabletLayoutProps - Props to pass to TabletLayout
 * @param {function} props.renderContent - Function to render scene-specific content
 */
const BaseAnimatedTabletScene: React.FC<BaseAnimatedTabletSceneProps> = ({
    scrollProgress = 0,
    scene,
    thresholds = {},
    tabletLayoutProps = {},
    renderContent,
}) => {
    // Use the common hook for animation state management
    const { animationState, getProgressInRange } = useTabletScene({
        thresholds,
        scrollProgress,
    });

    const mergedTabletProps: TabletLayoutProps = {
        time: "9:41 AM",
        showChatInput: true,
        showMetrics: true,
        scene: scene,
        scrollProgress: scrollProgress,
        ...tabletLayoutProps,
        children: null,
    };

    return (
        <TabletLayout {...mergedTabletProps}>
            {/* Call the render function with animation state and helpers */}
            {renderContent({
                animationState,
                getProgressInRange,
                scene,
                scrollProgress,
            })}
        </TabletLayout>
    );
};

interface HocProps {
    scrollProgress: number;
    scene: Scene;
    [key: string]: any;
}

/**
 * HOC that wraps a component with BaseAnimatedTabletScene
 * @param {React.Component} ContentComponent - The component to render inside the tablet
 * @param {function} getAnimationStateFunc - Function to calculate animation state from scroll progress
 * @param {Object} tabletLayoutProps - Props for TabletLayout
 * @returns {function} Higher-order component
 */
export const withAnimatedTabletScene = <P extends HocProps>(
    ContentComponent: React.ComponentType<any>,
    getAnimationStateFunc: (scrollProgress: number) => AnimationState,
    tabletLayoutProps: Partial<TabletLayoutProps> = {}
) => {
    return (props: P) => {
        const { scrollProgress, scene, ...restProps } = props;

        // Get animation state using the provided function
        const animationState = getAnimationStateFunc(scrollProgress);

        return (
            <BaseAnimatedTabletScene
                scrollProgress={scrollProgress}
                scene={scene}
                tabletLayoutProps={tabletLayoutProps}
                renderContent={(sceneProps: RenderContentParams) => (
                    <ContentComponent {...sceneProps} {...restProps} />
                )}
            />
        );
    };
};

export default BaseAnimatedTabletScene;
