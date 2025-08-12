"use client"; // Mark this as a Client Component

import React from "react";
import { homeSections } from "@/data/homeSections";
import ResponsiveHomeSection from "@/components/ResponsiveHomeSection";
import ResponsiveHeroSection from "@/components/ResponsiveHeroSection";
import TheaterModeOverlay from "@/components/mobile/TheaterModeOverlay"; // Import the TheaterModeOverlay component
import ContactForm from "@/components/ContactForm"; // Import the new Breather component

// Renamed function to match Next.js convention (can be any name, but default export is the page)
export default function HomePage() {
    return (
        <div style={{ margin: "0 auto", background: "#fff" }}>
            <ResponsiveHeroSection />
            {homeSections.map((section, idx) => (
                <ResponsiveHomeSection
                    key={idx}
                    section={section}
                    index={idx}
                    sectionId={`section-${section.id}`}
                    nextSectionId={`section-${section.id + 1}`}
                />
            ))}
            <ContactForm isOpen={true} asPageElement={true} />
            <TheaterModeOverlay />
        </div>
    );
}
