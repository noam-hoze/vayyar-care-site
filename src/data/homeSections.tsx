import { JSX } from "react";
import { videoConfig } from "@/config/videoConfig";

export interface HomeSection {
    id: number;
    type:
        | "text"
        | "video"
        | "scrolly-video"
        | "scrolly-video-fixed"
        | "scroll-scrub-video"
        | "product-intro"
        | "image";
    /**
     * Optional override for how media behaves on mobile.
     * Used to disable scrolly behavior on mobile while keeping desktop behavior.
     */
    mobileMediaType?: "video" | "scrolly-video" | "scroll-scrub-video";
    /**
     * If this section is a media section, you can link a separate text section
     * that should be rendered as the Details/CTA (Part 3) for this concept.
     */
    detailsSectionId?: number;
    title: string;
    header?: React.ReactNode;
    content?: string | JSX.Element; // for text
    imageSrc?: string; // for image sections
    videoSrc?: string; // for custom video source
    mobileVideoSrc?: string; // for custom mobile video source
    video?: {
        start: string;
        end: string;
    };
    // The start and end time for haveing the breather going from down to up
    text?: {
        start: number; // in seconds
        end?: number; // in seconds
    };
    buttonText?: string;
    // This is a timecode that indicate where
    // the orange button will scroll to
    scrollToTimeValue?: string;
    // Mobile-specific variant flags
    mobileVariant?: "narrow-text" | "default";
    mobileVideoMode?: "plain-16x9";
    textOverlays?: {
        text: string;
        start: number; // in seconds
        end: number; // in seconds
    }[];
    mobileTextOverlays?: {
        text: string;
        start: number; // in seconds
        end: number; // in seconds
    }[];
}

export const homeSections: HomeSection[] = [
    {
        id: 0,
        type: "scrolly-video",
        mobileMediaType: "video",
        title: "Video 1",
        mobileVariant: "narrow-text",
        // Controls the progress bar of the navigation buttons
        video: { start: "00:04:12", end: "00:09:15" },
        content: (
            <>
                <p>
                    Vayyar's technology records the daily life of your residents{" "}
                    without camera or sound
                </p>
                <p>
                    So you can improve the care you provide while increasing
                    your NOI and your staff's efficiency
                </p>
                <p>The era of AI-based care is here</p>
            </>
        ),
    },
    {
        id: 1.5,
        type: "product-intro",
        title: "Product Overview",
        imageSrc: "/images/product.png",
    },
    {
        id: 1.6,
        type: "scrolly-video",
        mobileMediaType: "video",
        title: "Efficiency",
        videoSrc: "/videos/optimize-staff.mp4",
        detailsSectionId: 1,
        content: (
            <div
                style={{
                    position: "absolute",
                    top: "20%",
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: "100%",
                }}
            >
                <h1 style={{ fontSize: "25px", textAlign: "center" }}>
                    Efficiency
                </h1>
                <p
                    style={{
                        lineHeight: "1.1",
                        textAlign: "center",
                        display: "inline-block",
                    }}
                >
                    Optimize your staff work and reduce their burden
                </p>
            </div>
        ),
    },
    {
        id: 1,
        type: "text",
        title: "Staff Optimization",
        header: (
            <>
                <span style={{ color: "#05aae9" }}></span>Do More With Less.
                {/* <br />
                Higher <span style={{ color: "#05aae9" }}>returns.</span> */}
            </>
        ),
        buttonText: "Staff optimization",
        scrollToTimeValue: "00:12:25",
        content: (
            <ul style={{ listStyle: "none", padding: 0 }}>
                <li
                    style={{
                        display: "flex",
                        gap: "0.5em",
                        marginBottom: "0.5rem",
                    }}
                >
                    <span style={{ color: "#05aae9" }}>›</span>
                    <span>
                        Use predictive insights to address potential patient
                        complications
                    </span>
                </li>
                <li
                    style={{
                        display: "flex",
                        gap: "0.5em",
                        marginBottom: "0.5rem",
                    }}
                >
                    <span style={{ color: "#05aae9" }}>›</span>
                    <span>Reduce Administrative tasks</span>
                </li>
                <li style={{ display: "flex", gap: "0.5em" }}>
                    <span style={{ color: "#05aae9" }}>›</span>
                    <span>Improved Operational Efficiencies</span>
                </li>
            </ul>
        ),
        text: { start: 5, end: 11 },
    },
    {
        id: 2,
        type: "scrolly-video",
        mobileMediaType: "video",
        title: "Real-time Alerts",
        videoSrc: "/videos/real-time-alerts.mp4",
        detailsSectionId: 3,
        content: (
            <div
                style={{
                    position: "absolute",
                    top: "20%",
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: "100%",
                }}
            >
                <h1 style={{ fontSize: "25px", textAlign: "center" }}>
                    Real-time Alerts
                </h1>
                <p
                    style={{
                        lineHeight: "1.1",
                        textAlign: "center",
                        display: "inline-block",
                    }}
                >
                    Alert your staff as things happen
                </p>
            </div>
        ),
    },
    {
        id: 3,
        type: "text",
        title: "Real-time Alerts",
        header: <>Real-time Alerts.</>,
        buttonText: "Real-time Alerts",
        scrollToTimeValue: "00:12:25",
        content: (
            <ul style={{ listStyle: "none", padding: 0 }}>
                <li
                    style={{
                        display: "flex",
                        gap: "0.5em",
                        marginBottom: "0.5rem",
                    }}
                >
                    <span style={{ color: "#05aae9" }}>›</span>
                    <span>
                        Receive immediate alerts when a resident experiences a
                        fall, ensuring faster assistance and peace of mind.
                    </span>
                </li>
                <li
                    style={{
                        display: "flex",
                        gap: "0.5em",
                        marginBottom: "0.5rem",
                    }}
                >
                    <span style={{ color: "#05aae9" }}>›</span>
                    <span>
                        Stay informed about unusual movement patterns that could
                        signal health or safety concerns.
                    </span>
                </li>
                <li style={{ display: "flex", gap: "0.5em" }}>
                    <span style={{ color: "#05aae9" }}>›</span>
                    <span>
                        Enhance resident safety and staff efficiency with
                        real-time notifications tailored for elderly care.
                    </span>
                </li>
            </ul>
        ),
        text: { start: 5, end: 11 },
    },
    {
        id: 3.2,
        type: "scrolly-video",
        mobileMediaType: "video",
        title: "Privacy",
        videoSrc: "/videos/privacy.mp4",
        detailsSectionId: 3.5,
        content: (
            <div
                style={{
                    position: "absolute",
                    top: "20%",
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: "100%",
                }}
            >
                <h1 style={{ fontSize: "25px", textAlign: "center" }}>
                    Privacy
                </h1>
                <p
                    style={{
                        lineHeight: "1.1",
                        textAlign: "center",
                        display: "inline-block",
                    }}
                >
                    Monitoring every movement without compromising privacy
                </p>
            </div>
        ),
    },
    {
        id: 3.5,
        type: "text",
        title: "Privacy",
        mobileVariant: "narrow-text",
        header: (
            <>
                <span
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.5em",
                    }}
                >
                    <span style={{ color: "#E53E3E", fontWeight: "bold" }}>
                        ✘
                    </span>{" "}
                    cameras.
                </span>
                <span
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.5em",
                    }}
                >
                    <span style={{ color: "#E53E3E", fontWeight: "bold" }}>
                        ✘
                    </span>{" "}
                    wearables.
                </span>

                <span
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.5em",
                    }}
                >
                    <span style={{ color: "#48BB78", fontWeight: "bold" }}>
                        ✔
                    </span>{" "}
                    privacy.
                </span>
            </>
        ),
        buttonText: "how we protect privacy",
        scrollToTimeValue: videoConfig.calculateTextTime(
            "00:46:03",
            videoConfig.compensation
        ),
        content: (
            <ul style={{ listStyle: "none", padding: 0 }}>
                <li
                    style={{
                        display: "flex",
                        gap: "0.5em",
                        marginBottom: "0.5rem",
                    }}
                >
                    <span style={{ color: "#05aae9" }}>›</span>
                    <span>Empower the care team with automated alerts.</span>
                </li>
                <li
                    style={{
                        display: "flex",
                        gap: "0.5em",
                        marginBottom: "0.5rem",
                    }}
                >
                    <span style={{ color: "#05aae9" }}>›</span>
                    <span>Ensure Care Plan Compliance</span>
                </li>
                <li
                    style={{
                        display: "flex",
                        gap: "0.5em",
                        marginBottom: "0.5rem",
                    }}
                >
                    <span style={{ color: "#05aae9" }}>›</span>
                    <span>Real Time Detection</span>
                </li>
            </ul>
        ),
        text: {
            start: 36 + videoConfig.compensation,
            end: 46 + videoConfig.compensation,
        },
    },
    {
        id: 4,
        type: "scrolly-video",
        mobileMediaType: "video",
        title: "AI Revolution",
        videoSrc: "/videos/ai-insights.mp4",
        detailsSectionId: 5,
        content: (
            <div
                style={{
                    position: "absolute",
                    top: "20%",
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: "100%",
                }}
            >
                <h1 style={{ fontSize: "25px", textAlign: "center" }}>
                    AI Revolution
                </h1>
                <p
                    style={{
                        lineHeight: "1.1",
                        textAlign: "center",
                        display: "inline-block",
                    }}
                >
                    Stay ahead with cutting-edge AI insights from our sensors
                    and an array of smart data
                </p>
            </div>
        ),
    },
    {
        id: 5,
        type: "text",
        title: "AI insights",
        header: (
            <>
                <span style={{ color: "#05aae9" }}>Actionable</span> insights.
                <br />
                Smarter <span style={{ color: "#05aae9" }}>staffing</span>.
                <br />
                <span style={{ color: "#05aae9" }}>Safer</span> residents.
            </>
        ),
        buttonText: "AI insights",
        scrollToTimeValue: "01:41:21",
        content: (
            <ul style={{ listStyle: "none", padding: 0 }}>
                <li
                    style={{
                        display: "flex",
                        gap: "0.5em",
                        marginBottom: "0.5rem",
                    }}
                >
                    <span style={{ color: "#05aae9" }}>›</span>
                    <span>Analyze trends to detect risk.</span>
                </li>
                <li
                    style={{
                        display: "flex",
                        gap: "0.5em",
                        marginBottom: "0.5rem",
                    }}
                >
                    <span style={{ color: "#05aae9" }}>›</span>
                    <span>Enhancing staff efficiency</span>
                </li>
                <li style={{ display: "flex", gap: "0.5em" }}>
                    <span style={{ color: "#05aae9" }}>›</span>
                    <span>Ensure Care Plan Compliance</span>
                </li>
            </ul>
        ),
        text: {
            start: 80 + videoConfig.compensation,
            end: 92 + videoConfig.compensation,
        },
    },
    {
        id: 6,
        type: "scrolly-video",
        mobileMediaType: "video",
        title: "Personalize care",
        videoSrc: "videos/personalize-care.mp4",
        detailsSectionId: 7,
        content: (
            <div
                style={{
                    position: "absolute",
                    top: "20%",
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: "100%",
                }}
            >
                <h1 style={{ fontSize: "25px", textAlign: "center" }}>
                    Personalize care
                </h1>
                <p
                    style={{
                        lineHeight: "1.1",
                        textAlign: "center",
                        display: "inline-block",
                    }}
                >
                    Experience the power of immediate, accurate insights for
                    truly personalized care.
                </p>
            </div>
        ),
    },
    {
        id: 7,
        type: "text",
        title: "Personalized Care",
        mobileVariant: "narrow-text",
        header: (
            <>
                The <span style={{ color: "#05aae9" }}>right</span> strategy.{" "}
                <br />
                At the right <span style={{ color: "#05aae9" }}>return.</span>
            </>
        ),
        buttonText: "Personalized Care",
        scrollToTimeValue: "02:53:06",
        content: (
            <ul style={{ listStyle: "none", padding: 0 }}>
                <li
                    style={{
                        display: "flex",
                        gap: "0.5em",
                        marginBottom: "0.5rem",
                    }}
                >
                    <span style={{ color: "#05aae9" }}>›</span>
                    <span>
                        Uncover hidden efficiencies that reduce unnecessary
                        labor hours and care mismatches.
                    </span>
                </li>
                <li
                    style={{
                        display: "flex",
                        gap: "0.5em",
                        marginBottom: "0.5rem",
                    }}
                >
                    <span style={{ color: "#05aae9" }}>›</span>
                    <span>
                        Align care levels with reimbursement potential to
                        support justified rate increases.
                    </span>
                </li>
                <li style={{ display: "flex", gap: "0.5em" }}>
                    <span style={{ color: "#05aae9" }}>›</span>
                    <span>
                        Optimize NOI by transforming real-time insights into
                        smarter operational decisions.
                    </span>
                </li>
            </ul>
        ),
        text: {
            start: 2 * 60 + 41,
            end: 2 * 60 + 50,
        },
    },
    {
        id: 8,
        type: "scrolly-video",
        mobileMediaType: "video",
        title: "Improve NOI",
        videoSrc: "videos/increase-noi.mp4",
        detailsSectionId: 9,
        content: (
            <div
                style={{
                    position: "absolute",
                    top: "20%",
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: "100%",
                }}
            >
                <h1 style={{ fontSize: "25px", textAlign: "center" }}>
                    Improve NOI
                </h1>
                <p
                    style={{
                        lineHeight: "1.1",
                        textAlign: "center",
                        display: "inline-block",
                    }}
                >
                    Boost your NOI and maximize returns through trusted,
                    data-driven care plans.
                </p>
            </div>
        ),
    },
    {
        id: 9,
        type: "text",
        title: "Improve NOI",
        header: (
            <>
                Built to <span style={{ color: "#05aae9" }}>scale</span>.
            </>
        ),
        buttonText: "increase NOI",
        scrollToTimeValue: "00:01:32:33",
        content: (
            <ul style={{ listStyle: "none", padding: 0 }}>
                <li
                    style={{
                        display: "flex",
                        gap: "0.5em",
                        marginBottom: "0.5rem",
                    }}
                >
                    <span style={{ color: "#05aae9" }}>›</span>
                    <span>
                        Turn insights into enterprise-wide transformation.
                    </span>
                </li>
            </ul>
        ),
    },
    // {
    //     id: 9,
    //     type: "text",
    //     title: "Increase NOI",
    //     header: (
    //         <>
    //             Built to <span style={{ color: "#05aae9" }}>scale</span>.
    //         </>
    //     ),
    //     buttonText: "increase NOI",
    //     scrollToTimeValue: "00:01:32:33",
    //     content: (
    //         <ul style={{ listStyle: "none", padding: 0 }}>
    //             <li
    //                 style={{
    //                     display: "flex",
    //                     gap: "0.5em",
    //                     marginBottom: "0.5rem",
    //                 }}
    //             >
    //                 <span style={{ color: "#05aae9" }}>›</span>
    //                 <span>
    //                     Turn insights into enterprise-wide transformation.
    //                 </span>
    //             </li>
    //         </ul>
    //     ),
    // },
    // {
    //     id: 10,
    //     type: "scrolly-video",
    //     title: "Video 2",
    //     video: {
    //         start: videoConfig.calculateTextTime(
    //             "00:35:04",
    //             videoConfig.compensation
    //         ),
    //         end: videoConfig.calculateTextTime(
    //             "01:17:26",
    //             videoConfig.compensation
    //         ),
    //     },
    //     content: (
    //         <span
    //             style={{
    //                 position: "absolute",
    //                 top: "20%",
    //                 left: "50%",
    //                 transform: "translateX(-50%)",
    //                 width: "100%",
    //             }}
    //         >
    //             <h1 style={{ fontSize: "25px", textAlign: "center" }}>
    //                 Efficiency
    //             </h1>
    //             <p
    //                 style={{
    //                     lineHeight: "1.1",
    //                     textAlign: "center",
    //                     display: "inline-block",
    //                 }}
    //             >
    //                 Optimize your staff work and reduce their burden
    //             </p>
    //         </span>
    //     ),
    // },
];
