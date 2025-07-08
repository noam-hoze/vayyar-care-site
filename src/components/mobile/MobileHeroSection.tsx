import React from "react";
import {useDemoModal} from "@/contexts/DemoModalContext";

const VAYYAR_BLUE = "#06aeef";

const MobileHeroSection: React.FC = () => {
    const { isDemoModalOpen, setIsDemoModalOpen } = useDemoModal();
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
        justifyContent: "center",
        alignItems: "center",
        padding: 0,
        marginTop: "calc(var(--spacing) * -16)",
      }}
    >
    <img src={"/images/fireball.mp4 (1080 x 1920 px).png"}
         style={{
             position: "absolute",
             top: 0,
             left: 0,
             width: "100%",
             height: "100%",
             objectFit: "cover",
             zIndex: 0,
             pointerEvents: "none",
         }}/>
      {/* Gradient overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(to bottom, rgba(1,32,64,0.73),rgba(1,32,64,0.43))",
          zIndex: 1,
          pointerEvents: "none",
        }}
      />
      {/* Text content */}
      <div style={{ position: "relative", zIndex: 2, width: "100%" }}>
        <h1
          style={{
            fontSize: "clamp(3.2rem, 7vw, 3.2rem)",
            fontWeight: 700,
            margin: 0,
            textShadow: "0px 2px 4px rgba(0,0,0,0.5), 0px 4px 12px rgba(0,0,0,0.3)",
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
            fontSize: "clamp(1.4rem, 4vw, 1.6rem)",
            fontWeight: 400,
            margin: "18px 0 0 0",
            textShadow: "0px 1px 3px rgba(0,0,0,0.6), 0px 3px 8px rgba(0,0,0,0.4)",
              textAlign: "center"
          }}
        >
            <ul style={{ listStyle: "none", padding: 0 }}>
                <li
                    style={{
                        display: "flex",
                        gap: "0.5em",
                        marginBottom: "0.5rem",
                        justifyContent: "center",
                    }}
                >
                    <span style={{ color: "#05aae9" }}>›</span>
                    <span>Optimize  staff</span>
                </li>
                <li
                    style={{
                        display: "flex",
                        gap: "0.5em",
                        marginBottom: "0.5rem",
                        justifyContent: "center",
                    }}
                >
                    <span style={{ color: "#05aae9" }}>›</span>
                    <span>Transform Care</span>
                </li>
                <li style={{ display: "flex", gap: "0.5em", justifyContent: "center", }}>
                    <span style={{ color: "#05aae9" }}>›</span>
                    <span>
                        Operational Efficiency
                    </span>
                </li>
            </ul>
        </h2>
      </div>

        <button
            onClick={openContactModal}
            className="relative text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-opacity-80 transition-all duration-150 ease-in-out flex items-center justify-center overflow-hidden transform hover:scale-105 cursor-pointer"
            style={{ backgroundColor: "#ff7a00", zIndex: 1,
                position: "absolute",
                bottom: "200px", }}
        >
            <span className="inline-block">Learn more</span>
        </button>
    </section>
  );
};

export default MobileHeroSection; 