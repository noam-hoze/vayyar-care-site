/**
 * Shared utility function for scrolling to sections, with a high-quality eased animation
 */
export const scrollToSection = (
    sectionId: string,
    setTheaterMode?: (isEnabled: boolean, sectionId: string | null) => void,
    options?: { durationMs?: number; offsetPx?: number }
) => {
    if (typeof window === "undefined" || typeof document === "undefined") {
        return;
    }

    // Disable theater mode if the function is provided (for mobile)
    if (setTheaterMode) {
        setTheaterMode(false, null);
    }

    const element = document.getElementById(sectionId);
    if (!element) return;

    const durationMs = options?.durationMs ?? 900;
    const offsetPx = options?.offsetPx ?? 0;

    const startingY = window.scrollY || window.pageYOffset;
    const elementY = element.getBoundingClientRect().top + startingY + offsetPx;
    const maxScrollY =
        document.documentElement.scrollHeight - window.innerHeight;
    const targetY = Math.min(elementY, maxScrollY);
    const diff = targetY - startingY;
    if (Math.abs(diff) < 1) return;

    // EaseInOutCubic for a refined, Apple-like feel
    const easeInOutCubic = (t: number) =>
        t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

    let startTime: number | null = null;
    const step = (timestamp: number) => {
        if (startTime === null) startTime = timestamp;
        const elapsed = timestamp - startTime;
        const progress = Math.min(elapsed / durationMs, 1);
        const eased = easeInOutCubic(progress);
        window.scrollTo(0, startingY + diff * eased);
        if (elapsed < durationMs) {
            window.requestAnimationFrame(step);
        }
    };

    window.requestAnimationFrame(step);
};
