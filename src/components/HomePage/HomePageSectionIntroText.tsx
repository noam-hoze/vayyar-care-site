import React from "react";
import styles from "./HomePageSection.module.css";

interface IntroTextProps {
    sectionId?: string;
    header?: React.ReactNode;
    content?: React.ReactNode;
    learnMoreEnabled?: boolean;
    learnMoreLabel?: string;
    onLearnMore?: () => void;
    isLightBg: boolean;
}

const HomePageSectionIntroText: React.FC<IntroTextProps> = ({
    sectionId,
    header,
    content,
    learnMoreEnabled,
    learnMoreLabel,
    onLearnMore,
    isLightBg,
}) => {
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
                        {learnMoreEnabled && (
                            <div className={styles.learnMoreWrapperDesktop}>
                                <button
                                    onClick={onLearnMore}
                                    className={styles.learnMoreButtonDesktop}
                                >
                                    <svg
                                        className={styles.learnMoreIconDesktop}
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                    <span>
                                        {learnMoreLabel ?? "Learn more"}
                                    </span>
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomePageSectionIntroText;
