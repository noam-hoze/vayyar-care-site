import React from "react";
import { useDemoModal } from "@/contexts/DemoModalContext";
import { scrollToSection } from "@/lib/scrollUtils";

const VAYYAR_BLUE = "#06aeef";
const ORANGE = "#f56300";

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
            {/* Dark overlay to make buttons more prominent */}
            <div
                style={{
                    position: "absolute",
                    inset: 0,
                    // background:
                    //     "linear-gradient(135deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.7) 100%)",
                    zIndex: 1.5,
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
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    zIndex: 2,
                    width: "98%",
                    maxWidth: "800px",
                    textAlign: "center",
                    color: "#fff",
                    paddingTop: "20px",
                    paddingBottom: "20px",
                    paddingLeft: "8px",
                    paddingRight: "8px",
                }}
            >
                <img
                    src="/images/vchat-logo.png"
                    alt="vChat"
                    style={{
                        height: "clamp(5rem, 10vw, 6rem)",
                        margin: "0 auto",
                        display: "block",
                        filter: "drop-shadow(0px 2px 4px rgba(0,0,0,0.5)) drop-shadow(0px 4px 12px rgba(0,0,0,0.3))",
                    }}
                />
                <p
                    style={{
                        fontSize: "clamp(1.5rem, 2.5vw, 1.1rem)",
                        fontWeight: 400,
                        color: "#fff",
                        fontFamily: "Inter, sans-serif",
                        textAlign: "center",
                        margin: 0,
                        lineHeight: 1.5,
                        maxWidth: "800px",
                        textShadow:
                            "0 0 20px rgba(0,0,0,0.8), 0 0 40px rgba(0,0,0,0.6), 0 0 80px rgba(0,0,0,0.4)",
                    }}
                >
                    {/* AI-powered healthcare assistant that helps you{" "} */}
                    <span style={{ fontWeight: 600 }}>Optimize Staff</span>
                    <br />
                    {/* scheduling and allocation, while enabling you to{" "} */}
                    <span style={{ fontWeight: 600 }}>Transform Care</span>
                    <br />
                    {/* delivery through intelligent monitoring and personalized
                    patient insights, ultimately improving{" "} */}
                    <span style={{ fontWeight: 600 }}>
                        Operational Efficiency
                    </span>{" "}
                    {/* that reduces costs while enhancing quality of care. */}
                </p>
            </div>
        </section>
    );
};

export default MobileHeroSection;
