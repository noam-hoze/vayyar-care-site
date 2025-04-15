"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function OverlayScrollReal() {
    const containerRef = useRef(null);
    const section1Ref = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            ScrollTrigger.create({
                trigger: containerRef.current,
                start: "top top",
                end: "bottom top",
                pin: section1Ref.current,
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

            {/* Wrapper that scrolls over Section 1 */}
            <div className="-mt-screen relative z-10">
                {/* Section 2 */}
                <section className="h-screen bg-white text-black flex items-center justify-center text-4xl">
                    Section 2 (Scrolls Over)
                </section>

                {/* Section 3 */}
                <section className="h-screen bg-green-400 text-black flex items-center justify-center text-4xl">
                    Section 3 (Normal Scroll)
                </section>

                {/* Section 4 */}
                <section className="h-screen bg-purple-500 text-white flex items-center justify-center text-4xl">
                    Section 4 (Normal Scroll)
                </section>
            </div>
        </div>
    );
}
