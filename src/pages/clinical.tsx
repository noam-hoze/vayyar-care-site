// ClinicalPage.jsx

import React from "react";

export default function ClinicalPage() {
    return (
        <main className="bg-white text-gray-900">
            {/* Hero Section */}
            <section className="py-20 px-6 text-center bg-purple-50">
                <h1 className="text-4xl font-bold mb-4">
                    Finally — a system built for the realities of your shift.
                </h1>
                <p className="text-lg mb-6">
                    VayyarCare helps you protect residents without extra stress,
                    false alarms, or invasiveness.
                </p>
                <div className="flex justify-center gap-4 flex-wrap">
                    <button className="bg-purple-700 text-white px-6 py-3 rounded-md text-lg hover:bg-purple-800 transition">
                        Book a Demo
                    </button>
                    <button className="border border-purple-700 text-purple-700 px-6 py-3 rounded-md text-lg hover:bg-purple-50 transition">
                        See it in Action
                    </button>
                </div>
            </section>

            {/* Benefits Section */}
            <section className="py-16 px-6 bg-white text-center">
                <h2 className="text-3xl font-semibold mb-10">
                    Why Nurses Love VayyarCare
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
                            No Cameras, No Wearables
                        </h3>
                        <p>Maintain dignity and privacy for every resident.</p>
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
            </section>

            {/* Testimonials Section */}
            <section className="py-16 px-6 bg-gray-50 text-center">
                <h2 className="text-3xl font-semibold mb-10">
                    What Other Nurses Are Saying
                </h2>
                <div className="max-w-4xl mx-auto space-y-8">
                    <blockquote className="italic border-l-4 border-purple-700 pl-4 text-left">
                        "I feel like I’m finally in control again. The alerts
                        are real, not noise." – Sarah, RN at Evergreen Home
                    </blockquote>
                    <blockquote className="italic border-l-4 border-purple-700 pl-4 text-left">
                        "Residents feel safer. I feel less overwhelmed. It’s a
                        win-win." – Miguel, Night Nurse
                    </blockquote>
                </div>
            </section>

            {/* How It Works */}
            <section className="py-16 px-6 text-center bg-white">
                <h2 className="text-3xl font-semibold mb-10">How It Works</h2>
                <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    <div>
                        <h3 className="text-xl font-bold mb-2">
                            1. Radar Sensors Monitor Rooms
                        </h3>
                        <p>Fully passive, no need for wearables or cameras.</p>
                    </div>
                    <div>
                        <h3 className="text-xl font-bold mb-2">
                            2. Fall or Risk Detected
                        </h3>
                        <p>
                            Immediate alerts go to staff devices in real time.
                        </p>
                    </div>
                    <div>
                        <h3 className="text-xl font-bold mb-2">
                            3. You Respond Smarter
                        </h3>
                        <p>
                            Prioritize tasks and prevent emergencies before they
                            happen.
                        </p>
                    </div>
                </div>
            </section>

            {/* Final CTA */}
            <section className="py-20 px-6 bg-purple-700 text-white text-center">
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
