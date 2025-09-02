import { useEffect, useRef } from "react";
import { HomeSection } from "@/data/homeSections";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { StreamPlayerApi } from "@cloudflare/stream-react";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

interface ScrollAnimationRefs {
    scrollyContainerRef: React.MutableRefObject<HTMLDivElement | null>;
    scrollyOverlayRef: React.MutableRefObject<HTMLDivElement | null>;
    streamRef: React.MutableRefObject<StreamPlayerApi | null>;
}

export const useScrollAnimations = (
    entry: HomeSection,
    isDesktop: boolean,
    refs: ScrollAnimationRefs,
    playing: boolean,
    setPlaying: (playing: boolean) => void,
    videoSrc: string
) => {
    const scrollTriggerRef = useRef<ScrollTrigger | null>(null);

    // Desktop scrolly video animations
    useEffect(() => {
        if (
            isDesktop &&
            (entry.type === "scrolly-video" ||
                entry.type === "scrolly-video-fixed") &&
            refs.scrollyContainerRef.current &&
            refs.scrollyOverlayRef.current
        ) {
            const paragraphs = gsap.utils.toArray(
                ".scrolly-text p"
            ) as HTMLElement[];
            const overlay = refs.scrollyOverlayRef.current;

            const firstParagraph =
                refs.scrollyContainerRef.current?.querySelector(
                    ".scrolly-text p:first-child"
                );
            const textContainer =
                refs.scrollyContainerRef.current?.querySelector(
                    ".scrolly-text"
                );

            if (entry.type === "scrolly-video-fixed") {
                gsap.set(paragraphs, { opacity: 1, y: 0 });
                gsap.set(overlay, { opacity: 0 });

                const showTextTrigger = ScrollTrigger.create({
                    trigger: refs.scrollyContainerRef.current,
                    start: "top bottom",
                    onEnter: () => {
                        gsap.to(overlay, { opacity: 0.5, duration: 0.3 });
                    },
                    onLeaveBack: () => {
                        gsap.to(overlay, { opacity: 0, duration: 0.3 });
                    },
                });

                const scrollOutTrigger = ScrollTrigger.create({
                    trigger: refs.scrollyContainerRef.current,
                    start: "top 20%",
                    end: "bottom 20%",
                    onEnter: () => {
                        gsap.to(overlay, { opacity: 0, duration: 0.5 });
                    },
                    onLeave: () => {
                        gsap.to(overlay, { opacity: 0, duration: 0.3 });
                    },
                    onEnterBack: () => {
                        gsap.to(overlay, { opacity: 0.5, duration: 0.3 });
                    },
                });

                return () => {
                    showTextTrigger?.kill();
                    scrollOutTrigger?.kill();
                };
            } else {
                gsap.set(paragraphs, { opacity: 1, y: 0 });
                gsap.set(overlay, { opacity: 0 });

                const overlayTrigger = ScrollTrigger.create({
                    trigger: firstParagraph,
                    start: "top 90%",
                    onEnter: () => {
                        gsap.to(overlay, {
                            opacity: 0.5,
                            duration: 0.3,
                            ease: "power2.out",
                        });
                    },
                    onLeave: () => {
                        gsap.to(overlay, {
                            opacity: 0,
                            duration: 0.3,
                            ease: "power2.out",
                        });
                    },
                    onEnterBack: () => {
                        gsap.to(overlay, {
                            opacity: 0.5,
                            duration: 0.3,
                            ease: "power2.out",
                        });
                    },
                    onLeaveBack: () => {
                        gsap.to(overlay, {
                            opacity: 0,
                            duration: 0.3,
                            ease: "power2.out",
                        });
                    },
                });

                return () => {
                    overlayTrigger?.kill();
                };
            }
        }
    }, [isDesktop, entry.type, entry.mobileMediaType]);

    // Video scroll triggers
    useEffect(() => {
        if (
            entry.type === "video" ||
            entry.type === "scrolly-video" ||
            entry.type === "scrolly-video-fixed" ||
            entry.type === "scroll-scrub-video"
        ) {
            if (refs.scrollyContainerRef.current) {
                scrollTriggerRef.current = ScrollTrigger.create({
                    trigger: refs.scrollyContainerRef.current,
                    start: "top 80%",
                    end: "bottom 20%",
                    onEnter: () => {
                        if (refs.streamRef.current) {
                            refs.streamRef.current.currentTime = 0;
                            refs.streamRef.current.play();
                        }
                        setPlaying(true);
                    },
                    onEnterBack: () => {
                        if (refs.streamRef.current) {
                            refs.streamRef.current.currentTime = 0;
                            refs.streamRef.current.play();
                        }
                        setPlaying(true);
                    },
                    onLeave: () => {
                        if (refs.streamRef.current) {
                            refs.streamRef.current.pause();
                            refs.streamRef.current.currentTime = 0;
                        }
                        setPlaying(false);
                    },
                    onLeaveBack: () => {
                        if (refs.streamRef.current) {
                            refs.streamRef.current.pause();
                            refs.streamRef.current.currentTime = 0;
                        }
                        setPlaying(false);
                    },
                });
            }

            return () => {
                scrollTriggerRef.current?.kill();
            };
        }
    }, [entry.type, videoSrc]);

    return scrollTriggerRef;
};
