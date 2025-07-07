"use client"; // Add this for useState
import React, { useState, useEffect } from "react";
import Link from "next/link"; // Changed from react-router-dom
import ContactModal from "@/components/ContactModal";
import { useDemoModal } from "@/contexts/DemoModalContext"; // Added import
import { useMobileHomeVideo } from "@/components/mobile/MobileHomeVideoContext";
import { homeSections } from "@/data/homeSections";

// TODO: Type buttonDisplayData properly
interface NavBarProps {
    buttonDisplayData: Array<Record<string, any>>;
    onOpenMobileMenu: () => void;
}

export default function NavBar({
    buttonDisplayData,
    onOpenMobileMenu,
}: NavBarProps) {
    const [hasLastButtonBeenFilled, setHasLastButtonBeenFilled] = useState(false);
    const { isDemoModalOpen, setIsDemoModalOpen } = useDemoModal();
    const { setTheaterMode } = useMobileHomeVideo();

    const scrollToSection = (sectionId: string) => {
        setTheaterMode(false, null);
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: "smooth", block: "start", });
        }
    };

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

    const openContactModal = () => {
        setIsDemoModalOpen(true);
    };
    const handleContactModalClose = () => {
        setIsDemoModalOpen(false);
    };
    useEffect(() => {
        document.body.style.overflow = isDemoModalOpen ? "hidden" : "auto";
        return () => {
            document.body.style.overflow = "auto";
        };
    }, [isDemoModalOpen]);

    return (
        <nav className="relative z-50" style={{fontFamily: "Magistral"}}>
            <div className="w-full h-full absolute" style={{backgroundColor: "rgba(250, 250, 252, 0.8)", backdropFilter: "saturate(1.8) blur(20px)"}}></div>
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-7">
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
                    {/* Desktop nav buttons */}
                    <div className="flex-1 justify-center items-center space-x-4 hidden lg:flex">
                        {buttonDisplayData.map((data) => (
                            <button
                                key={data.id}
                                onClick={() => scrollToSection(data.id)}
                                className={`relative text-gray-500 bg-transparent border border-neutral-400 hover:bg-[#06aeef] hover:text-white hover:border-[#06aeef] px-3 py-2 rounded-full text-sm font-medium cursor-pointer overflow-hidden`}
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
                    {/* Mobile menu button */}
                    <div className="flex-1 flex justify-end items-center lg:hidden">
                        <button
                            className="ml-2 flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-200 focus:outline-none mobile-menu"
                            aria-label="Open menu"
                            onClick={onOpenMobileMenu}
                        >
                            <span className="block w-5 h-8 relative">
                                <span className="block w-1 h-1 bg-gray-700 rounded-full absolute left-2 top-2"></span>
                                <span className="block w-1 h-1 bg-gray-700 rounded-full absolute left-2 top-4"></span>
                                <span className="block w-1 h-1 bg-gray-700 rounded-full absolute left-2 top-6"></span>
                            </span>
                        </button>
                    </div>
                    {/* Book a Demo always visible */}
                    <div className="flex-shrink-0 ml-2">
                        <button
                            onClick={openContactModal}
                            className="relative text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-opacity-80 transition-all duration-150 ease-in-out flex items-center justify-center overflow-hidden transform hover:scale-105 cursor-pointer"
                            style={{ backgroundColor: bookADemoBackgroundColor }}
                        >
                            <span className="inline-block">Book a Demo</span>
                        </button>
                    </div>
                </div>
            </div>
            {isDemoModalOpen && (
                <ContactModal
                    isOpen={isDemoModalOpen}
                    onClose={handleContactModalClose}
                />
            )}
        </nav>
    );
}
