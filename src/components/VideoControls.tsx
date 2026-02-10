'use client';

import { memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play } from 'lucide-react';

interface VideoControlsProps {
  isPlaying: boolean;
}

export const VideoControls = memo(function VideoControls({ isPlaying }: VideoControlsProps) {
  // 调试日志
  console.log('[VideoControls] isPlaying:', isPlaying, '显示图标:', !isPlaying);
  
  return (
    <AnimatePresence mode="wait">
      {/* 只在暂停时显示播放按钮，播放时不显示任何图标 */}
      {!isPlaying && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          transition={{ 
            duration: 0.2,
            ease: "easeOut"
          }}
          className="absolute inset-0 flex items-center justify-center pointer-events-none z-20"
        >
          <div className="bg-black/50 backdrop-blur-md rounded-full p-8 shadow-2xl">
            <Play className="w-16 h-16 text-white fill-white drop-shadow-lg" />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
});
