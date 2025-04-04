import React from 'react';
import TabletLayout from './TabletLayout';
import useTabletScene from './hooks/useTabletScene';

/**
 * Base component for all animated tablet scenes
 * @param {Object} props - Component props
 * @param {number} props.scrollProgress - Scroll progress (0-100)
 * @param {Object} props.scene - Scene data
 * @param {Object} props.thresholds - Animation thresholds
 * @param {Object} props.tabletLayoutProps - Props to pass to TabletLayout
 * @param {function} props.renderContent - Function to render scene-specific content
 */
const BaseAnimatedTabletScene = ({
  scrollProgress = 0,
  scene = {},
  thresholds = {},
  tabletLayoutProps = {},
  renderContent
}) => {
  // Use the common hook for animation state management
  const { animationState, getProgressInRange } = useTabletScene({
    thresholds,
    scrollProgress
  });

  const defaultTabletProps = {
    time: "9:41 AM",
    showChatInput: true,
    showMetrics: true,
    ...tabletLayoutProps
  };

  return (
    <TabletLayout {...defaultTabletProps}>
      {/* Call the render function with animation state and helpers */}
      {renderContent({
        animationState,
        getProgressInRange,
        scene,
        scrollProgress
      })}
    </TabletLayout>
  );
};

/**
 * HOC that wraps a component with BaseAnimatedTabletScene
 * @param {React.Component} ContentComponent - The component to render inside the tablet
 * @param {function} getAnimationStateFunc - Function to calculate animation state from scroll progress
 * @param {Object} tabletLayoutProps - Props for TabletLayout
 * @returns {function} Higher-order component
 */
export const withAnimatedTabletScene = (
  ContentComponent,
  getAnimationStateFunc,
  tabletLayoutProps = {}
) => {
  return (props) => {
    const { scrollProgress, scene } = props;
    
    // Get animation state using the provided function
    const animationState = getAnimationStateFunc(scrollProgress);
    
    return (
      <BaseAnimatedTabletScene
        scrollProgress={scrollProgress}
        scene={scene}
        tabletLayoutProps={tabletLayoutProps}
        renderContent={(sceneProps) => (
          <ContentComponent
            animationState={animationState}
            scene={scene}
            scrollProgress={scrollProgress}
            {...props}
          />
        )}
      />
    );
  };
};

export default BaseAnimatedTabletScene; 