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
                <span style={{ color: "#05aae9" }}>Better</span> operations.
                <br />
                Higher <span style={{ color: "#05aae9" }}>returns.</span>
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
                    <span>Spot Costly Patient Issues Before They Escalate</span>
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
                        Turn Insights Into Action That Cuts Waste and Drives
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
                    dignity.
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
                    <span>Respond to critical events in real time</span>
                </li>
                <li
                    style={{
                        display: "flex",
                        gap: "0.5em",
                        marginBottom: "0.5rem",
                    }}
                >
                    <span style={{ color: "#05aae9" }}>›</span>
                    <span>Lower staff burden with automatic alerts</span>
                </li>
                <li
                    style={{
                        display: "flex",
                        gap: "0.5em",
                        marginBottom: "0.5rem",
                    }}
                >
                    <span style={{ color: "#05aae9" }}>›</span>
                    <span>Reduce risk, liability</span>
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
                        Filter through endless day-to-day activities and events,
                        establishing the links between resident falls and their
                        causes - current medication plan or other.
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
        text: { start: 80, end: 105 },
    },
];
