# Tablet Scene Components Migration Guide

This guide outlines the steps for migrating the tablet scene animation components to use the new component structure and styles.

## Background

We are migrating from:
- Inline styles in React components
- CSS-based animations in `animations.css`

To:
- LESS-based stylesheets
- Reusable UI components 
- Higher-order component (HOC) pattern

## Folder Structure

```
src/
├── components/
│   └── animations/
│       ├── BaseAnimatedTabletScene.js       # HOC base component
│       ├── TabletSceneComponents.js         # Reusable UI components
│       ├── AnimatedTabletScene1.js
│       └── ...
└── styles/
    ├── components/
    │   └── animations/
    │       ├── AnimatedTablet.less          # Base tablet styles
    │       ├── TabletSceneComponents.less   # UI component styles
    │       └── TabletSceneAnimations.less   # Animation classes
    ├── variables.less                       # Global variables
    ├── mixins.less                          # Utility mixins
    └── main.less                            # Main entry point
```

## Migration Steps

For each tablet scene component, follow these steps:

1. **Extract UI Components**:
   - Break down the scene into logical UI components
   - Extract common patterns into reusable components
   - Use the components from `TabletSceneComponents.js`

2. **Convert Inline Styles**:
   - Move inline styles to appropriate LESS files
   - Use class names instead of inline styles
   - Use LESS variables for colors, spacing, etc.

3. **Implement Animation Classes**:
   - Use animation classes from `TabletSceneAnimations.less`
   - Apply `.active` class based on scroll progress

4. **Refactor Component Logic**:
   - Use the HOC pattern with `withAnimatedTabletScene`
   - Separate UI rendering from animation state logic
   - Define animation thresholds in `getAnimationState`

## Example Usage

```jsx
import React from 'react';
import { withAnimatedTabletScene } from './BaseAnimatedTabletScene';
import { Card, Section, Alert } from './TabletSceneComponents';

// Scene-specific components
const MyCustomComponent = ({ data }) => (
  <Card className="my-custom-card">
    {/* Component content */}
  </Card>
);

// Main scene content
const SceneContent = ({ animationState, scene }) => {
  return (
    <div className="tablet-scene-content">
      <div className={`fade-in ${animationState.showHeader ? 'active' : ''}`}>
        <Section title="My Section Title">
          <Alert 
            type="info"
            content="This is an informational alert"
          />
          
          <div className={`slide-up ${animationState.showDetails ? 'active' : ''} delay-200`}>
            <MyCustomComponent data={scene.data} />
          </div>
        </Section>
      </div>
    </div>
  );
};

// Animation state configuration
const getAnimationState = (scrollProgress) => {
  return {
    showHeader: scrollProgress >= 15,
    showDetails: scrollProgress >= 30,
    // Add more animation states as needed
  };
};

// Export the wrapped component
export default withAnimatedTabletScene(SceneContent, getAnimationState, {
  showMetrics: true,
  showChatInput: true,
  time: '10:27 AM'
});
```

## Recommended Practices

1. **Component Organization**:
   - Keep components focused on a single responsibility
   - Extract reusable patterns into separate components
   - Use composition over inheritance

2. **Animation Guidelines**:
   - Use consistent timing for animations
   - Stagger animations for better visual flow
   - Use appropriate easing functions

3. **Styling Best Practices**:
   - Use LESS variables for consistent values
   - Follow BEM naming conventions
   - Keep styles modular and reusable

## Testing

After migrating a component:

1. Compile LESS: `npm run compile-less`
2. Run the development server: `npm run dev` 
3. Verify animations work correctly
4. Test responsiveness across device sizes

## Migration Status

- [x] Set up LESS architecture
- [x] Create base component structure
- [x] Migrate TabletSceneComponents
- [x] Migrate AnimatedTabletScene2
- [ ] Migrate AnimatedTabletScene1
- [ ] Migrate AnimatedTabletScene1_5
- [ ] Migrate AnimatedTabletScene3
- [ ] Migrate AnimatedTabletScene4
- [ ] Migrate AnimatedTabletScene5
- [ ] Migrate AnimatedTabletScene6
- [ ] Migrate AnimatedTabletScene7
- [ ] Migrate AnimatedTabletScene8
- [ ] Migrate AnimatedTabletScene9 