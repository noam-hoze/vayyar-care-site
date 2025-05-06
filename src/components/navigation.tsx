"use client"; // Add this for useState
import React, { useState, useRef, useEffect } from "react"; // Removed useEffect
import Link from "next/link"; // Changed from react-router-dom
import ContactModal from "@/components/ContactModal";
import { usePathname, useRouter } from "next/navigation"; // Import new hooks

export default function NavBar() {
    const router = useRouter();
    const pathname = usePathname(); // Use the new hook to get the current path
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isContactModalOpen, setIsContactModalOpen] = useState(false);
    const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null); // Ref for hover timeout

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
        localStorage.setItem('oldPathName', pathname);
        window.history.replaceState(null, '', '/contact');
    };

    const handleContactModalClose = () => {
        setIsContactModalOpen(false);
        window.history.replaceState(null, '', localStorage.getItem('oldPathName') ?? '/');
    }

    useEffect(() => {
        if (pathname === "/contact") {
            setIsContactModalOpen(true);
        }
    }, [pathname]);

    return (
        // Make nav relative to position the absolute menu
        <nav className="bg-[#f0f1fa] shadow-md relative">
            {/* Add relative positioning here */}
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    {/* Logo or Brand Name */}
                    <div className="flex-shrink-0">
                        {/* Use Link for the logo to go to homepage */}
                        <Link href="/">
                            {/* Replace text with image */}
                            <img
                                className="h-8 w-auto" /* Adjust height/width as needed */
                                src="/images/vayyar-logo-text.png"
                                alt="Vayyar Logo"
                            />
                        </Link>
                    </div>

                    {/* Right Side - CTA and Menu Toggle */}
                    <div className="flex items-center space-x-4">
                        {/* Let's Talk Button (CTA) */}
                        <button
                            onClick={openContactModal}
                            className="group relative bg-black text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-blue-700 transition duration-150 ease-in-out flex items-center justify-center overflow-hidden"
                        >
                            {/* Arrow Icon - Absolutely positioned, transitions opacity and transform */}
                            <span className="absolute left-2 inline-flex items-center transition-all duration-300 ease-in-out opacity-0 transform -translate-x-5 group-hover:opacity-100 group-hover:translate-x-0">
                                <img
                                    src="/images/vayyar-logo-white.png"
                                    alt="Arrow"
                                    className="w-3 h-3 rotate-180"
                                />
                            </span>
                            {/* Text Span - Transitions transform */}
                            <span className="inline-block transition-all duration-300 ease-in-out transform group-hover:translate-x-2 uppercase">
                                Let&apos;s Talk
                            </span>
                        </button>

                        {/* Menu Toggle Button - Hover Activated */}
                        <button
                            // Removed ref
                            onMouseEnter={handleMouseEnter}
                            onMouseLeave={handleMouseLeave}
                            className={`
                                group relative overflow-hidden
                                ${
                                    isMenuOpen
                                        ? "bg-white"
                                        : "bg-[#e4e6ef] hover:bg-white"
                                }
                                text-black pl-4 pr-4 py-2
                                rounded-full text-sm font-medium 
                                focus:outline-none transition duration-150 ease-in-out 
                                uppercase cursor-pointer min-w-[80px]
                            `}
                            aria-label="Open menu"
                        >
                            <span
                                className={`inline-block transition-all duration-300 ease-in-out transform`}
                            >
                                Menu
                            </span>
                        </button>
                    </div>
                </div>

                {/* Mobile Menu Panel - Hover Activated */}
                <div
                    // Removed ref
                    onMouseEnter={handlePanelMouseEnter} // Keep open when mouse enters panel
                    onMouseLeave={handleMouseLeave} // Close when mouse leaves panel
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
