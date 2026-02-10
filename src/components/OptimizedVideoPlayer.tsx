'use client';

import { memo, useEffect, useRef } from 'react';
import { VideoPlayer } from './VideoPlayer';
import { Video } from '@/types/video';
import { useVideoPreload } from '@/hooks/useVideoPreload';

interface OptimizedVideoPlayerProps {
  video: Video;
  index: number;
  currentIndex: number;
  onLike?: (videoId: string) => void;
  onComment?: (videoId: string) => void;
  onShare?: (videoId: string) => void;
  onFollow?: (userId: string) => void;
}

/**
 * 优化的视频播放器组件
 * - 只渲染当前视口附近的视频（当前、上一个、下一个）
 * - 预加载即将进入视口的视频
 * - 自动卸载远离视口的视频组件
 */
export const OptimizedVideoPlayer = memo(
  function OptimizedVideoPlayer({
    video,
    index,
    currentIndex,
    onLike,
    onComment,
    onShare,
    onFollow,
  }: OptimizedVideoPlayerProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    
    // 计算是否应该渲染这个视频
    // 只渲染当前视频和前后各 2 个视频（总共 5 个）- 增加渲染范围
    const distanceFromCurrent = Math.abs(index - currentIndex);
    const shouldRender = distanceFromCurrent <= 2;
    
    // 预加载逻辑：当前视频的前后各 3 个视频 - 提前更多预加载
    const shouldPreload = distanceFromCurrent <= 3;
    useVideoPreload(video.videoUrl, shouldPreload && !shouldRender);

    // 性能优化：离开视口时强制清理资源
    useEffect(() => {
      if (!shouldRender) {
        // 清理可能存在的视频元素
        const container = containerRef.current;
        if (container) {
          const videos = container.querySelectorAll('video');
          videos.forEach(video => {
            video.pause();
            video.src = '';
            video.load();
          });
        }
      }
    }, [shouldRender]);

    // 如果不应该渲染，返回占位符
    if (!shouldRender) {
      return (
        <div
          ref={containerRef}
          className="relative w-full h-screen snap-start snap-always bg-black flex items-center justify-center"
        >
          <div className="text-white text-sm opacity-50">加载中...</div>
        </div>
      );
    }

    return (
      <div ref={containerRef}>
        <VideoPlayer
          video={video}
          onLike={onLike}
          onComment={onComment}
          onShare={onShare}
          onFollow={onFollow}
        />
      </div>
    );
  },
  // 自定义比较函数，只有在关键 props 改变时才重新渲染
  (prevProps, nextProps) => {
    return (
      prevProps.video.id === nextProps.video.id &&
      prevProps.currentIndex === nextProps.currentIndex &&
      prevProps.index === nextProps.index
    );
  }
);
