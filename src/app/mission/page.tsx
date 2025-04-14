import React from "react";

export default function MissionPage() {
    return (
        <div className="px-6 md:px-20 py-20 max-w-5xl mx-auto space-y-24 text-center">
            {/* Vision Statement */}
            <section className="space-y-4">
                <h1 className="text-4xl md:text-5xl font-bold text-purple-700">
                    Our Vision
                </h1>
                <p className="text-xl md:text-2xl text-gray-800 leading-relaxed">
                    At Vayyar, we envision a world where every senior lives with
                    dignity, safety, and independence.
                </p>
            </section>

            {/* Human-Centered Purpose */}
            <section className="space-y-4">
                <h2 className="text-2xl md:text-3xl font-semibold text-gray-700">
                    Care should never come at the cost of privacy
                </h2>
                <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                    We believe technology should empower, not intrude. Our
                    solutions work quietly in the background, offering peace of
                    mind without wearables, without cameras — and without
                    compromise.
                </p>
            </section>

            {/* What Makes Us Different */}
            <section className="space-y-4">
                <h2 className="text-2xl md:text-3xl font-semibold text-gray-700">
                    How we're different
                </h2>
                <ul className="list-disc text-left text-gray-600 text-lg md:text-xl max-w-3xl mx-auto pl-5 space-y-2">
                    <li>100% non-invasive technology</li>
                    <li>Real-time monitoring without video or microphones</li>
                    <li>
                        Actionable alerts for falls, presence, inactivity, and
                        more
                    </li>
                    <li>
                        No wearables. No batteries to charge. Nothing to
                        remember.
                    </li>
                </ul>
            </section>

            {/* Why It Matters Now */}
            <section className="space-y-4">
                <h2 className="text-2xl md:text-3xl font-semibold text-gray-700">
                    The future of care is invisible
                </h2>
                <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                    As the global population ages, the demand for smarter, more
                    dignified care is rising fast. We’re here to meet that need
                    — not with promises, but with proven technology that’s
                    already making a difference in homes and care facilities
                    worldwide.
                </p>
            </section>

            {/* Mission Statement */}
            <section className="bg-gray-100 rounded-2xl shadow-md p-10 max-w-3xl mx-auto space-y-4">
                <h3 className="text-xl md:text-2xl font-semibold text-purple-700">
                    Our Mission
                </h3>
                <p className="text-lg md:text-xl text-gray-700">
                    To build a future where technology fades into the
                    background, and better care takes the lead.
                </p>
            </section>

            {/* Soft Conversion CTA */}
            <section className="space-y-6">
                <p className="text-xl text-gray-700">
                    If our vision resonates with yours — let’s talk.
                </p>
                <button className="bg-purple-700 hover:bg-purple-800 text-white text-lg font-semibold py-3 px-6 rounded-xl transition duration-200 shadow-md">
                    Book a Demo
                </button>
            </section>
        </div>
    );
}
