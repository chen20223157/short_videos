import { useEffect, useRef, useState } from 'react';

interface UseVideoIntersectionOptions {
  threshold?: number;
  onEnter?: () => void;
  onLeave?: () => void;
}

export const useVideoIntersection = ({
  threshold = 0.8,
  onEnter,
  onLeave,
}: UseVideoIntersectionOptions = {}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const intersecting = entry.isIntersecting;
        setIsIntersecting(intersecting);

        if (intersecting) {
          onEnter?.();
        } else {
          onLeave?.();
        }
      },
      {
        threshold,
      }
    );

    observer.observe(video);

    return () => {
      observer.disconnect();
    };
  }, [threshold, onEnter, onLeave]);

  return { videoRef, isIntersecting };
};
