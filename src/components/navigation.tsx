"use client"; // Add this for useState
import React, { useState, useEffect, useRef } from "react"; // Import useEffect, useRef
import Link from "next/link"; // Changed from react-router-dom

export default function NavBar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false); // State for menu visibility
    const menuButtonRef = useRef<HTMLButtonElement>(null); // Ref for the menu button
    const menuPanelRef = useRef<HTMLDivElement>(null); // Ref for the menu panel

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    // Effect to handle clicks outside the menu
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            // Check if menu is open and refs are valid
            if (
                isMenuOpen &&
                menuButtonRef.current &&
                menuPanelRef.current &&
                // Check if click is outside the button
                !menuButtonRef.current.contains(event.target as Node) &&
                // Check if click is outside the panel
                !menuPanelRef.current.contains(event.target as Node)
            ) {
                setIsMenuOpen(false); // Close the menu
            }
        }

        // Add event listener on mount
        document.addEventListener("mousedown", handleClickOutside);
        // Cleanup event listener on unmount
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
        // Rerun effect if isMenuOpen changes (optional, but can be useful)
        // Using empty array [] ensures listener is added/removed only on mount/unmount
    }, [isMenuOpen]); // Dependency includes isMenuOpen to ensure check is always correct

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
                        <Link
                            // Add 'group' class for hover effects on children
                            href="/contact" // Assuming '/contact' is the target for Let's Talk
                            // Relative for positioning, flex center, overflow-hidden
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
                        </Link>

                        {/* Menu Toggle Button - Now Text */}
                        <button
                            ref={menuButtonRef} // Assign ref to the button
                            onClick={toggleMenu}
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
                            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                        >
                            {/* Text Span - Transitions transform */}
                            <span
                                className={`inline-block transition-all duration-300 ease-in-out transform ${
                                    // If menu open, apply shift directly. If closed, apply shift only on hover.
                                    isMenuOpen
                                        ? "-translate-x-2"
                                        : "group-hover:-translate-x-2"
                                }`}
                            >
                                {isMenuOpen ? "Close" : "Menu"}
                            </span>
                            {/* Vayyar Logo Image - Appears on Hover, Slides in from right */}
                            <img
                                src="/images/vayyar-logo-black.png"
                                alt="Vayyar Logo"
                                className={`absolute right-1 top-1/2 transform -translate-y-1/2 
                                           w-3 h-3
                                           transition-all duration-300 ease-in-out
                                           ${
                                               isMenuOpen
                                                   ? "opacity-100 translate-x-0 -rotate-90"
                                                   : "opacity-0 translate-x-5 group-hover:opacity-100 group-hover:translate-x-0 rotate-0"
                                           }
                                           `}
                            />
                        </button>
                    </div>
                </div>

                {/* Mobile Menu Panel - Now inside the max-w container */}
                <div
                    ref={menuPanelRef} // Assign ref to the panel
                    className={`
                        absolute top-full right-0 w-64 bg-white shadow-lg rounded-lg p-5 z-[60] mt-2 mr-2
                        transform transition-all duration-300 ease-in-out
                        ${
                            isMenuOpen
                                ? "translate-y-0 opacity-100"
                                : "-translate-y-2 opacity-0 pointer-events-none"
                        }
                    `}
                >
                    <div className="flex flex-col space-y-4">
                        <Link
                            href="/clinical"
                            className="group relative overflow-hidden text-gray-700 hover:text-blue-700 block pl-3 pr-6 py-2 rounded-md text-base font-medium transition-all duration-200 ease-out hover:scale-[1.02]"
                            onClick={toggleMenu}
                        >
                            <img
                                src="/images/vayyar-logo-dark-blue.png"
                                alt=""
                                className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 rotate-180 transition-all duration-300 ease-in-out opacity-0 translate-x-5 group-hover:opacity-100 group-hover:translate-x-0"
                            />
                            <span className="inline-block uppercase">
                                Clinical
                            </span>
                        </Link>
                        <Link
                            href="/executive"
                            className="group relative overflow-hidden text-gray-700 hover:text-blue-700 block pl-3 pr-6 py-2 rounded-md text-base font-medium transition-all duration-200 ease-out hover:scale-[1.02]"
                            onClick={toggleMenu}
                        >
                            <img
                                src="/images/vayyar-logo-dark-blue.png"
                                alt=""
                                className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 rotate-180 transition-all duration-300 ease-in-out opacity-0 translate-x-5 group-hover:opacity-100 group-hover:translate-x-0"
                            />
                            <span className="inline-block uppercase">
                                Executive
                            </span>
                        </Link>
                        <Link
                            href="/customers"
                            className="group relative overflow-hidden text-gray-700 hover:text-blue-700 block pl-3 pr-6 py-2 rounded-md text-base font-medium transition-all duration-200 ease-out hover:scale-[1.02]"
                            onClick={toggleMenu}
                        >
                            <img
                                src="/images/vayyar-logo-dark-blue.png"
                                alt=""
                                className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 rotate-180 transition-all duration-300 ease-in-out opacity-0 translate-x-5 group-hover:opacity-100 group-hover:translate-x-0"
                            />
                            <span className="inline-block uppercase">
                                Customers
                            </span>
                        </Link>
                        <Link
                            href="/about-us"
                            className="group relative overflow-hidden text-gray-700 hover:text-blue-700 block pl-3 pr-6 py-2 rounded-md text-base font-medium transition-all duration-200 ease-out hover:scale-[1.02]"
                            onClick={toggleMenu}
                        >
                            <img
                                src="/images/vayyar-logo-dark-blue.png"
                                alt=""
                                className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 rotate-180 transition-all duration-300 ease-in-out opacity-0 translate-x-5 group-hover:opacity-100 group-hover:translate-x-0"
                            />
                            <span className="inline-block uppercase">
                                About Us
                            </span>
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
}
