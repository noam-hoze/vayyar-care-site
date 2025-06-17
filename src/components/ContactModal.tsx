import React, { useState, useEffect } from "react";
import { XMarkIcon } from "@heroicons/react/24/solid";

interface ContactModalProps {
    isOpen: boolean;
    onClose?: () => void;
    asPageElement?: boolean;
}

const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose, asPageElement = false }) => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
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
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
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
        <div className={asPageElement ? "w-full max-w-2xl bg-white p-8 rounded-lg mx-auto" : "w-full max-w-2xl bg-white p-8 rounded-lg"} style={{fontFamily: "Magistral"}}>
            <h1 className="text-5xl font-bold text-center text-black mb-12">
                Book a Demo
            </h1>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-700 mb-1"
                    >
                        Name
                    </label>
                    <input
                        type="text"
                        name="name"
                        id="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="Your Name"
                        className="block w-full px-4 py-3 bg-gray-100 border border-gray-200 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium text-gray-700 mb-1"
                        >
                            Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            placeholder="Your Email"
                            className="block w-full px-4 py-3 bg-gray-100 border border-gray-200 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="phone"
                            className="block text-sm font-medium text-gray-700 mb-1"
                        >
                            Phone Number (Optional)
                        </label>
                        <input
                            type="tel"
                            name="phone"
                            id="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="Your Phone Number"
                            className="block w-full px-4 py-3 bg-gray-100 border border-gray-200 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        />
                    </div>
                </div>
                <div>
                    <label
                        htmlFor="message"
                        className="block text-sm font-medium text-gray-700 mb-1"
                    >
                        Message
                    </label>
                    <textarea
                        name="message"
                        id="message"
                        rows={4}
                        value={formData.message}
                        onChange={handleChange}
                        required
                        placeholder="How can we help?"
                        className="block w-full px-4 py-3 bg-gray-100 border border-gray-200 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm resize-none"
                    ></textarea>
                </div>
                <div className="flex justify-end pt-4">
                    <button
                        type="submit"
                        className="inline-flex justify-center py-3 px-6 border border-transparent shadow-sm text-base font-medium rounded-full text-white hover:bg-opacity-80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition cursor-pointer"
                        style={{ backgroundColor: "#06aeef" }}
                    >
                        Send
                    </button>
                </div>
            </form>
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
                    className="absolute top-6 right-6 z-10 flex items-center justify-center w-10 h-10 bg-gray-100 rounded-full text-gray-600 hover:bg-gray-200 hover:text-gray-800 transition cursor-pointer"
                    onClick={onClose}
                    aria-label="Close contact form"
                >
                    <XMarkIcon className="h-6 w-6" />
                </button>
            )}
            {formContent}
        </div>
    );
};

export default ContactModal;
