"use client"; // Ensure it's a client component

import React from "react";
import { usePathname } from "next/navigation"; // Import usePathname
import NavBar from "./navigation"; // Assuming NavBar is in the same directory
import { useVideoTime } from "@/contexts/VideoTimeContext";
import { homeSections } from "@/data/homeSections";

// Define props type to accept children
interface MainLayoutProps {
    children: React.ReactNode;
}

const timecodeToSeconds = (tc: string, frameRate: number = 30): number => {
    const parts = tc.split(":").map(Number);
    let seconds = 0;
    if (parts.length === 4) {
        seconds = parts[0] * 3600 + parts[1] * 60 + parts[2] + parts[3] / frameRate;
    } else if (parts.length === 3) {
        seconds = parts[0] * 60 + parts[1] + parts[2] / frameRate;
    } else {
        console.warn("Invalid timecode format:", tc);
    }
    return seconds;
};

const BUTTON_CONFIG = [
    { name: "AI-Healthcare", startTimeString: "00:00:12:02", endTimeString: "00:00:29:18", baseTextColor: "text-neutral-500" },
    { name: "Real-time Insights", startTimeString: "00:00:29:19", endTimeString: "00:01:17:00", baseTextColor: "text-gray-500" },
    { name: "Automations", startTimeString: "00:01:17:01", endTimeString: "00:02:09:15", baseTextColor: "text-gray-500" },
    { name: "Staff Optimization", startTimeString: "00:02:09:06", endTimeString: "00:02:50:19", baseTextColor: "text-gray-500" },
    { name: "Dedicated Care", startTimeString: "00:02:50:20", endTimeString: "00:03:00:29", baseTextColor: "text-gray-500" },
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
            else if (currentTime > startTime) progress = ((currentTime - startTime) / (endTime - startTime)) * 100;
        }
        return { ...config, progress: Math.max(0, Math.min(100, progress)), startTime };
    });

    return (
        <div className="flex flex-col min-h-screen bg-white">
            {showNavBar && (
                <div className="sticky top-0 z-50">
                    <NavBar
                        isMobileMenuOpen={isMobileMenuOpen}
                        onOpenMobileMenu={() => setIsMobileMenuOpen(true)}
                        onCloseMobileMenu={() => setIsMobileMenuOpen(false)}
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
                    <div className="flex flex-col gap-8 w-full max-w-xs mx-auto" style={{fontFamily: "Magistral"}}>
                        {homeSections.map((section, idx) => (
                            <button
                                key={section.title + idx}
                                onClick={() => {
                                    const el = document.getElementById(`section-${idx}`);
                                    if (el) {
                                        el.scrollIntoView({ behavior: "smooth", block: "start" });
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
