"use client"; // Add this for useState
import React, { useState, useEffect } from "react";
import Link from "next/link"; // Changed from react-router-dom
import VayyarLogo from "@/components/VayyarLogo";
import ContactForm from "@/components/ContactForm";
import { useMobileHomeVideo } from "@/components/mobile/MobileHomeVideoContext";
import { homeSections } from "@/data/homeSections";
import { scrollToSection as scrollToSectionUtil } from "@/lib/scrollUtils";

const VAYYAR_ORANGE = "#f56300";

// TODO: Type buttonDisplayData properly
interface NavBarProps {
    buttonDisplayData: Array<Record<string, any>>;
    onOpenMobileMenu: () => void;
}

export default function NavBar({
    buttonDisplayData,
    onOpenMobileMenu,
}: NavBarProps) {
    const [hasLastButtonBeenFilled, setHasLastButtonBeenFilled] =
        useState(false);
    const { setTheaterMode } = useMobileHomeVideo();

    const scrollToSection = (sectionId: string) => {
        scrollToSectionUtil(sectionId, setTheaterMode);
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

    const bookADemoBackgroundColor = VAYYAR_ORANGE;

    const handleBookADemo = () => {
        // Smooth, Apple-like scroll to the contact form section
        scrollToSectionUtil("contact-section", setTheaterMode, {
            durationMs: 1000,
            offsetPx: -80,
        });
    };

    return (
        <nav className="relative z-50" style={{ fontFamily: "Magistral" }}>
            <div
                className="w-full h-full absolute"
                style={{
                    backgroundColor: "rgba(250, 250, 252, 0.8)",
                    backdropFilter: "saturate(1.8) blur(20px)",
                }}
            ></div>
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-7">
                <div className="grid items-center h-16 relative grid-cols-[auto_1fr_auto] lg:flex">
                    <div className="flex-shrink-0">
                        <Link href="/">
                            <VayyarLogo
                                className="h-8 w-auto"
                                ariaLabel="Vayyar Care"
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
                    {/* Book a Demo: centered between logo and hamburger on mobile */}
                    <div className="justify-self-center ml-2">
                        <button
                            onClick={handleBookADemo}
                            className="text-white px-3 py-1.5 sm:px-4 sm:py-2 lg:px-5 lg:py-2 rounded-full text-xs sm:text-sm font-medium hover:bg-opacity-80 transition-all duration-150 ease-in-out flex items-center justify-center overflow-hidden hover:scale-105 cursor-pointer lg:static"
                            style={{
                                backgroundColor: bookADemoBackgroundColor,
                            }}
                        >
                            <span className="inline-block">Book a Demo</span>
                        </button>
                    </div>
                    {/* Mobile menu button */}
                    <div className="justify-self-end flex items-center lg:hidden">
                        <button
                            className="ml-2 flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-200 focus:outline-none mobile-menu"
                            aria-label="Open menu"
                            onClick={onOpenMobileMenu}
                        >
                            <span className="block w-5 h-3 relative">
                                <span className="block w-5 h-0.5 bg-gray-700 absolute top-0"></span>
                                <span className="block w-5 h-0.5 bg-gray-700 absolute top-2.5"></span>
                            </span>
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
}
