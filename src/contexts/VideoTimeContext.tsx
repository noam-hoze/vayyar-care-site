"use client";

import React, {
    createContext,
    useState,
    useContext,
    ReactNode,
    useRef,
    useCallback,
} from "react";

interface VideoTimeContextType {
    currentTime: number;
    setCurrentTime: (time: number) => void;
    videoDuration: number;
    setVideoDuration: (duration: number) => void;
    scrollToTime: (time: number) => void;
    registerScrollToTime: (fn: (time: number) => void) => void;
}

const VideoTimeContext = createContext<VideoTimeContextType | undefined>(
    undefined
);

export const VideoTimeProvider = ({ children }: { children: ReactNode }) => {
    const [currentTime, setCurrentTime] = useState(0);
    const [videoDuration, setVideoDuration] = useState(0);

    const scrollToTimeRef = useRef<(time: number) => void>(() => {
        console.warn("scrollToTime implementation not yet registered.");
    });

    const registerScrollToTime = useCallback((fn: (time: number) => void) => {
        scrollToTimeRef.current = fn;
    }, []);

    const scrollToTime = useCallback((time: number) => {
        scrollToTimeRef.current(time);
    }, []);

    return (
        <VideoTimeContext.Provider
            value={{
                currentTime,
                setCurrentTime,
                videoDuration,
                setVideoDuration,
                scrollToTime,
                registerScrollToTime,
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
