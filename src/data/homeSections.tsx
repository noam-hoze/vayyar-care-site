import { JSX } from "react";

export interface HomeSection {
    type: "text" | "video";
    title: string;
    header?: React.ReactNode;
    content?: string | JSX.Element; // for text
    video?: {
        start: number; // in seconds
        end: number; // in seconds
    };
    text?: {
        start: number; // in seconds
        end?: number; // in seconds
    };
}

export const homeSections: HomeSection[] = [
    {
        type: "text",
        title: "Intro",
        header: (
            <>
                <span style={{ color: "#05aae9" }}>Smooth</span> operations.
                <br />
                High <span style={{ color: "#05aae9" }}>returns.</span>
            </>
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
                    <span>Spot Costly Issues Before They Escalate</span>
                </li>
                <li
                    style={{
                        display: "flex",
                        gap: "0.5em",
                        marginBottom: "0.5rem",
                    }}
                >
                    <span style={{ color: "#05aae9" }}>›</span>
                    <span>Automate Activity Summaries to Save Staff Hours</span>
                </li>
                <li style={{ display: "flex", gap: "0.5em" }}>
                    <span style={{ color: "#05aae9" }}>›</span>
                    <span>
                        Turn Insights Into Actions That Cut Waste and Drive
                        Margin
                    </span>
                </li>
            </ul>
        ),
        text: { start: 5, end: 11 },
    },
    { type: "video", title: "Video 1", video: { start: 0, end: 30 } },
    {
        type: "text",
        title: "Intro",
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
                        24/7 Automated Patient Monitoring.
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
                        Real-time emergency alerts, enabling fast staff
                        response.
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
                        Verified emergency patient care.
                    </span>
                </li>
            </ul>
        ),
        text: { start: 36, end: 46 },
    },
    { type: "video", title: "Video 2", video: { start: 30, end: 60 } },
    {
        type: "text",
        title: "Summary",
        header: (
            <>
                <span style={{ color: "#05aae9" }}>Actionable</span> insights.
                <br />
                Smarter <span style={{ color: "#05aae9" }}>staffing</span>.
                <br />
                <span style={{ color: "#05aae9" }}>Safer</span> residents.
            </>
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
                    <span>
                        Reveal patterns and uncover behavioral anomalies,
                        enabling smart plans for evolving care needs.
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
                        Establish the links between resident falls and their
                        causes.
                    </span>
                </li>
                <li style={{ display: "flex", gap: "0.5em" }}>
                    <span style={{ color: "#05aae9" }}>›</span>
                    <span>
                        Ensure complience with care plans and validate execution
                        of staffing plans.
                    </span>
                </li>
            </ul>
        ),
        text: { start: 80, end: 92 },
    },
];
