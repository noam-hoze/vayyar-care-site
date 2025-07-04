import { useState, useEffect, useRef } from 'react';

interface VideoPreloaderState {
  preloadedUrl: string | null;
  isLoading: boolean;
  progress: number;
  error: string | null;
}

export const useVideoPreloader = (videoUrl: string | null) => {
  const [state, setState] = useState<VideoPreloaderState>({
    preloadedUrl: null,
    isLoading: false,
    progress: 0,
    error: null,
  });

  const abortControllerRef = useRef<AbortController | null>(null);
  const preloadedUrlRef = useRef<string | null>(null);

  useEffect(() => {
    // Only preload if we have a video URL and haven't already preloaded it
    if (!videoUrl || state.preloadedUrl || state.isLoading) {
      return;
    }

    const preloadVideo = async () => {
      try {
        // Create a new abort controller for this request
        abortControllerRef.current = new AbortController();

        setState(prev => ({
          ...prev,
          isLoading: true,
          progress: 0,
          error: null,
        }));

        const response = await fetch(videoUrl, {
          signal: abortControllerRef.current.signal,
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch video: ${response.status}`);
        }

        const contentLength = response.headers.get('content-length');
        const total = contentLength ? parseInt(contentLength, 10) : 0;

        if (!response.body) {
          throw new Error('Response body is null');
        }

        const reader = response.body.getReader();
        const chunks: Uint8Array[] = [];
        let loaded = 0;

        while (true) {
          const { done, value } = await reader.read();

          if (done) break;

          chunks.push(value);
          loaded += value.length;

          // Update progress
          if (total > 0) {
            setState(prev => ({
              ...prev,
              progress: Math.round((loaded / total) * 100),
            }));
          }
        }

        // Combine chunks into a single Uint8Array
        const videoData = new Uint8Array(loaded);
        let offset = 0;
        for (const chunk of chunks) {
          videoData.set(chunk, offset);
          offset += chunk.length;
        }

        // Create blob and object URL
        const videoBlob = new Blob([videoData], { type: 'video/mp4' });
        const objectUrl = URL.createObjectURL(videoBlob);

        // Store the URL reference for cleanup
        preloadedUrlRef.current = objectUrl;

        setState(prev => ({
          ...prev,
          preloadedUrl: objectUrl,
          isLoading: false,
          progress: 100,
        }));

        console.log('Video preloaded successfully, size:', videoData.length, 'bytes');

      } catch (error) {
        if (error instanceof Error && error.name === 'AbortError') {
          console.log('Video preload was cancelled');
          return;
        }

        console.error('Error preloading video:', error);
        setState(prev => ({
          ...prev,
          isLoading: false,
          error: error instanceof Error ? error.message : 'Unknown error',
        }));
      }
    };

    preloadVideo();

    // Cleanup function
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [videoUrl]); // Only depend on videoUrl

  // Cleanup object URL on unmount
  useEffect(() => {
    return () => {
      if (preloadedUrlRef.current) {
        URL.revokeObjectURL(preloadedUrlRef.current);
        preloadedUrlRef.current = null;
      }
    };
  }, []);

  return state;
};
