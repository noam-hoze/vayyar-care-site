"use client";

import React, { createContext, useState, useContext, ReactNode } from "react";

interface DemoModalContextType {
    isDemoModalOpen: boolean;
    setIsDemoModalOpen: (isOpen: boolean) => void;
}

const DemoModalContext = createContext<DemoModalContextType | undefined>(
    undefined
);

export const DemoModalProvider = ({ children }: { children: ReactNode }) => {
    const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);

    return (
        <DemoModalContext.Provider
            value={{ isDemoModalOpen, setIsDemoModalOpen }}
        >
            {children}
        </DemoModalContext.Provider>
    );
};

export const useDemoModal = () => {
    const context = useContext(DemoModalContext);
    if (context === undefined) {
        throw new Error("useDemoModal must be used within a DemoModalProvider");
    }
    return context;
};
