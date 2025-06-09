export interface HomeSection {
  type: "text" | "video";
  title: string;
  header?: string;
  content?: string; // for text
  video?: {
    start: number; // in seconds
    end: number;   // in seconds
  };
}

export const homeSections: HomeSection[] = [
  { type: "text", title: "Intro", header: "Welcome to Our Solution", content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus." },
  { type: "video", title: "Video 1", video: { start: 0, end: 30 } },
  { type: "text", title: "Section 2", header: "Key Features", content: "Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor." },
  { type: "video", title: "Video 2", video: { start: 30, end: 60 } },
  { type: "text", title: "Summary", header: "Get Started Today", content: "Cras elementum ultrices diam. Maecenas ligula massa, varius a, semper congue, euismod non, mi." },
]; 