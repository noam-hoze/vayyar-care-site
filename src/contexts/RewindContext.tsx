"use client";

import React, { createContext, useState, useContext, ReactNode } from "react";

interface RewindContextType {
    hasSeenEfficiencySection: boolean;
    setHasSeenEfficiencySection: (value: boolean) => void;
}

const RewindContext = createContext<RewindContextType | undefined>(undefined);

export const RewindProvider: React.FC<{ children: ReactNode }> = ({
    children,
}) => {
    const [hasSeenEfficiencySection, setHasSeenEfficiencySection] =
        useState(false);

    return (
        <RewindContext.Provider
            value={{ hasSeenEfficiencySection, setHasSeenEfficiencySection }}
        >
            {children}
        </RewindContext.Provider>
    );
};

export const useRewind = () => {
    const context = useContext(RewindContext);
    if (context === undefined) {
        throw new Error("useRewind must be used within a RewindProvider");
    }
    return context;
};
