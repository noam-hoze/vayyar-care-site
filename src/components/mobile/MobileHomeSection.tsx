import React, { useRef, useState, useEffect } from "react";
import { defaultConfig } from "@/config/videoConfig";
import { HomeSection } from "@/data/homeSections";
import { useMobileHomeVideo } from "./MobileHomeVideoContext";

interface MobileHomeSectionProps {
  section: HomeSection;
  index?: number;
  sectionId?: string;
}

const MobileHomeSection: React.FC<MobileHomeSectionProps> = ({ section, index, sectionId }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0); // 0 to 1
  const { currentPlaying, manualOverrideIndex, requestPlay, clearManualOverride } = useMobileHomeVideo();
  const isCurrent = typeof index === "number" && currentPlaying === index;
  const [inView, setInView] = useState(false);

  // Only relevant for video sections
  const start = section.type === "video" ? section.video!.start : 0;
  const end = section.type === "video" ? section.video!.end : 0;

  // Restrict playback to [start, end] for video
  useEffect(() => {
    if (section.type !== "video") return;
    const video = videoRef.current;
    if (!video) return;
    const onTimeUpdate = () => {
      if (video.currentTime < start) video.currentTime = start;
      if (video.currentTime > end) {
        video.currentTime = end;
        video.pause();
        setPlaying(false);
      }
      setProgress((video.currentTime - start) / (end - start));
    };
    video.addEventListener("timeupdate", onTimeUpdate);
    // Seek to start on mount
    video.currentTime = start;
    setProgress(0);
    return () => video.removeEventListener("timeupdate", onTimeUpdate);
  }, [start, end, section.type]);

  // Play/pause handler
  const togglePlay = () => {
    if (typeof index !== "number") return;
    if (playing && isCurrent) {
      // User is pausing the video
      videoRef.current?.pause();
      setPlaying(false);
      // If this was the manual override, clear it
      if (manualOverrideIndex === index) {
        clearManualOverride();
      }
    } else {
      // User is playing the video
      requestPlay(index, { manual: true });
      const video = videoRef.current;
      if (!video) return;
      // If at end, always seek to start
      if (video.currentTime >= end - 0.01) {
        video.currentTime = start;
      }
      // Pause all other videos on the page except this one
      document.querySelectorAll('video').forEach((el) => {
        if (el !== video && el.getAttribute('data-section-video') === 'true') {
          el.pause();
        }
      });
      video.play();
      setPlaying(true);
    }
  };

  // Pause if section changes or not current
  useEffect(() => {
    if (section.type !== "video") return;
    setPlaying(false);
    if (videoRef.current) videoRef.current.pause();
  }, [start, end, section.type]);

  // Pause if not currentPlaying
  useEffect(() => {
    if (section.type !== "video") return;
    const video = videoRef.current;
    if (!isCurrent && video) {
      video.pause();
      setPlaying(false);
    }
  }, [isCurrent, section.type]);

  // IntersectionObserver for in-viewport detection
  useEffect(() => {
    if (section.type !== "video") return;
    const el = videoRef.current;
    if (!el) return;
    const observer = new window.IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
      },
      { threshold: 0.6 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [section.type]);

  // Auto play/pause based on viewport and currentPlaying
  useEffect(() => {
    if (section.type !== "video") return;
    // Only auto-play if no manual override or this is the manual one
    if (inView && typeof index === "number" && (manualOverrideIndex === null || manualOverrideIndex === index)) {
      requestPlay(index);
    }
  }, [inView, index, requestPlay, section.type, manualOverrideIndex]);

  useEffect(() => {
    if (section.type !== "video") return;
    const video = videoRef.current;
    if (!video) return;
    if (isCurrent && inView) {
      // Pause all other videos on the page except this one
      document.querySelectorAll('video').forEach((el) => {
        if (el !== video && el.getAttribute('data-section-video') === 'true') {
          el.pause();
        }
      });
      video.play();
      setPlaying(true);
    } else {
      video.pause();
      setPlaying(false);
    }
  }, [isCurrent, inView, section.type]);

  if (section.type === "text") {
    return (
      <div id={sectionId} style={{ padding: "24px 16px", fontSize: 18, minHeight: '70vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', scrollMarginTop: '64px' }}>
        {section.header && <h2 style={{ fontSize: 'clamp(1.8rem, 5vw, 2.5rem)', fontWeight: 'bold', marginBottom: '16px' }}>{section.header}</h2>}
        <p>{section.content}</p>
      </div>
    );
  }

  // Video section rendering
  return (
    <div id={sectionId} style={{ position: "relative", margin: "32px 0", scrollMarginTop: '64px' }}>
      <video
        ref={videoRef}
        src={defaultConfig.videoSrc}
        style={{ width: "100%", borderRadius: 12, background: "#000" }}
        controls={false}
        playsInline
        muted
        data-section-video="true"
      />
      {/* Play/Pause button with circular progress */}
      <div style={{
        position: "absolute",
        top: 12,
        right: 12,
        width: 48,
        height: 48,
        zIndex: 2,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}>
        <svg
          width={48}
          height={48}
          style={{ position: "absolute", top: 0, left: 0, transform: "rotate(-90deg)" }}
        >
          <circle
            cx={24}
            cy={24}
            r={20}
            stroke="rgba(255,255,255,0.25)"
            strokeWidth={4}
            fill="none"
          />
          <circle
            cx={24}
            cy={24}
            r={20}
            stroke="#fff"
            strokeWidth={4}
            fill="none"
            strokeDasharray={2 * Math.PI * 20}
            strokeDashoffset={2 * Math.PI * 20 * (1 - Math.max(0, Math.min(1, progress)))}
            style={{ transition: "stroke-dashoffset 0.2s linear" }}
            strokeLinecap="round"
          />
        </svg>
        <button
          onClick={togglePlay}
          style={{
            position: "relative",
            background: "transparent",
            border: "none",
            borderRadius: "50%",
            width: 40,
            height: 40,
            color: "#fff",
            fontSize: 20,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 2,
            cursor: "pointer",
          }}
          aria-label={playing ? "Pause video" : "Play video"}
        >
          {playing && isCurrent ? (
            <span style={{ fontWeight: "bold" }}>&#10073;&#10073;</span> // Pause icon
          ) : (
            <span style={{ fontWeight: "bold" }}>&#9654;</span> // Play icon
          )}
        </button>
      </div>
    </div>
  );
};

export default MobileHomeSection; 