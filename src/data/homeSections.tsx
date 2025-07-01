import { JSX } from "react";

export interface HomeSection {
    id: number;
    type: "text" | "video";
    title: string;
    header?: React.ReactNode;
    content?: string | JSX.Element; // for text
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
}

export const homeSections: HomeSection[] = [
    {
        id: 0,
        type: "text",
        title: "Workforce Optimization",
        header: (
            <>
                <span style={{ color: "#05aae9" }}></span>Do More With Less.
                {/* <br />
                Higher <span style={{ color: "#05aae9" }}>returns.</span> */}
            </>
        ),
        buttonText: "workforce optimization",
        scrollToTimeValue: "00:00:12:06",
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
        id: 1,
        type: "video",
        title: "Video 1",
        // Controls the progress bar of the navigation buttons
        video: { start: "00:12:06", end: "00:34:11" },
    },
    {
        id: 2,
        type: "text",
        title: "Real-time Alerts",
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
        scrollToTimeValue: "00:00:46:03",
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
                    <span>Lower staff overload with automatic alerts</span>
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
                        Confirm that care routines are thoroughly followed
                    </span>
                </li>
            </ul>
        ),
        text: { start: 36, end: 46 },
    },
    {
        id: 3,
        type: "video",
        title: "Video 2",
        video: { start: "00:35:04", end: "01:17:26" },
    },
    {
        id: 4,
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
        text: { start: 80, end: 92 },
    },
    {
        id: 5,
        type: "video",
        title: "Video 3",
        video: { start: "01:33:02", end: "02:10:03" },
    },
    {
        id: 6,
        type: "text",
        title: "Personalized Care",
        header: (
            <>
                The <span style={{ color: "#05aae9" }}>right</span> care. <br />
                At the right <span style={{ color: "#05aae9" }}>rate.</span>
            </>
        ),
        buttonText: "Personalized Care",
        scrollToTimeValue: "00:02:12:00",
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
                        Data-backed conversations support higher levels of care,
                        aligned with actual resident needs.
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
                        More informed families = stronger trust, longer stays,
                        fewer disputes.
                    </span>
                </li>
                <li style={{ display: "flex", gap: "0.5em" }}>
                    <span style={{ color: "#05aae9" }}>›</span>
                    <span>
                        Precision in care planning enables justified rate
                        adjustments and improved NOI.
                    </span>
                </li>
            </ul>
        ),
        text: { start: 113, end: 130 },
    },
    {
        id: 7,
        type: "video",
        title: "Video 3",
        video: { start: "02:13:07", end: "02:33:03" },
    },
    {
        id: 8,
        type: "text",
        title: "Increase NOI",
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
    {
        id: 9,
        type: "video",
        title: "Video 3",
        video: { start: "02:33:03", end: "02:58:00" },
    },
];
