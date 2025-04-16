import React from "react";

interface VideoModalProps {
    src: string; // The URL of the video to display
    onClose: () => void; // Function to call when the close button is clicked
}

const VideoModal: React.FC<VideoModalProps> = ({ src, onClose }) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg overflow-hidden w-full max-w-3xl relative">
                <button
                    className="absolute top-2 right-2 text-gray-700 text-xl font-bold hover:text-black z-10"
                    onClick={onClose} // Use the passed onClose function
                >
                    ×
                </button>
                <iframe
                    className="w-full h-[400px] md:h-[500px]"
                    src={src} // Use the src prop
                    title="Testimonial Video"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                ></iframe>
            </div>
        </div>
    );
};

export default VideoModal;
