'use client';

import { memo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Video } from '@/types/video';
import { Music, ChevronDown, ChevronUp } from 'lucide-react';

interface VideoInfoProps {
  video: Video;
}

export const VideoInfo = memo(function VideoInfo({ video }: VideoInfoProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="absolute bottom-0 left-0 right-16 z-20 p-4 pb-6 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
      <div className="space-y-3">
        {/* 用户名 - 添加渐入动画 */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-2"
        >
          <span className="text-white font-semibold text-base drop-shadow-lg">
            @{video.user.username}
          </span>
          {video.user.verified && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
              className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center shadow-lg"
            >
              <span className="text-white text-[10px] font-bold">✓</span>
            </motion.div>
          )}
        </motion.div>

        {/* 描述 */}
        <div className="relative">
          <AnimatePresence>
            <motion.p
              initial={false}
              animate={{ height: expanded ? 'auto' : '2.5rem' }}
              className="text-white text-sm overflow-hidden"
            >
              {video.description}
            </motion.p>
          </AnimatePresence>
          {video.description.length > 50 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setExpanded(!expanded);
              }}
              className="text-gray-300 text-xs mt-1 flex items-center gap-1"
            >
              {expanded ? (
                <>
                  收起 <ChevronUp className="w-3 h-3" />
                </>
              ) : (
                <>
                  展开 <ChevronDown className="w-3 h-3" />
                </>
              )}
            </button>
          )}
        </div>

        {/* 音乐信息 - 优化滚动动画 */}
        {video.music && (
          <div className="relative overflow-hidden max-w-[280px] bg-black/30 backdrop-blur-sm rounded-full px-3 py-2">
            <div className="flex items-center gap-2">
              <Music className="w-4 h-4 text-white flex-shrink-0" />
              <motion.div
                className="flex gap-8"
                animate={{
                  x: [0, -100],
                }}
                transition={{
                  duration: 10,
                  repeat: Infinity,
                  ease: 'linear',
                  repeatType: 'loop',
                }}
                style={{ willChange: 'transform' }}
              >
                <span className="text-white text-xs whitespace-nowrap">
                  {video.music.name} - {video.music.author}
                </span>
                <span className="text-white text-xs whitespace-nowrap">
                  {video.music.name} - {video.music.author}
                </span>
              </motion.div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
});
