export interface ProductDetailTab {
    title: string;
    mediaType: "image" | "video";
    mediaSrc: string;
    description: string;
}

export const productDetails: ProductDetailTab[] = [
    {
        title: "Vayyar Care",
        mediaType: "image",
        mediaSrc: "/images/product.png",
        description:
            "Vayyar Care is a comprehensive resident monitoring solution that provides real-time fall detection and activity insights. Our touchless RF sensors offer 24/7 visibility, ensuring resident safety and dignity while enhancing staff efficiency.",
    },
    {
        title: "Features",
        mediaType: "image",
        mediaSrc: "/images/product.png", // Placeholder
        description:
            "Unlock powerful AI-driven insights with 24/7 monitoring and facility-wide visibility. Track resident patterns, analyze fall history, and generate data-rich graphs to optimize care plans.",
    },
    {
        title: "The Sensor",
        mediaType: "image",
        mediaSrc: "/images/product.png",
        description:
            "Our advanced RF sensor technology ensures complete privacy by design. It sees through steam and darkness, monitoring residents without cameras by imaging them as point clouds. This provides critical data without ever capturing a single photo.",
    },
    {
        title: "Future Integration", // Placeholder Title
        mediaType: "image",
        mediaSrc: "/images/product.png", // Placeholder
        description:
            "Content for this section is currently in development. Stay tuned for future updates on our expanding capabilities.", // Placeholder Description
    },
    {
        title: "Future Integration", // Placeholder Title
        mediaType: "image",
        mediaSrc: "/images/product.png", // Placeholder
        description:
            "Content for this section is currently in development. Stay tuned for future updates on our expanding capabilities.", // Placeholder Description
    },
    {
        title: "Future Integration", // Placeholder Title
        mediaType: "image",
        mediaSrc: "/images/product.png", // Placeholder
        description:
            "Content for this section is currently in development. Stay tuned for future updates on our expanding capabilities.", // Placeholder Description
    },
    {
        title: "The Full System",
        mediaType: "video",
        mediaSrc: "/videos/product.mp4",
        description:
            "See how the entire Vayyar Care ecosystem works together, from the discreetly mounted sensors to the powerful analytics dashboard, to provide a seamless and comprehensive monitoring solution for your facility.",
    },
];
