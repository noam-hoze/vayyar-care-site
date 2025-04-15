"use client";

import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function OverlayScrollReal() {
    const [activeVideo, setActiveVideo] = useState<string | null>(null);

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
            {/* Section 1 (Pinned) - Replaced with Hero Content */}
            <section
                ref={section1Ref}
                className="relative min-h-screen flex flex-col justify-center items-center px-6 text-center bg-[url('/images/clinical/clinical-hero.jpg')] bg-cover bg-center z-0"
            >
                {/* Content from original Hero Section */}
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

            {/* Section 2 (Scrolls OVER Section 1) - Replaced with Benefits Content */}
            <section className="min-h-screen flex flex-col justify-start px-6 pt-20 bg-white text-center relative z-10 -mt-screen">
                {/* Content from original Benefits Section */}
                <h2 className="text-3xl font-semibold mb-10 text-gray-900">
                    In Their Words
                </h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
                    <div>
                        <h3 className="text-xl font-bold mb-2 text-gray-900">
                            Fewer False Alarms
                        </h3>
                        <p className="text-gray-700">
                            Over 80% reduction so you focus only where it
                            matters.
                        </p>
                    </div>
                    <div>
                        <h3 className="text-xl font-bold mb-2 text-gray-900">
                            Automated Task Support
                        </h3>
                        <p className="text-gray-700">
                            Let the system handle routine monitoring and alerts,
                            so you can focus on care.
                        </p>
                    </div>
                    <div>
                        <h3 className="text-xl font-bold mb-2 text-gray-900">
                            Smarter Prioritization
                        </h3>
                        <p className="text-gray-700">
                            Know who needs you most at any moment.
                        </p>
                    </div>
                    <div>
                        <h3 className="text-xl font-bold mb-2 text-gray-900">
                            Less Burnout
                        </h3>
                        <p className="text-gray-700">
                            Spend more time with people, less time chasing false
                            alerts.
                        </p>
                    </div>
                </div>

                {/* === Inserted Testimonials Start === */}
                <div className="mt-16">
                    <div className="flex justify-center gap-4 overflow-x-auto max-w-6xl mx-auto pb-4">
                        {/* This needs videoTestimonials definition */}
                        {/* Assuming videoTestimonials is defined above or passed as props */}
                        {[
                            /* Placeholder for videoTestimonials data */
                            {
                                id: 1,
                                thumbnail: "/videos/anthropos_testimonial.png",
                                videoUrl:
                                    "https://firebasestorage.googleapis.com/v0/b/walabothome-app-cloud.appspot.com/o/testimonials%2Fanthropos_testimonial.mp4?alt=media",
                            },
                            {
                                id: 2,
                                thumbnail:
                                    "/videos/essex_county_council_testimonial.png",
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
                        ].map((video) => (
                            <img
                                key={video.id}
                                src={video.thumbnail}
                                alt={`Testimonial ${video.id}`}
                                className="w-80 h-48 object-cover rounded-md cursor-pointer hover:opacity-80 transition"
                                onClick={() => setActiveVideo(video.videoUrl)}
                            />
                        ))}
                    </div>

                    {/* Video Modal Logic - needs activeVideo state */}
                    {activeVideo && (
                        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
                            <div className="bg-white rounded-lg overflow-hidden w-full max-w-3xl relative">
                                <button
                                    className="absolute top-2 right-2 text-gray-700 text-xl font-bold hover:text-black"
                                    onClick={() => setActiveVideo(null)}
                                >
                                    ×
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
                </div>
                {/* === Inserted Testimonials End === */}
            </section>
        </div>
    );
}
