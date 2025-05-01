"use client";

import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
    SparklesIcon,
    ClipboardDocumentListIcon,
    ChartBarIcon,
    HeartIcon,
} from "@heroicons/react/24/solid";
import LogoCarousel from "@/components/LogoCarousel";
import Card from "@/components/Card";
import HowItWorksCard from "@/components/HowItWorksCard";
import VideoItem from "@/components/VideoItem";
import VideoModal from "@/components/VideoModal";
import BookDemoForm from "@/components/BookDemoForm";

gsap.registerPlugin(ScrollTrigger);

export default function Clinical() {
    const [activeVideo, setActiveVideo] = useState<string | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const section1Ref = useRef<HTMLElement>(null);
    const section3Ref = useRef<HTMLElement>(null);

    // Add state for individual card progresses
    const [progress1, setProgress1] = useState(0);
    const [progress2, setProgress2] = useState(0);
    const [progress3, setProgress3] = useState(0);

    useEffect(() => {
        if (
            !containerRef.current ||
            !section1Ref.current ||
            !section3Ref.current
        ) {
            return;
        }

        const ctx = gsap.context(() => {
            setupHeroPin(section1Ref.current!, containerRef.current!);
            // Pass setters to animation function
            setupHowItWorksAnimation(
                section3Ref.current!,
                setProgress1,
                setProgress2,
                setProgress3
            );
        }, containerRef);

        return () => ctx.revert();
        // Add setters to dependency array
    }, [setProgress1, setProgress2, setProgress3]);

    return (
        <div ref={containerRef}>
            {/* Section 1 (Pinned) - Hero */}
            <section
                ref={section1Ref}
                style={{backgroundImage: `url(${process.env.NEXT_PUBLIC_BASE_PATH}/images/clinical/clinical-hero.jpg)`}}
                className={`h-screen relative flex flex-col justify-center items-center px-6 text-center bg-cover bg-center z-0`}
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
                {/* Section 2 - Benefits */}
                <section className="min-h-screen flex flex-col justify-start items-center px-6 pt-20 pb-24 bg-white text-center">
                    <h2 className="text-3xl font-semibold text-gray-900">
                        Smarter Care, Less Stress
                    </h2>
                    <div className="flex flex-nowrap overflow-x-auto justify-start gap-8 max-w-7xl w-full mx-auto mt-12 py-4">
                        <Card
                            icon={<SparklesIcon className="w-7 h-7" />}
                            title="AI-Powered Assistant"
                            description="Ask anything — from 'Did Room 304 get up today?' to 'How many falls this week?' — and get answers, fast."
                        />
                        <Card
                            icon={
                                <ClipboardDocumentListIcon className="w-7 h-7" />
                            }
                            title="Automated Documentation"
                            description="Fall events and key moments are logged for you, instantly — no more manual notes."
                        />
                        <Card
                            icon={<ChartBarIcon className="w-7 h-7" />}
                            title="Real-Time Insights"
                            description="See the full picture at a glance. Know what's happening across your floor — no digging."
                        />
                        <Card
                            icon={<HeartIcon className="w-7 h-7" />}
                            title="Less Burnout"
                            description="Spend more time with people — not chasing tasks that are already taken care of."
                        />
                    </div>
                    <LogoCarousel />
                </section>

                {/* Section 3 - Testimonials */}
                <section className="min-h-screen flex flex-col justify-center items-center px-6 py-20 bg-[#2daae2] text-center">
                    <h3 className="text-2xl font-semibold mb-8 text-gray-800">
                        Hear From Our Partners
                    </h3>
                    <div className="flex justify-center gap-4 overflow-x-auto max-w-6xl mx-auto pb-4">
                        <VideoItem
                            thumbnailName="anthropos_testimonial.png"
                            altText="Anthropos Testimonial"
                            videoFileName="anthropos_testimonial.mp4"
                            onPlay={setActiveVideo}
                        />
                        <VideoItem
                            thumbnailName="essex_county_council_testimonial.png"
                            altText="Essex County Council Testimonial"
                            videoFileName="essex_county_council_testimonial.mp4"
                            onPlay={setActiveVideo}
                        />
                        <VideoItem
                            thumbnailName="heritage_senior_living_executives_testimonial.png"
                            altText="Heritage Senior Living Testimonial"
                            videoFileName="heritage_senior_living_executives_testimonial.mp4"
                            onPlay={setActiveVideo}
                        />
                    </div>

                    {activeVideo && (
                        <VideoModal
                            src={activeVideo}
                            onClose={() => setActiveVideo(null)}
                        />
                    )}
                </section>
            </div>

            {/* Section 3 (Pinned) - How It Works */}
            <section
                ref={section3Ref}
                className="min-h-screen flex flex-col justify-center px-6 py-20 bg-gray-50 text-center z-0"
            >
                <h2 className="text-3xl font-semibold mb-10 text-gray-900">
                    How It Works
                </h2>
                <div className="grid grid-cols-3 gap-8 max-w-7xl mx-auto flex-grow w-full items-center">
                    <HowItWorksCard scrollProgress={progress1} />
                    <HowItWorksCard scrollProgress={progress2} />
                    <HowItWorksCard scrollProgress={progress3} />
                </div>
            </section>

            {/* Section 4 - Final CTA Content */}
            <div className="-mt-screen relative z-10">
                <section className="min-h-screen flex flex-col justify-center items-center px-6 bg-[#2daae2] text-white text-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-[url('/assets/cta-pattern.svg')] bg-cover opacity-10 z-0" />
                    <BookDemoForm />
                </section>
            </div>
        </div>
    );
}

const setupHowItWorksAnimation = (
    sectionRef: HTMLElement,
    setProgress1: React.Dispatch<React.SetStateAction<number>>,
    setProgress2: React.Dispatch<React.SetStateAction<number>>,
    setProgress3: React.Dispatch<React.SetStateAction<number>>
) => {
    const cards = gsap.utils.toArray<HTMLElement>(
        sectionRef.querySelectorAll(".grid > div")
    );

    if (cards.length < 3) return;

    gsap.set(cards, { opacity: 0, x: 100 });

    // Define approximate segments based on timeline (adjust if needed)
    const segmentEnd1 = 0.35; // End of card 1 animation
    const segmentStart2 = segmentEnd1; // Start card 2 immediately after card 1 ends
    const segmentEnd2 = 0.7; // End of card 2 animation (Adjust total duration if needed)
    const segmentStart3 = segmentEnd2; // Start card 3 immediately after card 2 ends
    const segmentEnd3 = 1.0; // End of card 3 animation

    const cardTimeline = gsap.timeline({
        scrollTrigger: {
            trigger: sectionRef,
            pin: true,
            scrub: 1,
            start: "top top",
            end: "+=320%", // Corresponds to total animation duration
            markers: false,
            onUpdate: (self) => {
                const overallProgress = self.progress; // 0 to 1

                // Calculate normalized progress (0-100) for each segment
                let p1 = 0;
                let p2 = 0;
                let p3 = 0;

                if (overallProgress <= segmentEnd1) {
                    // Normalize progress for card 1
                    p1 = Math.min(100, (overallProgress / segmentEnd1) * 100);
                } else {
                    p1 = 100; // Freeze card 1 at end
                }

                if (
                    overallProgress >= segmentStart2 &&
                    overallProgress <= segmentEnd2
                ) {
                    // Normalize progress for card 2
                    p2 = Math.min(
                        100,
                        ((overallProgress - segmentStart2) /
                            (segmentEnd2 - segmentStart2)) *
                            100
                    );
                } else if (overallProgress > segmentEnd2) {
                    p2 = 100; // Freeze card 2 at end
                } else {
                    p2 = 0; // Keep card 2 at start
                }

                if (
                    overallProgress >= segmentStart3 &&
                    overallProgress <= segmentEnd3
                ) {
                    // Normalize progress for card 3
                    p3 = Math.min(
                        100,
                        ((overallProgress - segmentStart3) /
                            (segmentEnd3 - segmentStart3)) *
                            100
                    );
                } else if (overallProgress > segmentEnd3) {
                    p3 = 100; // Freeze card 3 at end
                } else {
                    p3 = 0; // Keep card 3 at start
                }

                // Update state - ensure updates happen
                setProgress1(p1);
                setProgress2(p2);
                setProgress3(p3);
            },
        },
    });

    // Add card fade-in tweens (these just control card visibility)
    cardTimeline
        .to(cards[0], { opacity: 1, x: 0, duration: 1 }, 0)
        .to(cards[1], { opacity: 1, x: 0, duration: 1 }, 1.2)
        .to(cards[2], { opacity: 1, x: 0, duration: 1 }, 2.4);
};

const setupHeroPin = (sectionRef: HTMLElement, container: HTMLDivElement) => {
    ScrollTrigger.create({
        trigger: container,
        start: "top top",
        end: "bottom top",
        pin: sectionRef,
        pinSpacing: false,
    });
};
