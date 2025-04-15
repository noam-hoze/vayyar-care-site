// ClinicalPage.jsx

"use client";

import React, { useState } from "react";

export default function ClinicalPage() {
    const [activeVideo, setActiveVideo] = useState<string | null>(null);

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

    return (
        <main className="bg-white text-gray-900">
            {/* Hero Section */}
            <section className="relative min-h-screen flex flex-col justify-center items-center px-6 text-center bg-[url('/images/clinical/clinical-hero.jpg')] bg-cover bg-center">
                {/* Removed Overlay div */}
                {/* <div className="hero-overlay"></div> */}

                {/* Content needs relative positioning and higher z-index to appear above overlay */}
                <div className="relative z-10">
                    {/* Removed temporary image */}
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

            {/* Benefits Section */}
            <section className="min-h-screen flex flex-col justify-start px-6 pt-20 bg-white text-center">
                <h2 className="text-3xl font-semibold mb-10">In Their Words</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
                    <div>
                        <h3 className="text-xl font-bold mb-2">
                            Fewer False Alarms
                        </h3>
                        <p>
                            Over 80% reduction so you focus only where it
                            matters.
                        </p>
                    </div>
                    <div>
                        <h3 className="text-xl font-bold mb-2">
                            Automated Task Support
                        </h3>
                        <p>
                            Let the system handle routine monitoring and alerts,
                            so you can focus on care.
                        </p>
                    </div>
                    <div>
                        <h3 className="text-xl font-bold mb-2">
                            Smarter Prioritization
                        </h3>
                        <p>Know who needs you most at any moment.</p>
                    </div>
                    <div>
                        <h3 className="text-xl font-bold mb-2">Less Burnout</h3>
                        <p>
                            Spend more time with people, less time chasing false
                            alerts.
                        </p>
                    </div>
                </div>

                {/* === Inserted Testimonials Start === */}
                <div className="mt-16">
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

                    {/* Video Modal Logic - remains the same */}
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

            {/* How It Works - Scroll-Based Animation */}
            <section className="min-h-screen flex flex-col justify-center px-6 text-center bg-white">
                <h2 className="text-3xl font-semibold mb-10">How It Works</h2>
                <div className="max-w-6xl mx-auto">
                    <p className="mb-6 text-lg text-gray-700">
                        Scroll down to see how VayyarCare works throughout your
                        shift.
                    </p>
                    {/* Placeholder for scroll-based animation component */}
                    <div className="w-full h-96 bg-gray-200 flex items-center justify-center rounded-md">
                        <p className="text-gray-600 italic">
                            [ Scroll-based animation: Step 1 → Step 2 → Step 3 ]
                        </p>
                    </div>
                </div>
            </section>

            {/* Final CTA */}
            <section className="min-h-screen flex flex-col justify-center items-center px-6 bg-[#2daae2] text-white text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('/assets/cta-pattern.svg')] bg-cover opacity-10 z-0" />
                <div className="relative z-10 max-w-3xl">
                    <h2 className="text-4xl font-bold mb-6">
                        Let's Bring VayyarCare to Your Facility
                    </h2>
                    <p className="text-lg mb-10">
                        See how our non-invasive, intelligent monitoring system
                        can transform your team's care delivery.
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
        </main>
    );
}
