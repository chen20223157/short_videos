'use client';

import { useCallback, useEffect, useState, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Video } from '@/types/video';
import { useVideoState } from '@/hooks/useVideoState';
import { useVideoIntersection } from '@/hooks/useVideoIntersection';
import { VideoControls } from './VideoControls';
import { VideoInfo } from './VideoInfo';
import { InteractionBar } from './InteractionBar';
import { Loader2, Volume2, VolumeX } from 'lucide-react';

interface VideoPlayerProps {
  video: Video;
  onLike?: (videoId: string) => void;
  onComment?: (videoId: string) => void;
  onShare?: (videoId: string) => void;
  onFollow?: (userId: string) => void;
}

export const VideoPlayer = memo(function VideoPlayer({
  video,
  onLike,
  onComment,
  onShare,
  onFollow,
}: VideoPlayerProps) {
  const { state, transitionTo, setErrorState, abortCurrentRequest } = useVideoState();
  const [isPlaying, setIsPlaying] = useState(false);
  const [showHeart, setShowHeart] = useState(false);
  const [heartPosition, setHeartPosition] = useState({ x: 0, y: 0 });
  const [liked, setLiked] = useState(video.liked || false);
  const [likesCount, setLikesCount] = useState(video.stats.likes);
  const [isMuted, setIsMuted] = useState(true); // 默认静音
  const [userPaused, setUserPaused] = useState(false); // 用户是否主动暂停
  
  // 每次视频ID变化时重置状态（确保新视频自动播放）
  useEffect(() => {
    console.log(`[视频 ${video.id}] 组件加载/切换，重置所有状态`);
    setUserPaused(false);  // 重置暂停标志
    setIsPlaying(false);   // 重置播放状态
    transitionTo('IDLE');  // 重置状态机
  }, [video.id, transitionTo]);

  // 双击点赞逻辑 - 优化版本
  const handleDoubleClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault(); // 防止默认行为
    
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    setHeartPosition({ x, y });
    setShowHeart(true);
    
    // Optimistic Update: 即时更新 UI
    if (!liked) {
      setLiked(true);
      setLikesCount(prev => prev + 1);
      onLike?.(video.id);
    }

    // 使用 requestAnimationFrame 优化动画性能
    const timer = setTimeout(() => setShowHeart(false), 1000);
    return () => clearTimeout(timer);
  }, [liked, video.id, onLike]);

  // Intersection Observer 自动播放/暂停
  const { videoRef, isIntersecting } = useVideoIntersection({
    threshold: 0.8,
    onEnter: () => {
      // 进入视口时重置用户暂停标志，确保自动播放
      console.log(`[视频 ${video.id}] 进入视口，重置 userPaused，准备播放`);
      setUserPaused(false);
      setIsPlaying(false);
      transitionTo('BUFFERING');
    },
    onLeave: () => {
      if (videoRef.current) {
        console.log(`[视频 ${video.id}] 离开视口，暂停并重置`);
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
        setIsPlaying(false);
        setUserPaused(false);
        transitionTo('IDLE');
        abortCurrentRequest();
      }
    },
  });

  // 处理视频播放/暂停 - 即时响应版本
  const togglePlayPause = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation(); // 防止事件冒泡
    const video = videoRef.current;
    if (!video) return;

    // 基于视频实际状态而不是 React 状态
    const videoPaused = video.paused;

    if (!videoPaused) {
      // 当前正在播放，执行暂停
      console.log(`[视频 ${video.id}] 用户点击暂停`);
      video.pause();
      setIsPlaying(false);
      setUserPaused(true); // 标记为用户暂停
      transitionTo('PAUSED');
    } else {
      // 当前已暂停，执行播放
      console.log(`[视频 ${video.id}] 用户点击播放`);
      setUserPaused(false); // 清除暂停标志
      const playPromise = video.play();
      
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            console.log(`[视频 ${video.id}] 用户播放成功`);
            setIsPlaying(true);
            transitionTo('PLAYING');
          })
          .catch((error) => {
            console.warn(`[视频 ${video.id}] 用户播放失败:`, error.name);
            setIsPlaying(false);
            transitionTo('PAUSED');
          });
      }
    }
  }, [transitionTo, video.id]);

  // 视频事件监听
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleLoadStart = () => {
      // 开始加载时，只在视口内且未暂停时显示 BUFFERING
      if (isIntersecting && !userPaused) {
        transitionTo('BUFFERING');
      }
    };
    const handleCanPlay = () => {
      // 视频可以播放时，自动播放（除非用户主动暂停了）
      console.log(`[视频 ${video.id}] canplay 事件, isIntersecting: ${isIntersecting}, userPaused: ${userPaused}, video.paused: ${video.paused}`);
      
      if (isIntersecting && !userPaused && video.paused) {
        console.log(`[视频 ${video.id}] 开始自动播放`);
        const playPromise = video.play();
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              console.log(`[视频 ${video.id}] 播放成功`);
              setIsPlaying(true);
              transitionTo('PLAYING');
            })
            .catch((error) => {
              console.warn(`[视频 ${video.id}] 自动播放失败:`, error.name);
              transitionTo('PAUSED');
            });
        }
      }
    };
    const handlePlaying = () => {
      setIsPlaying(true);
      transitionTo('PLAYING');
    };
    const handleCanPlayThrough = () => {
      // 视频数据充足，可以流畅播放
      console.log(`[视频 ${video.id}] canplaythrough 事件, isIntersecting: ${isIntersecting}, userPaused: ${userPaused}, video.paused: ${video.paused}`);
      
      if (isIntersecting && !userPaused && video.paused) {
        console.log(`[视频 ${video.id}] canplaythrough 尝试播放`);
        video.play()
          .then(() => {
            console.log(`[视频 ${video.id}] canplaythrough 播放成功`);
            setIsPlaying(true);
            transitionTo('PLAYING');
          })
          .catch((error) => {
            console.warn(`[视频 ${video.id}] canplaythrough 播放失败:`, error);
            transitionTo('PAUSED');
          });
      } else if (state === 'BUFFERING' && isPlaying) {
        transitionTo('PLAYING');
      }
    };
    const handlePause = () => {
      setIsPlaying(false);
      transitionTo('PAUSED');
    };
    const handleWaiting = () => {
      // 只在真正需要缓冲时显示 Loading
      if (!userPaused && isIntersecting) {
        transitionTo('BUFFERING');
      }
    };
    const handleError = () => setErrorState('视频加载失败');
    const handleEnded = () => {
      video.currentTime = 0;
      video.play();
    };

    video.addEventListener('loadstart', handleLoadStart);
    video.addEventListener('canplay', handleCanPlay);
    video.addEventListener('canplaythrough', handleCanPlayThrough);
    video.addEventListener('playing', handlePlaying);
    video.addEventListener('pause', handlePause);
    video.addEventListener('waiting', handleWaiting);
    video.addEventListener('error', handleError);
    video.addEventListener('ended', handleEnded);

    return () => {
      video.removeEventListener('loadstart', handleLoadStart);
      video.removeEventListener('canplay', handleCanPlay);
      video.removeEventListener('canplaythrough', handleCanPlayThrough);
      video.removeEventListener('playing', handlePlaying);
      video.removeEventListener('pause', handlePause);
      video.removeEventListener('waiting', handleWaiting);
      video.removeEventListener('error', handleError);
      video.removeEventListener('ended', handleEnded);
    };
  }, [isIntersecting, state, transitionTo, setErrorState, isPlaying, userPaused]);

  // 处理点赞
  const handleLike = useCallback(() => {
    setLiked(!liked);
    setLikesCount(prev => liked ? prev - 1 : prev + 1);
    onLike?.(video.id);
  }, [liked, video.id, onLike]);

  // 切换静音
  const toggleMute = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  }, [isMuted]);

  return (
    <div className="relative w-full h-screen snap-start snap-always bg-black">
      {/* 视频元素 */}
      <video
        ref={videoRef}
        src={video.videoUrl}
        className="absolute inset-0 w-full h-full object-cover"
        playsInline
        loop
        muted
        preload="auto"
        poster={video.coverUrl}
      />

      {/* 点击区域 - 用于播放/暂停和双击点赞 */}
      <div
        className="absolute inset-0 z-10 cursor-pointer"
        onClick={togglePlayPause}
        onDoubleClick={handleDoubleClick}
      >
        {/* Loading 状态 - 只在真正缓冲且未播放时显示 */}
        <AnimatePresence>
          {(state === 'BUFFERING' || (state === 'IDLE' && isIntersecting)) && !isPlaying && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-[2px]"
            >
              <div className="flex flex-col items-center gap-3">
                <Loader2 className="w-10 h-10 text-white animate-spin" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Error 状态 */}
        <AnimatePresence>
          {state === 'ERROR' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 flex items-center justify-center bg-black/50"
            >
              <div className="text-white text-center">
                <p className="text-lg">😔 视频加载失败</p>
                <p className="text-sm mt-2 text-gray-300">请稍后再试</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 双击点赞红心动画 */}
        <AnimatePresence>
          {showHeart && (
            <motion.div
              initial={{ scale: 0, opacity: 1 }}
              animate={{ scale: 1.5, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
              className="absolute pointer-events-none"
              style={{
                left: heartPosition.x,
                top: heartPosition.y,
                transform: 'translate(-50%, -50%)',
              }}
            >
              <div className="text-6xl">❤️</div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* 播放/暂停控制图标 */}
      <VideoControls isPlaying={isPlaying} />

      {/* 音量控制按钮 - 右上角 */}
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3 }}
        onClick={toggleMute}
        className="absolute top-4 right-4 z-30 w-10 h-10 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-black/70 transition-colors"
      >
        {isMuted ? (
          <VolumeX className="w-5 h-5 text-white" />
        ) : (
          <Volume2 className="w-5 h-5 text-white" />
        )}
      </motion.button>

      {/* 右侧交互工具栏 */}
      <InteractionBar
        video={video}
        liked={liked}
        likesCount={likesCount}
        onLike={handleLike}
        onComment={() => onComment?.(video.id)}
        onShare={() => onShare?.(video.id)}
        onFollow={() => onFollow?.(video.user.id)}
      />

      {/* 底部信息区 */}
      <VideoInfo video={video} />
    </div>
  );
});
