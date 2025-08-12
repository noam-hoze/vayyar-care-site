import React from "react";
import styles from "./DefaultSection.module.css";

interface DefaultSectionDetailsProps {
    sectionId?: string;
    header?: React.ReactNode;
    content?: React.ReactNode;
    isLightBg: boolean;
}

const DefaultSectionDetails: React.FC<DefaultSectionDetailsProps> = ({
    sectionId,
    header,
    content,
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
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DefaultSectionDetails;
