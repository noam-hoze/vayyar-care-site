"use client";

import React from "react";
import { homeSections } from "@/data/homeSections";
import HomePageSection from "@/components/HomePageSection";
import HeroSection from "@/components/HeroSection";
import TheaterModeOverlay from "@/components/mobile/TheaterModeOverlay";
import ContactForm from "@/components/ContactForm";

export default function HomePage() {
    return (
        <div style={{ margin: "0 auto", background: "#fff" }}>
            <HeroSection />
            {homeSections.map((section, idx) => (
                <HomePageSection
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
