import { JSX } from "react";
import { videoConfig } from "@/config/videoConfig";

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
        id: 3,
        type: "video",
        title: "Video 2",
        video: {
            start: videoConfig.calculateTextTime(
                "00:35:04",
                videoConfig.compensation
            ),
            end: videoConfig.calculateTextTime(
                "01:17:26",
                videoConfig.compensation
            ),
        },
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
        id: 5,
        type: "video",
        title: "Video 3",
        video: {
            start: videoConfig.calculateTextTime(
                "01:33:02",
                videoConfig.compensation
            ),
            end: videoConfig.calculateTextTime(
                "02:10:03",
                videoConfig.compensation
            ),
        },
    },
    {
        id: 6,
        type: "text",
        title: "Personalized Care",
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
        id: 7,
        type: "video",
        title: "Video 3",
        video: {
            start: videoConfig.calculateTextTime(
                "02:13:07",
                videoConfig.compensation
            ),
            end: videoConfig.calculateTextTime(
                "02:33:03",
                videoConfig.compensation
            ),
        },
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
        video: {
            start: videoConfig.calculateTextTime(
                "02:33:03",
                videoConfig.compensation
            ),
            end: videoConfig.calculateTextTime(
                "02:58:00",
                videoConfig.compensation
            ),
        },
    },
];
