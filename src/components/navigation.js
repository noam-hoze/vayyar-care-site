import React from "react";
import { Link } from "react-router-dom"; // or use <a href="..."> if not using React Router

export default function NavBar() {
    return (
        <nav className="bg-white shadow-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    {/* Logo or Brand Name */}
                    <div className="flex-shrink-0">
                        {/* Use Link for the logo to go to homepage */}
                        <Link to="/">
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
                            to="/clinical"
                            className="text-[#06aeef] hover:text-white hover:bg-[#06aeef] px-4 py-2 rounded transition"
                        >
                            Clinical
                        </Link>
                        <Link
                            to="/executive"
                            className="text-[#06aeef] hover:text-white hover:bg-[#06aeef] px-4 py-2 rounded transition"
                        >
                            Executive
                        </Link>
                        <Link
                            to="/customers"
                            className="text-[#06aeef] hover:text-white hover:bg-[#06aeef] px-4 py-2 rounded transition"
                        >
                            Customers
                        </Link>
                        <Link
                            to="/about-us"
                            className="text-[#06aeef] hover:text-white hover:bg-[#06aeef] px-4 py-2 rounded transition"
                        >
                            About Us
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
}
