import {ScrollTrigger} from "gsap/ScrollTrigger";

export const setupHeroPin = (sectionRef: HTMLElement, container: HTMLDivElement) => {
    ScrollTrigger.create({
        trigger: container,
        start: "top top",
        end: "bottom top",
        pin: sectionRef,
        pinSpacing: false,
    });
};

export const timecodeToSeconds = (tc: string, frameRate: number = 30): number => {
    const parts = tc.split(":").map(Number);
    let seconds = 0;
    if (parts.length === 4) {
        seconds = parts[0] * 3600 + parts[1] * 60 + parts[2] + parts[3] / frameRate;
    } else if (parts.length === 3) {
        seconds = parts[0] * 60 + parts[1] + parts[2] / frameRate;
    } else {
        console.warn("Invalid timecode format:", tc);
    }
    return seconds;
};
