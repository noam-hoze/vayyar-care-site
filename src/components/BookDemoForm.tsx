import React from "react";

// Define props for the component - make them optional
interface BookDemoFormProps {
    heading?: string;
    subheading?: string;
}

// Provide default values for the optional props
const BookDemoForm: React.FC<BookDemoFormProps> = ({
    heading = "Let's Bring VayyarCare to Your Facility", // Default heading
    subheading = "See how our non-invasive, intelligent monitoring system can transform your team's care delivery.", // Default subheading
}) => {
    // Add form submission logic here later if needed (e.g., useState, handleSubmit)
    return (
        // Wrap content for structure
        <div className="relative z-10 max-w-3xl">
            {/* Heading uses prop or default */}
            <h2 className="text-4xl font-bold mb-6">{heading}</h2>
            {/* Subheading uses prop or default */}
            <p className="text-lg mb-10">{subheading}</p>
            {/* Existing Form */}
            <form className="space-y-6">
                <div className="flex flex-col text-left">
                    <label
                        htmlFor="name"
                        className="mb-1 text-white font-semibold"
                    >
                        Name
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        className="p-3 rounded-md border border-white/30 bg-white text-[#2daae2] placeholder-gray-400"
                        placeholder="Your full name"
                    />
                </div>
                <div className="flex flex-col text-left">
                    <label
                        htmlFor="email"
                        className="mb-1 text-white font-semibold"
                    >
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        className="p-3 rounded-md border border-white/30 bg-white text-[#2daae2] placeholder-gray-400"
                        placeholder="you@company.com"
                    />
                </div>
                <div className="flex flex-col text-left">
                    <label
                        htmlFor="facility"
                        className="mb-1 text-white font-semibold"
                    >
                        Facility Name
                    </label>
                    <input
                        type="text"
                        id="facility"
                        name="facility"
                        className="p-3 rounded-md border border-white/30 bg-white text-[#2daae2] placeholder-gray-400"
                        placeholder="Facility or organization name"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-white text-[#2daae2] px-6 py-3 text-lg rounded-md font-semibold hover:bg-blue-100 transition"
                >
                    Book a Demo
                </button>
            </form>
        </div>
    );
};

export default BookDemoForm;
