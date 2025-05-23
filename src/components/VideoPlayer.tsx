"use client";

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { VIDEO_CHUNKS, VideoChunk } from '@/config/videoConfig';

interface VideoPlayerProps {
    currentTime: number;
    onTimeUpdate?: (time: number) => void;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ currentTime, onTimeUpdate }) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [preloadedBlobs, setPreloadedBlobs] = useState<Map<number, string>>(new Map());
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

        // Get the preloaded blob URL for this chunk
        const blobUrl = preloadedBlobs.get(newChunk.id);
        if (blobUrl) {
            console.log(`Switching to preloaded chunk ${newChunk.id}`);
            video.src = blobUrl;
        } else {
            console.log(`Switching to chunk ${newChunk.id} using original URL`);
            video.src = newChunk.path;
        }
        video.load();
        setCurrentChunk(newChunk);
    }, [isVideoReady, preloadedBlobs]);

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
    const preloadAllChunks = async () => {
        console.log('Starting to preload all chunks');
        
        // Function to load next chunk
        const loadNextChunk = async (index: number) => {
            if (index >= VIDEO_CHUNKS.chunks.length) {
                console.log('All chunks preloaded successfully');
                return;
            }

            const chunk = VIDEO_CHUNKS.chunks[index];
            console.log(`Preloading chunk ${index}: ${chunk.path}`);

            try {
                // Fetch the video as blob
                const response = await fetch(chunk.path);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const blob = await response.blob();

                // Create blob URL
                const blobUrl = URL.createObjectURL(blob);
                console.log(`Created blob URL for chunk ${index}: ${blobUrl}`);

                // Store the blob URL
                setPreloadedBlobs(prev => {
                    const newMap = new Map(prev);
                    newMap.set(index, blobUrl);
                    return newMap;
                });

                // Load next chunk
                await loadNextChunk(index + 1);

            } catch (error) {
                console.error(`Failed to preload chunk ${index}:`, error);
                // Continue with next chunk even if one fails
                await loadNextChunk(index + 1);
            }
        };

        // Start loading chunks
        await loadNextChunk(0);
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