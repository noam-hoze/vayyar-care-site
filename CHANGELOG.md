# Changelog

## 0.4.5 - 2024-08-16
### Added
- Dedicated mobile-optimized product video (`product-mobile.mp4`).
- `mobileVideoSrc` field to `HomeSection` interface to support distinct mobile video assets.

### Changed
- Updated product video text overlays to emphasize privacy and scalability.
- `DefaultSection` now loads `mobileVideoSrc` when available on mobile devices for a better viewing experience.

## 0.4.4 - 2024-08-16
### Changed
- Enabled reverse video playback on mobile to match the desktop experience.
- Adjusted mobile text overlays to replace each other without vertical animation for a cleaner look.
- Corrected text overlay positioning on mobile to ensure perfect centering.
- Fixed an issue where desktop text overlay timings were incorrectly applied to mobile.

## 0.4.3 - 2024-08-16
### Changed
- Slowed down the scrubbing effect on the product video by increasing the scroll distance required to play through it.
- Made the text overlays on the product video more prominent with a larger font size and a stronger text shadow.
- Added a slide-up animation for the second text overlay on the product video for a more dynamic appearance.
- Fixed a bug where the second text overlay would flicker due to repeated animations.

## 0.4.2 - 2024-08-16
### Fixed
- Rewind Context initialization to ensure proper state management of video playback.
- Initial state of `hasSeenEfficiencySection` to `false` for consistent behavior.
- Video rewind logic to correctly restart the product video when scrolling back.

### Changed
- Refactored `DefaultSection` to improve readability and maintainability.
- Updated GSAP scroll trigger to handle video rewind more efficiently.
- Modified mobile layout for "Efficiency" and "Real-time Alerts" sections for better presentation.
- Replaced direct video source manipulation with a state-driven approach.

## 0.4.1 - 2024-08-15
### Added
- Rewind functionality for the product video when scrolling.

### Fixed
- Video playback issues on mobile devices.
- Scroll trigger configurations for smoother animations.

All notable changes to this project will be documented in this file.

## [0.4.2] - 2024-08-14

### Added
- Implemented a "rewind" effect for the product video, which plays the video from the beginning when scrolling up after viewing the "Efficiency" section.
- Added symmetrical behavior to reset the rewind effect when scrolling back to the hero section.

### Fixed
- Resolved a scroll jump issue that occurred when the video's playback direction changed.
- Fixed a bug where the last frame of the product video would flicker before the rewind effect started.
- Corrected the video's start time to ensure it always begins from the correct first frame.

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

-   Mobile videos now render full width without overflow and with square corners (removed scale and rounded corners in `.mobile-apple-video*` styles)

## [0.3.7] - 2025-08-13

### Changed

-   Header (mobile): switched to a 3-column grid so "Book a Demo" is centered between the logo and hamburger menu
-   Footer: adjusted stacking context and padding so the top row (logo + socials) is no longer covered
-   Contact form: added mobile divider and spacing; use `minHeight: 100vh` to avoid footer overlap

### Notes

-   Mobile: "Vayyar Care" and "Support" sections now fold/unfold with +/- controls; "Contact Us" is always visible

## [0.3.4] - 2025-08-13

### Changed

-   Centralized Learn More CTA gating in `DefaultSectionDetails` only; verified with `showLearnMoreButtons = false` on both desktop and mobile.
-   No refactor applied (reverted exploratory changes) to avoid regressions; desktop scrolly overlays and mobile layouts remain as before.

### Fixed

-   Ensured no duplicate CTAs when global flag is off; desktop and mobile are consistent.

## [0.3.3] - 2025-08-13

### Added

-   Introduced `variant` prop (desktop/mobile) to `DefaultSectionIntroText`, `DefaultSectionVideo`, and `DefaultSectionDetails` to support unified 3-part rendering across devices

### Changed

-   Efficiency (mobile) now uses the 3-part components (IntroText, Video, Details) with identical styling to the previous Apple-style markup
-   Mobile Details variant can render the CTA; CTA text for Efficiency is sourced from its paired text section

### Fixed

-   Mobile CTA gating for Efficiency: button now shows when `defaultConfig.showLearnMoreButtons` is true by using paired text section `buttonText`

## [0.3.1] - 2024-12-21

### Fixed

-   **Hero Section Mobile Video**: Fixed mobile video loading to use `hero-section-mobile.mp4` instead of desktop version
-   Resolved double-render issue where desktop video loaded first before switching to mobile
-   Implemented proper device detection to prevent initial desktop video flash on mobile devices

### Technical Details

-   Modified HeroSection component to use null initial state for device detection
-   Added conditional video rendering that waits for device type determination
-   Prevents video element creation until correct device type is known
-   **Mobile Experience**: Now loads correct mobile-optimized video from first render

## [0.3.0] - 2024-12-21

### Added

-   **NEW**: Narrow Text Section variant for Apple-style mobile layouts
-   MobileNarrowText component with left-aligned, narrow-width text layout
-   Support for `mobileVariant: "narrow-text"` property in HomeSection interface
-   Comprehensive CSS styles for narrow text variant following Apple design principles
-   Scrolly-video to mobile conversion system for hero sections

### Enhanced

-   **Hero Section Mobile Conversion**: Section 0 (main hero) now renders as Apple-style mobile layout
-   **Advanced Text Styling**:
    -   Font weight: 800 (extra bold)
    -   Font size: 30px for headings, 24px for body text
    -   Centered text with 70% width container for optimal mobile reading
    -   Double spacing between paragraphs (56px)
-   **Smart Section Detection**: Automatic conversion of scrolly-video sections to mobile Apple-style layout
-   **Privacy & Personalized Care**: Now use narrow text variant for better content presentation

### Technical Implementation

-   Added `mobileVariant` and `mobileVideoMode` properties to HomeSection interface
-   Created MobileNarrowText component with proper TypeScript integration
-   Extended DefaultSection logic to handle scrolly-video mobile conversions
-   Added conditional rendering for narrow vs. default text variants
-   Implemented three-part mobile structure: narrow text + plain video + details

### Design Specifications

-   **Typography**: SF Pro Display/Magistral fonts with proper weight hierarchy
-   **Layout**: 80%-85% width containers with left-alignment for narrow text
-   **Spacing**: Apple-style generous padding (80px sections, 48px-64px paragraphs)
-   **Colors**: Near-black text (#1D1D1F) on white backgrounds
-   **Mobile-First**: All changes apply only to mobile view, desktop completely preserved

### Sections Updated

-   Section 0: Hero section with narrow text variant
-   Section 3.5: Privacy section with narrow text variant
-   Section 7: Personalized Care section with narrow text variant

## [0.2.0] - 2024-12-21

### Added

-   **MAJOR**: Complete Apple Vision Pro mobile layout implementation for all main sections
-   Apple-style mobile layouts for Privacy, AI Insights, Personalized Care, and Increase NOI sections
-   Alternating grey/white background pattern following Apple's design language
-   Consistent three-part mobile structure: clean text header, 16:9 video, content with button
-   Blue arrow indicators (>) for all bullet points in mobile view
-   Proper button centering with flexbox layout for mobile sections

### Enhanced

-   Extended mobile-specific rendering to cover 6 total sections:
    1. Efficiency (ID 1.6) - Grey background
    2. Real-time Alerts (ID 2) - White background
    3. Privacy (ID 3.2) - Grey background
    4. AI Insights (ID 4) - White background
    5. Personalized Care (ID 6) - Grey background
    6. Increase NOI (ID 8) - White background

### Technical Details

-   Added mobile Apple-style rendering for sections 3.2, 4, 6, and 8
-   Extended scrolly-video exclusion logic to prevent desktop interference
-   Hidden corresponding text sections (3.5, 5, 7) on mobile to prevent duplicates
-   Added fallback exclusion for all hidden mobile text sections
-   Improved button centering with flexbox `align-self: center`
-   **Desktop Preserved**: All desktop functionality remains completely untouched

### Design

-   Perfect Apple Vision Pro design replication on mobile
-   Clean typography hierarchy with SF Pro Display / Magistral fonts
-   Consistent spacing and padding following Apple's generous design principles
-   Orange accent buttons with proper rounded corners and hover states

## [0.1.2] - 2024-12-21

### Fixed

-   **CRITICAL**: Fixed desktop scrolly-video functionality that was broken in 0.1.1
-   Resolved issue where mobile Apple-style sections were incorrectly rendering on desktop
-   Fixed `isDesktop` state initialization to prevent mobile-first rendering on desktop
-   Restored proper scrolly-video overlay and interactive functionality on desktop
-   Added proper fallback exclusion for hidden mobile sections (ID 1, 3) to prevent video rendering

### Technical Details

-   Fixed boolean logic in scrolly-video conditions to properly exclude mobile-only sections
-   Updated `isDesktop` useState initialization to detect screen size immediately
-   Added null return for hidden text sections on mobile to prevent fallback video rendering
-   **Desktop Preserved**: All desktop functionality restored to original working state

## [0.1.1] - 2024-12-21

### Added

-   Apple-style mobile layout for Efficiency section (ID 1.6)
-   Mobile-specific CSS styles following Apple Vision Pro design patterns
-   Three-part mobile layout: clean text header, 16:9 video, and content with button
-   Blue arrow indicators (>) for bullet points in mobile view
-   Proper vertical centering for mobile content sections

### Changed

-   Modified DefaultSection component to detect and render Efficiency section differently on mobile
-   Updated mobile styles with Apple's color palette and typography
-   Implemented responsive behavior that preserves desktop layout while adding mobile-specific rendering

### Technical Details

-   **Scope**: This implementation is specific to the Efficiency section only
-   **Future Work**: Generic implementation for all sections will be continued in future updates
-   **Mobile-First**: All changes apply only to mobile view (max-width: 768px)
-   **Desktop Preserved**: No changes to existing desktop behavior

### Files Modified

-   `src/components/DefaultSection/DefaultSection.tsx` - Added mobile detection for section ID 1.6
-   `src/components/mobile/mobile-styles.css` - Added Apple-style component styles
-   `package.json` - Version bump to 0.1.1
