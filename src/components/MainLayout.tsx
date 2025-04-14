import React from "react";
import NavBar from "./navigation"; // Assuming NavBar is in the same directory

// Define props type to accept children
interface MainLayoutProps {
    children: React.ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
    return (
        <div>
            <div className="relative z-50">
                <NavBar />
            </div>
            <main>
                {children} {/* Render children directly */}
            </main>
            {/* You could add a Footer component here too if needed */}
        </div>
    );
}
