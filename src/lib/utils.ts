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