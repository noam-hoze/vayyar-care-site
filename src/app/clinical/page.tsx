"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function OverlayScrollReal() {
    const containerRef = useRef(null);
    const section1Ref = useRef(null);
    const section3Ref = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Pin Section 1
            ScrollTrigger.create({
                trigger: containerRef.current,
                start: "top top",
                end: "bottom top",
                pin: section1Ref.current,
                pinSpacing: false,
                markers: true,
            });

            // Pin Section 3
            ScrollTrigger.create({
                trigger: section3Ref.current,
                start: "top top",
                end: "+=100%",
                pin: true,
                pinSpacing: false,
                markers: true,
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <div ref={containerRef}>
            {/* Section 1 (Pinned) */}
            <section
                ref={section1Ref}
                className="h-screen bg-blue-500 flex items-center justify-center text-white text-5xl font-bold z-0"
            >
                Section 1 (Stays)
            </section>

            {/* Section 2 scrolls over Section 1 */}
            <div className="-mt-screen relative z-10">
                <section className="h-screen bg-white text-black flex items-center justify-center text-4xl">
                    Section 2 (Scrolls Over)
                </section>
            </div>

            {/* Section 3 (Pinned) */}
            <section
                ref={section3Ref}
                className="h-screen bg-green-400 text-black flex items-center justify-center text-4xl z-0"
            >
                Section 3 (Pinned)
            </section>

            {/* Section 4 scrolls over Section 3 */}
            <div className="-mt-screen relative z-10">
                <section className="h-screen bg-purple-500 text-white flex items-center justify-center text-4xl">
                    Section 4 (Scrolls Over)
                </section>
            </div>
        </div>
    );
}
