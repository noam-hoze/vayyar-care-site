import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import VayyarLogo from "../VayyarLogo";
import styles from "./ProductSection.module.css";
import { HomeSection } from "@/data/homeSections";
import { productDetails } from "@/data/productDetails";

interface ProductSectionProps {
    entry: HomeSection;
    sectionId?: string;
}

const ProductSection: React.FC<ProductSectionProps> = ({
    entry,
    sectionId,
}) => {
    const [isCloserLookActive, setIsCloserLookActive] = useState(false);
    const [activeTabIndex, setActiveTabIndex] = useState(0);
    const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
    const scrollPositionRef = useRef(0);

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

    const activeTab = productDetails[activeTabIndex];

    const handleToggleCloserLook = () => {
        setIsCloserLookActive(!isCloserLookActive);
        setActiveTabIndex(0); // Reset to the first tab when opening/closing
    };

    return (
        <div
            id={sectionId}
            className={`${styles.productSection} ${
                isCloserLookActive ? styles.modalActive : ""
            }`}
        >
            <div className={styles.modalContent}>
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
                                        <img
                                            src={tab.mediaSrc}
                                            alt={tab.title}
                                            className={styles.productImage}
                                        />
                                    ) : (
                                        <video
                                            ref={(el) =>
                                                (videoRefs.current[index] = el)
                                            }
                                            src={tab.mediaSrc}
                                            className={styles.productImage}
                                            autoPlay
                                            muted
                                            loop
                                            playsInline
                                        />
                                    )}
                                </div>
                            ))}
                        </>
                    ) : (
                        <div className={styles.mediaWrapper}>
                            <img
                                src="/images/product.png"
                                alt="Vayyar Care Product"
                                className={styles.productImage}
                            />
                        </div>
                    )}
                </div>

                {isCloserLookActive ? (
                    <div className={`${styles.noamClass}`}>
                        <div
                            className={`${styles.detailsContainer} ${styles.fadeIn}`}
                        >
                            <div className={styles.tabsContainer}>
                                {productDetails.map((tab, index) => (
                                    <button
                                        key={tab.title}
                                        className={`${styles.tabButton} ${
                                            index === activeTabIndex
                                                ? styles.activeTab
                                                : ""
                                        }`}
                                        onClick={() => setActiveTabIndex(index)}
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

                {isCloserLookActive && (
                    <button
                        className={`${styles.closeButton} ${styles.fadeIn}`}
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
