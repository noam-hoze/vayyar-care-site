"use client";

import React from "react";
import { usePathname } from "next/navigation";
import NavBar from "./navigation";
import { homeSections } from "@/data/homeSections";
import { scrollToSection } from "@/lib/scrollUtils";
import Footer from "@/components/Footer";

interface AppShellProps {
    children: React.ReactNode;
}

const AppShell: React.FC<AppShellProps> = ({ children }) => {
    const pathname = usePathname();
    const showNavBar = !["/demo"].includes(pathname);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
    const [isMenuClosing, setIsMenuClosing] = React.useState(false);
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
        handleScroll();
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleCloseMobileMenu = () => {
        setIsMenuClosing(true);
        setTimeout(() => {
            setIsMobileMenuOpen(false);
            setIsMenuClosing(false);
        }, 400); // Match animation duration
    };

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
            {isMobileMenuOpen && (
                <div
                    className={`fixed inset-0 z-[9999] bg-white flex flex-col items-center justify-center lg:hidden ${
                        isMenuClosing ? "animate-fade-out" : "animate-fade-in"
                    }`}
                >
                    <button
                        className="absolute top-6 right-6 text-black text-2xl focus:outline-none hover:opacity-60 transition-opacity duration-200"
                        aria-label="Close menu"
                        onClick={handleCloseMobileMenu}
                    >
                        <span className="block w-6 h-6 relative">
                            <span className="block w-6 h-0.5 bg-black absolute top-1/2 left-0 transform -translate-y-1/2 rotate-45"></span>
                            <span className="block w-6 h-0.5 bg-black absolute top-1/2 left-0 transform -translate-y-1/2 -rotate-45"></span>
                        </span>
                    </button>
                    <div
                        className="flex flex-col gap-6 w-full max-w-sm mx-auto px-8"
                        style={{ fontFamily: "Magistral" }}
                    >
                        {homeSections
                            .filter((section) => section.type === "text")
                            .map((section, idx) => (
                                <button
                                    key={section.title + idx}
                                    onClick={() => {
                                        scrollToSection(
                                            `section-${section.id}`
                                        );
                                        handleCloseMobileMenu();
                                    }}
                                    className={`w-full py-5 text-xl font-medium text-black bg-transparent hover:bg-gray-50 transition-all duration-300 ease-out transform hover:scale-[1.02] active:scale-[0.98] rounded-2xl border border-gray-200 hover:border-gray-300 hover:shadow-lg ${
                                        isMenuClosing
                                            ? "animate-menu-item-out"
                                            : "animate-menu-item"
                                    }`}
                                    style={{
                                        animationDelay: isMenuClosing
                                            ? `${
                                                  (homeSections.filter(
                                                      (s) => s.type === "text"
                                                  ).length -
                                                      idx -
                                                      1) *
                                                  50
                                              }ms`
                                            : `${idx * 100}ms`,
                                        animationFillMode: "both",
                                    }}
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
            <Footer />
        </div>
    );
};

export default AppShell;
