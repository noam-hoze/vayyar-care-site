### VayyarCare Mobile Homepage — Content Mockup (Source of Truth)

Purpose: Define exact content per section for the mobile page (top portion up to the Apple reference cutoff), matching the visual structure in `MOBILE_DESIGN_SPECIFICATION.md`. Design rules mirror Apple’s mobile patterns; content remains VayyarCare’s.

Scope: Mobile-only. Desktop remains untouched.

---

### 1) Hero Section (White)
Just the video 
Video source: `/videos/hero-section.mp4`
-- Complete what's need --


---

### 2) Narrow Text with Double Spacing (White)
-   Primary lines (exact copy from `homeSections.tsx` id: 0):
    -   "Vayyar's technology records the daily life of your residents without camera or sound"
    -   "So you can improve the care you provide while increasing your NOI and your staff's efficiency"
    -   "The era of AI-based care is here"


### 3) Full‑Width Video (White)

-   video: { start: "00:04:12", end: "00:09:15" },
-   

---

### 4) Product View (White)

-   Media: Product video: `public/images/product.mp4`


### 5) Component (background #f5f5f7)

Part 1 (top of card)

-   Small Title: "Efficiency"
-   Subtitle (bigger): "Optimize your staff work and reduce their burden"

Part 2 (middle of card)

-    Video: `/videos/optimize-staff.mp4`

Part 3 (bottom of card)

-   Title (black): "Do More With Less.
"
-   Content (grey):
    -   "Use predictive insights to address potential patient complications"
    -   "Reduce Administrative tasks"
    -   "Improved Operational Efficiencies"
-   Button (orange, centered): "Staff optimization"

---

### 6) Component (White)

Part 1 (top of card)

-   Small Title: "Real-time Alerts"
-   Subtitle (bigger): "Alert your staff as things happen"
-   

Part 2 (middle of card) 
-   Video: `/videos/real-time-alerts.mp4`

Part 3 (bottom of card)

-   Title (black): "Real-time Alerts"
-   Content (grey):
    -   "Receive immediate alerts when a resident experiences a fall, ensuring faster assistance and peace of mind."
    -   "Stay informed about unusual movement patterns that could signal health or safety concerns."
    -   "Enhance resident safety and staff efficiency with real-time notifications tailored for elderly care."
-   Button (orange, centered): "Real-time Alerts"

---

### 7) Component (background #f5f5f7)

Part 1 (top of card)

-   Small Title: "Privacy"
-   Subtitle (bigger): "Monitoring every movement without compromising privacy"
  
Part 2 (middle of card) 
-   Video: `/videos/privacy.mp4`

Part 3 (bottom of card)

-   Title (black): Header motif per existing copy:
    -   "✘ cameras."
    -   "✘ wearables."
    -   "✔ privacy."
-   Content (grey):
    -   "Empower the care team with automated alerts."
    -   "Ensure Care Plan Compliance"
    -   "Real Time Detection"
-   Button (orange, centered): "how we protect privacy"

---

### 8) Component (White)

Part 1 (top of card)

-   Small Title: "AI Revolution"
-   Subtitle (bigger): "Stay ahead with cutting-edge AI insights from our sensors and an array of smart data"

Part 2 (middle of card) 
-   Video: `/videos/ai-insights.mp4`

Part 3 (bottom of card)

-   Title (black): "Actionable insights.
Smarter staffing.
Safer residents."
-   Content (grey):
    -   "Analyze trends to detect risk."
    -   "Enhancing staff efficiency"
    -   "Ensure Care Plan Compliance"
-   Button (orange, centered): "AI insights"



### 9) Component (background #f5f5f7)

Part 1 (top of card)

-   Small Title: "Personalize Care"
-   Subtitle (bigger): "Experience the power of immediate, accurate insights for truly personalized care."

Part 2 (middle of card) 
-   Video: `"videos/personalize-care.mp4`

Part 3 (bottom of card)

-   Title (black): "The right strategy.
At the right return."
-   Content (grey):
    -   "Uncover hidden efficiencies that reduce unnecessary labor hours and care mismatches."
    -   "Align care levels with reimbursement potential to support justified rate increases"
    -   Optimize NOI by transforming real-time insights into smarter operational decisions."
-   Button (orange, centered): "Personalized Care"




### Notes

-   All wording above is copied from the current implementation (`src/data/homeSections.tsx`) where available.
-   This document is content-only. Visual rules (typography, colors, spacing) are defined in `MOBILE_DESIGN_SPECIFICATION.md`.
-   Media paths reference existing assets under `public/videos` and `public/images`.
