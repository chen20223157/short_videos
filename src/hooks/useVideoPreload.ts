import { useEffect, useRef } from 'react';

/**
 * 预加载视频 Hook - 优化版本
 * 提前加载完整视频数据，确保流畅切换
 */
export const useVideoPreload = (videoUrl: string, shouldPreload: boolean) => {
  const preloadedRef = useRef(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (!shouldPreload || preloadedRef.current) return;

    // 创建一个隐藏的 video 元素来预加载
    const video = document.createElement('video');
    video.preload = 'auto'; // 改为 auto，加载更多数据
    video.muted = true; // 静音以避免自动播放限制
    video.playsInline = true;
    video.src = videoUrl;
    
    // 尝试预加载
    video.load();
    
    // 监听加载进度
    const handleLoadedData = () => {
      preloadedRef.current = true;
    };
    
    video.addEventListener('loadeddata', handleLoadedData);
    videoRef.current = video;

    // 标记为已预加载
    preloadedRef.current = true;

    return () => {
      // 清理
      video.removeEventListener('loadeddata', handleLoadedData);
      video.pause();
      video.src = '';
      video.load();
      videoRef.current = null;
    };
  }, [videoUrl, shouldPreload]);

  return preloadedRef.current;
};
