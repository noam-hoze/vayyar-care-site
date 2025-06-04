"use client"; // Ensure it's a client component

import React, { useEffect, useRef } from "react";
import { usePathname } from "next/navigation"; // Import usePathname
import NavBar from "./navigation"; // Assuming NavBar is in the same directory

// Define props type to accept children
interface MainLayoutProps {
    children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
    const pathname = usePathname(); // Get current path
    // Determine if NavBar should be shown (hide on /demo)
    const showNavBar = !["/demo"].includes(pathname);

    return (
        <div className="flex flex-col min-h-screen bg-white">
            {showNavBar && (
                <div className="sticky top-0 z-50">
                    <NavBar />
                </div>
            )}
            <main key={pathname} className="flex-grow page-fade-in">
                {children}
            </main>
        </div>
    );
};

export default MainLayout;
