'use client'

import React, { useEffect, useRef, useState } from "react";

export default function ExecutivePage() {
    const [countersVisible, setCountersVisible] = useState(false);
    const countersRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => setCountersVisible(entry.isIntersecting),
            { threshold: 0.6 }
        );
        if (countersRef.current) observer.observe(countersRef.current);
        return () => observer.disconnect();
    }, []);

    const metrics = [
        { label: "Fall Reduction", value: 40 },
        { label: "Staff Efficiency Boost", value: 25 },
        { label: "Time Saved/Week", value: 1.3, suffix: " FTE" },
        { label: "Avg ROI Timeline", value: 3, suffix: " Months" },
    ];

    return (
        <main className="executive-page font-sans text-gray-900">
            {/* Hero */}
            <section className="bg-gray-900 text-white py-20 px-4 text-center">
                <h1 className="text-3xl md:text-5xl font-bold mb-6">
                    See what better care actually looks like — for your bottom
                    line.
                </h1>
                <p className="text-lg md:text-xl mb-8">
                    VayyarCare saves time, staff, and lives. Here's how.
                </p>
                <div className="flex flex-col md:flex-row justify-center gap-4">
                    <a href="#metrics" className="btn-primary">
                        See it in Action
                    </a>
                    <button className="btn-secondary">Book a Demo</button>
                </div>
            </section>

            {/* Metrics */}
            <section
                id="metrics"
                className="bg-white py-16 px-4 text-center"
                ref={countersRef}
            >
                <h2 className="text-2xl md:text-3xl font-bold mb-10">
                    The Numbers That Matter
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-xl font-semibold">
                    {metrics.map(({ label, value, suffix }) => (
                        <div
                            key={label}
                            className="transition-transform duration-700"
                        >
                            <span className="text-4xl text-indigo-600 block">
                                {countersVisible ? value : 0}
                                {suffix || "%"}
                            </span>
                            {label}
                        </div>
                    ))}
                </div>
            </section>

            {/* Problem Framing */}
            <section className="bg-gray-100 py-16 px-4 text-center">
                <h2 className="text-2xl md:text-3xl font-bold mb-6">
                    Staff burnout and resident safety aren’t tradeoffs.
                </h2>
                <p className="mb-4 text-lg">Most facilities face:</p>
                <ul className="list-disc list-inside max-w-xl mx-auto text-left text-lg">
                    <li>High cost and liability from falls</li>
                    <li>Chronic staffing shortages</li>
                    <li>Staff overwhelmed with routine tasks</li>
                </ul>
            </section>

            {/* Features Overlay */}
            <section className="bg-white py-20 px-4">
                <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-start">
                    <div>
                        <h3 className="text-xl font-semibold mb-2">Problem:</h3>
                        <p>
                            Staff can’t monitor every room at once — fall risks
                            go unnoticed.
                        </p>
                    </div>
                    <div className="bg-green-50 p-6 rounded-lg shadow-md">
                        <h3 className="text-xl font-semibold mb-2">
                            With VayyarCare:
                        </h3>
                        <ul className="list-disc list-inside">
                            <li>Silent fall detection 24/7</li>
                            <li>No wearables needed</li>
                            <li>Automatic alerts to relevant staff</li>
                            <li>Real-time dashboard for admin visibility</li>
                        </ul>
                    </div>
                </div>
            </section>

            {/* Clients / Testimonials */}
            <section className="bg-gray-100 py-20 px-4 text-center">
                <h2 className="text-2xl md:text-3xl font-bold mb-10">
                    Trusted by Leading Facilities
                </h2>
                <div className="flex flex-wrap justify-center gap-6 text-lg font-medium">
                    <div>Maplewood Seniors Care</div>
                    <div>Evergreen Living</div>
                    <div>Shalom Residence</div>
                    <div>Harmony Retirement Group</div>
                    {/* Add more as needed */}
                </div>
            </section>

            {/* ROI Calculator (Placeholder) */}
            <section className="bg-white py-20 px-4 text-center">
                <h2 className="text-2xl md:text-3xl font-bold mb-6">
                    Estimate Your ROI
                </h2>
                <p className="text-lg mb-6">
                    Enter your facility size and get an estimate in seconds.
                </p>
                <button className="btn-primary">Launch Calculator</button>
            </section>

            {/* Final CTA */}
            <section className="bg-gray-900 text-white py-20 px-4 text-center">
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                    It’s not just better care. It’s a better business.
                </h2>
                <div className="flex flex-col md:flex-row justify-center gap-4 mb-6">
                    <button className="btn-primary">Book a Demo</button>
                    <button className="btn-secondary">Contact Sales</button>
                </div>
                <p className="text-sm opacity-80">
                    HIPAA-compliant | 24/7 support | Deployed in 50+ facilities
                </p>
            </section>
        </main>
    );
}

// Tailwind-style button classes (for example)
// You can define these in global.css or tailwind.config.js
// .btn-primary { @apply bg-indigo-600 text-white px-6 py-3 rounded-md hover:bg-indigo-700 }
// .btn-secondary { @apply border border-white text-white px-6 py-3 rounded-md hover:bg-white hover:text-indigo-700 }
