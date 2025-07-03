"use client"; // Ensure it's a client component

import React from "react";
import { usePathname } from "next/navigation"; // Import usePathname
import NavBar from "./navigation"; // Assuming NavBar is in the same directory
import { useVideoTime } from "@/contexts/VideoTimeContext";
import { homeSections } from "@/data/homeSections";
import { timecodeToSeconds } from "@/lib/utils";
import { videoConfig } from "@/config/videoConfig";

// Define props type to accept children
interface MainLayoutProps {
    children: React.ReactNode;
}

const BUTTON_CONFIG = [
    {
        name: "Staff Optimization",
        // Controls to which timecode the navigation button will lead to
        startTimeString: "00:06:12",
        endTimeString: "00:29:18",
        baseTextColor: "text-neutral-500",
    },
    {
        name: "Real-time Alerts",
        startTimeString: "00:35:05",
        endTimeString: "01:17:00",
        baseTextColor: "text-gray-500",
    },
    {
        name: "AI Insights",
        startTimeString: "01:22:27",
        endTimeString: "01:57:13",
        baseTextColor: "text-gray-500",
    },
    {
        name: "Personalized Care",
        startTimeString: "01:57:14",
        endTimeString: "02:46:11",
        baseTextColor: "text-gray-500",
    },
    {
        name: "Increase NOI",
        startTimeString: "02:46:12",
        endTimeString: "02:60:01",
        baseTextColor: "text-gray-500",
    },
].map((btn) => ({
    ...btn,
    startTime: timecodeToSeconds(btn.startTimeString),
    endTime: timecodeToSeconds(btn.endTimeString),
}));

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
    const pathname = usePathname(); // Get current path
    // Determine if NavBar should be shown (hide on /demo)
    const showNavBar = !["/demo"].includes(pathname);
    const { currentTime, videoDuration, scrollToTime } = useVideoTime();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
    // Calculate buttonDisplayData (duplicate logic from navigation.tsx if needed)
    const buttonDisplayData = (BUTTON_CONFIG as any[]).map((config: any) => {
        const { startTime, endTime } = config;
        let progress = 0;
        if (videoDuration > 0 && endTime > startTime) {
            if (currentTime >= endTime) progress = 100;
            else if (currentTime > startTime)
                progress =
                    ((currentTime - startTime) / (endTime - startTime)) * 100;
        }
        return {
            ...config,
            progress: Math.max(0, Math.min(100, progress)),
            startTime,
        };
    });

    return (
        <div className="flex flex-col min-h-screen bg-white">
            {showNavBar && (
                <div className="sticky top-0 z-50">
                    <NavBar
                        onOpenMobileMenu={() => setIsMobileMenuOpen(true)}
                        buttonDisplayData={buttonDisplayData}
                        scrollToTime={scrollToTime}
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
