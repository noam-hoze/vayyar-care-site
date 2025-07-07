'use client';
import React, { createContext, useContext, useState, ReactNode } from "react";

interface MobileHomeVideoContextType {
  currentPlaying: number | null;
  manualOverrideIndex: number | null;
  theaterMode: boolean;
  activeVideoId: string | null; // Add activeVideoId to track which video is in theater mode
  requestPlay: (index: number, opts?: { manual?: boolean }) => void;
  setManualOverrideIndex: (index: number) => void;
  clearManualOverride: () => void;
  setTheaterMode: (enabled: boolean, videoId?: string | null) => void; // Update to accept videoId
}

const MobileHomeVideoContext = createContext<MobileHomeVideoContextType | undefined>(undefined);

export const useMobileHomeVideo = () => {
  const ctx = useContext(MobileHomeVideoContext);
  if (!ctx) throw new Error("useMobileHomeVideo must be used within MobileHomeVideoProvider");
  return ctx;
};

export const MobileHomeVideoProvider = ({ children }: { children: ReactNode }) => {
  const [currentPlaying, setCurrentPlaying] = useState<number | null>(null);
  const [manualOverrideIndex, setManualOverrideIndex] = useState<number | null>(null);
  const [theaterMode, setTheaterMode] = useState<boolean>(false);
  const [activeVideoId, setActiveVideoId] = useState<string | null>(null);

  // Updated to track which video is in theater mode
  const handleTheaterMode = (enabled: boolean, videoId: string | null = null) => {
    setTheaterMode(enabled);
    setActiveVideoId(enabled ? videoId : null);
  };

  const requestPlay = (index: number, opts?: { manual?: boolean }) => {
    if (opts?.manual) {
      setManualOverrideIndex(index);
      setCurrentPlaying(index);
    } else {
      // Only allow auto-play if no manual override or this is the manual one
      setCurrentPlaying((prev) => {
        if (manualOverrideIndex === null || manualOverrideIndex === index) {
          return index;
        }
        return prev;
      });
    }
  };

  const clearManualOverride = () => setManualOverrideIndex(null);

  return (
    <MobileHomeVideoContext.Provider value={{
      currentPlaying,
      manualOverrideIndex,
      theaterMode,
      activeVideoId,
      requestPlay,
      setManualOverrideIndex,
      clearManualOverride,
      setTheaterMode: handleTheaterMode
    }}>
      {children}
    </MobileHomeVideoContext.Provider>
  );
};
