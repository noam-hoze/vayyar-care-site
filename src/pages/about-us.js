import React from "react";

export default function AboutUsPage() {
    return (
        <div className="px-6 md:px-20 py-20 max-w-5xl mx-auto space-y-24 text-center">
            {/* 1. Hero Section */}
            <section className="space-y-4">
                <h1 className="text-4xl md:text-5xl font-bold text-purple-700">
                    Who We Are
                </h1>
                <p className="text-xl md:text-2xl text-gray-800 leading-relaxed">
                    At VayyarCare, we’re more than a technology company — we’re
                    a care partner. Our mission is to protect the dignity and
                    independence of every senior, while giving caregivers the
                    confidence and clarity they deserve.
                </p>
            </section>

            {/* 2. Our Story */}
            <section className="space-y-4">
                <h2 className="text-2xl md:text-3xl font-semibold text-gray-700">
                    Born from a Deep Understanding of Care
                </h2>
                <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                    Vayyar started with a bold question: how can we use advanced
                    sensing to bring real peace of mind to senior care? Backed
                    by over a decade of R&D, our non-intrusive technology was
                    developed with caregivers, for caregivers — combining
                    safety, privacy, and simplicity in one seamless solution.
                </p>
            </section>

            {/* 3. What Makes Us Different */}
            <section className="space-y-4">
                <h2 className="text-2xl md:text-3xl font-semibold text-gray-700">
                    Why People Trust Us
                </h2>
                <ul className="text-left text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed list-disc list-inside space-y-2">
                    <li>
                        <strong>Proven Technology:</strong> Trusted by leading
                        healthcare organizations worldwide.
                    </li>
                    <li>
                        <strong>Privacy First:</strong> No cameras. No
                        wearables. 24/7 coverage with total dignity.
                    </li>
                    <li>
                        <strong>Real Impact:</strong> Detects falls, monitors
                        mobility, and empowers staff — all in real time.
                    </li>
                    <li>
                        <strong>Scalable & Seamless:</strong> Easy to deploy,
                        easier to use. Integrates effortlessly into your
                        existing systems.
                    </li>
                </ul>
            </section>

            {/* 4. Meet Our Team */}
            <section className="space-y-4">
                <h2 className="text-2xl md:text-3xl font-semibold text-gray-700">
                    Meet the People Behind the Mission
                </h2>
                <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                    Our team brings together experts in healthcare, AI, and
                    design — but more importantly, we’re human beings driven by
                    compassion. We believe care is sacred, and technology should
                    serve it humbly.
                </p>
                {/* Optional: Add profile cards later */}
            </section>

            {/* 5. Trusted By */}
            <section className="space-y-4">
                <h2 className="text-2xl md:text-3xl font-semibold text-gray-700">
                    Trusted by Industry Leaders
                </h2>
                {/* Placeholder for logo strip */}
                <div className="flex flex-wrap justify-center gap-8">
                    {/* Example logos */}
                    <img
                        src="/logos/partner1.svg"
                        alt="Partner 1"
                        className="h-12"
                    />
                    <img
                        src="/logos/partner2.svg"
                        alt="Partner 2"
                        className="h-12"
                    />
                    <img
                        src="/logos/partner3.svg"
                        alt="Partner 3"
                        className="h-12"
                    />
                </div>
            </section>

            {/* 6. Call to Action */}
            <section className="space-y-4">
                <h2 className="text-2xl md:text-3xl font-semibold text-purple-700">
                    We’re here to help you care better.
                </h2>
                <p className="text-lg text-gray-600">
                    Whether you're a nurse, administrator, or family member —
                    let's talk.
                </p>
                <div className="flex justify-center gap-4 flex-wrap">
                    <a
                        href="/demo"
                        className="bg-purple-700 text-white px-6 py-3 rounded-xl text-lg hover:bg-purple-800 transition"
                    >
                        Book a Demo
                    </a>
                    <a
                        href="/contact"
                        className="border border-purple-700 text-purple-700 px-6 py-3 rounded-xl text-lg hover:bg-purple-50 transition"
                    >
                        Contact Us
                    </a>
                </div>
            </section>
        </div>
    );
}
