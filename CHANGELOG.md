# Changelog

All notable changes to this project will be documented in this file.

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
