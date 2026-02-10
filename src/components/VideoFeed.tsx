'use client';

import { memo, useState, useCallback, useEffect, useRef } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { Video } from '@/types/video';
import { OptimizedVideoPlayer } from './OptimizedVideoPlayer';
import { CommentDrawer } from './CommentDrawer';
import { VideoSkeleton } from './VideoSkeleton';
import { loadMoreVideos, mockVideos } from '@/lib/mockData';

// 模拟 API 请求 - 优化版本
const fetchVideos = async ({ pageParam = 0 }): Promise<Video[]> => {
  // 模拟网络延迟（首次加载更快）
  const delay = pageParam === 0 ? 300 : 800;
  await new Promise((resolve) => setTimeout(resolve, delay));
  
  if (pageParam === 0) {
    return mockVideos;
  }
  
  return loadMoreVideos(pageParam);
};

export const VideoFeed = memo(function VideoFeed() {
  const [commentVideoId, setCommentVideoId] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  // 使用 TanStack Query 实现无限滚动
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  } = useInfiniteQuery({
    queryKey: ['videos'],
    queryFn: fetchVideos,
    getNextPageParam: (lastPage, allPages) => {
      return allPages.length;
    },
    initialPageParam: 0,
  });

  const videos = data?.pages.flat() || [];

  // 智能预加载逻辑：当滑到第 n 个视频时，预加载后面的视频
  useEffect(() => {
    const threshold = 3; // 距离底部还剩 3 个视频时开始加载
    const shouldLoadMore =
      videos.length > 0 &&
      currentIndex >= videos.length - threshold &&
      hasNextPage &&
      !isFetchingNextPage;

    if (shouldLoadMore) {
      // 使用 requestIdleCallback 在浏览器空闲时加载，不影响滚动性能
      if ('requestIdleCallback' in window) {
        requestIdleCallback(() => fetchNextPage());
      } else {
        // 降级方案：使用 setTimeout
        setTimeout(() => fetchNextPage(), 100);
      }
    }
  }, [currentIndex, videos.length, hasNextPage, isFetchingNextPage, fetchNextPage]);

  // 监听滚动，更新当前视频索引 - 优化版本（使用节流）
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let rafId: number | null = null;
    let lastScrollTop = 0;

    const handleScroll = () => {
      // 使用 requestAnimationFrame 节流，确保 60fps 性能
      if (rafId !== null) return;

      rafId = requestAnimationFrame(() => {
        const scrollTop = container.scrollTop;
        
        // 只在滚动距离超过一定阈值时更新（减少不必要的状态更新）
        if (Math.abs(scrollTop - lastScrollTop) > 50) {
          const windowHeight = window.innerHeight;
          const index = Math.round(scrollTop / windowHeight);
          setCurrentIndex(index);
          lastScrollTop = scrollTop;
        }
        
        rafId = null;
      });
    };

    container.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      container.removeEventListener('scroll', handleScroll);
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
      }
    };
  }, []);

  const handleLike = useCallback((videoId: string) => {
    console.log('点赞视频:', videoId);
    // 这里可以添加实际的 API 调用
  }, []);

  const handleComment = useCallback((videoId: string) => {
    setCommentVideoId(videoId);
  }, []);

  const handleShare = useCallback((videoId: string) => {
    console.log('分享视频:', videoId);
    // 这里可以添加实际的分享逻辑
    if (navigator.share) {
      navigator.share({
        title: '分享视频',
        text: '看看这个有趣的视频！',
        url: window.location.href,
      });
    }
  }, []);

  const handleFollow = useCallback((userId: string) => {
    console.log('关注用户:', userId);
    // 这里可以添加实际的 API 调用
  }, []);

  // 首次加载显示骨架屏 - 移到所有 Hooks 之后
  if (isLoading) {
    return (
      <div className="h-screen overflow-hidden">
        <VideoSkeleton />
      </div>
    );
  }

  return (
    <>
      {/* 全屏滚动容器 */}
      <div
        ref={containerRef}
        className="h-screen overflow-y-scroll snap-y snap-mandatory"
      >
        {videos.map((video, index) => (
          <OptimizedVideoPlayer
            key={video.id}
            video={video}
            index={index}
            currentIndex={currentIndex}
            onLike={handleLike}
            onComment={handleComment}
            onShare={handleShare}
            onFollow={handleFollow}
          />
        ))}

        {/* 加载更多指示器 */}
        {isFetchingNextPage && (
          <div className="h-screen snap-start snap-always flex items-center justify-center bg-black">
            <div className="flex flex-col items-center gap-4">
              <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin" />
              <p className="text-white">加载中...</p>
            </div>
          </div>
        )}
      </div>

      {/* 评论抽屉 */}
      <CommentDrawer
        isOpen={commentVideoId !== null}
        onClose={() => setCommentVideoId(null)}
        videoId={commentVideoId || ''}
      />
    </>
  );
});
