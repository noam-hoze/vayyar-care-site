# Mobile View Design Specification

## VayyarCare Mobile Homepage - Top Section

### Overview

This document specifies the exact pixel-perfect design for the mobile view of the VayyarCare homepage, focusing on the top section above "Connection share quality time". The design follows the reference image exactly, with clean white backgrounds, black text, and orange accent buttons.

### Design Principles

-   **Mobile-First**: All changes apply only to mobile view, desktop remains untouched
-   **Clean & Modern**: White backgrounds with near‑black text; subtle, consistent accent usage
-   **Consistent Spacing**: Generous vertical padding between sections
-   **Centered Layout**: Single-column mobile-optimized design
-   **Typography Hierarchy**: Clear distinction between eyebrow label, headline, section titles, and body text
-   **Content Preservation**: Keep all existing VayyarCare content and messaging – apply Apple-style layout and CSS only

---

## Section Breakdown

### Standard Mobile Section Pattern (Vision Pro–style)

-   **Part 1 — Text (default)**
    -   Eyebrow label above the headline (e.g., “Entertainment”), uppercase/small caps
    -   Large, bold, centered multi‑line headline
    -   White background
    -   This is the default for mobile. The “narrow text” variant below is a special case used only when explicitly flagged.
-   **Part 2 — Video**
    -   Plain 16:9 video immediately below Part 1
    -   No scroll‑scrub, no GSAP, no pinning; standard inline playback
-   **Part 3 — Title + Content**
    -   Left‑aligned title and paragraphs below the video
    -   Apple‑style spacing and typography (details below)

### 1. Hero Section (Mobile)

**Background**: White (#FFFFFF)
**Content**:

-   **Eyebrow label (optional)**: Small, near‑black text above the headline (e.g., “Entertainment”)
    -   Font Family: SF Pro Display or Magistral
    -   Font Size: 14px–16px
    -   Font Weight: 600
    -   Letter‑spacing: 0.3–0.5px; uppercase/small caps styling
-   **Primary Headline**: Large, bold, near‑black text (#1D1D1F), centered, multi‑line
    -   Font Family: SF Pro Display or Magistral
    -   Font Size: 40px–44px
    -   Font Weight: Bold (700)
    -   Line Height: 1.1–1.2
    -   Keep existing VayyarCare headline copy
-   **Spacing**: 64px–96px top/bottom padding

### 2. Narrow Text Section (Special‑case variant)

Use only when explicitly enabled for a section. Replaces the default Part 1 text block on mobile.

**Background**: White
**Content**:

-   **Text Container**: Narrow width (80%–85% of the mobile content width), left‑aligned
-   **Heading**: Large, bold, near‑black text (#1D1D1F)
    -   Font Size: 32px–36px, Line Height: 1.25–1.3
-   **Body**: Regular weight, near‑black text (#1D1D1F)
    -   Font Size: 17px–19px, Line Height: 1.5–1.6
-   **Paragraph spacing**: Double spacing (48px–64px between paragraphs)

### 3. Video (Mobile)

**Background**: White (#FFFFFF)
**Content**:

-   **Video**: Full width of mobile container
-   **Aspect Ratio**: Fixed 16:9 using CSS (`aspect-ratio: 16 / 9` or equivalent wrapper)
-   **Behavior**: Plain inline video; no GSAP/ScrollTrigger, no scrubbing/pinning
-   **Controls**: Standard video player controls (playsInline, muted/autoplay as needed)
-   **Spacing**: 32px–56px above/below

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

-   Mobile Hero Headlines (default Part 1): 40px–44px
-   Section Headers (Part 3 titles): 24px–28px
-   Eyebrow Label: 14px–16px
-   Body Text: 17px–19px
-   Small Text: 18px–20px

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
-   **Content Width**: 90%–95% of container (centered)
-   **Text Container**: 80%–85% of content width for narrow‑text variant only
-   **Centering**: Content horizontally centered unless using narrow‑text variant (left‑aligned)
-   **Hero Section**: 64px–96px top/bottom padding

### Responsive Behavior

-   **Breakpoint**: Mobile-only (max-width: 768px)
-   **Orientation**: Portrait and landscape support
-   **Touch Targets**: Minimum 44px for interactive elements

---

## Implementation Notes

### Component Structure

Each section should be implemented as a separate React component with consistent props:

-   `background` - Background color/style
-   `eyebrow` - Optional small label above headline (default Part 1 only)
-   `headline` - Default Part 1 headline text
-   `narrowText` - Optional narrow‑text content (special‑case variant)
-   `content` - Main content (text, video, image)
-   `buttonText` - Button text (if applicable)
-   `buttonAction` - Button click handler

### State Management

-   Video playback states
-   Scroll position tracking
-   Section visibility states

For mobile top sections, avoid scroll‑based video state; render as plain video.

### Performance Considerations

-   Lazy loading for videos and images
-   Optimized image formats (WebP, AVIF)
-   Smooth scrolling animations
-   Efficient re-renders

---

## File Structure Changes

### New Components to Create

1. `MobileHeroText.tsx` - Default Part 1 text (eyebrow + headline, centered)
2. `MobileNarrowText.tsx` - Special‑case narrow text with double spacing
3. `MobileVideo16x9.tsx` - Plain 16:9 video section (no GSAP)
4. `MobileProductSection.tsx` - Product showcase section
5. `MobileComponentSection.tsx` - Reusable component section (grey/white variants)

### Modified Files

1. `MobileHomeSection.tsx` - Update to use new component structure
2. `mobile-styles.css` - Add new styling for components
3. `homeSections.tsx` - Add flags for mobile variants:
    - `mobileVariant: "narrow-text" | "default"` (default is "default")
    - `mobileVideoMode: "plain-16x9"` (enforced for mobile top sections)

### CSS Classes

-   `.mobile-hero-section`
-   `.mobile-hero-eyebrow`
-   `.mobile-hero-headline`
-   `.mobile-video-16x9`
-   `.mobile-section-title`
-   `.mobile-section-body`
-   `.mobile-text-section`
-   `.mobile-text-narrow`
-   `.mobile-text-double-spacing`
-   `.mobile-product-section`
-   `.mobile-component-section`
-   `.mobile-component-grey`
-   `.mobile-component-white`
-   `.mobile-button-orange`

### Mobile Behavior Overrides

-   For mobile rendering of the top section and any sections following this pattern:
    -   Always render Part 2 as a simple 16:9 video; disable scrolly/scrub/pinning behaviors
    -   If a section is marked as `mobileVariant: "narrow-text"`, replace the default Part 1 text block with the narrow‑text variant
    -   Keep desktop behavior and order unchanged
