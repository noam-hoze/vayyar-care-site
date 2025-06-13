import {JSX} from "react";

export interface HomeSection {
  type: "text" | "video";
  title: string;
  header?: string;
  content?: string | JSX.Element; // for text
  video?: {
    start: number; // in seconds
    end: number;   // in seconds
  };
  text?: {
    start: number; // in seconds
    end?: number;  // in seconds
  };
}

export const homeSections: HomeSection[] = [
  { type: "text", title: "Intro", header: "What does the AI give", content: (
        <ul className="list-disc">
          <li>Highlight Patient Anomalies</li>
          <li>Summarize Care Activities</li>
          <li>Get Optimized Care Recommendations</li>
        </ul>
    ), text: { start: 15, end: 25 } },
  { type: "video", title: "Video 1", video: { start: 0, end: 30 } },
  { type: "text", title: "Section 2", header: "Key Features", content: (
        <ul className="list-disc">
          <li>No Cameras</li>
          <li>No Wearables</li>
        </ul>
    ), text: { start: 65, end: 75 } },
  { type: "video", title: "Video 2", video: { start: 30, end: 60 } },
  { type: "text", title: "Summary", header: "Sum up our insights capabilities", content: (
        <ul className="list-disc">
          <li>Reveal patterns and uncover behavioral anomalies, enabling smart plans for evolving care needs</li>
          <li>Filter through endless day-to-day activities and events, establishing the links between resident falls and their causes - current medication plan or other</li>
          <li>Ensure complience with care plans and validate execution of staffing plans</li>
        </ul>
      ), text: { start: 82, end: 90 } },
];
