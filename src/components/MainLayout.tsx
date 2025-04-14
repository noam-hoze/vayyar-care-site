import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "./navigation"; // Assuming NavBar is in the same directory

export default function MainLayout() {
    return (
        <div>
            <div className="relative z-50">
                <NavBar />
            </div>
            <main>
                <Outlet /> {/* Child routes will render here */}
            </main>
            {/* You could add a Footer component here too if needed */}
        </div>
    );
}
