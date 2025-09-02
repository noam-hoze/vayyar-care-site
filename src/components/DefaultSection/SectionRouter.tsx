import React from "react";
import { HomeSection, homeSections } from "@/data/homeSections";
import { defaultConfig } from "@/config/videoConfig";
import ProductSection from "../ProductSection/ProductSection";
import MobileNarrowText from "../mobile/MobileNarrowText";
import MobileVideoSection from "./MobileVideoSection";
import DesktopScrollyVideoSection from "./DesktopScrollyVideoSection";
import DefaultSectionIntroText from "./DefaultSectionIntroText";
import DefaultSectionDetails from "./DefaultSectionDetails";
import { Stream } from "@cloudflare/stream-react";
import { useInView } from "react-intersection-observer";
import styles from "./DefaultSection.module.css";

interface SectionRouterProps {
    entry: HomeSection;
    isDesktop: boolean;
    sectionId?: string;
    nextSectionId?: string;
    videoRef: React.MutableRefObject<HTMLVideoElement | null>;
    ringSvgRef: React.MutableRefObject<SVGSVGElement | null>;
    ringProgressRef: React.MutableRefObject<SVGCircleElement | null>;
    scrollyContainerRef: React.MutableRefObject<HTMLDivElement | null>;
    scrollyOverlayRef: React.MutableRefObject<HTMLDivElement | null>;
    streamRef: React.MutableRefObject<any>;
    playing: boolean;
    progress: number;
    handleManualPlayPause: () => void;
    handleLearnMore: () => void;
    videoSrc: string;
}

const SectionRouter: React.FC<SectionRouterProps> = ({
    entry,
    isDesktop,
    sectionId,
    nextSectionId,
    videoRef,
    ringSvgRef,
    ringProgressRef,
    scrollyContainerRef,
    scrollyOverlayRef,
    streamRef,
    playing,
    progress,
    handleManualPlayPause,
    handleLearnMore,
    videoSrc,
}) => {
    // Product intro sections
    if (entry.type === "product-intro") {
        return <ProductSection entry={entry} sectionId={sectionId} />;
    }

    // Text sections
    if (entry.type === "text") {
        // Temporary deduplication: hide standalone text parts on mobile until data is consolidated
        const hideTextOnMobile =
            !isDesktop && [1, 3, 3.5, 5, 7, 9].includes(entry.id);
        if (hideTextOnMobile) return null;

        // Get all text sections to calculate proper zebra striping
        const textSections = homeSections.filter((s) => s.type === "text");
        const textSectionIndex = textSections.findIndex(
            (s) => s.id === entry.id
        );
        const isLightTextBg = textSectionIndex % 2 === 0;

        if (isDesktop) {
            // Desktop: render IntroText (Part 1) block for this "text" section
            return (
                <DefaultSectionIntroText
                    sectionId={sectionId || `section-${entry.id}`}
                    header={entry.header}
                    content={entry.content}
                    learnMoreEnabled={Boolean(
                        entry.buttonText && nextSectionId
                    )}
                    learnMoreLabel={
                        entry.buttonText
                            ? `Learn about ${entry.buttonText}`
                            : undefined
                    }
                    onLearnMore={handleLearnMore}
                    isLightBg={isLightTextBg}
                />
            );
        }
    }

    // Mobile video sections (including narrow-text variants that have video)
    if (
        entry.type === "scrolly-video" &&
        entry.mobileMediaType === "video" &&
        !isDesktop
    ) {
        const detailsSection = entry.detailsSectionId
            ? homeSections.find((s) => s.id === entry.detailsSectionId)
            : null;

        const content = entry.content as React.JSX.Element;
        const titleElement = content?.props?.children?.find(
            (child: any) => child?.type === "h1"
        );
        const subtitleElement = content?.props?.children?.find(
            (child: any) => child?.type === "p"
        );

        const title = titleElement?.props?.children || entry.title;
        const subtitle = subtitleElement?.props?.children || "";

        const backgroundClass = [2, 4, 8].includes(entry.id) ? "white-bg" : "";

        return (
            <MobileVideoSection
                entry={entry}
                sectionId={sectionId || `section-${entry.id}`}
                videoRef={videoRef}
                ringSvgRef={ringSvgRef}
                playing={playing}
                handleManualPlayPause={handleManualPlayPause}
                nextSectionId={nextSectionId}
                handleLearnMore={() => {}}
                smallTitle={title}
                subtitle={subtitle}
                videoSrc={entry.videoSrc || ""}
                detailsTitle={detailsSection?.header || entry.title}
                detailsContent={detailsSection?.content || entry.content}
                backgroundClass={backgroundClass}
                isLightBg={true}
                learnMoreEnabled={
                    defaultConfig.showLearnMoreButtons &&
                    Boolean(detailsSection?.buttonText)
                }
                learnMoreLabel={
                    detailsSection?.buttonText
                        ? `+ Learn more about ${detailsSection.buttonText}`
                        : "+ Learn more"
                }
                textStyle={
                    entry.mobileVariant === "narrow-text" ? "narrow" : "regular"
                }
            />
        );
    }

    // Mobile only - Handle narrow text variants that don't have video content
    if (entry.mobileVariant === "narrow-text" && !isDesktop) {
        return <MobileNarrowText section={entry} />;
    }

    // Desktop scrolly video sections
    if (
        isDesktop &&
        (entry.type === "scrolly-video" || entry.type === "scrolly-video-fixed")
    ) {
        return (
            <DesktopScrollyVideoSection
                entry={entry}
                sectionId={sectionId || `section-${entry.id}`}
                scrollyContainerRef={scrollyContainerRef}
                scrollyOverlayRef={scrollyOverlayRef}
                streamRef={streamRef}
                ringSvgRef={ringSvgRef}
                ringProgressRef={ringProgressRef}
                playing={playing}
                handleManualPlayPause={handleManualPlayPause}
                videoSrc={videoSrc}
            />
        );
    }

    // Generic mobile layout for scrolly-video
    if (
        !isDesktop &&
        (entry.type === "scrolly-video" ||
            entry.type === "scrolly-video-fixed") &&
        entry.mobileMediaType === "video"
    ) {
        const textSection =
            entry.mobileVariant === "narrow-text" ? (
                <MobileNarrowText section={entry} />
            ) : (
                <div className="mobile-hero-section">
                    <div className="mobile-hero-content">{entry.content}</div>
                </div>
            );

        const videoSection = (
            <div className="mobile-apple-video-container">
                <div className="mobile-apple-video">
                    <div
                        style={{
                            position: "relative",
                            width: "100%",
                            height: "100%",
                        }}
                    >
                        <Stream
                            src={videoSrc}
                            className="w-full h-full object-cover"
                            muted
                            autoplay
                            loop
                        />
                    </div>
                </div>
            </div>
        );

        const { ref: intersectionRef } = useInView({
            triggerOnce: false,
            threshold: 0.5,
        });

        return (
            <div
                id={sectionId}
                ref={entry.id === 0 ? intersectionRef : undefined}
            >
                {textSection}
                {videoSection}
            </div>
        );
    }

    return null;
};

export default SectionRouter;
