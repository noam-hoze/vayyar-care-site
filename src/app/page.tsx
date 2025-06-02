"use client"; // Mark this as a Client Component

import { useState, useEffect } from "react";
import { scenes } from "@/data/scenes"; // Use alias
import SceneViewer from "@/components/SceneViewer"; // Use alias
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register GSAP plugins - needs to be done in a client component or useEffect
gsap.registerPlugin(ScrollTrigger);

export default function HomePage() {
    const [subScrollProgress, setSubScrollProgress] = useState(0);

    // Scroll progress calculation
    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY;
            const windowHeight = window.innerHeight;
            const documentHeight = document.documentElement.scrollHeight;
            const totalScrollableHeight = documentHeight - windowHeight;

            // Calculate scroll progress as a percentage of total scrollable height
            const newSubScroll = Math.max(0, Math.min(1, scrollY / totalScrollableHeight));
            
            // Only update state if the value has changed significantly
            if (Math.abs(newSubScroll - subScrollProgress) > 0.001) {
                setSubScrollProgress(newSubScroll);
            }
        };

        window.addEventListener("scroll", handleScroll);
        handleScroll(); // Initial calculation
        return () => window.removeEventListener("scroll", handleScroll);
    }, [subScrollProgress]);

    const scene = scenes[0]; // Always use the first scene since we're not using scene switching

    return (
        <>
            {/* Main container for scenes */}
            <div
                className="scenes-container relative w-full"
                style={{ height: '400vh' }} // Fixed height for scrolling
            >
                <SceneViewer
                    scene={scene}
                    index={0}
                    subScrollProgress={subScrollProgress}
                />
            </div>
        </>
    );
}
