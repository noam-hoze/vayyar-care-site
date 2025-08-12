# Changelog

All notable changes to this project will be documented in this file.

## [0.1.2] - 2024-12-21

### Fixed
- **CRITICAL**: Fixed desktop scrolly-video functionality that was broken in 0.1.1
- Resolved issue where mobile Apple-style sections were incorrectly rendering on desktop
- Fixed `isDesktop` state initialization to prevent mobile-first rendering on desktop
- Restored proper scrolly-video overlay and interactive functionality on desktop
- Added proper fallback exclusion for hidden mobile sections (ID 1, 3) to prevent video rendering

### Technical Details
- Fixed boolean logic in scrolly-video conditions to properly exclude mobile-only sections
- Updated `isDesktop` useState initialization to detect screen size immediately
- Added null return for hidden text sections on mobile to prevent fallback video rendering
- **Desktop Preserved**: All desktop functionality restored to original working state

## [0.1.1] - 2024-12-21

### Added
- Apple-style mobile layout for Efficiency section (ID 1.6)
- Mobile-specific CSS styles following Apple Vision Pro design patterns
- Three-part mobile layout: clean text header, 16:9 video, and content with button
- Blue arrow indicators (>) for bullet points in mobile view
- Proper vertical centering for mobile content sections

### Changed
- Modified DefaultSection component to detect and render Efficiency section differently on mobile
- Updated mobile styles with Apple's color palette and typography
- Implemented responsive behavior that preserves desktop layout while adding mobile-specific rendering

### Technical Details
- **Scope**: This implementation is specific to the Efficiency section only
- **Future Work**: Generic implementation for all sections will be continued in future updates
- **Mobile-First**: All changes apply only to mobile view (max-width: 768px)
- **Desktop Preserved**: No changes to existing desktop behavior

### Files Modified
- `src/components/DefaultSection/DefaultSection.tsx` - Added mobile detection for section ID 1.6
- `src/components/mobile/mobile-styles.css` - Added Apple-style component styles
- `package.json` - Version bump to 0.1.1
