"use client";

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { VIDEO_CHUNKS, VideoChunk } from '@/config/videoConfig';

interface VideoPlayerProps {
    currentTime: number;
    onTimeUpdate?: (time: number) => void;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ currentTime, onTimeUpdate }) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [currentChunk, setCurrentChunk] = useState<VideoChunk>(VIDEO_CHUNKS.chunks[0]);
    const [isVideoReady, setIsVideoReady] = useState(false);
    const lastUpdateTimeRef = useRef<number>(0);

    // Function to get the current chunk based on time
    const getChunkForTime = (time: number): VideoChunk => {
        // Find the chunk that contains this time
        const chunk = VIDEO_CHUNKS.chunks.find(chunk => 
            time >= chunk.startTime && time < chunk.startTime + chunk.duration
        ) || VIDEO_CHUNKS.chunks[0];
        
        return chunk;
    };

    // Function to handle chunk change
    const changeChunk = useCallback((newChunk: VideoChunk) => {
        const video = videoRef.current;
        if (!video || !isVideoReady) return;

        video.src = newChunk.path;
        video.load();
        setCurrentChunk(newChunk);
    }, [isVideoReady]);

    // Initialize video element
    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        const handleLoadedMetadata = () => {
            console.log('Video metadata loaded, duration:', video.duration);
            setIsVideoReady(true);
        };

        const handleError = (e: Event) => {
            console.error('Video error:', e);
            setIsVideoReady(false);
        };

        video.addEventListener('loadedmetadata', handleLoadedMetadata);
        video.addEventListener('error', handleError);

        // Set initial source
        video.src = VIDEO_CHUNKS.chunks[0].path;
        video.load();

        // Preload all chunks on mount
        preloadAllChunks();

        return () => {
            video.removeEventListener('loadedmetadata', handleLoadedMetadata);
            video.removeEventListener('error', handleError);
        };
    }, []);

    // Function to preload all chunks once on mount
    const preloadAllChunks = () => {
        console.log('Starting to preload all chunks');
        
        // Create a hidden video element for preloading
        const preloadVideo = document.createElement('video');
        preloadVideo.style.display = 'none';
        
        // Add to document temporarily
        document.body.appendChild(preloadVideo);
        
        // Function to load next chunk
        const loadNextChunk = (index: number) => {
            if (index >= VIDEO_CHUNKS.totalChunks) {
                // Cleanup when done
                document.body.removeChild(preloadVideo);
                preloadVideo.remove();
                console.log('All chunks preloaded successfully');
                return;
            }

            const chunk = VIDEO_CHUNKS.chunks[index];
            console.log(`Preloading chunk ${index}: ${chunk.path}`);
            
            preloadVideo.src = chunk.path;
            preloadVideo.preload = 'auto';
            
            // Wait for chunk to load
            const handleCanPlay = () => {
                console.log(`Finished loading chunk ${index}`);
                preloadVideo.removeEventListener('canplay', handleCanPlay);
                loadNextChunk(index + 1);
            };

            // Add error handler
            const handleError = (e: Event) => {
                console.error(`Error loading chunk ${index}:`, e);
                preloadVideo.removeEventListener('error', handleError);
                // Continue with next chunk even if one fails
                loadNextChunk(index + 1);
            };

            preloadVideo.addEventListener('canplay', handleCanPlay);
            preloadVideo.addEventListener('error', handleError);
            
            preloadVideo.load();
        };

        // Start loading chunks
        loadNextChunk(0);
    };

    // Memoize the time update handler
    const handleTimeUpdate = useCallback(() => {
        const video = videoRef.current;
        if (!video || !isVideoReady) return;

        const totalTime = currentChunk.startTime + video.currentTime;
        // Only update if the time has changed significantly (more than 0.1 seconds)
        if (Math.abs(totalTime - lastUpdateTimeRef.current) > 0.1) {
            lastUpdateTimeRef.current = totalTime;
            onTimeUpdate?.(totalTime);
        }
    }, [currentChunk, onTimeUpdate, isVideoReady]);

    // Update video source and time when currentTime changes
    useEffect(() => {
        const video = videoRef.current;
        if (!video || !isVideoReady) return;

        const newChunk = getChunkForTime(currentTime);
        
        if (newChunk.id !== currentChunk.id) {
            // Update time first to prevent oscillation
            const chunkTime = currentTime - newChunk.startTime;
            if (Math.abs(video.currentTime - chunkTime) > 0.1) {
                video.currentTime = chunkTime;
            }
            
            // Only change chunk if we're not at the start of the next chunk
            if (Math.abs(video.currentTime) > 0.1) {
                changeChunk(newChunk);
            }
        } else {
            // For current chunk, update time normally
            const chunkTime = currentTime - newChunk.startTime;
            if (Math.abs(video.currentTime - chunkTime) > 0.1) {
                video.currentTime = chunkTime;
            }
        }
    }, [currentTime, currentChunk.id, isVideoReady, changeChunk]);

    // Handle video time updates
    useEffect(() => {
        const video = videoRef.current;
        if (!video || !isVideoReady) return;

        video.addEventListener('timeupdate', handleTimeUpdate);
        return () => video.removeEventListener('timeupdate', handleTimeUpdate);
    }, [handleTimeUpdate, isVideoReady]);

    return (
        <video
            ref={videoRef}
            className="w-full h-full object-cover"
            playsInline
            muted
            preload="auto"
            onError={(e) => {
                console.error('Video error:', e);
            }}
            onLoadStart={() => {
                console.log('Main video started loading');
            }}
            onLoadedData={() => {
                console.log('Main video loaded');
            }}
        />
    );
};

export default VideoPlayer; 