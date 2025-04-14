import React, { useState, useEffect, useRef } from "react";
import {
    updateVideoSource,
    isCustomVideoActive,
    clearVideoSource,
} from "../config/videoConfig";
import { storage } from "../config/firebaseConfig";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

// Maximum file size (50MB) - reduced for better web compatibility
const MAX_FILE_SIZE = 50 * 1024 * 1024;
// Allowed video formats
const ALLOWED_VIDEO_FORMATS = [
    "video/mp4",
    "video/webm",
    "video/ogg",
    "video/quicktime",
];

const VideoControl = () => {
    const [dragActive, setDragActive] = useState(false);
    const [uploadStatus, setUploadStatus] = useState("");
    const [uploadProgress, setUploadProgress] = useState(0);
    const [isUploading, setIsUploading] = useState(false);
    const [currentVideoUrl, setCurrentVideoUrl] = useState("");
    const [uploadMode, setUploadMode] = useState(false);
    const [hasCustomVideo, setHasCustomVideo] = useState(false);
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    // Check if a custom video is active
    useEffect(() => {
        setHasCustomVideo(isCustomVideoActive());
    }, []);

    const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();

        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);

        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleFile(e.dataTransfer.files[0] as File);
        }
    };

    const handleButtonClick = () => {
        setUploadMode(!uploadMode);
    };

    const handleClearVideo = () => {
        clearVideoSource();
        setHasCustomVideo(false);
        window.location.reload();
    };

    const handleFileInputClick = () => {
        fileInputRef.current?.click();
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();

        if (e.target.files && e.target.files[0]) {
            handleFile(e.target.files[0] as File);
        }
    };

    const validateFile = (file: File): string | null => {
        // Check if the file is a video
        if (!file.type.startsWith("video/")) {
            return "Please upload a valid video file.";
        }

        // Check if the format is allowed
        if (!ALLOWED_VIDEO_FORMATS.includes(file.type)) {
            return `Unsupported format. Please upload a video in one of these formats: MP4, WebM, OGG, MOV.`;
        }

        // Check file size
        if (file.size > MAX_FILE_SIZE) {
            return `File size exceeds maximum limit (50MB). Your file is ${(
                file.size /
                (1024 * 1024)
            ).toFixed(2)}MB.`;
        }

        return null;
    };

    const handleFile = async (file: File) => {
        const validationError = validateFile(file);
        if (validationError) {
            setUploadStatus(validationError);
            return;
        }

        try {
            setUploadStatus("Uploading video to Firebase...");
            setIsUploading(true);
            setUploadProgress(0);

            // Create a timestamp to make file names unique
            const timestamp = new Date().getTime();
            const fileExtension = file.name.split(".").pop();
            const safeFileName = `video_${timestamp}.${fileExtension}`;

            // Create a storage reference with a unique file name
            const storageRef = ref(storage, `videos/${safeFileName}`);

            // Upload file to Firebase Storage with reduced chunk size for better stability
            const uploadTask = uploadBytesResumable(storageRef, file);

            // Listen for state changes, errors, and completion of the upload
            uploadTask.on(
                "state_changed",
                (snapshot) => {
                    // Get upload progress
                    const progress = Math.round(
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                    );
                    setUploadProgress(progress);
                },
                (error) => {
                    // Handle unsuccessful uploads
                    console.error("Upload error:", error);
                    console.error("Error code:", error.code);
                    console.error("Error message:", error.message);
                    console.error("Error details:", error.serverResponse);

                    // Show more specific error message to the user
                    let errorMessage =
                        "Error uploading video. Please try again.";

                    if (error.code === "storage/unauthorized") {
                        errorMessage =
                            "Permission denied: Not authorized to upload to this location.";
                    } else if (error.code === "storage/canceled") {
                        errorMessage = "Upload was cancelled.";
                    } else if (error.code === "storage/quota-exceeded") {
                        errorMessage =
                            "Storage quota exceeded. Please contact administrator.";
                    } else if (error.code === "storage/invalid-checksum") {
                        errorMessage =
                            "File upload failed validation. Please try again.";
                    } else if (error.code === "storage/retry-limit-exceeded") {
                        errorMessage =
                            "Maximum retry attempts exceeded. Check your connection and try again.";
                    } else if (error.code === "storage/unknown") {
                        errorMessage =
                            "Unknown error occurred. Please check console for details.";
                    }

                    setUploadStatus(errorMessage);
                    setIsUploading(false);
                },
                () => {
                    // Handle successful uploads on complete
                    getDownloadURL(uploadTask.snapshot.ref).then(
                        (downloadURL) => {
                            // Store the new video URL
                            setCurrentVideoUrl(downloadURL);

                            // Update the video source in the config
                            updateVideoSource(downloadURL);
                            setUploadStatus("Video uploaded successfully!");
                            setIsUploading(false);
                            setUploadMode(false);
                            setHasCustomVideo(true);

                            // Clear status message after 3 seconds
                            setTimeout(() => {
                                setUploadStatus("");
                            }, 3000);

                            // Force page reload to apply changes to video
                            window.location.reload();
                        }
                    );
                }
            );
        } catch (error) {
            console.error("Unexpected error during upload setup:", error);
            setUploadStatus("An unexpected error occurred. Please try again.");
            setIsUploading(false);
        }
    };

    return (
        <>
            {!uploadMode ? (
                <div className="video-buttons-container">
                    <button
                        className="video-button upload-button"
                        onClick={handleButtonClick}
                    >
                        Upload Video
                    </button>
                    {hasCustomVideo && (
                        <button
                            className="video-button clear-button"
                            onClick={handleClearVideo}
                        >
                            Clear Video
                        </button>
                    )}
                </div>
            ) : (
                <div className="upload-container">
                    <div
                        className={`dropzone ${dragActive ? "active" : ""}`}
                        onDragEnter={handleDrag}
                        onDragOver={handleDrag}
                        onDragLeave={handleDrag}
                        onDrop={handleDrop}
                        onClick={handleFileInputClick}
                    >
                        <input
                            ref={fileInputRef}
                            type="file"
                            id="video-upload"
                            accept="video/mp4,video/webm,video/ogg,video/quicktime"
                            onChange={handleChange}
                            className="video-input"
                        />
                        <div className="dropzone-content">
                            <svg
                                className="upload-icon"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M12 16L12 8"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                />
                                <path
                                    d="M9 11L12 8L15 11"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                <path
                                    d="M8 16H16"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                />
                            </svg>
                            <span>Drop video or click</span>
                        </div>
                    </div>

                    <div className="upload-actions">
                        <span className="upload-info">
                            Max: 50MB (mp4, webm, mov)
                        </span>
                        <button
                            className="cancel-button"
                            onClick={() => setUploadMode(false)}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            )}

            {isUploading && (
                <div className="upload-progress">
                    <div className="progress-bar-container">
                        <div
                            className="progress-bar"
                            style={{ width: `${uploadProgress}%` }}
                        ></div>
                    </div>
                    <div className="progress-text">{uploadProgress}%</div>
                </div>
            )}

            {uploadStatus && (
                <div className="upload-status">{uploadStatus}</div>
            )}
        </>
    );
};

export default VideoControl;
