"use client"; // Ensure it's a client component

import React from "react";
import { usePathname } from "next/navigation"; // Import usePathname
import NavBar from "./navigation"; // Assuming NavBar is in the same directory

// Define props type to accept children
interface MainLayoutProps {
    children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
    const pathname = usePathname(); // Get current path

    return (
        <div className="flex flex-col min-h-screen bg-white">
            <div className="sticky top-0 z-50">
                <NavBar />
            </div>
            <main key={pathname} className="flex-grow page-fade-in">
                {children}
            </main>
            {/* You could add a Footer component here too if needed */}
        </div>
    );
};

export default MainLayout;
