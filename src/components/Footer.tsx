"use client";

import React from "react";
import Link from "next/link";
import VayyarLogo from "@/components/VayyarLogo";
import { homeSections } from "@/data/homeSections";
import { scrollToSection } from "@/lib/scrollUtils";

const Footer: React.FC = () => {
    const navSections = homeSections
        .filter((section) => section.type === "text")
        .map((section) => {
            let targetId = section.id;
            if (section.title === "Staff Optimization") targetId = 1.6;
            else if (section.title === "Real-time Alerts") targetId = 2;
            else if (section.title === "Privacy") targetId = 3.2;
            else if (section.title === "AI insights") targetId = 4;
            else if (section.title === "Personalized Care") targetId = 6;
            else if (section.title === "Improve NOI") targetId = 8;
            return { ...section, targetId };
        });

    const [isCareOpen, setIsCareOpen] = React.useState(false);
    const [isSupportOpen, setIsSupportOpen] = React.useState(false);
    const [isContactOpen, setIsContactOpen] = React.useState(false);

    return (
        <footer
            className="w-full text-white mt-16 relative z-20"
            style={{ backgroundColor: "#00455e" }}
        >
            <div className="max-w-7xl mx-auto px-6 sm:px-8 pt-12 pb-12">
                {/* Divider */}
                <div className="hidden md:block h-px w-full bg-white" />

                {/* Top row: brand + social + columns */}
                <div className="mt-10 md:flex md:justify-between">
                    {/* Brand + Social */}
                    <div className="space-y-6">
                        <VayyarLogo
                            className="h-8 w-auto"
                            ariaLabel="Vayyar Care"
                        />
                        <div className="flex items-center gap-4">
                            {/* LinkedIn */}
                            <a
                                aria-label="LinkedIn"
                                href="https://www.linkedin.com/company/vayyar/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 rounded-full flex items-center justify-center"
                                style={{ backgroundColor: "#0aa7dc" }}
                            >
                                <svg
                                    x="0px"
                                    y="0px"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                    className="w-5 h-5 text-white"
                                >
                                    <path d="M20.45 20.45h-3.55v-5.6c0-1.34-.02-3.07-1.87-3.07-1.88 0-2.17 1.47-2.17 2.97v5.7H9.31v-11.5h3.41v1.57h.05c.47-.9 1.62-1.85 3.33-1.85 3.56 0 4.21 2.34 4.21 5.38v6.4zM5.34 7.38c-1.14 0-2.06-.93-2.06-2.06 0-1.14.93-2.06 2.06-2.06 1.14 0 2.06.93 2.06 2.06 0 1.14-.92 2.06-2.06 2.06zM7.12 20.45H3.55v-11.5h3.57v11.5z" />
                                </svg>
                            </a>
                            {/* Facebook */}
                            <a
                                aria-label="Facebook"
                                href="https://www.facebook.com/VayyarLTD/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 rounded-full flex items-center justify-center"
                                style={{ backgroundColor: "#0aa7dc" }}
                            >
                                <svg
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                    className="w-5 h-5 text-white"
                                >
                                    <path d="M22 12.07C22 6.48 17.52 2 11.93 2S1.86 6.48 1.86 12.07c0 5.03 3.69 9.2 8.5 9.93v-7.02H7.9v-2.9h2.46V9.41c0-2.43 1.45-3.77 3.66-3.77 1.06 0 2.17.19 2.17.19v2.38h-1.22c-1.2 0-1.57.75-1.57 1.52v1.83h2.67l-.43 2.9h-2.24V22c4.81-.73 8.5-4.9 8.5-9.93z" />
                                </svg>
                            </a>
                            {/* YouTube */}
                            <a
                                aria-label="YouTube"
                                href="https://www.youtube.com/channel/UC1-pUD8UkDWCjkgLD-WoheQ"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 rounded-full flex items-center justify-center"
                                style={{ backgroundColor: "#0aa7dc" }}
                            >
                                <svg
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                    className="w-5 h-5 text-white"
                                >
                                    <path d="M23.5 6.2c-.2-1.2-1.2-2.2-2.4-2.4C19.4 3.5 12 3.5 12 3.5s-7.4 0-9.1.3C1.7 4 0.7 5 0.5 6.2 0.2 7.9 0.2 12 0.2 12s0 4.1.3 5.8c.2 1.2 1.2 2.2 2.4 2.4 1.7.3 9.1.3 9.1.3s7.4 0 9.1-.3c1.2-.2 2.2-1.2 2.4-2.4.3-1.7.3-5.8.3-5.8s0-4.1-.3-5.8zM9.7 15.5V8.5l6.3 3.5-6.3 3.5z" />
                                </svg>
                            </a>
                        </div>
                    </div>

                    <div className="md:flex md:gap-x-28">
                        {/* Vayyar Care links */}
                        <div className="space-y-2 mt-8 md:mt-0">
                            {/* Divider above section */}
                            <div className="md:hidden h-px w-full bg-white mt-4"></div>
                            <button
                                type="button"
                                aria-expanded={isCareOpen}
                                onClick={() => setIsCareOpen((v) => !v)}
                                className="w-full flex items-center justify-between text-left md:pointer-events-none"
                            >
                                <h4
                                    className="text-base font-semibold"
                                    style={{ fontFamily: "Magistral" }}
                                >
                                    Vayyar Care
                                </h4>
                                <div
                                    className="w-8 h-8 rounded-full flex items-center justify-center bg-white md:hidden transition-transform duration-300"
                                    style={{
                                        color: "#01adef",
                                        transform: isCareOpen
                                            ? "rotate(180deg)"
                                            : "rotate(0deg)",
                                    }}
                                >
                                    <span className="text-xl leading-none">
                                        {isCareOpen ? "−" : "+"}
                                    </span>
                                </div>
                            </button>
                            <ul
                                className={`overflow-hidden md:overflow-visible transition-max-height duration-500 ease-in-out md:max-h-none ${
                                    isCareOpen ? "max-h-96" : "max-h-0"
                                }`}
                            >
                                <div className="space-y-2 text-gray-100/90 pt-2 md:pt-0">
                                    {navSections.map((s) => (
                                        <li key={s.id}>
                                            <button
                                                onClick={() =>
                                                    scrollToSection(
                                                        `section-${s.targetId}`
                                                    )
                                                }
                                                className="hover:underline text-left"
                                            >
                                                {s.title}
                                            </button>
                                        </li>
                                    ))}
                                </div>
                            </ul>
                        </div>

                        {/* Support */}
                        <div className="space-y-2 mt-4 md:mt-0">
                            {/* Divider above section */}
                            <div className="md:hidden h-px w-full bg-white"></div>
                            <button
                                type="button"
                                aria-expanded={isSupportOpen}
                                onClick={() => setIsSupportOpen((v) => !v)}
                                className="w-full flex items-center justify-between text-left md:pointer-events-none"
                            >
                                <h4
                                    className="text-base font-semibold"
                                    style={{ fontFamily: "Magistral" }}
                                >
                                    Support
                                </h4>
                                <div
                                    className="w-8 h-8 rounded-full flex items-center justify-center bg-white md:hidden transition-transform duration-300"
                                    style={{
                                        color: "#01adef",
                                        transform: isSupportOpen
                                            ? "rotate(180deg)"
                                            : "rotate(0deg)",
                                    }}
                                >
                                    <span className="text-xl leading-none">
                                        {isSupportOpen ? "−" : "+"}
                                    </span>
                                </div>
                            </button>
                            <ul
                                className={`overflow-hidden md:overflow-visible transition-max-height duration-500 ease-in-out md:max-h-none ${
                                    isSupportOpen ? "max-h-96" : "max-h-0"
                                }`}
                            >
                                <div className="space-y-2 text-gray-100/90 pt-2 md:pt-0">
                                    <li>
                                        <a
                                            href="https://vayyar.com/care-docs/b2c/privacy-policy/"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="hover:underline"
                                        >
                                            Privacy Policy
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="https://vayyar.com/care-docs/b2c/eula/"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="hover:underline"
                                        >
                                            Terms of use
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="https://vayyar.com/cookie-notice/"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="hover:underline"
                                        >
                                            Cookie Notice
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="https://vayyar.com/care-docs/cssignupform/"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="hover:underline"
                                        >
                                            CS Sign Up
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="https://vayyar.com/care-docs/customer/tc/"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="hover:underline"
                                        >
                                            Customer T&C
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="https://vayyar.com/care-docs/b2b/tc/"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="hover:underline"
                                        >
                                            Business T&C
                                        </a>
                                    </li>
                                </div>
                            </ul>
                        </div>

                        {/* Contact Us */}
                        <div className="space-y-2 mt-4 md:mt-0">
                            {/* Divider above section */}
                            <div className="md:hidden h-px w-full bg-white"></div>
                            <button
                                type="button"
                                aria-expanded={isContactOpen}
                                onClick={() => setIsContactOpen((v) => !v)}
                                className="w-full flex items-center justify-between text-left md:pointer-events-none"
                            >
                                <h4
                                    className="text-base font-semibold"
                                    style={{ fontFamily: "Magistral" }}
                                >
                                    Contact Us
                                </h4>
                                <div
                                    className="w-8 h-8 rounded-full flex items-center justify-center bg-white md:hidden transition-transform duration-300"
                                    style={{
                                        color: "#01adef",
                                        transform: isContactOpen
                                            ? "rotate(180deg)"
                                            : "rotate(0deg)",
                                    }}
                                >
                                    <span className="text-xl leading-none">
                                        {isContactOpen ? "−" : "+"}
                                    </span>
                                </div>
                            </button>
                            <div
                                className={`overflow-hidden transition-max-height duration-500 ease-in-out md:max-h-none ${
                                    isContactOpen ? "max-h-96" : "max-h-0"
                                } md:block`}
                            >
                                <div className="text-gray-100/90 leading-relaxed pt-2 md:pt-0">
                                    Hahoresh 4,
                                    <br />
                                    Yehud
                                    <br />
                                    5647003
                                    <br />
                                    Israel
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom bar */}
                <div className="mt-12">
                    <div className="h-px w-full bg-white" />
                    <div className="mt-8 flex items-center justify-center gap-2 border-t border-gray-700 pt-8 text-sm text-gray-400">
                        <span>©2024</span>
                        <VayyarLogo
                            className="h-5 w-auto opacity-90"
                            ariaLabel="Vayyar"
                        />
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
