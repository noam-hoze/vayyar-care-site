// ClinicalPage.jsx

"use client";

import React, { useState } from "react";

export default function ClinicalPage() {
    const [activeVideo, setActiveVideo] = useState<string | null>(null);

    const videoTestimonials = [
        {
            id: 1,
            thumbnail: "/videos/thumb1.jpg",
            videoUrl: "https://www.youtube.com/embed/VIDEO_ID_1",
        },
        {
            id: 2,
            thumbnail: "/videos/thumb2.jpg",
            videoUrl: "https://www.youtube.com/embed/VIDEO_ID_2",
        },
        {
            id: 3,
            thumbnail: "/videos/thumb3.jpg",
            videoUrl: "https://www.youtube.com/embed/VIDEO_ID_3",
        },
    ];

    return (
        <main className="bg-white text-gray-900">
            {/* Hero Section */}
            <section className="min-h-screen flex flex-col justify-center items-center px-6 text-center bg-purple-50">
                <h1 className="text-4xl font-bold mb-4">
                    You care for them. We care for you.
                </h1>
                <p className="text-lg mb-6">
                    Smart alerts, automated monitoring, and real-time
                    insights—so you can focus on delivering the best care.
                </p>
                <div className="flex justify-center mt-10">
                    <button className="bg-purple-700 text-white px-6 py-3 rounded-md text-lg hover:bg-purple-800 transition">
                        Book a Demo
                    </button>
                </div>
            </section>

            {/* Benefits Section */}
            <section className="min-h-screen flex flex-col justify-start px-6 pt-20 bg-white text-center">
                <h2 className="text-3xl font-semibold mb-10">
                    In Their Words
                </h2>
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
                                className="w-60 h-36 object-cover rounded-md cursor-pointer hover:opacity-80 transition"
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
            <section className="min-h-screen flex flex-col justify-center px-6 bg-purple-700 text-white text-center">
                <h2 className="text-3xl font-semibold mb-6">
                    Want to see it in your facility?
                </h2>
                <button className="bg-white text-purple-700 px-8 py-4 text-lg rounded-md font-semibold hover:bg-purple-100 transition">
                    Book a Demo
                </button>
            </section>
        </main>
    );
}
