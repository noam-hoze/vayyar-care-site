"use client";

import { Stream, StreamPlayerApi } from "@cloudflare/stream-react";
import { CLOUDFLARE_STREAM_VIDEO_ID } from "@/config/streamConfig";
import { useRef } from "react";

const TestPage = () => {
    const videoId = CLOUDFLARE_STREAM_VIDEO_ID;
    const streamRef = useRef<StreamPlayerApi | null>(null);

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: "100vh",
                backgroundColor: "#f0f0f0",
                padding: "20px",
            }}
        >
            <h1 style={{ marginBottom: "20px", color: "#333" }}>
                Cloudflare Stream Test Page
            </h1>
            {videoId ? (
                <div style={{ width: "80%", maxWidth: "800px" }}>
                    <Stream
                        src={videoId}
                        streamRef={
                            streamRef as React.MutableRefObject<
                                StreamPlayerApi | undefined
                            >
                        }
                        width="100%"
                        height="100%"
                        autoplay
                        muted
                    />
                </div>
            ) : (
                <p style={{ color: "red" }}>Video ID is not configured.</p>
            )}
            <div style={{ marginTop: "20px" }}>
                <button
                    onClick={() => streamRef.current?.play()}
                    style={{ marginRight: "10px", padding: "10px" }}
                >
                    Play
                </button>
                <button
                    onClick={() => streamRef.current?.pause()}
                    style={{ padding: "10px" }}
                >
                    Pause
                </button>
            </div>
        </div>
    );
};

export default TestPage;
