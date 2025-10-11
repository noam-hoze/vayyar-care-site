import React, { useState, useEffect, useMemo } from "react";
import { countries, dialCodesSorted } from "../data/countries";

interface ContactModalProps {
    isOpen: boolean;
    onClose?: () => void;
    asPageElement?: boolean;
}

const ContactForm: React.FC<ContactModalProps> = ({
    isOpen,
    onClose,
    asPageElement = false,
}) => {
    function isoToFlag(iso2?: string): string {
        if (!iso2) return "";
        const base = 127397; // regional indicator symbol offset
        return iso2
            .toUpperCase()
            .replace(/[^A-Z]/g, "")
            .split("")
            .map((c) => String.fromCodePoint(base + c.charCodeAt(0)))
            .join("");
    }
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        companyName: "",
        jobTitle: "",
        country: "",
        phoneNumber: "",
        message: "",
        solutions: "Vayyar Care",
    });

    const [dialCode, setDialCode] = useState<string>("1");

    const [animationClass, setAnimationClass] = useState("");
    const [shouldRenderModal, setShouldRenderModal] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);
    const [successAnimClass, setSuccessAnimClass] = useState("");
    const errorRef = React.useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (isOpen) {
            setShouldRenderModal(true);
            setTimeout(() => setAnimationClass("animate-modal-fade-in"), 10);
        } else if (!isOpen && shouldRenderModal) {
            setAnimationClass("animate-modal-fade-out");
        }
    }, [isOpen, shouldRenderModal]);

    // Sync dial code when country changes
    useEffect(() => {
        const match = countries.find((c) => c.name === formData.country);
        if (match) setDialCode(match.dialCode);
    }, [formData.country]);

    // Animate success card in a subtle, smooth way
    useEffect(() => {
        if (success) {
            setSuccessAnimClass("opacity-0 scale-95 translate-y-1");
            const id = setTimeout(
                () => setSuccessAnimClass("opacity-100 scale-100 translate-y-0"),
                10
            );
            return () => clearTimeout(id);
        } else {
            setSuccessAnimClass("");
        }
    }, [success]);

    const selectedCountry = useMemo(() => {
        const byName = countries.find((c) => c.name === formData.country);
        if (byName) return byName;

        const representativeIsoByDialCode: Record<string, string> = {
            "1": "US", // NANP – prefer United States
            "44": "GB", // prefer United Kingdom
            "39": "IT", // Italy/Vatican – prefer Italy
            "7": "RU", // Russia/Kazakhstan – prefer Russia
        };

        const preferredIso = representativeIsoByDialCode[dialCode];
        if (preferredIso) {
            const pref = countries.find((c) => c.iso2 === preferredIso);
            if (pref) return pref;
        }

        return (
            countries.find((c) => c.dialCode === dialCode) ||
            countries.find((c) => c.iso2 === "US")
        );
    }, [formData.country, dialCode]);

    const flagEmoji = useMemo(() => isoToFlag(selectedCountry?.iso2) || "🌐", [selectedCountry]);

    const handleChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (submitting) return;
        setSubmitting(true);
        setError(null);
        setSuccess(false);

        try {
            const hp = (e.target as HTMLFormElement)["hp"]?.value as
                | string
                | undefined;
            const stripped = (formData.phoneNumber || "").replace(/\D/g, "");
            const formattedPhone = `+${dialCode}${stripped}`;

            const res = await fetch("/api/hubspot/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ...formData,
                    phoneNumber: formattedPhone,
                    solutions: "Vayyar Care",
                    pageUri:
                        typeof window !== "undefined"
                            ? window.location.href
                            : undefined,
                    pageName:
                        typeof document !== "undefined"
                            ? document.title
                            : undefined,
                    hp,
                }),
            });

            const data = await res.json();
            if (!res.ok || data?.error) {
                throw new Error(data?.error || "Submission failed");
            }
            setSuccess(true);
        } catch (err: any) {
            setError(String(err?.message || err));
            // Ensure the error banner is visible in the viewport
            setTimeout(() => {
                try {
                    const el = errorRef.current;
                    if (!el) return;
                    el.focus();
                    el.scrollIntoView({ behavior: "smooth", block: "start" });
                    if (typeof window !== "undefined") {
                        window.scrollBy({ top: -80, behavior: "smooth" });
                    }
                } catch {}
            }, 50);
        } finally {
            setSubmitting(false);
        }
    };

    const handleAnimationEnd = () => {
        if (animationClass === "animate-modal-fade-out") {
            setShouldRenderModal(false);
            setAnimationClass("");
        }
    };

    // For regular page element mode, always render regardless of modal state
    if (!shouldRenderModal && !asPageElement) {
        return null;
    }

    // Content of the form that's shared between modal and page element modes
    const formContent = (
        <div
            id="contact-section"
            className={success ? "relative z-10 flex flex-col items-center justify-center" : "relative z-10 mt-12 md:mt-20"}
            style={{ minHeight: "100vh" }}
        >
            {/* Mobile divider to separate from previous section */}
            <div className="md:hidden w-full max-w-4xl mx-auto h-px bg-gray-200 mb-6"></div>
            <div
                className={
                    asPageElement
                        ? "w-full max-w-4xl bg-white p-8 rounded-lg mx-auto"
                        : "w-full max-w-4xl bg-white p-8 rounded-lg"
                }
            >
                {!success && (
                    <>
                        <h2
                            className="text-4xl font-bold mb-2 text-vayyar-blue text-left"
                            style={{ fontFamily: "Magistral" }}
                        >
                            Let's show you how it works
                        </h2>
                        <p
                            className="text-lg mb-8 text-gray-500 text-left"
                            style={{ fontFamily: "Magistral" }}
                        >
                            Fill in your details below to get started with a live
                            demonstration, either online or in person.
                        </p>
                    </>
                )}
                {success ? (
                    <div className={`min-h-[520px] flex flex-col items-center justify-center text-center transform transition-all duration-500 ease-out ${successAnimClass}`} aria-live="polite">
                        <svg
                            width="64"
                            height="64"
                            viewBox="0 0 48 48"
                            xmlns="http://www.w3.org/2000/svg"
                            aria-hidden="true"
                            className="mx-auto mb-6 text-vayyar-blue"
                            style={{ display: "block" }}
                        >
                            <circle cx="24" cy="24" r="24" fill="currentColor" />
                            <path d="M34 18L22 30 16 24" stroke="#ffffff" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                        </svg>
                        <h3 className="text-3xl font-semibold mb-2 text-gray-900">Thank you</h3>
                        <p className="text-lg text-gray-900 font-medium opacity-100">We'll be in touch soon.</p>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Honeypot field to deter bots */}
                        <input
                            type="text"
                            name="hp"
                            tabIndex={-1}
                            autoComplete="off"
                            className="hidden"
                            aria-hidden="true"
                        />
                        {error && (
                            <div ref={errorRef} id="contact-form-error" tabIndex={-1} className="rounded-xl border border-red-200 bg-red-50 text-red-700 p-3 text-sm flex items-start gap-2" role="alert" aria-live="assertive">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" className="mt-0.5">
                                    <path d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                                <span>{error}</span>
                            </div>
                        )}
                    <div
                        className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6"
                        suppressHydrationWarning={true}
                    >
                        <div className="flex flex-col text-left">
                            <label
                                htmlFor="firstName"
                                className="mb-2 text-xs font-bold text-gray-600 uppercase tracking-wide"
                            >
                                FIRST NAME *
                            </label>
                            <input
                                type="text"
                                id="firstName"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleChange}
                                required
                                className="p-3 rounded-full border border-vayyar-blue bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-vayyar-blue"
                            />
                        </div>
                        <div className="flex flex-col text-left">
                            <label
                                htmlFor="lastName"
                                className="mb-2 text-xs font-bold text-gray-600 uppercase tracking-wide"
                            >
                                LAST NAME *
                            </label>
                            <input
                                type="text"
                                id="lastName"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleChange}
                                required
                                className="p-3 rounded-full border border-vayyar-blue bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-vayyar-blue"
                            />
                        </div>
                    </div>

                    <div className="flex flex-col text-left">
                        <label
                            htmlFor="email"
                            className="mb-2 text-xs font-bold text-gray-600 uppercase tracking-wide"
                        >
                            WORK EMAIL ADDRESS *
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="p-3 rounded-full border border-vayyar-blue bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-vayyar-blue"
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6">
                        <div className="flex flex-col text-left">
                            <label
                                htmlFor="companyName"
                                className="mb-2 text-xs font-bold text-gray-600 uppercase tracking-wide"
                            >
                                COMPANY NAME *
                            </label>
                            <input
                                type="text"
                                id="companyName"
                                name="companyName"
                                value={formData.companyName}
                                onChange={handleChange}
                                required
                                className="p-3 rounded-full border border-vayyar-blue bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-vayyar-blue"
                            />
                        </div>
                        <div className="flex flex-col text-left">
                            <label
                                htmlFor="jobTitle"
                                className="mb-2 text-xs font-bold text-gray-600 uppercase tracking-wide"
                            >
                                JOB TITLE *
                            </label>
                            <input
                                type="text"
                                id="jobTitle"
                                name="jobTitle"
                                value={formData.jobTitle}
                                onChange={handleChange}
                                required
                                className="p-3 rounded-full border border-vayyar-blue bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-vayyar-blue"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6">
                        <div className="flex flex-col text-left">
                            <label
                                htmlFor="country"
                                className="mb-2 text-xs font-bold text-gray-600 uppercase tracking-wide"
                            >
                                COUNTRY *
                            </label>
                            <input
                                list="countryOptions"
                                id="country"
                                name="country"
                                value={formData.country}
                                onChange={handleChange}
                                required
                                className="p-3 rounded-full border border-vayyar-blue bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-vayyar-blue"
                                placeholder="Search country"
                                autoComplete="off"
                            />
                            <datalist id="countryOptions">
                                {countries.map((c) => (
                                    <option key={c.iso2} value={c.name} />
                                ))}
                            </datalist>
                        </div>
                        <div className="flex flex-col text-left">
                            <label
                                htmlFor="phoneNumber"
                                className="mb-2 text-xs font-bold text-gray-600 uppercase tracking-wide"
                            >
                                PHONE NUMBER *
                            </label>
                            <div className="flex">
                                <span
                                    aria-hidden="true"
                                    className="px-3 flex items-center border-t border-b border-l border-vayyar-blue bg-gray-50 rounded-l-full"
                                >
                                    {flagEmoji}
                                </span>
                                <select
                                    value={dialCode}
                                    onChange={(e) => setDialCode(e.target.value)}
                                    className="p-3 border-t border-b border-vayyar-blue bg-gray-50 text-gray-900 focus:outline-none appearance-none"
                                >
                                    {dialCodesSorted.map((code) => (
                                        <option key={code} value={code}>{`+${code}`}</option>
                                    ))}
                                </select>
                                <input
                                    type="tel"
                                    id="phoneNumber"
                                    name="phoneNumber"
                                    value={formData.phoneNumber}
                                    onChange={handleChange}
                                    required
                                    className="p-3 rounded-r-full border-t border-b border-r border-vayyar-blue bg-white text-gray-900 placeholder-gray-400 w-full focus:outline-none"
                                />
                            </div>
                        </div>
                    </div>

                        {/* Hidden solutions field (always Vayyar Care) */}
                        <input type="hidden" name="solutions" value="Vayyar Care" />

                    <div className="flex flex-col text-left">
                        <label
                            htmlFor="message"
                            className="mb-2 text-xs font-bold text-gray-600 uppercase tracking-wide"
                        >
                            DO YOU WANT TO LEAVE US A MESSAGE? (OPTIONAL)
                        </label>
                        <textarea
                            id="message"
                            name="message"
                            rows={3}
                            value={formData.message}
                            onChange={handleChange}
                            className="p-3 rounded-3xl border border-vayyar-blue bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-vayyar-blue"
                        ></textarea>
                    </div>

                        <div className="pt-4 flex justify-end">
                            <button
                                type="submit"
                                disabled={submitting}
                                className="w-auto bg-vayyar-blue text-white px-12 py-3 text-lg rounded-full font-semibold hover:bg-blue-600 transition disabled:opacity-60"
                            >
                                {submitting ? "SENDING..." : "SUBMIT"}
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );

    // If rendering as a page element, just return the form content
    if (asPageElement) {
        return (
            <div className="w-full max-w-4xl mx-auto px-4 flex items-center justify-center bg-white">
                {formContent}
            </div>
        );
    }

    // Otherwise, render as a modal with overlay and close button
    return (
        <div
            className={`fixed inset-0 bg-white z-[100] flex items-center justify-center p-4 overflow-y-auto ${animationClass}`}
            onWheel={(e) => e.stopPropagation()}
            onAnimationEnd={handleAnimationEnd}
        >
            {onClose && (
                <button
                    className="absolute top-6 right-8 text-gray-400 hover:text-gray-600 transition"
                    onClick={onClose}
                    aria-label="Close contact form"
                >
                    <span className="text-3xl font-light">×</span>
                </button>
            )}
            {formContent}
        </div>
    );
};

export default ContactForm;
