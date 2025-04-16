import React from "react";
import Image from "next/image";

interface VideoItemProps {
    thumbnailName: string; // e.g., "anthropos_testimonial.png"
    altText: string;
    videoFileName: string; // e.g., "anthropos_testimonial.mp4"
    onPlay: (fullVideoUrl: string) => void; // Renamed from onClick
}

const VideoItem: React.FC<VideoItemProps> = ({
    thumbnailName,
    altText,
    videoFileName,
    onPlay,
}) => {
    const thumbnailPath = `/videos/${thumbnailName}`;
    const fullVideoUrl = `https://firebasestorage.googleapis.com/v0/b/walabothome-app-cloud.appspot.com/o/testimonials%2F${videoFileName}?alt=media`;

    return (
        <Image
            src={thumbnailPath}
            alt={altText}
            width={320}
            height={192}
            className="object-cover rounded-md cursor-pointer hover:opacity-80 transition"
            onClick={() => onPlay(fullVideoUrl)} // Call onPlay with the constructed URL
        />
    );
};

export default VideoItem;
