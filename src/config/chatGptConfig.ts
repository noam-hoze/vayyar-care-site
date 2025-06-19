// Configuration for ChatGpt component displays in different modes
export interface ChatGptInstance {
  appearTime: number;       // Time in seconds when the ChatGpt component should appear
  disappearTime: number;    // Time in seconds when the ChatGpt component should disappear
  fadeDuration?: number;    // Duration in seconds for fade in/out effects (default: 0.2)
  mode: 'desktop' | 'mobile';  // Display mode for this instance
  position?: {              // Optional positioning override
    top?: string;
    left?: string;
    right?: string;
    bottom?: string;
    width?: string;
    height?: string;
  };
  zIndex?: number;          // Optional z-index override
  content?: {               // Optional content customization
    message?: string;       // Custom message to display
    customClass?: string;   // Custom CSS class to apply
  };
}

// Default configuration for ChatGpt instances
export const chatGptConfig: ChatGptInstance[] = [
  // Desktop instance
  {
    appearTime: 12 + 1/30,  // 00:00:12:01
    disappearTime: 14,      // 00:00:14:00
    fadeDuration: 0.2,
    mode: 'desktop',
    position: {
      top: '0',
      left: '0',
      width: '100%',
      height: '100%'
    }
  },
  // First mobile instance
  {
    appearTime: 28,         // 00:00:20:00
    disappearTime: 35,      // 00:00:22:00
    fadeDuration: 0.2,
    mode: 'mobile',
    position: {
      top: "226px",
      left: "190px",
      width: "370px",
      height: "790px",
    },
  },
  // Second mobile instance
  {
    appearTime: 60 + 32 + 25/30, // 00:00:28:00
    disappearTime: 60 + 55 + 25/30,      // 00:00:30:00
    fadeDuration: 0.2,
    mode: 'mobile',
    position: {
      top: "260px",
      right: "40px",
      width: "370px",
      height: "790px",
    },
  }
];
