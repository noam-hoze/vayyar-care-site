import React from "react";
import VayyarLogo from "../VayyarLogo";
import styles from "./ProductSection.module.css";
import { HomeSection } from "@/data/homeSections";

interface ProductSectionProps {
    entry: HomeSection;
    sectionId?: string;
}

const ProductSection: React.FC<ProductSectionProps> = ({
    entry,
    sectionId,
}) => {
    return (
        <div id={sectionId} className={styles.productSection}>
            <div className={styles.logoContainer}>
                <VayyarLogo />
            </div>
            <div className={styles.imageContainer}>
                <img
                    src="/images/product.png"
                    alt="Vayyar Care Product"
                    className={styles.productImage}
                />
            </div>
            <div className={styles.buttonContainer}>
                <button className={styles.closerLookButton}>
                    <span className={styles.plusIcon}>+</span>
                    <span>Take a closer look</span>
                </button>
            </div>
        </div>
    );
};

export default ProductSection;
