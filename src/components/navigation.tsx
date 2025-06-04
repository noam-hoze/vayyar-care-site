"use client"; // Add this for useState
import React, { useState, useRef, useEffect } from "react"; // Removed useEffect
import Link from "next/link"; // Changed from react-router-dom
import ContactModal from "@/components/ContactModal";
import { useVideoTime } from "@/contexts/VideoTimeContext"; // Import useVideoTime

// Helper to convert HH:MM:SS:FF to seconds
const timecodeToSeconds = (tc: string, frameRate: number = 30): number => {
    const parts = tc.split(":").map(Number);
    let seconds = 0;
    if (parts.length === 4) {
        // HH:MM:SS:FF
        seconds =
            parts[0] * 3600 + parts[1] * 60 + parts[2] + parts[3] / frameRate;
    } else if (parts.length === 3) {
        // MM:SS:FF (assuming minutes if first part < 60)
        seconds = parts[0] * 60 + parts[1] + parts[2] / frameRate;
    } else {
        console.warn("Invalid timecode format:", tc);
    }
    return seconds;
};

const BUTTON_CONFIG = [
    {
        name: "Vayyar Care AI",
        startTimeString: "00:00:12:02",
        endTimeString: "00:00:29:18",
        baseTextColor: "text-neutral-500",
    },
    {
        name: "Real-time Detection",
        startTimeString: "00:00:29:19",
        endTimeString: "00:01:17:00",
        baseTextColor: "text-gray-500",
    },
    {
        name: "Automations",
        startTimeString: "00:01:17:01",
        endTimeString: "00:02:09:15",
        baseTextColor: "text-gray-500",
    },
    {
        name: "Staff Optimization",
        startTimeString: "00:02:09:06",
        endTimeString: "00:02:50:19",
        baseTextColor: "text-gray-500",
    },
    {
        name: "Dedicated Care",
        startTimeString: "00:02:50:20",
        endTimeString: "00:03:00:29",
        baseTextColor: "text-gray-500",
    },
].map((btn) => ({
    ...btn,
    startTime: timecodeToSeconds(btn.startTimeString),
    endTime: timecodeToSeconds(btn.endTimeString),
}));

export default function NavBar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isContactModalOpen, setIsContactModalOpen] = useState(false);
    const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null); // Ref for hover timeout
    const [hasLastButtonBeenFilled, setHasLastButtonBeenFilled] =
        useState(false); // New state

    const { currentTime, videoDuration, scrollToTime } = useVideoTime(); // Get video time, duration, and scrollToTime

    const calculateButtonData = (buttonConfig: (typeof BUTTON_CONFIG)[0]) => {
        const { startTime, endTime } = buttonConfig;
        // Ensure videoDuration is positive and endTime is after startTime to avoid NaN or negative progress
        if (videoDuration <= 0 || endTime <= startTime)
            return { progress: 0, startTime };

        let progress = 0;
        if (currentTime >= endTime) {
            progress = 100;
        } else if (currentTime > startTime) {
            // Ensure endTime - startTime is positive before division
            progress =
                ((currentTime - startTime) / (endTime - startTime)) * 100;
        }

        return { progress: Math.max(0, Math.min(100, progress)), startTime };
    };

    const buttonDisplayData = BUTTON_CONFIG.map((config) => ({
        ...config,
        ...calculateButtonData(config),
    }));

    // Effect to latch the orange state
    useEffect(() => {
        if (!hasLastButtonBeenFilled && buttonDisplayData.length > 0) {
            if (
                buttonDisplayData[buttonDisplayData.length - 1].progress >= 99.9
            ) {
                setHasLastButtonBeenFilled(true);
            }
        }
    }, [buttonDisplayData, hasLastButtonBeenFilled]); // Depend on buttonDisplayData and the latch state

    const bookADemoBackgroundColor = hasLastButtonBeenFilled
        ? "#FFA500"
        : "#06aeef"; // Orange or Vayyar Blue

    // Original useEffect for scroll percentage - can be removed or commented out
    // useEffect(() => {
    //     const handleScroll = () => {
    //         const element = document.documentElement;
    //         const body = document.body;
    //         const scrollTop = element.scrollTop || body.scrollTop;
    //         const scrollHeight = element.scrollHeight || body.scrollHeight;
    //         const clientHeight = element.clientHeight;

    //         if (scrollHeight - clientHeight === 0) {
    //             setScrollPercentage(0);
    //             return;
    //         }

    //         const percentage = (scrollTop / (scrollHeight - clientHeight)) * 100;
    //         setScrollPercentage(percentage > 100 ? 100 : percentage < 0 ? 0 : percentage);
    //     };

    //     window.addEventListener("scroll", handleScroll, { passive: true });
    //     handleScroll(); // Initial call

    //     return () => window.removeEventListener("scroll", handleScroll);
    // }, []);

    const handleMouseEnter = () => {
        if (hoverTimeoutRef.current) {
            clearTimeout(hoverTimeoutRef.current);
            hoverTimeoutRef.current = null;
        }
        setIsMenuOpen(true);
    };

    const handleMouseLeave = () => {
        // Set a timer to close the menu
        hoverTimeoutRef.current = setTimeout(() => {
            setIsMenuOpen(false);
        }, 200); // 200ms delay
    };

    // Clear timeout when mouse enters panel, preventing it from closing
    const handlePanelMouseEnter = () => {
        if (hoverTimeoutRef.current) {
            clearTimeout(hoverTimeoutRef.current);
            hoverTimeoutRef.current = null;
        }
    };

    const openContactModal = () => {
        setIsContactModalOpen(true);
    };

    const handleContactModalClose = () => {
        setIsContactModalOpen(false);
    };

    useEffect(() => {
        document.body.style.overflow = isContactModalOpen ? "hidden" : "auto";

        return () => {
            document.body.style.overflow = "auto";
        };
    }, [isContactModalOpen]);

    return (
        <nav className="bg-[#f0f1fa] shadow-md relative">
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center h-16">
                    <div className="flex-shrink-0">
                        <Link href="/">
                            <img
                                className="h-8 w-auto"
                                src="/images/vayyar-logo-text.png"
                                alt="Vayyar Logo"
                            />
                        </Link>
                    </div>

                    <div className="flex-1 flex justify-center items-center space-x-4">
                        {buttonDisplayData.map((data) => (
                            <button
                                key={data.name}
                                onClick={() => scrollToTime(data.startTime)}
                                className={`relative ${data.baseTextColor} bg-transparent border border-neutral-400 hover:bg-[#06aeef] hover:text-white hover:border-[#06aeef] px-3 py-2 rounded-full text-sm font-medium cursor-pointer overflow-hidden`}
                            >
                                {data.name}
                                <div
                                    className="absolute top-0 left-0 h-full overflow-hidden bg-[#06aeef]"
                                    style={{ width: `${data.progress}%` }}
                                >
                                    <span className="block text-white px-3 py-2 text-sm font-medium whitespace-nowrap">
                                        {data.name}
                                    </span>
                                </div>
                            </button>
                        ))}
                    </div>

                    <div className="flex-shrink-0">
                        <button
                            onClick={openContactModal}
                            className="relative text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-opacity-80 transition-all duration-150 ease-in-out flex items-center justify-center overflow-hidden transform hover:scale-105 cursor-pointer"
                            style={{
                                backgroundColor: bookADemoBackgroundColor,
                            }}
                        >
                            <span className="inline-block">Book a Demo</span>
                        </button>
                    </div>
                </div>

                <div
                    onMouseEnter={handlePanelMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    className={`
                        absolute top-full right-0 w-64 bg-white shadow-lg rounded-lg p-6 z-[60] mt-2 mr-2
                        transform transition-all duration-300 ease-in-out
                        ${
                            isMenuOpen
                                ? "translate-y-0 opacity-100"
                                : "-translate-y-2 opacity-0 pointer-events-none"
                        }
                    `}
                >
                    <div className="flex flex-col space-y-5 items-center">
                        <Link
                            href="/clinical"
                            className="group relative text-gray-700 hover:text-blue-700 block pl-3 pr-10 py-3 rounded-md text-lg font-medium transition-all duration-200 ease-out hover:scale-[1.02] w-auto"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            <img
                                src="/images/vayyar-logo-dark-blue.png"
                                alt=""
                                className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 rotate-180 transition-all duration-300 ease-in-out opacity-0 translate-x-5 group-hover:opacity-100 group-hover:translate-x-4"
                            />
                            <span className="inline-block uppercase">
                                Clinical
                            </span>
                        </Link>
                        <Link
                            href="/executive"
                            className="group relative text-gray-700 hover:text-blue-700 block pl-3 pr-10 py-3 rounded-md text-lg font-medium transition-all duration-200 ease-out hover:scale-[1.02] w-auto"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            <img
                                src="/images/vayyar-logo-dark-blue.png"
                                alt=""
                                className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 rotate-180 transition-all duration-300 ease-in-out opacity-0 translate-x-5 group-hover:opacity-100 group-hover:translate-x-4"
                            />
                            <span className="inline-block uppercase">
                                Executive
                            </span>
                        </Link>
                        <Link
                            href="/customers"
                            className="group relative text-gray-700 hover:text-blue-700 block pl-3 pr-10 py-3 rounded-md text-lg font-medium transition-all duration-200 ease-out hover:scale-[1.02] w-auto"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            <img
                                src="/images/vayyar-logo-dark-blue.png"
                                alt=""
                                className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 rotate-180 transition-all duration-300 ease-in-out opacity-0 translate-x-5 group-hover:opacity-100 group-hover:translate-x-4"
                            />
                            <span className="inline-block uppercase">
                                Customers
                            </span>
                        </Link>
                        <Link
                            href="/about-us"
                            className="group relative text-gray-700 hover:text-blue-700 block pl-3 pr-10 py-3 rounded-md text-lg font-medium transition-all duration-200 ease-out hover:scale-[1.02] w-auto"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            <img
                                src="/images/vayyar-logo-dark-blue.png"
                                alt=""
                                className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 rotate-180 transition-all duration-300 ease-in-out opacity-0 translate-x-5 group-hover:opacity-100 group-hover:translate-x-4"
                            />
                            <span className="inline-block uppercase">
                                Mission
                            </span>
                        </Link>
                    </div>
                </div>
            </div>
            {isContactModalOpen && (
                <ContactModal onClose={handleContactModalClose} />
            )}
        </nav>
    );
}
