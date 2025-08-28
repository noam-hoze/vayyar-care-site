"use client";

import React from "react";
import { homeSections } from "@/data/homeSections";
import DefaultSection from "@/components/DefaultSection/DefaultSection";
import HomePageHeroSection from "@/components/HeroSection";
import TheaterModeOverlay from "@/components/mobile/TheaterModeOverlay";
import ContactForm from "@/components/ContactForm";

export default function HomePage() {
    return (
        <div style={{ margin: "0 auto", background: "#fff" }}>
            <HomePageHeroSection />
            {homeSections.map((entry, idx) => (
                <DefaultSection
                    key={idx}
                    entry={entry}
                    index={idx}
                    sectionId={`section-${entry.id}`}
                    nextSectionId={`section-${entry.id + 1}`}
                />
            ))}
            <ContactForm isOpen={true} asPageElement={true} />
            {/* <TheaterModeOverlay /> */}
        </div>
    );
}
