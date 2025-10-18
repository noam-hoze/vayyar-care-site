import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import VayyarLogo from "../VayyarLogo";
import styles from "./ProductSection.module.css";
import { HomeSection } from "@/data/homeSections";
import { productDetails } from "@/data/productDetails";
import { useIOSVideoAutoplayMultiple } from "@/lib/useIOSVideoAutoplay";

interface ProductSectionProps {
    entry: HomeSection;
    sectionId?: string;
}

const ProductSection: React.FC<ProductSectionProps> = ({
    entry,
    sectionId,
}) => {
    const [isCloserLookActive, setIsCloserLookActive] = useState(false);
    const [isClosing, setIsClosing] = useState(false);
    const [showCloseButton, setShowCloseButton] = useState(false);
    const [activeTabIndex, setActiveTabIndex] = useState(0);
    const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
    const scrollPositionRef = useRef(0);

    // Scrollable tabs state
    const tabsContainerRef = useRef<HTMLDivElement>(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(false);
    const [isScrolling, setIsScrolling] = useState(false);

    useEffect(() => {
        if (isCloserLookActive) {
            scrollPositionRef.current = window.scrollY;
            document.body.classList.add("modal-open");
            document.body.style.top = `-${scrollPositionRef.current}px`;
        } else {
            document.body.classList.remove("modal-open");
            document.body.style.top = "";
            window.scrollTo(0, scrollPositionRef.current);
        }

        return () => {
            document.body.classList.remove("modal-open");
            document.body.style.top = "";
        };
    }, [isCloserLookActive]);

    useEffect(() => {
        if (!isCloserLookActive) return;

        videoRefs.current.forEach((video, index) => {
            if (video) {
                if (index === activeTabIndex) {
                    video.currentTime = 0;
                    video.play();
                } else {
                    video.pause();
                }
            }
        });
    }, [activeTabIndex, isCloserLookActive]);

    // iOS Safari optimization for modal videos
    useIOSVideoAutoplayMultiple(videoRefs, { logPrefix: "Modal video" });

    // Check scroll position for arrow visibility
    const checkScrollPosition = useCallback(() => {
        if (!tabsContainerRef.current) return;

        const container = tabsContainerRef.current;
        const { scrollLeft, scrollWidth, clientWidth } = container;

        // Get all tab elements
        const tabElements = container.querySelectorAll(`.${styles.tabButton}`);
        if (tabElements.length === 0) return;

        const firstTab = tabElements[0] as HTMLElement;
        const lastTab = tabElements[tabElements.length - 1] as HTMLElement;

        // Check if tabs are fully visible
        const containerRect = container.getBoundingClientRect();
        const firstTabRect = firstTab.getBoundingClientRect();
        const lastTabRect = lastTab.getBoundingClientRect();

        // First tab is fully visible if its left edge is >= container's left edge
        const firstTabFullyVisible = firstTabRect.left >= containerRect.left;
        // Last tab is fully visible if its right edge is <= container's right edge
        const lastTabFullyVisible = lastTabRect.right <= containerRect.right;

        // Check for overflow
        const hasOverflow = scrollWidth > clientWidth + 10;

        // Show arrows based on visibility and overflow
        const canScrollLeft = hasOverflow && !firstTabFullyVisible;
        const canScrollRight = hasOverflow && !lastTabFullyVisible;

        setCanScrollLeft(canScrollLeft);
        setCanScrollRight(canScrollRight);
    }, []);

    // Scroll to direction
    const scrollTabs = useCallback(
        (direction: "left" | "right") => {
            if (!tabsContainerRef.current || isScrolling) return;

            setIsScrolling(true);
            const container = tabsContainerRef.current;

            // Check if we're on mobile (screen width <= 768px)
            const isMobile = window.innerWidth <= 768;

            let targetScrollLeft;
            if (direction === "left") {
                if (isMobile) {
                    // On mobile, account for left padding to show first tab
                    const containerStyles = window.getComputedStyle(container);
                    const paddingLeft = parseFloat(containerStyles.paddingLeft);
                    targetScrollLeft = -paddingLeft;
                } else {
                    // On desktop, scroll to the very beginning
                    targetScrollLeft = 0;
                }
            } else {
                // Right arrow: always scroll to the very end
                targetScrollLeft =
                    container.scrollWidth - container.clientWidth;
            }

            container.scrollTo({
                left: targetScrollLeft,
                behavior: "smooth",
            });

            // Reset scrolling flag after animation
            setTimeout(() => setIsScrolling(false), 300);
        },
        [isScrolling]
    );

    // Update scroll position when tabs change
    useEffect(() => {
        if (!tabsContainerRef.current || !isCloserLookActive) return;

        const container = tabsContainerRef.current;
        const tabElements = container.querySelectorAll(`.${styles.tabButton}`);
        const activeTabElement = tabElements[activeTabIndex] as HTMLElement;

        if (activeTabElement) {
            const containerRect = container.getBoundingClientRect();
            const tabRect = activeTabElement.getBoundingClientRect();

            // Check if active tab is visible
            if (
                tabRect.left < containerRect.left ||
                tabRect.right > containerRect.right
            ) {
                const scrollLeft =
                    container.scrollLeft +
                    (tabRect.left - containerRect.left) -
                    containerRect.width / 2 +
                    tabRect.width / 2;
                container.scrollTo({
                    left: Math.max(0, scrollLeft),
                    behavior: "smooth",
                });
            }
        }

        // Check scroll position after scrolling
        setTimeout(checkScrollPosition, 300);
    }, [activeTabIndex, isCloserLookActive, checkScrollPosition]);

    // Initialize scroll position check
    useEffect(() => {
        if (isCloserLookActive) {
            setTimeout(checkScrollPosition, 100);
        }
    }, [isCloserLookActive, checkScrollPosition]);

    const activeTab = productDetails[activeTabIndex];

    const handleToggleCloserLook = () => {
        if (isCloserLookActive) {
            setIsClosing(true);
            // Keep close button visible during closing animation
            setTimeout(() => {
                setIsCloserLookActive(false);
                setIsClosing(false);
                setShowCloseButton(false);
                setActiveTabIndex(0);
            }, 400); // Match the animation duration
        } else {
            setIsCloserLookActive(true);
            setShowCloseButton(true);
        }
    };

    return (
        <div
            id={sectionId}
            className={`${styles.productSection} ${
                isCloserLookActive ? styles.modalActive : ""
            }`}
        >
            <div
                className={`${styles.modalContent} ${
                    isClosing ? styles.modalContentClosing : ""
                }`}
            >
                <div className={`${styles.logoContainer} ${styles.fadeIn}`}>
                    <VayyarLogo />
                </div>

                <div className={styles.imageContainer}>
                    {isCloserLookActive ? (
                        <>
                            {productDetails.map((tab, index) => (
                                <div
                                    key={tab.title}
                                    className={`${styles.mediaWrapper} ${
                                        index === activeTabIndex
                                            ? styles.fadeIn
                                            : styles.fadeOutImmediately
                                    }`}
                                >
                                    {tab.mediaType === "image" ? (
                                        <picture>
                                            <source
                                                media="(max-width: 768px)"
                                                srcSet={
                                                    tab.mobileMediaSrc ||
                                                    tab.mediaSrc
                                                }
                                            />
                                            <img
                                                src={tab.mediaSrc}
                                                alt={tab.title}
                                                className={styles.productImage}
                                            />
                                        </picture>
                                    ) : (
                                        <video
                                            ref={(el) => {
                                                videoRefs.current[index] = el;
                                            }}
                                            src={`${process.env.NEXT_PUBLIC_BASE_PATH || ""}${tab.mediaSrc}`}
                                            className={styles.productImage}
                                            autoPlay
                                            muted
                                            loop
                                            playsInline
                                            preload="auto"
                                        />
                                    )}
                                </div>
                            ))}
                        </>
                    ) : (
                        <div className={styles.mediaWrapper}>
                            <picture>
                                <source
                                    media="(max-width: 768px)"
                                    srcSet={`${process.env.NEXT_PUBLIC_BASE_PATH || ""}/images/product-mobile.png`}
                                />
                                <img
                                    src={`${process.env.NEXT_PUBLIC_BASE_PATH || ""}/images/product.png`}
                                    alt="Vayyar Care Product"
                                    className={`${styles.productImage} ${styles.regularProductImage}`}
                                />
                            </picture>
                        </div>
                    )}
                </div>

                {isCloserLookActive ? (
                    <div className={`${styles.noamClass}`}>
                        <div
                            className={`${styles.detailsContainer} ${styles.fadeIn}`}
                        >
                            <div className={styles.tabsWrapper}>
                                {canScrollLeft && (
                                    <motion.button
                                        className={`${styles.scrollArrow} ${styles.scrollArrowLeft}`}
                                        onClick={() => scrollTabs("left")}
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.95 }}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                    >
                                        <div className={styles.arrowIcon}>
                                            <svg
                                                width="16"
                                                height="16"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    d="M15 18L9 12L15 6"
                                                    stroke="currentColor"
                                                    strokeWidth="2"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                />
                                            </svg>
                                        </div>
                                    </motion.button>
                                )}

                                <div
                                    ref={tabsContainerRef}
                                    className={styles.tabsContainer}
                                    onScroll={checkScrollPosition}
                                >
                                    {productDetails.map((tab, index) => (
                                        <button
                                            key={tab.title}
                                            className={`${styles.tabButton} ${
                                                index === activeTabIndex
                                                    ? styles.activeTab
                                                    : ""
                                            }`}
                                            onClick={() =>
                                                setActiveTabIndex(index)
                                            }
                                        >
                                            {tab.title}
                                            <motion.div
                                                className={styles.activeTabLine}
                                                animate={{
                                                    opacity:
                                                        index === activeTabIndex
                                                            ? 1
                                                            : 0,
                                                }}
                                                transition={{ duration: 0.3 }}
                                            />
                                        </button>
                                    ))}
                                </div>

                                {canScrollRight && (
                                    <motion.button
                                        className={`${styles.scrollArrow} ${styles.scrollArrowRight}`}
                                        onClick={() => scrollTabs("right")}
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.95 }}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                    >
                                        <div className={styles.arrowIcon}>
                                            <svg
                                                width="16"
                                                height="16"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    d="M9 18L15 12L9 6"
                                                    stroke="currentColor"
                                                    strokeWidth="2"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                />
                                            </svg>
                                        </div>
                                    </motion.button>
                                )}
                            </div>
                            <AnimatePresence mode="wait">
                                <motion.p
                                    key={activeTab.description}
                                    className={styles.descriptionText}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    {activeTab.description}
                                </motion.p>
                            </AnimatePresence>
                        </div>
                    </div>
                ) : (
                    <div
                        className={`${styles.buttonContainer} ${
                            isCloserLookActive ? styles.fadeOut : styles.fadeIn
                        }`}
                    >
                        <button
                            className={styles.closerLookButton}
                            onClick={handleToggleCloserLook}
                        >
                            <span className={styles.plusIcon}>+</span>
                            <span>Take a closer look</span>
                        </button>
                    </div>
                )}

                {showCloseButton && (
                    <button
                        className={`${styles.closeButton} ${
                            isClosing ? styles.fadeOut : styles.fadeIn
                        }`}
                        onClick={handleToggleCloserLook}
                    >
                        <div className={styles.closeIcon}></div>
                    </button>
                )}
            </div>
        </div>
    );
};

export default ProductSection;
