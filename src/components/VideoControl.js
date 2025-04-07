import React, { useState, useEffect } from "react";
import {
    updateVideoSource,
    resetToDefaultVideo,
    isCustomVideoActive,
} from "../config/videoConfig";
import { storage } from "../config/firebaseConfig";
import {
    ref,
    uploadBytesResumable,
    getDownloadURL,
    deleteObject,
} from "firebase/storage";

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
    const [customVideoActive, setCustomVideoActive] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [isUploading, setIsUploading] = useState(false);
    const [currentVideoUrl, setCurrentVideoUrl] = useState("");

    // Check if a custom video is active on component mount
    useEffect(() => {
        const active = isCustomVideoActive();
        setCustomVideoActive(active);

        // Store the current video URL for potential deletion
        if (active) {
            setCurrentVideoUrl(
                localStorage.getItem("vayyar_custom_video") || ""
            );
        }
    }, []);

    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();

        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);

        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleFile(e.dataTransfer.files[0]);
        }
    };

    const handleChange = (e) => {
        e.preventDefault();

        if (e.target.files && e.target.files[0]) {
            handleFile(e.target.files[0]);
        }
    };

    const validateFile = (file) => {
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

    const handleFile = async (file) => {
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
                            setCustomVideoActive(true);
                            setUploadStatus("Video uploaded successfully!");
                            setIsUploading(false);

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

    const handleReset = () => {
        // If there's a current video URL and it's from Firebase Storage
        if (
            currentVideoUrl &&
            currentVideoUrl.includes("firebasestorage.googleapis.com")
        ) {
            try {
                // Extract the file path from the URL
                const fileUrl = new URL(currentVideoUrl);
                const pathWithQuery = fileUrl.pathname;
                const decodedPath = decodeURIComponent(pathWithQuery);

                // Firebase Storage URLs contain a token after the path
                const pathParts = decodedPath.split("/o/");
                if (pathParts.length > 1) {
                    // Get the actual file path
                    let filePath = pathParts[1];
                    // Remove any query parameters
                    if (filePath.includes("?")) {
                        filePath = filePath.split("?")[0];
                    }

                    // Create a reference to the file
                    const fileRef = ref(storage, filePath);

                    // Delete the file
                    deleteObject(fileRef)
                        .then(() => {
                            console.log(
                                "Video deleted successfully from Firebase Storage"
                            );
                        })
                        .catch((error) => {
                            console.error("Error deleting video:", error);
                        });
                }
            } catch (error) {
                console.error("Error parsing video URL:", error);
            }
        }

        // Reset to default video
        resetToDefaultVideo();
        setCustomVideoActive(false);
        setCurrentVideoUrl("");

        // Force page reload to apply changes to video
        window.location.reload();
    };

    return (
        <div className="video-control-panel">
            <div
                className={`video-drop-area ${dragActive ? "active" : ""}`}
                onDragEnter={handleDrag}
                onDragOver={handleDrag}
                onDragLeave={handleDrag}
                onDrop={handleDrop}
            >
                <input
                    type="file"
                    id="video-upload"
                    accept="video/mp4,video/webm,video/ogg,video/quicktime"
                    onChange={handleChange}
                    className="video-input"
                />
                <label htmlFor="video-upload" className="video-upload-label">
                    <div className="upload-icon">📁</div>
                    <span>Drag & drop a video or click to browse</span>
                    <div className="upload-hint">
                        Max size: 50MB (.mp4, .webm, .ogg, .mov)
                    </div>
                </label>
            </div>

            {isUploading && (
                <div className="upload-progress">
                    <div className="progress-container">
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

            {customVideoActive && (
                <button
                    className="video-control-btn reset-btn"
                    onClick={handleReset}
                >
                    Reset to Default Video
                </button>
            )}
        </div>
    );
};

export default VideoControl;
