'use client';

import { memo } from 'react';
import { motion } from 'framer-motion';
import { Heart, MessageCircle, Share2, Music } from 'lucide-react';
import { Video } from '@/types/video';
import { cn } from '@/lib/utils';
import Image from 'next/image';

interface InteractionBarProps {
  video: Video;
  liked: boolean;
  likesCount: number;
  onLike: () => void;
  onComment: () => void;
  onShare: () => void;
  onFollow: () => void;
}

export const InteractionBar = memo(function InteractionBar({
  video,
  liked,
  likesCount,
  onLike,
  onComment,
  onShare,
  onFollow,
}: InteractionBarProps) {
  const formatCount = (count: number): string => {
    if (count >= 1000000) {
      return `${(count / 1000000).toFixed(1)}M`;
    }
    if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}K`;
    }
    return count.toString();
  };

  return (
    <div className="absolute right-4 bottom-24 z-30 flex flex-col items-center gap-6">
      {/* 用户头像 + 关注按钮 */}
      <div className="relative">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onFollow();
          }}
          className="relative block"
        >
          <div className="w-12 h-12 rounded-full border-2 border-white overflow-hidden bg-gray-200">
            <Image
              src={video.user.avatar}
              alt={video.user.username}
              width={48}
              height={48}
              className="w-full h-full object-cover"
            />
          </div>
          {/* 关注按钮 */}
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center border-2 border-white">
            <span className="text-white text-xs font-bold">+</span>
          </div>
        </button>
      </div>

      {/* 点赞 - 增强动画效果 */}
      <div className="flex flex-col items-center gap-1">
        <motion.button
          whileTap={{ scale: 0.8 }}
          onClick={(e) => {
            e.stopPropagation();
            onLike();
          }}
          className="w-12 h-12 flex items-center justify-center"
        >
          <motion.div
            animate={liked ? { scale: [1, 1.3, 1] } : { scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <Heart
              className={cn(
                'w-8 h-8 transition-all duration-300',
                liked ? 'fill-red-500 text-red-500 drop-shadow-[0_0_8px_rgba(239,68,68,0.8)]' : 'text-white'
              )}
            />
          </motion.div>
        </motion.button>
        <motion.span
          key={likesCount}
          initial={{ scale: 1.2, opacity: 0.8 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-white text-xs font-semibold drop-shadow-md"
        >
          {formatCount(likesCount)}
        </motion.span>
      </div>

      {/* 评论 */}
      <div className="flex flex-col items-center gap-1">
        <motion.button
          whileTap={{ scale: 0.8 }}
          onClick={(e) => {
            e.stopPropagation();
            onComment();
          }}
          className="w-12 h-12 flex items-center justify-center"
        >
          <MessageCircle className="w-8 h-8 text-white" />
        </motion.button>
        <span className="text-white text-xs font-semibold">
          {formatCount(video.stats.comments)}
        </span>
      </div>

      {/* 分享 */}
      <div className="flex flex-col items-center gap-1">
        <motion.button
          whileTap={{ scale: 0.8 }}
          onClick={(e) => {
            e.stopPropagation();
            onShare();
          }}
          className="w-12 h-12 flex items-center justify-center"
        >
          <Share2 className="w-8 h-8 text-white" />
        </motion.button>
        <span className="text-white text-xs font-semibold">
          {formatCount(video.stats.shares)}
        </span>
      </div>

      {/* 音乐唱片 - 优化旋转动画 */}
      {video.music && (
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ 
            duration: 4, 
            repeat: Infinity, 
            ease: 'linear',
            repeatType: 'loop'
          }}
          className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-600 via-pink-500 to-red-500 flex items-center justify-center border-2 border-white mt-2 shadow-lg"
          style={{ willChange: 'transform' }} // 优化动画性能
        >
          <div className="w-10 h-10 rounded-full bg-black/80 flex items-center justify-center">
            <Music className="w-5 h-5 text-white" />
          </div>
        </motion.div>
      )}
    </div>
  );
});
