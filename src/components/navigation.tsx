"use client"; // Add this for useState
import React, { useState, useEffect } from "react"; // Removed useEffect
import Link from "next/link"; // Changed from react-router-dom
import ContactModal from "@/components/ContactModal";

export default function NavBar() {
    const [isContactModalOpen, setIsContactModalOpen] = useState(false);
    const [opacity, setOpacity] = useState(0);

    const openContactModal = () => {
        setIsContactModalOpen(true);
    };

    const handleContactModalClose = () => {
        setIsContactModalOpen(false);
    }

    useEffect(() => {
        document.body.style.overflow = isContactModalOpen ? 'hidden' : 'auto';

        return () => {
            document.body.style.overflow = 'auto';
        }
    }, [isContactModalOpen]);

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY;
            // Calculate opacity based on scroll position
            // At 0px scroll -> opacity 0
            // At 150px scroll -> opacity 1
            // Linear interpolation between these values
            const newOpacity = Math.max(0, Math.min(1, scrollPosition / 150));
            setOpacity(newOpacity);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <>
            <nav className="relative" 
                style={{ 
                    backgroundColor: `rgba(255, 255, 255, ${opacity})`,
                    backdropFilter: `blur(${opacity * 10}px)`
                }}>
                <div className="relative mx-auto px-4 sm:px-6 lg:px-8">
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
                                className="group relative bg-vayyar-blue text-white px-5 py-2 rounded-sm text-sm font-medium hover:bg-[#d91f5c] cursor-pointer transition duration-150 ease-in-out flex items-center justify-center overflow-hidden"
                            >
                                {/* Text Span - Transitions transform */}
                                <span className="inline-block uppercase">
                                    Let&apos;s Talk
                                </span>
                            </button>
                        </div>
                    </div>
                </div>
            </nav>
            {isContactModalOpen && (
                <ContactModal onClose={handleContactModalClose} />
            )}
        </>
    );
}
