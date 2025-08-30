export interface ProductDetailTab {
    title: string;
    mediaType: "image" | "video";
    mediaSrc: string;
    mobileMediaSrc?: string;
    description: string;
}

export const productDetails: ProductDetailTab[] = [
    {
        title: "AI Assistant",
        mediaType: "video",
        mediaSrc: "/videos/optimize-staff.mp4",
        description:
            "Vayyar Care is an intelligent assistant that enhances resident safety and empowers your staff. It works silently in the background, providing a new layer of data-driven insight to elevate the quality of care.",
    },
    {
        title: "Silent Sensing",
        mediaType: "video",
        mediaSrc: "/videos/privacy.mp4",
        description:
            "The system gathers information using advanced, wall-mounted sensors instead of intrusive cameras. This method respects resident dignity and ensures complete privacy while collecting crucial activity data around the clock.",
    },
    {
        title: "Instant Alerts",
        mediaType: "video",
        mediaSrc: "/videos/real-time-alerts.mp4",
        description:
            "Vayyar Care's AI instantly recognizes when a fall occurs and automatically alerts caregivers through your nurse call system. This ensures rapid response, preventing long lies and improving resident outcomes.",
    },
    {
        title: "Predictive Insights",
        mediaType: "video",
        mediaSrc: "/videos/ai-insights.mp4",
        description:
            "Beyond fall detection, the system analyzes behavioral patterns to predict health risks and offer proactive insights. It helps you identify underlying conditions early, enabling preventative care and reducing hospitalizations.",
    },
    {
        title: "Higher NOI",
        mediaType: "video",
        mediaSrc: "/videos/increase-noi.mp4",
        description:
            "Prevent costly fall-related move-outs and attract new residents with best-in-class safety. The system's data justifies care levels and optimizes staff, directly boosting your Net Operating Income (NOI).",
    },
];
