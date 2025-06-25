// Configuration for ChatGpt component displays in different modes
export interface ChatGptInstance {
  appearTime: number;       // Time in seconds when the ChatGpt component should appear
  disappearTime: number;    // Time in seconds when the ChatGpt component should disappear
  fadeDuration?: number;    // Duration in seconds for fade in/out effects (default: 0.2)
  mode: 'desktop' | 'mobile';  // Display mode for this instance
  showPhoneBackground?: boolean; // New flag to control phone image display
  animation?: {             // Optional animation configuration
    type: 'fade' | 'slide'; // Animation type (default: 'fade')
    direction?: 'left-to-right' | 'right-to-left'; // Direction for slide animation
    duration?: number;      // Duration of the animation in seconds (default: 0.5)
  };
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
    animation: {
      type: 'fade',
      duration: 0.3
    },
    position: {
      top: '0',
      left: '0',
      width: '100%',
      height: '100%'
    },
    content: {
      message: "Hi Alice, how can I help?"
    }
  },
  // First mobile instance
  {
    appearTime: 28,         // 00:00:20:00
    disappearTime: 35,      // 00:00:22:00
    fadeDuration: 0.2,
    mode: 'mobile',
    showPhoneBackground: true,
    animation: {
      type: 'slide',
      direction: 'left-to-right',
      duration: 0.5
    },
    position: {
      top: "226px",
      left: "200px",
      width: "350px",
      height: "790px",
    },
    content: {
      message: ""
    },
  },
  // Second mobile instance
  {
    appearTime: 60 + 15 + 28/30, // 00:00:28:00
    disappearTime: 60 + 17 + 28/30,      // 00:00:30:00
    fadeDuration: 0.2,
    mode: 'mobile',
    animation: {
      type: 'fade',
      duration: 0.5
    },
    position: {
      top: "calc(50% - 425px)",
      left: "calc(50% - 190px)",
      width: "275px",
      height: "605px",
    },
    content: {
      message: "",
      customClass: "rotated-phone"
    },
  },
  // Third mobile instance
  {
    appearTime: 60 + 32 + 25/30, // 00:00:28:00
    disappearTime: 60 + 44 + 24/30,      // 00:00:30:00
    fadeDuration: 0.2,
    mode: 'mobile',
    showPhoneBackground: true,
    animation: {
      type: 'slide',
      direction: 'right-to-left',
      duration: 0.5
    },
    position: {
      top: "260px",
      right: "50px",
      width: "350px",
      height: "790px",
    },
    content: {
      message: ""
    },
  }
];
