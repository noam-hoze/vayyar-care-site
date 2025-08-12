import React, { useState, useEffect } from "react";

interface ContactModalProps {
    isOpen: boolean;
    onClose?: () => void;
    asPageElement?: boolean;
}

const ContactModal: React.FC<ContactModalProps> = ({
    isOpen,
    onClose,
    asPageElement = false,
}) => {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        companyName: "",
        jobTitle: "",
        country: "",
        phoneNumber: "",
        message: "",
    });

    const [animationClass, setAnimationClass] = useState("");
    const [shouldRenderModal, setShouldRenderModal] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setShouldRenderModal(true);
            setTimeout(() => setAnimationClass("animate-modal-fade-in"), 10);
        } else if (!isOpen && shouldRenderModal) {
            setAnimationClass("animate-modal-fade-out");
        }
    }, [isOpen, shouldRenderModal]);

    const handleChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("Form Data Submitted:", formData);
        alert("Form submitted (check console). Implement API call.");
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
            className="relative z-10"
            style={{ height: "100vh" }}
        >
            <div
                className={
                    asPageElement
                        ? "w-full max-w-4xl bg-white p-8 rounded-lg mx-auto"
                        : "w-full max-w-4xl bg-white p-8 rounded-lg"
                }
            >
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
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6">
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
                            <select
                                id="country"
                                name="country"
                                value={formData.country}
                                onChange={handleChange}
                                required
                                className="p-3 rounded-full border border-vayyar-blue bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-vayyar-blue appearance-none"
                            >
                                <option value="">Choose country</option>
                                <option value="US">United States</option>
                                <option value="CA">Canada</option>
                                <option value="GB">United Kingdom</option>
                                {/* Add more countries as needed */}
                            </select>
                        </div>
                        <div className="flex flex-col text-left">
                            <label
                                htmlFor="phoneNumber"
                                className="mb-2 text-xs font-bold text-gray-600 uppercase tracking-wide"
                            >
                                PHONE NUMBER *
                            </label>
                            <div className="flex">
                                <select className="p-3 rounded-l-full border-t border-b border-l border-vayyar-blue bg-gray-50 text-gray-900 focus:outline-none appearance-none">
                                    <option>🇺🇸 +1</option>
                                    <option>🇬🇧 +44</option>
                                    <option>🇨🇦 +1</option>
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
                            className="w-auto bg-vayyar-blue text-white px-12 py-3 text-lg rounded-full font-semibold hover:bg-blue-600 transition"
                        >
                            SUBMIT
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );

    // If rendering as a page element, just return the form content
    if (asPageElement) {
        return (
            <div className="w-full h-full flex items-center justify-center bg-white">
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

export default ContactModal;
