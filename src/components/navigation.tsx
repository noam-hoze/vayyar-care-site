import React from "react";
import Link from "next/link"; // Changed from react-router-dom

export default function NavBar() {
    return (
        <nav className="bg-white shadow-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    {/* Logo or Brand Name */}
                    <div className="flex-shrink-0">
                        {/* Use Link for the logo to go to homepage */}
                        <Link href="/">
                            {/* Replace text with image */}
                            <img
                                className="h-8 w-auto" /* Adjust height/width as needed */
                                src="/images/vayyar-logo-text.png"
                                alt="Vayyar Logo"
                            />
                        </Link>
                    </div>

                    {/* Navigation Links */}
                    <div className="flex space-x-8 text-md font-medium">
                        <Link
                            href="/clinical"
                            className="text-[#06aeef] hover:text-white  px-4 py-2 rounded transition"
                        >
                            Clinical
                        </Link>
                        <Link
                            href="/executive"
                            className="text-[#06aeef] hover:text-white px-4 py-2 rounded transition"
                        >
                            Executive
                        </Link>
                        <Link
                            href="/customers"
                            className="text-[#06aeef] hover:text-white px-4 py-2 rounded transition"
                        >
                            Customers
                        </Link>
                        <Link
                            href="/about-us"
                            className="text-[#06aeef] hover:text-white px-4 py-2 rounded transition"
                        >
                            About Us
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
}
