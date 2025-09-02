## Home Page Sections: Desktop vs Mobile

Default Section (canonical structure)

-   Part 1: Intro text
-   Part 2: Video
-   Part 3: Details/CTA text
-   Desktop layout: Part 1 overlays Part 2; Part 3 below
-   Mobile layout: Part 1, then Part 2, then Part 3 (stacked)

| #   | Section           | Component Kind       | Structure  | Desktop Types               | Mobile Types             | Desktop Layout                    | Mobile Layout                |
| --- | ----------------- | -------------------- | ---------- | --------------------------- | ------------------------ | --------------------------------- | ---------------------------- |
| 1   | Hero              | Standalone component | Standalone | N/A (not in HomeSection)    | N/A (not in HomeSection) | Full-viewport background video    | Full-viewport video (mobile) |
| 2   | Video 1           | Default section      | 1 + 2      | text + scrolly-video        | text + video             | 1 overlays 2                      | 1 → 2                        |
| 3   | Product Overview  | Standalone component | Standalone | scroll-scrub-video          | scroll-scrub-video       | Scroll-scrub video (pinned scrub) | Scroll-scrub video (pinned)  |
| 4   | Efficiency        | Default section      | 1 + 2 + 3  | text + scrolly-video + text | text + video + text      | 1 overlays 2; 3 below             | 1 → 2 → 3                    |
| 5   | Real-time Alerts  | Default section      | 1 + 2 + 3  | text + scrolly-video + text | text + video + text      | 1 overlays 2; 3 below             | 1 → 2 → 3                    |
| 6   | Privacy           | Default section      | 1 + 2 + 3  | text + scrolly-video + text | text + video + text      | 1 overlays 2; 3 below             | 1 → 2 → 3                    |
| 7   | AI Insights       | Default section      | 1 + 2 + 3  | text + scrolly-video + text | text + video + text      | 1 overlays 2; 3 below             | 1 → 2 → 3                    |
| 8   | Personalized Care | Default section      | 1 + 2 + 3  | text + scrolly-video + text | text + video + text      | 1 overlays 2; 3 below             | 1 → 2 → 3                    |
| 9   | Improve NOI       | Default section      | 1 + 2 + 3  | text + scrolly-video + text | text + video + text      | 1 overlays 2; 3 below             | 1 → 2 → 3                    |

Notes

-   Hero and Product Overview are special-cased standalone components (not rendered by Default Section).
-   Default sections use the same content for desktop and mobile; only layout changes (no hidden content).
-   Default sections on mobile use plain video (no scrolly behavior).
