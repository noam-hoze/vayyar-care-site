"use client";

import React, { createContext, useState, useContext, ReactNode } from "react";

interface VideoTimeContextType {
    currentTime: number;
    setCurrentTime: (time: number) => void;
    videoDuration: number;
    setVideoDuration: (duration: number) => void;
}

const VideoTimeContext = createContext<VideoTimeContextType | undefined>(
    undefined
);

export const VideoTimeProvider = ({ children }: { children: ReactNode }) => {
    const [currentTime, setCurrentTime] = useState(0);
    const [videoDuration, setVideoDuration] = useState(0); // Initialize with 0 or a sensible default

    return (
        <VideoTimeContext.Provider
            value={{
                currentTime,
                setCurrentTime,
                videoDuration,
                setVideoDuration,
            }}
        >
            {children}
        </VideoTimeContext.Provider>
    );
};

export const useVideoTime = () => {
    const context = useContext(VideoTimeContext);
    if (context === undefined) {
        throw new Error("useVideoTime must be used within a VideoTimeProvider");
    }
    return context;
};
