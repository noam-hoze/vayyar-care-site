import React from "react";
import { defaultConfig } from "@/config/videoConfig";

const VAYYAR_BLUE = "#06aeef";

const MobileHeroSection: React.FC = () => (
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
    {/* Video background (static, not playing) */}
    <video
      src={defaultConfig.videoSrc}
      muted
      playsInline
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
    <div
      style={{
        position: "absolute",
        inset: 0,
        background: "linear-gradient(to bottom, rgba(1,32,64,0.73),rgba(1,32,64,0.43), #fff 100%)",
        zIndex: 1,
        pointerEvents: "none",
      }}
    />
    {/* Text content */}
    <div style={{ position: "relative", zIndex: 2, width: "100%" }}>
      <h1
        style={{
          fontSize: "clamp(2.2rem, 7vw, 3.2rem)",
          fontWeight: 700,
          margin: 0,
          textShadow: "0px 2px 4px rgba(0,0,0,0.5), 0px 4px 12px rgba(0,0,0,0.3)",
        }}
      >
        Vayyar Care AI
      </h1>
      <h2
        style={{
          fontSize: "clamp(1.1rem, 4vw, 1.6rem)",
          fontWeight: 400,
          margin: "18px 0 0 0",
          textShadow: "0px 1px 3px rgba(0,0,0,0.6), 0px 3px 8px rgba(0,0,0,0.4)",
        }}
      >
        Turn <span style={{ color: VAYYAR_BLUE }}>Data</span> to smarter, safer <span style={{ color: VAYYAR_BLUE }}>Care</span>
      </h2>
    </div>
  </section>
);

export default MobileHeroSection; 