import React, { useRef, useState, useEffect } from "react";
import { defaultConfig } from "@/config/videoConfig";
import { HomeSection, homeSections } from "@/data/homeSections";
import { useMobileHomeVideo } from "./MobileHomeVideoContext";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin"; // Import the ScrollToPlugin
import "@/styles/theater-mode.css"; // Import the theater mode styles

// Register both ScrollTrigger and ScrollToPlugin
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

interface MobileHomeSectionProps {
  section: HomeSection;
  index?: number;
  sectionId?: string;
  nextSection?: HomeSection; // Changed from nextSectionId to nextSection
  nextSectionId?: string; // Keep for backward compatibility
}

const MobileHomeSection: React.FC<MobileHomeSectionProps> = ({ section, index, sectionId, nextSection, nextSectionId }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0); // 0 to 1
  const {
    manualOverrideIndex,
    requestPlay,
    clearManualOverride,
    theaterMode,
    setTheaterMode,
    activeVideoId
  } = useMobileHomeVideo();
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);
  const isActiveVideo = activeVideoId === sectionId;

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

  // Add body class for theater mode to hide all videos
  useEffect(() => {
    if (theaterMode) {
      document.body.classList.add('theater-mode-active');
    } else {
      document.body.classList.remove('theater-mode-active');
    }

    return () => {
      document.body.classList.remove('theater-mode-active');
    };
  }, [theaterMode]);

  // Animate theater mode overlay
  useEffect(() => {
    if (section.type !== "video" || !overlayRef.current) return;

    if (theaterMode) {
      gsap.to(overlayRef.current, {
        opacity: 0.9,
        duration: 0.5,
        display: 'block',
        ease: "power2.inOut"
      });
    } else {
      gsap.to(overlayRef.current, {
        opacity: 0,
        duration: 0.5,
        ease: "power2.inOut",
        onComplete: () => {
          if (overlayRef.current) {
            overlayRef.current.style.display = 'none';
          }
        }
      });
    }
  }, [theaterMode, section.type]);

  // Handle scroll to next section and enable theater mode
  const handleLearnMore = () => {
    // Check if we have nextSection or need to fallback to nextSectionId
    if (nextSection || nextSectionId) {
      // Get the DOM element for the section
      const nextSectionElement = nextSectionId ? document.getElementById(nextSectionId) : null;
      if (nextSectionElement) {
        // Use nextSection directly if available, otherwise use the fallback
        const nextSectionData = nextSection || (nextSectionId ? homeSections[parseInt(nextSectionId.split('-')[1], 10)] : null);

        if (nextSectionData) {
          // Get start time directly from the nextSection object
          const nextSectionStartTime = nextSectionData.type === "video" ? nextSectionData.video!.start : 0;

          // Find the video element in the next section and reset it to start
          const videoElement = nextSectionElement.querySelector('video');
          if (videoElement) {
            // Use the correct start time from the next section
            videoElement.currentTime = nextSectionStartTime;
            // Set playing state to ensure video starts playing
            videoElement.play();
          }

          // Get the scrollMarginTop value from the style and convert it to a number
          const scrollMarginTopStyle = window.getComputedStyle(nextSectionElement).scrollMarginTop;
          const scrollMarginTopValue = parseInt(scrollMarginTopStyle, 10) || 64; // Default to 64px if parsing fails

          // Enable theater mode immediately so fade-in starts in parallel with scrolling
          setTheaterMode(true, nextSectionId);

          // Calculate target scroll position, accounting for any scroll margin
          const targetY = nextSectionElement.getBoundingClientRect().top + window.scrollY - scrollMarginTopValue;

          // Use a simpler direct scrollTo approach with GSAP
          gsap.to(window, {
            scrollTo: targetY,
            duration: 1,
            ease: "power2.out",
            onStart: () => {
              // Nothing to disable - maintain normal scrolling ability
            },
            onComplete: () => {
              // Nothing to re-enable - normal scrolling was never disabled
            }
          });
        }
      }
    }
  };

  if (section.type === "text") {
    return (
      <div id={sectionId} style={{ padding: "24px", fontSize: 18, display: 'flex', flexDirection: 'column', justifyContent: 'center', scrollMarginTop: '64px' }}>
        {section.header && <h2 style={{ fontSize: 'clamp(1.8rem, 5vw, 2.5rem)', fontWeight: 'bold', marginBottom: '16px' }}>{section.header}</h2>}
        <div>{section.content}</div>

        {/* Learn more about button */}
        {section.buttonText && nextSectionId && (
          <button
            onClick={handleLearnMore}
            style={{
              marginTop: '24px',
              backgroundColor: '#FF7A00', // Changed from #05aae9 to orange #FF7A00
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              padding: '12px 20px',
              fontSize: '16px',
              fontWeight: 'bold',
              cursor: 'pointer',
              alignSelf: 'flex-start',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            Learn more about {section.buttonText}
            <span style={{ fontWeight: 'bold' }}>&#8250;</span>
          </button>
        )}
      </div>
    );
  }

  // Video section rendering
  return (
    <div id={sectionId} className="relative my-8" style={{ scrollMarginTop: '64px' }}>
      {/* Theater mode overlay is now a global component, removed from individual sections */}

      <div className="relative">
        <video
          ref={videoRef}
          src={defaultConfig.videoSrc}
          className={`w-full rounded-xl bg-black ${isActiveVideo && theaterMode ? 'theater-mode-current-video' : ''}`}
          controls={false}
          playsInline
          muted
          preload="auto"
          data-section-video="true"
        />

        {/* Exit theater mode button - only show for active video */}
        {isActiveVideo && theaterMode && (
          <button
            onClick={() => setTheaterMode(false)}
            className="theater-mode-controls absolute top-3 left-3 flex items-center justify-center w-8 h-8 rounded-full bg-black/50 text-white cursor-pointer"
            aria-label="Exit theater mode"
          >
            ✕
          </button>
        )}

        {/* Play/Pause button with circular progress */}
        <div className="theater-mode-controls absolute top-3 right-3 w-12 h-12 flex items-center justify-center">
          <svg
            width={48}
            height={48}
            className="absolute top-0 left-0 -rotate-90"
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
            className="relative bg-transparent border-0 rounded-full w-10 h-10 text-white text-xl flex items-center justify-center cursor-pointer z-10"
            aria-label={playing ? "Pause video" : "Play video"}
          >
            {playing ? (
              <span className="font-bold">&#10073;&#10073;</span> // Pause icon
            ) : (
              <span className="font-bold">&#9654;</span> // Play icon
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MobileHomeSection;

