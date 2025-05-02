'use client'

import React, { useEffect, useRef, useState } from "react";
import Card from '@/components/Card';
import {gsap} from "gsap";
import {setupHeroPin} from "@/lib/utils";
import {ScrollTrigger} from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ExecutivePage() {
    const cardRefs = useRef<(HTMLElement | null)[]>([]);
    const metricsRef = useRef<HTMLElement | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const section1Ref = useRef<HTMLElement>(null);

    const metrics = [
        { label: "Fall Reduction", value: 40, suffix: " %" },
        { label: "Staff Efficiency Boost", value: 25, suffix: " %" },
        { label: "Time Saved/Week", value: 1.3, suffix: " FTE" },
        { label: "Avg ROI Timeline", value: 3, suffix: " Months" },
    ];

    const [animatedValues, setAnimatedValues] = useState<number[]>(metrics.map(() => 0));

    const animateValue = (start: number, end: number, duration: number, index: number) => {
        let startTimestamp: number | null = null;
        const step = (timestamp: number) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            setAnimatedValues(prevValues => {
                const newValues = [...prevValues];
                newValues[index] = Math.floor(progress * (end - start) + start);
                return newValues;
            });
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    };

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    metrics.forEach((metric, index) => {
                        animateValue(0, metric.value, 2000, index);
                    });
                    observer.disconnect(); // Disconnect observer after animation starts
                }
            },
            { threshold: 0.6 }
        );
        if (metricsRef.current) observer.observe(metricsRef.current);

        const ctx = gsap.context(() => {
            setupHeroPin(section1Ref.current!, containerRef.current!);
        }, containerRef);

        return () => {
            ctx.revert();
            observer.disconnect();
        };
    }, []);

    return (
        <main ref={containerRef} className="executive-page font-sans text-gray-900">
            {/* Hero */}
            <section ref={section1Ref} className="bg-linear-to-t to-vayyar-blue text-white py-20 px-4 text-center min-h-screen flex flex-row content-center flex-wrap">
                <div className="flex flex-column content-center flex-1 p-[50px] self-center">
                    <h1 className="text-3xl md:text-5xl font-bold mb-6">
                        See what better care actually looks like — for your bottom
                        line.
                    </h1>
                    <p className="text-lg md:text-xl mb-8">
                        VayyarCare saves time, staff, and lives. Here's how.
                    </p>
                    <div className="flex flex-row justify-center gap-4">
                        <a href="#metrics" className="btn-primary flex content-center flex-wrap border-2 rounded p-3" onClick={(e) => {
                            e.preventDefault();
                            if (metricsRef.current) {
                                metricsRef.current.scrollIntoView({ behavior: 'smooth' });
                            }
                        }}>
                            See it in Action
                        </a>
                        <button className="bg-[#05aae9] text-white px-6 py-3 rounded-md text-lg hover:bg-vayyar-blue/90 transition">
                            Book a Demo
                        </button>
                    </div>
                </div>
                <img className="w-[50%] object-contain"
                    src="/images/executive/insights.png"
                />
            </section>

            {/* Wrapper for sections scrolling over Section 1 */}
            <div className="-mt-screen relative z-10">
                {/* Metrics */}
                <section
                    id="metrics"
                    className="bg-white py-16 px-4 text-center pt-20"
                    ref={metricsRef}
                >
                    <h2 className="text-3xl font-semibold text-gray-900">
                        The Numbers That Matter
                    </h2>
                    <div className="flex flex-nowrap overflow-x-auto justify-start gap-8 max-w-7xl w-full mx-auto mt-12 py-4">
                        {metrics.map(({ label, suffix }, index) => (
                            <Card
                                key={label}
                                icon={<span className="text-2xl text-[#06aeef]">★</span>}
                                title={`${animatedValues[index]}${suffix || '%'}`}
                                description={label}
                                ref={el => { cardRefs.current[index] = el; }}
                            />
                        ))}
                    </div>
                </section>

                {/* Problem Framing */}
                <section className="bg-gray-100 py-16 px-4 text-center">
                    <h2 className="text-2xl md:text-3xl font-bold mb-6">
                        Staff burnout and resident safety aren&apos;t tradeoffs.
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
                                Staff can&apos;t monitor every room at once — fall risks
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
                        It&apos;s not just better care. It&apos;s a better business.
                    </h2>
                    <div className="flex flex-col md:flex-row justify-center gap-4 mb-6">
                        <button className="btn-primary">Book a Demo</button>
                        <button className="btn-secondary">Contact Sales</button>
                    </div>
                    <p className="text-sm opacity-80">
                        HIPAA-compliant | 24/7 support | Deployed in 50+ facilities
                    </p>
                </section>
            </div>
        </main>
    );
}

// Tailwind-style button classes (for example)
// You can define these in global.css or tailwind.config.js
// .btn-primary { @apply bg-indigo-600 text-white px-6 py-3 rounded-md hover:bg-indigo-700 }
// .btn-secondary { @apply border border-white text-white px-6 py-3 rounded-md hover:bg-white hover:text-indigo-700 }
