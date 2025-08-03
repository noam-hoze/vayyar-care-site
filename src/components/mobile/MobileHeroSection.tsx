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
          
        </section>
    );
};

export default MobileHeroSection;
