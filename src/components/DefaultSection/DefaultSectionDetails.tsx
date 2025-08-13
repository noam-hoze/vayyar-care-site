import React from "react";
import { defaultConfig } from "@/config/videoConfig";
import styles from "./DefaultSection.module.css";

interface DefaultSectionDetailsProps {
    sectionId?: string;
    header?: React.ReactNode;
    content?: React.ReactNode;
    isLightBg: boolean;
    // New: prepare for unified mobile/desktop rendering
    variant?: "desktop" | "mobile";
    mobileTitle?: React.ReactNode;
    // Optional CTA (used for mobile variant first)
    learnMoreEnabled?: boolean;
    learnMoreLabel?: string;
    onLearnMore?: () => void;
}

const DefaultSectionDetails: React.FC<DefaultSectionDetailsProps> = ({
    sectionId,
    header,
    content,
    isLightBg,
    // variant is intentionally unused for now; added to enable future mobile markup
    variant,
    mobileTitle,
    learnMoreEnabled,
    learnMoreLabel,
    onLearnMore,
}) => {
    if (variant === "mobile") {
        return (
            <div className={`mobile-apple-part3 ${isLightBg ? "" : ""}`}>
                {mobileTitle && (
                    <h3 className="mobile-apple-title">{mobileTitle}</h3>
                )}
                <div className="mobile-apple-content">{content}</div>
                {defaultConfig.showLearnMoreButtons && learnMoreEnabled && (
                    <button
                        className="mobile-apple-button"
                        onClick={onLearnMore}
                    >
                        {learnMoreLabel ?? "+ Learn more"}
                    </button>
                )}
            </div>
        );
    }
    return (
        <div
            id={sectionId}
            className={`flex justify-center items-center ${
                styles.textSectionDesktop
            } ${isLightBg ? styles.bgLight : styles.bgGray}`}
        >
            <div className={styles.textContainerDesktop}>
                <div className={styles.textGridDesktop}>
                    <div className={styles.textLeft}>
                        <h2 className={styles.desktopTitle}>{header}</h2>
                    </div>
                    <div className={styles.textRight}>
                        <div className={styles.textContentDesktop}>
                            {content}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DefaultSectionDetails;
