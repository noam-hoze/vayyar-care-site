import React from "react";

const MobileNarrowTextSection: React.FC = () => {
    return (
        <section
            className="mobile-only"
            style={{
                backgroundColor: "#ffffff",
                color: "#1D1D1F",
                padding: "96px 0",
                display: "flex",
                justifyContent: "center",
            }}
        >
            <div
                className="mobile-text-narrow"
                style={{
                    width: "84%",
                    maxWidth: 560,
                    textAlign: "center",
                }}
            >
                <p
                    className="mobile-text-double-spacing"
                    style={{
                        fontSize: "clamp(20px, 5.2vw, 28px)",
                        lineHeight: 1.28,
                        fontWeight: 700,
                        marginBottom: 56,
                    }}
                >
                    Vayyar's technology records the daily life of your residents
                    without camera or sound
                </p>
                <p
                    className="mobile-text-double-spacing"
                    style={{
                        fontSize: "clamp(20px, 5.2vw, 28px)",
                        lineHeight: 1.28,
                        fontWeight: 700,
                        marginBottom: 56,
                    }}
                >
                    So you can improve the care you provide while increasing
                    your NOI and your staff's efficiency
                </p>
                <p
                    style={{
                        fontSize: "clamp(20px, 5.2vw, 28px)",
                        lineHeight: 1.28,
                        fontWeight: 700,
                    }}
                >
                    The era of AI-based care is here
                </p>
            </div>
        </section>
    );
};

export default MobileNarrowTextSection;
