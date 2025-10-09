"use client";

import React from "react";
import SectionRenderer from "@/components/DefaultSection/SectionRenderer";
import HomePageHeroSection from "@/components/HeroSection";
import ContactForm from "@/components/ContactForm";

export default function HomePage() {
    return (
        <div style={{ margin: "0 auto", background: "#fff" }}>
            <HomePageHeroSection />
            <SectionRenderer />
            <ContactForm isOpen={true} asPageElement={true} />
        </div>
    );
}
