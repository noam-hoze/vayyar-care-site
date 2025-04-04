# Styles Architecture

This directory contains all styling files for the Vayyar Care mockup project. We've migrated from inline CSS to modular LESS files for better maintainability and code reuse.

## Directory Structure

- **base/**: Contains foundational styles 
  - `variables.less`: Global variables for colors, spacing, typography, etc.

- **layouts/**: Contains layout-specific styles
  - `TabletLayout.less`: Styles for the tablet device layout

- **components/**: Contains component-specific styles
  - `SceneViewer.less`: Styles for the scene viewer component
  - `Chat.less`: Styles for chat-related components

- **animations/**: Contains animation-related styles
  - `animations.less`: Animation keyframes and animation utilities

- **main.less**: Entry point that imports all style modules

## Usage

To use these styles in a component:

1. Import the main LESS file in your application's entry point:

```jsx
// In index.js or App.js
import './styles/main.less';
```

2. Use the class names defined in the LESS files in your components:

```jsx
function MyComponent() {
  return (
    <div className="chat-container">
      <div className="user-message-bubble">
        <div>Hello, how are you?</div>
        <div className="timestamp">10:30 AM</div>
      </div>
    </div>
  );
}
```

## Variables and Reusable Patterns

All common values are stored as variables in `base/variables.less`:

- Colors: `@vayyar-blue`, `@primary-blue`, etc.
- Spacing: `@spacing-sm`, `@spacing-md`, etc.
- Font sizes: `@font-sm`, `@font-md`, etc.
- Z-indices: `@z-index-base`, `@z-index-popup`, etc.

You can use mixins for common patterns:

```less
.my-component {
  .message-bubble(); // Applies the message bubble styles
  // Add component-specific overrides
}
```

## Adding New Styles

1. If adding styles for a new component, create a new file in the appropriate directory
2. Import the variables: `@import '../base/variables.less';`
3. Define your styles using the variables
4. Import your new file in `main.less`

## Browser Support

These styles support modern browsers. For legacy browser support, consider adding appropriate PostCSS plugins or fallbacks. 