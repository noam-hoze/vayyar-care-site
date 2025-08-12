import React, { ReactNode, isValidElement, cloneElement } from "react";
import styles from "./DefaultSection.module.css";

interface IntroTextProps {
    sectionId?: string;
    header?: React.ReactNode;
    content?: React.ReactNode;
    learnMoreEnabled?: boolean;
    learnMoreLabel?: string;
    onLearnMore?: () => void;
    isLightBg: boolean;
    // Controls mobile presentation; desktop keeps existing grid
    variant?: "default" | "narrow-text";
    eyebrow?: string;
}

const DefaultSectionIntroText: React.FC<IntroTextProps> = ({
    sectionId,
    header,
    content,
    learnMoreEnabled,
    learnMoreLabel,
    onLearnMore,
    isLightBg,
    variant = "default",
    eyebrow,
}) => {
    // Remove inline styles from nested nodes to prevent absolute/fixed positioning
    const stripInlineStyles = (node: ReactNode): ReactNode => {
        if (Array.isArray(node)) return node.map(stripInlineStyles);
        if (isValidElement(node)) {
            const anyNode: any = node;
            const { children, style, ...rest } = (anyNode.props as any) || {};
            return cloneElement(
                anyNode,
                { ...rest, style: undefined },
                stripInlineStyles(children)
            );
        }
        return node;
    };

    // Desktop rendering (unchanged)
    return (
        <>
            {/* Desktop wrapper */}
            <div
                id={sectionId}
                className={`${
                    styles.desktopIntroWrapper
                } flex justify-center items-center ${
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
                                        className={
                                            styles.learnMoreButtonDesktop
                                        }
                                    >
                                        <svg
                                            className={
                                                styles.learnMoreIconDesktop
                                            }
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

            {/* Mobile wrapper (shown via media query) */}
            <div
                id={`${sectionId}-mobile`}
                className={styles.mobileIntroWrapper}
            >
                {variant === "narrow-text" ? (
                    <section className={styles.mobileIntro}>
                        <div className="mobileNarrowContainer">
                            {header && (
                                <h2 className="mobileNarrowHeading">
                                    {header}
                                </h2>
                            )}
                            <div className="mobileNarrowBody">
                                {stripInlineStyles(content)}
                            </div>
                        </div>
                    </section>
                ) : (
                    <section className={styles.mobileIntro}>
                        {eyebrow && (
                            <div className={styles.mobileHeroEyebrow}>
                                {eyebrow}
                            </div>
                        )}
                        {header && (
                            <h1 className={styles.mobileHeroHeadline}>
                                {header}
                            </h1>
                        )}
                    </section>
                )}
            </div>
        </>
    );
};

export default DefaultSectionIntroText;
