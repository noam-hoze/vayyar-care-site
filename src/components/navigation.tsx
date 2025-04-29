"use client"; // Add this for useState
import React, { useState } from "react"; // Import useState
import Link from "next/link"; // Changed from react-router-dom

export default function NavBar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false); // State for menu visibility

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

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
                            onClick={toggleMenu}
                            className={`
                                ${
                                    isMenuOpen
                                        ? "bg-white"
                                        : "bg-[#e4e6ef] hover:bg-white"
                                }
                                text-black px-4 py-2 rounded-full text-sm font-medium focus:outline-none transition duration-150 ease-in-out uppercase cursor-pointer min-w-[100px]
                            `}
                            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                        >
                            {isMenuOpen ? "Close" : "Menu"}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu Panel - Now inside the max-w container */}
                <div
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
                            className="text-gray-700 hover:text-black block px-3 py-2 rounded-md text-base font-medium"
                            onClick={toggleMenu}
                        >
                            Clinical
                        </Link>
                        <Link
                            href="/executive"
                            className="text-gray-700 hover:text-black block px-3 py-2 rounded-md text-base font-medium"
                            onClick={toggleMenu}
                        >
                            Executive
                        </Link>
                        <Link
                            href="/customers"
                            className="text-gray-700 hover:text-black block px-3 py-2 rounded-md text-base font-medium"
                            onClick={toggleMenu}
                        >
                            Customers
                        </Link>
                        <Link
                            href="/about-us"
                            className="text-gray-700 hover:text-black block px-3 py-2 rounded-md text-base font-medium"
                            onClick={toggleMenu}
                        >
                            About Us
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
}
