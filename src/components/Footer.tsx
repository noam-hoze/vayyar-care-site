"use client";

import React from "react";
import Link from "next/link";
import VayyarLogo from "@/components/VayyarLogo";
import { homeSections } from "@/data/homeSections";
import { scrollToSection } from "@/lib/scrollUtils";

const Footer: React.FC = () => {
    const textSections = homeSections.filter((s) => s.type === "text");
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
                <div className="h-px w-full bg-white" />

                {/* Top row: brand + social + columns */}
                <div className="mt-10 grid grid-cols-1 md:grid-cols-4 gap-2 md:gap-10 items-start">
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
                            {/* X/Twitter */}
                            <a
                                aria-label="Twitter"
                                href="https://x.com/vayyarinc"
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
                                    <path d="M18.244 2.25h3.18l-6.95 7.94 8.17 11.56h-6.39l-4.99-6.53-5.71 6.53H1.29l7.41-8.48L.75 2.25h6.56l4.49 5.94 6.44-5.94zM16.97 19.77h1.76L6.11 4.06H4.24l12.73 15.71z" />
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

                    {/* Vayyar Care links */}
                    <div className="space-y-2">
                        {/* Divider above section */}
                        <div className="md:hidden h-px w-full bg-white mt-4"></div>
                        <div className="flex items-center justify-between">
                            <h4
                                className="text-base font-semibold"
                                style={{ fontFamily: "Magistral" }}
                            >
                                Vayyar Care
                            </h4>
                            <button
                                type="button"
                                aria-label={
                                    isCareOpen
                                        ? "Collapse Vayyar Care"
                                        : "Expand Vayyar Care"
                                }
                                aria-expanded={isCareOpen}
                                onClick={() => setIsCareOpen((v) => !v)}
                                className="w-8 h-8 rounded-full flex items-center justify-center bg-white"
                                style={{ color: "#01adef" }}
                            >
                                <span className="text-xl leading-none">
                                    {isCareOpen ? "−" : "+"}
                                </span>
                            </button>
                        </div>
                        <ul
                            className={`space-y-2 text-gray-100/90 ${
                                isCareOpen ? "block" : "hidden"
                            } md:block`}
                        >
                            {textSections.map((s) => (
                                <li key={s.id}>
                                    <button
                                        onClick={() =>
                                            scrollToSection(`section-${s.id}`)
                                        }
                                        className="hover:underline text-left"
                                    >
                                        {s.title}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Support */}
                    <div className="space-y-2">
                        {/* Divider above section */}
                        <div className="md:hidden h-px w-full bg-white"></div>
                        <div className="flex items-center justify-between">
                            <h4
                                className="text-base font-semibold"
                                style={{ fontFamily: "Magistral" }}
                            >
                                Support
                            </h4>
                            <button
                                type="button"
                                aria-label={
                                    isSupportOpen
                                        ? "Collapse Support"
                                        : "Expand Support"
                                }
                                aria-expanded={isSupportOpen}
                                onClick={() => setIsSupportOpen((v) => !v)}
                                className="w-8 h-8 rounded-full flex items-center justify-center bg-white"
                                style={{ color: "#01adef" }}
                            >
                                <span className="text-xl leading-none">
                                    {isSupportOpen ? "−" : "+"}
                                </span>
                            </button>
                        </div>
                        <ul
                            className={`space-y-2 text-gray-100/90 ${
                                isSupportOpen ? "block" : "hidden"
                            } md:block`}
                        >
                            <li>
                                <a
                                    href="https://vayyar.com/care/b2c/privacy-policy-old/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:underline"
                                >
                                    Privacy Policy
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://vayyar.com/care/b2c/eula/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:underline"
                                >
                                    Terms Of Use
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://vayyar.com/care/customer/tc/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:underline"
                                >
                                    Customer Terms and Conditions
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://vayyar.com/care/b2b/tc/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:underline"
                                >
                                    B2B Terms and Conditions
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://support.vayyarcare.com/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:underline"
                                >
                                    FAQ
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
                                    href="https://vayyar.com/care/cssignupform/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:underline"
                                >
                                    CS Sign Up
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Us */}
                    <div className="space-y-2">
                        {/* Divider above section */}
                        <div className="md:hidden h-px w-full bg-white"></div>
                        <div className="flex items-center justify-between">
                            <h4
                                className="text-base font-semibold"
                                style={{ fontFamily: "Magistral" }}
                            >
                                Contact Us
                            </h4>
                            <button
                                type="button"
                                aria-label={
                                    isContactOpen
                                        ? "Collapse Contact Us"
                                        : "Expand Contact Us"
                                }
                                aria-expanded={isContactOpen}
                                onClick={() => setIsContactOpen((v) => !v)}
                                className="w-8 h-8 rounded-full flex items-center justify-center bg-white"
                                style={{ color: "#01adef" }}
                            >
                                <span className="text-xl leading-none">
                                    {isContactOpen ? "−" : "+"}
                                </span>
                            </button>
                        </div>
                        <div
                            className={`text-gray-100/90 leading-relaxed ${
                                isContactOpen ? "block" : "hidden"
                            } md:block`}
                        >
                            Vayyar Imaging Ltd
                            <br />
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

                {/* Bottom bar */}
                <div className="mt-2">
                    <div className="h-px w-full bg-white" />
                    <div className="flex flex-col items-center justify-center gap-4 py-6 text-sm text-gray-100/80">
                        <div className="flex items-center gap-4">
                            <a
                                href="https://vayyar.com/cookie-notice/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:underline"
                            >
                                Cookies
                            </a>
                            <span>|</span>
                            <a
                                href="https://vayyar.com/care/b2c/privacy-policy-old/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:underline"
                            >
                                Privacy policy
                            </a>
                            <span>|</span>
                            <a
                                href="https://vayyar.com/evk/terms-and-conditions/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:underline"
                            >
                                Terms & conditions
                            </a>
                        </div>
                        <div className="flex items-center gap-2">
                            <span>©2024</span>
                            <VayyarLogo
                                className="h-5 w-auto opacity-90"
                                ariaLabel="Vayyar"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
