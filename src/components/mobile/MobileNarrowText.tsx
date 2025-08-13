import React from "react";
import { HomeSection } from "@/data/homeSections";

interface MobileNarrowTextProps {
    section: HomeSection;
}

const MobileNarrowText: React.FC<MobileNarrowTextProps> = ({ section }) => {
    return (
        <div className="mobile-narrow-text-section">
            <div className="mobile-narrow-text-container">
                {section.header && (
                    <h2 className="mobile-narrow-heading">{section.header}</h2>
                )}
                {section.content && (
                    <div className="mobile-narrow-body">
                        {typeof section.content === "string" ? (
                            <p>{section.content}</p>
                        ) : (
                            section.content
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default MobileNarrowText;
