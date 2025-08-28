import React, { useState, useEffect } from "react";
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

    useEffect(() => {
        if (isCloserLookActive) {
            document.body.classList.add("modal-open");
        } else {
            document.body.classList.remove("modal-open");
        }

        // Cleanup function to remove the class if the component unmounts
        return () => {
            document.body.classList.remove("modal-open");
        };
    }, [isCloserLookActive]);

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
                                    {index === activeTabIndex && (
                                        <motion.div
                                            className={styles.activeTabLine}
                                            layoutId="activeTabLine"
                                        />
                                    )}
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
    );
};

export default ProductSection;
