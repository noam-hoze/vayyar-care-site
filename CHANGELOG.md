## 0.1.2 – Mobile video full-width

- Mobile video in `DefaultSectionVideo` now scales edge-to-edge using 100vw with safe bleed (`margin-left: calc(50% - 50vw)`), maintaining 16:9 aspect ratio.

## 0.1.1 – Mobile Narrow Variant, Inter font, and CSS-only padding

- Implemented narrow mobile intro text variant with Inter typography (17px, 400, 1.47) using global classes: `mobileNarrowContainer`, `mobileNarrowHeading`, `mobileNarrowBody`.
- Removed reliance on CSS Modules hashing for narrow variant; switched to global CSS classes and updated component to use literal class names.
- Applied Apple-style 52px padding to the narrow intro section via CSS only (no inline styles).
- Cleaned `DefaultSection.module.css` of unused narrow rules.
- Kept desktop unaffected and preserved existing layout.


