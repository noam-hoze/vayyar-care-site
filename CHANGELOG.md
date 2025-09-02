# Changelog

## [0.14.0] - 2024-12-21

### Tag: with video controls

### Added
- **Video Controls Component**: Extracted video controls into a dedicated `VideoControls.tsx` component for better maintainability
- **Enhanced Play/Pause Button**: Added pointer cursor on hover for better user experience
- **CSS Module Renaming**: Renamed `DefaultSection.module.css` to `sectionRenderer.module.css` for clearer naming convention

### Fixed
- **Import References**: Updated all import statements across 6 files to reference the new CSS module name
- **Component Organization**: Improved code organization with cleaner separation of concerns

### Changed
- **File Structure**: Better organized CSS modules with more descriptive naming
- **Component Architecture**: Enhanced modularity with dedicated video controls component

## [0.13.0] - 2024-12-20

### Tag: stable but still without play/pause on mobile

### Added
- **Modular Architecture**: Completely refactored `DefaultSection.tsx` into smaller, focused modules
  - `useVideoState.ts` - Centralized video state management
  - `useScrollAnimations.ts` - GSAP ScrollTrigger logic
  - `SectionRouter.tsx` - Conditional rendering logic
  - `SectionRenderer.tsx` - Main orchestrator component
- **Enhanced MobileVideoSection**: Added support for different text styling modes
- **Improved Ring Animation**: Restored smooth progress ring animation around play/pause buttons

### Fixed
- **Mobile Text Regressions**: Restored proper mobile text styling and layout
- **Video Loading Issues**: Fixed video source loading from Cloudflare Stream
- **UI Consistency**: Play/pause button now shows correct initial state (pause for autoplay)
- **Ring Animation**: Beautiful progress ring animation working again
- **Narrow Text Section**: Intro section now displays with proper narrow text styling
- **HTML Rendering**: Fixed [object Object] issues with JSX rendering

### Changed
- **Component Structure**: Reduced `DefaultSection.tsx` from 828 lines to 135 lines
- **Code Organization**: Better separation of concerns with hooks and focused components
- **Video State Management**: Centralized video logic with proper autoplay handling

## [0.12.0] - 2024-08-13

### Added
- Implemented a stable, Apple-style play/pause button with a smooth progress ring animation for all videos.
- The animation is driven by a `requestAnimationFrame` loop for buttery-smooth visual feedback, accurately synced to video playback.
- Refactored video components to remove obsolete timing logic and simplify state management.

### Fixed
- Resolved numerous CSS layering issues to ensure the play/pause button is always visible and clickable, especially during "scrolly-telling" sections.
- Fixed video caching issues and ensured correct videos are loaded for both mobile and desktop views.
- Corrected regressions related to text overlay and dark overlay appearance.

## [0.11.0] - 2024-09-02

### Refactor

-   **Video Playback Overhaul**: Migrated video hosting and playback from a single, locally hosted, segmented video to individual videos served by Cloudflare Stream.
-   **Simplified Configuration**: Removed the complex timing and segmentation logic from `videoConfig.ts`, including obsolete properties like `compensation`, `calculateTextTime`, and `sceneTiming`.
-   **Component Refactoring**: Updated the `DefaultSection` component to remove all legacy code related to video timings and segments. The component now handles all videos as standalone clips.

### Fixed

-   **Mobile Video Playback**: Resolved a critical bug where the incorrect video (or no video) was loading on mobile devices due to flawed server-side rendering logic. The component now correctly identifies the device and serves the appropriate video from Cloudflare Stream.
-   **Autoplay Consistency**: Corrected an issue where the mobile hero video was not autoplaying, while other mobile videos were. All mobile videos now follow a consistent autoplay behavior.
-   **Video Overlay**: Fixed a CSS bug that caused the video overlay to be incorrectly sized and not cover the entire video area.

## [0.10.1] - 2024-08-28

### Changed

-   **Responsive Product Image**: The product section now displays a mobile-specific image (`product-mobile.png`) on smaller screens for both the main view and the expanded modal view.
-   **Mobile-Specific Styling**: Added a Vayyar blue border to the product image on mobile.
-   **Layout Adjustments**:
    -   Modified the product section layout on mobile to remove `justify-content: center` and `min-height` for better content flow.
    -   Adjusted margins and padding for the product image and section on mobile devices.
-   **Modal Overflow Fix**: Corrected a layout issue where the product modal would overflow on mobile screens by adjusting font sizes, spacing, and container heights to ensure all content fits within the viewport.

## [0.10.0] - 2024-08-28

### Added

-   **Symmetrical Modal Animations**: Implemented a fade-out animation for the product modal that mirrors the fade-in effect, creating a consistent user experience when opening and closing.

### Fixed

-   **Modal Animation Specificity**: Corrected a CSS specificity issue that prevented the modal's fade-out animation from running.

## [0.9.0] - 2024-08-28

### Fixed

-   **Modal Animation**: Refined the modal's fade-in animation to prevent underlying page content from showing through during the transition.
-   **Content Centering**: Corrected a layout issue where adding a wrapper for animations caused content in the `ProductSection` to lose its centered alignment.

## [0.8.0] - 2024-08-28

### Added

-   **Product Modal Animations**: Implemented smooth animations in the product modal for a more polished user experience.
    -   Description text now fades in and out when switching between tabs.
    -   The active tab indicator line now slides smoothly between tabs.

### Fixed

-   **Tab Indicator Position**: Adjusted the positioning of the active tab indicator line to sit perfectly on top of the divider.

## [0.7.0] - 2024-08-28

### Fixed

-   **Product Modal Layout**: Corrected an issue where the details section of the product modal would be pushed down by larger media assets, ensuring a stable and consistent layout.
-   **Vayyar Logo Visibility**: Modified the product modal to keep the Vayyar logo visible at all times, removing the fade-out effect that occurred when the modal was active.

## [0.6.0] - 2024-08-28

### Added

-   **"Closer Look" Modal**: Implemented an interactive, full-screen modal for the product section.
-   **Tabbed Content**: The modal features a dynamic tab system to display different product aspects, including images, video, and detailed descriptions.
-   **Scroll Lock**: The main page scroll is now locked when the modal is active, improving user experience.

### Fixed

-   **Layout Stability**: Corrected the modal's layout to ensure the tab bar remains in a fixed position, regardless of the description's text length.
-   **Content Alignment**: Refined the modal's internal alignment to correctly center content and ensure full-width backgrounds as per the design.

## [0.5.0] - 2024-08-28

### Added

-   **Product Intro Section**: Implemented a new, Apple-inspired product introduction section.
-   **New Component**: Created a dedicated `ProductSection` component to display the product with a clean, centered layout.
-   **Styling**: Added a new CSS module for the `ProductSection` with styles that mimic the Apple Vision Pro product page.

### Changed

-   **Homepage Layout**: Updated the homepage to include the new product intro section.
-   **Button Styling**: Refined the "Take a closer look" button with a thicker border, bolder font, and a smooth hover effect.
-   **Logo and Image Sizing**: Adjusted the size and spacing of the logo and product image for a more balanced and visually appealing layout.

## [0.4.6] - 2024-08-11

### Changed

-   Updated desktop footer to match the new design specification.
-   Made the entire row of collapsible sections in the mobile footer clickable.
-   Implemented a smooth, Apple-like folding and unfolding animation for mobile footer sections.
-   Removed borders from mobile header menu buttons for a cleaner look.
-   Updated mobile header menu item animations to be simultaneous and smoother.
-   Increased font size to 30px and font weight to 700 for mobile menu links.

## [0.4.5] - 2024-08-01

### Changed

-   Updated the product video with a new version.

## [0.4.4] - 2024-07-29

### Changed

-   Updated the mobile hero section video.

## 0.4.5 - 2024-08-16

### Added

-   Dedicated mobile-optimized product video (`product-mobile.mp4`).
-   `mobileVideoSrc` field to `HomeSection` interface to support distinct mobile video assets.

### Changed

-   Updated product video text overlays to emphasize privacy and scalability.
-   `DefaultSection` now loads `mobileVideoSrc` when available on mobile devices for a better viewing experience.

## 0.4.4 - 2024-08-16

### Changed

-   Enabled reverse video playback on mobile to match the desktop experience.
-   Adjusted mobile text overlays to replace each other without vertical animation for a cleaner look.
-   Corrected text overlay positioning on mobile to ensure perfect centering.
-   Fixed an issue where desktop text overlay timings were incorrectly applied to mobile.

## 0.4.3 - 2024-08-16

### Changed

-   Slowed down the scrubbing effect on the product video by increasing the scroll distance required to play through it.
-   Made the text overlays on the product video more prominent with a larger font size and a stronger text shadow.
-   Added a slide-up animation for the second text overlay on the product video for a more dynamic appearance.
-   Fixed a bug where the second text overlay would flicker due to repeated animations.

## 0.4.2 - 2024-08-16

### Fixed

-   Rewind Context initialization to ensure proper state management of video playback.
-   Initial state of `hasSeenEfficiencySection` to `false` for consistent behavior.
-   Video rewind logic to correctly restart the product video when scrolling back.

### Changed

-   Refactored `DefaultSection` to improve readability and maintainability.
-   Updated GSAP scroll trigger to handle video rewind more efficiently.
-   Modified mobile layout for "Efficiency" and "Real-time Alerts" sections for better presentation.
-   Replaced direct video source manipulation with a state-driven approach.

## 0.4.1 - 2024-08-15

### Added

-   Rewind functionality for the product video when scrolling.

### Fixed

-   Video playback issues on mobile devices.
-   Scroll trigger configurations for smoother animations.

All notable changes to this project will be documented in this file.

## [0.4.2] - 2024-08-14

### Added

-   Implemented a "rewind" effect for the product video, which plays the video from the beginning when scrolling up after viewing the "Efficiency" section.
-   Added symmetrical behavior to reset the rewind effect when scrolling back to the hero section.

### Fixed

-   Resolved a scroll jump issue that occurred when the video's playback direction changed.
-   Fixed a bug where the last frame of the product video would flicker before the rewind effect started.
-   Corrected the video's start time to ensure it always begins from the correct first frame.

## [0.4.1] - 2025-01-23

### Mobile UI Fixes

-   **Mobile Navigation Button**: Fixed "Book a Demo" button overflow on mobile devices
    -   Added responsive sizing: smaller on mobile (`px-3 py-1.5 text-xs`), larger on desktop
    -   Progressive sizing for different screen sizes (mobile → tablet → desktop)
-   **Mobile Section Visibility**: Fixed unwanted "Built to scale" section appearing on mobile
    -   Added section ID 9 to mobile exclusion list to prevent text section from showing
    -   Maintains desktop functionality while cleaning up mobile experience

### Technical Implementation

-   Updated `navigation.tsx` with responsive Tailwind classes for button sizing
-   Modified `DefaultSection.tsx` to hide section ID 9 on mobile devices
-   Improved mobile user experience without affecting desktop layout

## [0.4.0] - 2025-01-23

### Mobile Navigation Enhancement

-   **Mobile Navigation Links**: Updated mobile hamburger menu to match desktop navigation behavior
    -   Staff Optimization → redirects to section 1.6 (Efficiency video)
    -   Real-time Alerts → redirects to section 2 (Real-time Alerts video)
    -   Privacy → redirects to section 3.2 (Privacy video)
    -   AI Insights → redirects to section 4 (AI Revolution video)
    -   Personalized Care → redirects to section 6 (Personalize care video)
    -   Improve NOI → redirects to section 8 (Improve NOI video)
-   **Cross-Platform Consistency**: Mobile and desktop navigation now use identical section mapping logic
-   **Preserved Functionality**: Desktop navigation remains unchanged, mobile-specific enhancements only

### Technical Implementation

-   Updated `AppShell.tsx` mobile menu click handlers with conditional mapping logic
-   Added mobile-specific section ID mapping that mirrors desktop behavior
-   Maintained existing mobile menu animations and close functionality
-   No impact on desktop navigation or other mobile features

## [0.3.9] - 2025-01-23

### Navigation Updates

-   **Desktop Navigation Links**: Updated navigation button targets to improve user experience
    -   Staff Optimization → redirects to section 1.6 (Efficiency video)
    -   Real-time Alerts → redirects to section 2 (Real-time Alerts video)
    -   Privacy → redirects to section 3.2 (Privacy video)
    -   AI Insights → redirects to section 4 (AI Revolution video)
    -   Personalized Care → redirects to section 6 (Personalize care video)
    -   **NEW**: Improve NOI → redirects to section 8 (Improve NOI video)
-   **Book a Demo Button**: Improved scroll positioning with -80px offset to properly show contact form headline
-   **Section Mapping**: Added new "Improve NOI" text section (id: 9) to support navigation

### Technical Implementation

-   Updated `AppShell.tsx` navigation mapping logic to redirect text section buttons to corresponding video sections
-   Added conditional mapping for navigation titles to target specific section IDs
-   Enhanced scroll utility usage with precise offset positioning for contact form

## [0.3.8] - 2025-01-23

### Enhanced

-   **Mobile Navigation**: Redesigned hamburger menu from 3 lines to 2 lines for cleaner appearance
-   **Apple Vision Pro Style Animations**: Added smooth, premium animations for mobile menu opening and closing
-   **Menu Interactions**: Implemented elegant X close button with rotated lines design
-   **Staggered Animations**: Menu items now animate in/out with staggered timing for polished UX
-   **Apple-style Easing**: Used cubic-bezier curves matching Apple's design philosophy for fluid motion
-   **Footer Mobile Experience**: Improved collapsible sections with better UX and visual consistency

### Technical Implementation

-   Added `mobileMenuFadeIn/Out` and `menuItemSlideIn/Out` keyframe animations
-   Implemented proper animation state management with `isMenuClosing` state
-   Enhanced menu items with hover effects, scaling, and smooth transitions
-   Applied reverse-order animation timing for natural closing sequence
-   Added backdrop blur effects for premium visual depth

### Footer Improvements

-   **Collapsible Sections**: All footer sections now collapse by default on mobile for cleaner initial view
-   **Contact Us Toggle**: Added collapsible functionality to Contact Us section with +/- controls
-   **Visual Consistency**: Updated toggle buttons with white background and blue text for better contrast
-   **Section Dividers**: Added white divider lines between mobile footer sections
-   **Bottom Bar Layout**: Centered bottom links with pipe separators for better organization
-   **Improved Spacing**: Reduced gaps on mobile for more compact, organized appearance

### Design

-   Clean 2-line hamburger icon following modern mobile design trends
-   Smooth 400ms animation duration with Apple-style cubic-bezier easing
-   Refined close button with proper X icon using CSS transforms
-   Consistent with Apple Vision Pro website animation patterns
-   Enhanced footer mobile layout with improved visual hierarchy

## [0.3.2] - 2025-08-13

### Added

-   Source of truth: `home-page-design.md` describing desktop vs mobile layouts and component kinds
-   `mobileMediaType` and `detailsSectionId` fields in `HomeSection` to support blueprint-driven rendering

### Changed

-   `DefaultSection.tsx` now computes an `effectiveType` so scrolly behavior is disabled on mobile (plain video)
-   Removed mobile ID-specific branches; mobile now stacks intro → video → details for default sections
-   Desktop video sections can render details from linked text via `detailsSectionId`
-   Hero: removed dark overlay to match design

### Fixed

-   Prevented duplicate mobile content by temporarily skipping legacy standalone text sections on mobile during migration

## [0.3.5] - 2025-08-13

### Added

-   New `VayyarLogo` component rendering the official SVG; used in the header and footer
-   Footer component added globally with social links and mobile-friendly collapsible sections
-   Support links extended with Customer T&C and B2B T&C

### Changed

-   Replaced raster logos with `VayyarLogo`
-   Updated footer address and external links; fixed casing of "Terms Of Use"

### Fixed

-   Mobile videos now render full width without overflow and with square corners (removed scale and rounded corners in `.mobile-apple-video*`
