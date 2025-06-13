import React, { useRef, useState, useEffect } from "react";
import { defaultConfig } from "@/config/videoConfig";
import { HomeSection } from "@/data/homeSections";
import { useMobileHomeVideo } from "./MobileHomeVideoContext";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface MobileHomeSectionProps {
  section: HomeSection;
  index?: number;
  sectionId?: string;
}

const MobileHomeSection: React.FC<MobileHomeSectionProps> = ({ section, index, sectionId }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0); // 0 to 1
  const { manualOverrideIndex, requestPlay, clearManualOverride } = useMobileHomeVideo();
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);

  // Only relevant for video sections
  const start = section.type === "video" ? section.video!.start : 0;
  const end = section.type === "video" ? section.video!.end : 0;

  // Initialize video and ScrollTrigger
  useEffect(() => {
    if (section.type !== "video") return;
    const video = videoRef.current;
    if (!video) return;

    const initializeVideo = async () => {
      try {
        // Load the video
        await video.load();
        // Set initial time
        video.currentTime = start;
        // Pause the video
        video.pause();
      } catch (error) {
        console.error('Error initializing video:', error);
      }
    };

    initializeVideo();

    // Create ScrollTrigger
    scrollTriggerRef.current = ScrollTrigger.create({
      trigger: video,
      start: "top 80%",
      end: "bottom 20%",
      onEnter: () => {
        if (video.currentTime >= end - 0.01) {
          video.currentTime = start;
        }
        video.play();
        setPlaying(true);
      },
      onEnterBack: () => {
        if (video.currentTime >= end - 0.01) {
          video.currentTime = start;
        }
        video.play();
        setPlaying(true);
      },
      onLeave: () => {
        video.pause();
        setPlaying(false);
      },
      onLeaveBack: () => {
        video.pause();
        setPlaying(false);
      },
    });

    return () => {
      scrollTriggerRef.current?.kill();
    };
  }, [section.type, start, end]);

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
    return () => video.removeEventListener("timeupdate", onTimeUpdate);
  }, [start, end, section.type]);

  // Manual play/pause handler
  const togglePlay = () => {
    if (typeof index !== "number") return;
    const video = videoRef.current;
    if (!video) return;

    if (playing) {
      video.pause();
      setPlaying(false);
      if (manualOverrideIndex === index) {
        clearManualOverride();
      }
    } else {
      requestPlay(index, { manual: true });
      if (video.currentTime >= end - 0.01) {
        video.currentTime = start;
      }
      video.play();
      setPlaying(true);
    }
  };

  if (section.type === "text") {
    return (
      <div id={sectionId} style={{ padding: "24px", fontSize: 18, minHeight: '70vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', scrollMarginTop: '64px' }}>
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
        preload="auto"
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
          {playing ? (
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