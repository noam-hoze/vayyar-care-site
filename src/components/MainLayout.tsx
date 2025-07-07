"use client"; // Ensure it's a client component

import React from "react";
import { usePathname } from "next/navigation"; // Import usePathname
import NavBar from "./navigation"; // Assuming NavBar is in the same directory
import { homeSections } from "@/data/homeSections";

// Define props type to accept children
interface MainLayoutProps {
    children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
    const pathname = usePathname(); // Get current path
    // Determine if NavBar should be shown (hide on /demo)
    const showNavBar = !["/demo"].includes(pathname);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
    const [sectionProgress, setSectionProgress] = React.useState<
        Record<string, number>
    >({});

    React.useEffect(() => {
        const handleScroll = () => {
            const newProgress: Record<string, number> = {};
            homeSections.forEach((section) => {
                if (section.type === "text") {
                    const el = document.getElementById(`section-${section.id}`);
                    if (el) {
                        const rect = el.getBoundingClientRect();
                        const viewportHeight = window.innerHeight;
                        const totalScroll = viewportHeight + el.offsetHeight;
                        const scrolled = viewportHeight - rect.top;
                        const progress = (scrolled / totalScroll) * 100;
                        newProgress[`section-${section.id}`] = Math.max(
                            0,
                            Math.min(100, progress)
                        );
                    } else {
                        newProgress[`section-${section.id}`] = 0;
                    }
                }
            });
            setSectionProgress(newProgress);
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        handleScroll(); // Initial calculation
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const buttonDisplayData = homeSections
        .filter((section) => section.type === "text")
        .map((section) => ({
            name: section.title,
            id: `section-${section.id}`,
            progress: sectionProgress[`section-${section.id}`] || 0,
        }));

    return (
        <div className="flex flex-col min-h-screen bg-white">
            {showNavBar && (
                <div className="sticky top-0 z-50">
                    <NavBar
                        onOpenMobileMenu={() => setIsMobileMenuOpen(true)}
                        buttonDisplayData={buttonDisplayData}
                    />
                </div>
            )}
            {/* Mobile overlay menu rendered here, outside NavBar */}
            {isMobileMenuOpen && (
                <div className="fixed inset-0 z-[9999] bg-white flex flex-col items-center justify-center transition-all duration-300 lg:hidden">
                    <button
                        className="absolute top-6 right-6 text-black text-3xl focus:outline-none"
                        aria-label="Close menu"
                        onClick={() => setIsMobileMenuOpen(false)}
                    >
                        &times;
                    </button>
                    <div
                        className="flex flex-col gap-8 w-full max-w-xs mx-auto"
                        style={{ fontFamily: "Magistral" }}
                    >
                        {homeSections
                            .filter((section) => section.type === "text")
                            .map((section, idx) => (
                                <button
                                    key={section.title + idx}
                                    onClick={() => {
                                        const el = document.getElementById(
                                            `section-${section.id}`
                                        );
                                        if (el) {
                                            el.scrollIntoView({
                                                behavior: "smooth",
                                                block: "start",
                                            });
                                        }
                                        setIsMobileMenuOpen(false);
                                    }}
                                    className="w-full py-4 text-2xl font-semibold rounded-full border border-black text-black bg-transparent hover:bg-[#06aeef] hover:text-white transition-all duration-150 relative"
                                >
                                    {section.title}
                                </button>
                            ))}
                    </div>
                </div>
            )}
            <main key={pathname} className="flex-grow page-fade-in">
                {children}
            </main>
        </div>
    );
};

export default MainLayout;
