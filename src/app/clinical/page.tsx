"use client";

import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function OverlayScrollReal() {
    const [activeVideo, setActiveVideo] = useState<string | null>(null);

    const containerRef = useRef(null);
    const section1Ref = useRef(null);
    const section2Ref = useRef<HTMLElement>(null);
    const section2_5Ref = useRef<HTMLElement>(null);
    const section3Ref = useRef(null);

    const videoTestimonials = [
        {
            id: 1,
            thumbnail: "/videos/anthropos_testimonial.png",
            videoUrl:
                "https://firebasestorage.googleapis.com/v0/b/walabothome-app-cloud.appspot.com/o/testimonials%2Fanthropos_testimonial.mp4?alt=media",
        },
        {
            id: 2,
            thumbnail: "/videos/essex_county_council_testimonial.png",
            videoUrl:
                "https://firebasestorage.googleapis.com/v0/b/walabothome-app-cloud.appspot.com/o/testimonials%2Fessex_county_council_testimonial.mp4?alt=media",
        },
        {
            id: 3,
            thumbnail:
                "/videos/heritage_senior_living_executives_testimonial.png",
            videoUrl:
                "https://firebasestorage.googleapis.com/v0/b/walabothome-app-cloud.appspot.com/o/testimonials%2Fheritage_senior_living_executives_testimonial.mp4?alt=media",
        },
    ];

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
            {/* Section 1 (Pinned Hero) */}
            <section
                ref={section1Ref}
                className="h-screen relative flex flex-col justify-center items-center px-6 text-center bg-[url('/images/clinical/clinical-hero.jpg')] bg-cover bg-center z-0"
            >
                <div className="relative z-10">
                    <h1 className="text-5xl font-bold mb-4 text-white text-shadow-lg">
                        You care for them. We care for you.
                    </h1>
                    <p className="text-lg mb-6 text-white text-shadow-sm">
                        Smart alerts, automated monitoring, and real-time
                        insights—so you can focus on delivering the best care.
                    </p>
                    <div className="flex justify-center mt-10">
                        <button className="bg-[#05aae9] text-white px-6 py-3 rounded-md text-lg hover:bg-vayyar-blue/90 transition">
                            Book a Demo
                        </button>
                    </div>
                </div>
            </section>

            {/* Wrapper for sections scrolling over Section 1 */}
            <div className="-mt-screen relative z-10">
                {/* Section 2 scrolls over Section 1 - Benefits Grid Only */}
                <section className="min-h-screen flex flex-col justify-start px-6 pt-20 bg-white text-center">
                    <h2 className="text-3xl font-semibold text-gray-900">
                        Smarter Care, Less Stress
                    </h2>
                    <div className="flex flex-grow items-center">
                        <div className="grid grid-cols-4 gap-8 max-w-6xl mx-auto">
                            {/* Benefit 1 with Icon Placeholder and Card Style */}
                            <div className="bg-gray-50 rounded-lg p-6 shadow-sm">
                                {/* Placeholder for Heroicon: bell-slash */}
                                <div className="w-10 h-10 text-vayyar-blue bg-blue-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                                    <svg
                                        /* Heroicon: bell-slash */ fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.291m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                                        ></path>
                                    </svg>
                                </div>
                                <h3 className="text-xl font-bold mb-2 text-gray-900">
                                    {" "}
                                    Fewer False Alarms{" "}
                                </h3>
                                <p className="text-gray-700">
                                    {" "}
                                    Over 80% reduction so you focus only where
                                    it matters.{" "}
                                </p>
                            </div>
                            {/* Benefit 2 with Icon Placeholder and Card Style */}
                            <div className="bg-gray-50 rounded-lg p-6 shadow-sm">
                                {/* Placeholder for Heroicon: cog */}
                                <div className="w-10 h-10 text-vayyar-blue bg-blue-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                                    <svg
                                        /* Heroicon: cog */ fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                                        ></path>
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                        ></path>
                                    </svg>
                                </div>
                                <h3 className="text-xl font-bold mb-2 text-gray-900">
                                    {" "}
                                    Automated Task Support{" "}
                                </h3>
                                <p className="text-gray-700">
                                    {" "}
                                    Let the system handle routine monitoring and
                                    alerts, so you can focus on care.{" "}
                                </p>
                            </div>
                            {/* Benefit 3 with Icon Placeholder and Card Style */}
                            <div className="bg-gray-50 rounded-lg p-6 shadow-sm">
                                {/* Placeholder for Heroicon: list-bullet */}
                                <div className="w-10 h-10 text-vayyar-blue bg-blue-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                                    <svg
                                        /* Heroicon: list-bullet */ fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M4 6h16M4 10h16M4 14h16M4 18h16"
                                        ></path>
                                    </svg>
                                </div>
                                <h3 className="text-xl font-bold mb-2 text-gray-900">
                                    {" "}
                                    Smarter Prioritization{" "}
                                </h3>
                                <p className="text-gray-700">
                                    Know who needs you most at any moment.
                                </p>
                            </div>
                            {/* Benefit 4 with Icon Placeholder and Card Style */}
                            <div className="bg-gray-50 rounded-lg p-6 shadow-sm">
                                {/* Placeholder for Heroicon: face-smile */}
                                <div className="w-10 h-10 text-vayyar-blue bg-blue-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                                    <svg
                                        /* Heroicon: face-smile */ fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                        ></path>
                                    </svg>
                                </div>
                                <h3 className="text-xl font-bold mb-2 text-gray-900">
                                    Less Burnout
                                </h3>
                                <p className="text-gray-700">
                                    {" "}
                                    Spend more time with people, less time
                                    chasing false alerts.{" "}
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Section 2.5 scrolls over Section 1 - Testimonials on Orange BG */}
                <section
                    ref={section2_5Ref}
                    className="min-h-screen flex flex-col justify-center items-center px-6 py-20 bg-orange-400 text-center"
                >
                    {/* Testimonials Content */}
                    <h3 className="text-2xl font-semibold mb-8 text-gray-800">
                        Hear From Our Partners
                    </h3>
                    <div className="flex justify-center gap-4 overflow-x-auto max-w-6xl mx-auto pb-4">
                        {videoTestimonials.map((video) => (
                            <img
                                key={video.id}
                                src={video.thumbnail}
                                alt={`Testimonial ${video.id}`}
                                className="w-80 h-48 object-cover rounded-md cursor-pointer hover:opacity-80 transition"
                                onClick={() => setActiveVideo(video.videoUrl)}
                            />
                        ))}
                    </div>
                    {/* Video Modal Logic */}
                    {activeVideo && (
                        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
                            <div className="bg-white rounded-lg overflow-hidden w-full max-w-3xl relative">
                                <button
                                    className="absolute top-2 right-2 text-gray-700 text-xl font-bold hover:text-black"
                                    onClick={() => setActiveVideo(null)}
                                >
                                    {" "}
                                    ×{" "}
                                </button>
                                <iframe
                                    className="w-full h-[400px]"
                                    src={activeVideo}
                                    title="Testimonial Video"
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                ></iframe>
                            </div>
                        </div>
                    )}
                </section>
            </div>

            {/* Section 3 (Pinned) - How It Works Content */}
            <section
                ref={section3Ref}
                className="min-h-screen flex flex-col justify-center px-6 py-20 bg-gray-50 text-center z-0"
            >
                <h2 className="text-3xl font-semibold mb-10 text-gray-900">
                    How It Works
                </h2>
                <div className="grid grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {/* Card 1 */}
                    <div className="bg-white rounded-lg p-6 shadow-md">
                        <h3 className="text-xl font-bold mb-2 text-vayyar-blue">
                            Step 1
                        </h3>
                        <p className="text-gray-600">
                            Initial setup and configuration. Lorem ipsum dolor
                            sit amet, consectetur adipiscing elit.
                        </p>
                    </div>
                    {/* Card 2 */}
                    <div className="bg-white rounded-lg p-6 shadow-md">
                        <h3 className="text-xl font-bold mb-2 text-vayyar-blue">
                            Step 2
                        </h3>
                        <p className="text-gray-600">
                            Real-time monitoring begins. Sed do eiusmod tempor
                            incididunt ut labore et dolore magna aliqua.
                        </p>
                    </div>
                    {/* Card 3 */}
                    <div className="bg-white rounded-lg p-6 shadow-md">
                        <h3 className="text-xl font-bold mb-2 text-vayyar-blue">
                            Step 3
                        </h3>
                        <p className="text-gray-600">
                            Smart alerts and insights delivered. Ut enim ad
                            minim veniam, quis nostrud exercitation ullamco
                            laboris.
                        </p>
                    </div>
                </div>
            </section>

            {/* Section 4 scrolls over Section 3 - Final CTA Content */}
            <div className="-mt-screen relative z-10">
                <section
                    // Apply original CTA styles + min-h-screen
                    className="min-h-screen flex flex-col justify-center items-center px-6 bg-[#2daae2] text-white text-center relative overflow-hidden"
                >
                    <div className="absolute inset-0 bg-[url('/assets/cta-pattern.svg')] bg-cover opacity-10 z-0" />
                    <div className="relative z-10 max-w-3xl">
                        <h2 className="text-4xl font-bold mb-6">
                            Let's Bring VayyarCare to Your Facility
                        </h2>
                        <p className="text-lg mb-10">
                            See how our non-invasive, intelligent monitoring
                            system can transform your team's care delivery.
                        </p>
                        <form className="space-y-6">
                            <div className="flex flex-col text-left">
                                <label
                                    htmlFor="name"
                                    className="mb-1 text-white font-semibold"
                                >
                                    Name
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    required
                                    className="p-3 rounded-md border border-white/30 bg-white text-[#2daae2] placeholder-gray-400"
                                    placeholder="Your full name"
                                />
                            </div>
                            <div className="flex flex-col text-left">
                                <label
                                    htmlFor="email"
                                    className="mb-1 text-white font-semibold"
                                >
                                    Email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    required
                                    className="p-3 rounded-md border border-white/30 bg-white text-[#2daae2] placeholder-gray-400"
                                    placeholder="you@company.com"
                                />
                            </div>
                            <div className="flex flex-col text-left">
                                <label
                                    htmlFor="facility"
                                    className="mb-1 text-white font-semibold"
                                >
                                    Facility Name
                                </label>
                                <input
                                    type="text"
                                    id="facility"
                                    name="facility"
                                    className="p-3 rounded-md border border-white/30 bg-white text-[#2daae2] placeholder-gray-400"
                                    placeholder="Facility or organization name"
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-white text-[#2daae2] px-6 py-3 text-lg rounded-md font-semibold hover:bg-blue-100 transition"
                            >
                                Book a Demo
                            </button>
                        </form>
                    </div>
                </section>
            </div>
        </div>
    );
}
