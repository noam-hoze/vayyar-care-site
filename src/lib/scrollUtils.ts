/**
 * Shared utility function for scrolling to sections
 */
export const scrollToSection = (
    sectionId: string,
    setTheaterMode?: (isEnabled: boolean, sectionId: string | null) => void
) => {
    // Disable theater mode if the function is provided (for mobile)
    if (setTheaterMode) {
        setTheaterMode(false, null);
    }

    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
};
