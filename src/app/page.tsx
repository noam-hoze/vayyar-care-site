"use client";

import React from "react";
import { homeSections } from "@/data/homeSections";
import HomePageSection from "@/components/HomePage/HomePageSection/HomePageSection";
import HomePageHeroSection from "@/components/HomePage/HomePageSection/HomePageHeroSection";
import TheaterModeOverlay from "@/components/mobile/TheaterModeOverlay";
import ContactForm from "@/components/ContactForm";

export default function HomePage() {
    return (
        <div style={{ margin: "0 auto", background: "#fff" }}>
            <HomePageHeroSection />
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
