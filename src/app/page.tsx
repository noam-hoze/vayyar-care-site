"use client"; // Mark this as a Client Component

import React from "react";
import { homeSections } from "@/data/homeSections";
import MobileHomeSection from "@/components/mobile/MobileHomeSection";
import MobileHeroSection from "@/components/mobile/MobileHeroSection";
import TheaterModeOverlay from "@/components/mobile/TheaterModeOverlay"; // Import the TheaterModeOverlay component
import ContactModal from "@/components/ContactModal"; // Import the new Breather component

// Renamed function to match Next.js convention (can be any name, but default export is the page)
export default function HomePage() {
    return (
        <div style={{ margin: "0 auto", background: "#fff" }}>
            <MobileHeroSection />
            {homeSections.map((section, idx) => (
                <MobileHomeSection
                    key={idx}
                    section={section}
                    index={idx}
                    sectionId={`section-${section.id}`}
                    nextSectionId={`section-${section.id + 1}`}
                />
            ))}
            {/* Contact form section at the end of the page */}
            <div
                id="contact-section"
                className="relative z-10"
                style={{ height: "100vh" }}
            >
                <ContactModal isOpen={true} asPageElement={true} />
            </div>

            {/* Global theater mode overlay */}
            <TheaterModeOverlay />
        </div>
    );
}
