# Mobile View Design Specification

## VayyarCare Mobile Homepage - Top Section

### Overview

This document specifies the exact pixel-perfect design for the mobile view of the VayyarCare homepage, focusing on the top section above "Connection share quality time". The design follows the reference image exactly, with clean white backgrounds, black text, and orange accent buttons.

### Design Principles

-   **Mobile-First**: All changes apply only to mobile view, desktop remains untouched
-   **Clean & Modern**: White backgrounds with black text and orange accents
-   **Consistent Spacing**: Generous vertical padding between sections
-   **Centered Layout**: Single-column mobile-optimized design
-   **Typography Hierarchy**: Clear distinction between headings and body text
-   **Content Preservation**: Keep all existing VayyarCare content and messaging - only apply Apple's design principles and CSS rules

---

## Section Breakdown

### 1. Hero Section

**Background**: White (#FFFFFF)
**Content**:

-   **Image**: Centered image of VayyarCare system/technology
    -   Size: Full width of mobile container
    -   Position: Centered horizontally
    -   Style: Professional, healthcare-focused imagery
-   **Text Layout**:
    -   **Primary Headline**: Large, bold, near-black text (#1D1D1F), centered
        -   Font Family: SF Pro Display or Magistral
        -   Font Size: 48px-56px for main headlines
        -   Font Weight: Bold (700)
        -   Line Height: 1.2
        -   Keep existing VayyarCare content and messaging
    -   **Subtitle**: Orange text (#FF6B35) below headline
        -   Font Family: SF Pro Display or Magistral
        -   Font Size: 24px-28px
        -   Font Weight: Medium (500)
        -   Line Height: 1.3
        -   Keep existing VayyarCare subtitle content
-   **Spacing**: 120px+ top/bottom padding for maximum impact

### 2. Narrow Text Section (Double Spacing)

**Background**: White
**Content**:

-   **Text Container**: Narrow width (approximately 80% of mobile container)
-   **Content**:
    -   Large, bold, black heading
    -   Multiple paragraphs with double spacing between them
    -   Left-aligned text within the narrow container
-   **Typography**:
    -   **Headings**: Large, bold, near-black text (#1D1D1F)
        -   Font Family: SF Pro Display or Magistral
        -   Font Size: 32px-40px
        -   Font Weight: Bold (700)
        -   Line Height: 1.3
    -   **Body text**: Regular weight, near-black text (#1D1D1F)
        -   Font Family: SF Pro Display or Magistral
        -   Font Size: 17px-19px
        -   Font Weight: Regular (400)
        -   Line height: 1.5-1.6 for body text
    -   **Paragraph spacing**: 2x normal spacing (48px-64px between paragraphs)

### 3. Full-Width Video

**Background**: White (#FFFFFF)
**Content**:

-   **Video**: Stretches full width of mobile container
-   **Aspect Ratio**: Maintains video proportions
-   **Controls**: Standard video player controls
-   **Spacing**: 80px-120px top/bottom padding

### 4. Product View Section

**Background**: White (#FFFFFF)
**Content**:

-   **Product Image**: Centered product shot
    -   Size: Appropriate for mobile viewing
    -   Position: Centered horizontally
-   **Text**: Below image
    -   **Heading**: Large, bold, near-black text (#1D1D1F), centered
        -   Font Family: SF Pro Display or Magistral
        -   Font Size: 32px-40px
        -   Font Weight: Bold (700)
        -   Line Height: 1.3
    -   **Description**: Regular weight, near-black text (#1D1D1F), centered
        -   Font Family: SF Pro Display or Magistral
        -   Font Size: 17px-19px
        -   Font Weight: Regular (400)
        -   Line Height: 1.5
-   **Spacing**: 80px-120px top/bottom padding

### 5. Component (Grey Background)

**Background**: Light grey (#F5F5F7 - Apple's style)
**Content Structure**:

-   **Part 1**:
    -   **Title**: Small, regular weight, near-black text (#1D1D1F)
        -   Font Family: SF Pro Display or Magistral
        -   Font Size: 18px-20px
        -   Font Weight: Regular (400)
        -   Line Height: 1.4
    -   **Subtitle**: Larger, bold, near-black text (#1D1D1F)
        -   Font Family: SF Pro Display or Magistral
        -   Font Size: 24px-28px
        -   Font Weight: Bold (700)
        -   Line Height: 1.3
    -   **Video**: Centered video content
-   **Part 2**:
    -   **Title**: Near-black, bold text (#1D1D1F)
        -   Font Family: SF Pro Display or Magistral
        -   Font Size: 32px-40px
        -   Font Weight: Bold (700)
        -   Line Height: 1.3
    -   **Content**: Medium grey text (#86868B)
        -   Font Family: SF Pro Display or Magistral
        -   Font Size: 17px-19px
        -   Font Weight: Regular (400)
        -   Line Height: 1.5
    -   **Button**: Orange background (#FF6B35), white text, centered
        -   Font Family: SF Pro Display or Magistral
        -   Font Size: 17px-19px
        -   Font Weight: Semibold (600)
        -   Style: Rounded corners (8px), prominent padding (20px-24px vertical, 40px-48px horizontal)
        -   Text: "Learn More" or similar CTA
-   **Spacing**: 80px-120px top/bottom padding

### 6. Component (White Background)

**Background**: White (#FFFFFF)
**Content Structure**:

-   **Part 1**:
    -   **Title**: Small, regular weight, near-black text (#1D1D1F)
        -   Font Family: SF Pro Display or Magistral
        -   Font Size: 18px-20px
        -   Font Weight: Regular (400)
        -   Line Height: 1.4
    -   **Subtitle**: Larger, bold, near-black text (#1D1D1F)
        -   Font Family: SF Pro Display or Magistral
        -   Font Size: 24px-28px
        -   Font Weight: Bold (700)
        -   Line Height: 1.3
    -   **Video**: Centered video content
-   **Part 2**:
    -   **Title**: Near-black, bold text (#1D1D1F)
        -   Font Family: SF Pro Display or Magistral
        -   Font Size: 32px-40px
        -   Font Weight: Bold (700)
        -   Line Height: 1.3
    -   **Content**: Medium grey text (#86868B)
        -   Font Family: SF Pro Display or Magistral
        -   Font Size: 17px-19px
        -   Font Weight: Regular (400)
        -   Line Height: 1.5
    -   **Button**: Orange background (#FF6B35), white text, centered
        -   Font Family: SF Pro Display or Magistral
        -   Font Size: 17px-19px
        -   Font Weight: Semibold (600)
        -   Same styling as previous section (rounded corners, prominent padding)
-   **Spacing**: 80px-120px top/bottom padding

### 7. Component (Grey Background) - Repeat Pattern

**Background**: Light grey
**Content**: Same structure as section 5

### 8. Component (White Background) - Repeat Pattern

**Background**: White
**Content**: Same structure as section 6

---

## Technical Specifications

### Typography Reference

**Font Family**: SF Pro Display (Apple's system font) or Magistral
**Font Weights**:

-   Regular: 400
-   Medium: 500
-   Semibold: 600
-   Bold: 700

**Font Size Scale**:

-   Hero Headlines: 48px-56px
-   Section Headers: 32px-40px
-   Subheadings: 24px-28px
-   Body Text: 17px-19px
-   Small Text: 18px-20px

**Line Heights**:

-   Headings: 1.2-1.3
-   Body Text: 1.4-1.6

### Colors

-   **Primary Background**: #FFFFFF (Pure white)
-   **Secondary Background**: #F5F5F7 (Very light grey - Apple's style)
-   **Primary Text**: #1D1D1F (Near black - Apple's style)
-   **Secondary Text**: #86868B (Medium grey - Apple's style)
-   **Accent**: #FF6B35 (Orange) or #0071E3 (Apple's signature blue)
-   **Button Text**: #FFFFFF (White)

### Spacing

-   **Section Padding**: 80px-120px top/bottom (Apple's generous spacing)
-   **Element Spacing**: 24px-32px between elements
-   **Container Margins**: 24px left/right
-   **Button Padding**: 20px-24px vertical, 40px-48px horizontal

### Layout

-   **Container Width**: 100% of mobile viewport
-   **Content Width**: 90-95% of container (centered)
-   **Text Container**: 80-85% of content width for narrow sections (Apple's style)
-   **Centering**: All content horizontally centered
-   **Hero Section**: 120px+ top/bottom padding for impact

### Responsive Behavior

-   **Breakpoint**: Mobile-only (max-width: 768px)
-   **Orientation**: Portrait and landscape support
-   **Touch Targets**: Minimum 44px for interactive elements

---

## Implementation Notes

### Component Structure

Each section should be implemented as a separate React component with consistent props:

-   `background` - Background color/style
-   `title` - Section title
-   `subtitle` - Section subtitle (if applicable)
-   `content` - Main content (text, video, image)
-   `buttonText` - Button text (if applicable)
-   `buttonAction` - Button click handler

### State Management

-   Video playback states
-   Scroll position tracking
-   Section visibility states

### Performance Considerations

-   Lazy loading for videos and images
-   Optimized image formats (WebP, AVIF)
-   Smooth scrolling animations
-   Efficient re-renders

---

## File Structure Changes

### New Components to Create

1. `MobileHeroSection.tsx` - Hero section with image and text
2. `MobileTextSection.tsx` - Narrow text with double spacing
3. `MobileVideoSection.tsx` - Full-width video section
4. `MobileProductSection.tsx` - Product showcase section
5. `MobileComponentSection.tsx` - Reusable component section (grey/white variants)

### Modified Files

1. `MobileHomeSection.tsx` - Update to use new component structure
2. `mobile-styles.css` - Add new styling for components
3. `homeSections.tsx` - Update data structure for new sections

### CSS Classes

-   `.mobile-hero-section`
-   `.mobile-text-section`
-   `.mobile-video-section`
-   `.mobile-product-section`
-   `.mobile-component-section`
-   `.mobile-component-grey`
-   `.mobile-component-white`
-   `.mobile-button-orange`
-   `.mobile-text-narrow`
-   `.mobile-text-double-spacing`
