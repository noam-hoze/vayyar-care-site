import React from "react";
import { useDemoModal } from "@/contexts/DemoModalContext";
import { scrollToSection } from "@/lib/scrollUtils";

const VAYYAR_BLUE = "#06aeef";

const MobileHeroSection: React.FC = () => {
    const { isDemoModalOpen, setIsDemoModalOpen } = useDemoModal();

    // Mapping for hero section items to their corresponding sections
    const heroItemMapping = {
        "Optimize Staff": "section-1", // Staff Optimization
        "Transform Care": "section-5", // AI insights
        "Operational Efficiency": "section-9", // Increase NOI
    };

    const handleItemClick = (itemName: keyof typeof heroItemMapping) => {
        scrollToSection(heroItemMapping[itemName]);
    };

    const openContactModal = () => {
        setIsDemoModalOpen(true);
    };
    const handleContactModalClose = () => {
        setIsDemoModalOpen(false);
    };
    return (
        <section
            style={{
                width: "100%",
                height: "100vh",
                minHeight: "100svh",
                position: "relative",
                boxSizing: "border-box",
                overflow: "hidden",
                textAlign: "center",
                color: "#fff",
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-end",
                alignItems: "center",
                paddingBottom: "15vh",
                marginTop: "calc(var(--spacing) * -16)",
            }}
        >
            <video
                autoPlay
                loop
                muted
                playsInline
                src="/videos/hero-section.mov"
                style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    zIndex: 0,
                    pointerEvents: "none",
                }}
            />
            {/* Gradient overlay */}
            {/* <div
                style={{
                    position: "absolute",
                    inset: 0,
                    background:
                        "linear-gradient(to bottom, rgba(1,32,64,0.4),rgba(1,32,64,0.2))",
                    zIndex: 1,
                    pointerEvents: "none",
                }}
            /> */}
            {/* Text content */}
            <div
                style={{
                    position: "absolute",
                    bottom: "5vh",
                    left: "50%",
                    transform: "translateX(-50%)",
                    zIndex: 2,
                    width: "98%",
                    maxWidth: "600px",
                    textAlign: "center",
                    color: "#fff",
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                    paddingTop: "20px",
                    paddingBottom: "20px",
                    paddingLeft: "8px",
                    paddingRight: "8px",
                    borderRadius: "12px",
                }}
            >
                <h1
                    style={{
                        fontSize: "clamp(2.8rem, 6.5vw, 3.2rem)",
                        fontWeight: 700,
                        margin: 0,
                        textShadow:
                            "0px 2px 4px rgba(0,0,0,0.5), 0px 4px 12px rgba(0,0,0,0.3)",
                        lineHeight: 1.1,
                    }}
                >
                    Vayyar Care
                    <sup
                        style={{
                            fontSize: "0.6em",
                            top: "-0.5em",
                            position: "relative",
                            color: VAYYAR_BLUE,
                            marginLeft: "0.1em",
                            zIndex: -1,
                        }}
                    >
                        AI
                    </sup>
                </h1>
                <h2
                    style={{
                        fontSize: "clamp(0.9rem, 3vw, 1.2rem)",
                        fontWeight: 400,
                        margin: "12px 0 0 0",
                        textShadow:
                            "0px 1px 3px rgba(0,0,0,0.6), 0px 3px 8px rgba(0,0,0,0.4)",
                        textAlign: "center",
                        lineHeight: 1.2,
                    }}
                >
                    <ul
                        style={{
                            listStyle: "none",
                            padding: 0,
                            margin: 0,
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "center",
                            gap: "clamp(0.5em, 1.8vw, 1em)",
                            flexWrap: "nowrap",
                        }}
                    >
                        <li>
                            <button
                                onClick={() =>
                                    handleItemClick("Optimize Staff")
                                }
                                style={{
                                    background: "none",
                                    border: "none",
                                    color: VAYYAR_BLUE,
                                    cursor: "pointer",
                                    padding: "4px 8px",
                                    borderRadius: "4px",
                                    transition: "background-color 0.2s ease",
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.backgroundColor =
                                        "rgba(255, 255, 255, 0.1)";
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.backgroundColor =
                                        "transparent";
                                }}
                            >
                                Optimize Staff
                            </button>
                        </li>
                        <li>
                            <button
                                onClick={() =>
                                    handleItemClick("Transform Care")
                                }
                                style={{
                                    background: "none",
                                    border: "none",
                                    color: VAYYAR_BLUE,
                                    cursor: "pointer",
                                    padding: "4px 8px",
                                    borderRadius: "4px",
                                    transition: "background-color 0.2s ease",
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.backgroundColor =
                                        "rgba(255, 255, 255, 0.1)";
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.backgroundColor =
                                        "transparent";
                                }}
                            >
                                Transform Care
                            </button>
                        </li>
                        <li>
                            <button
                                onClick={() =>
                                    handleItemClick("Operational Efficiency")
                                }
                                style={{
                                    background: "none",
                                    border: "none",
                                    color: VAYYAR_BLUE,
                                    cursor: "pointer",
                                    padding: "4px 8px",
                                    borderRadius: "4px",
                                    transition: "background-color 0.2s ease",
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.backgroundColor =
                                        "rgba(255, 255, 255, 0.1)";
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.backgroundColor =
                                        "transparent";
                                }}
                            >
                                Operational Efficiency
                            </button>
                        </li>
                    </ul>
                </h2>
            </div>
        </section>
    );
};

export default MobileHeroSection;
