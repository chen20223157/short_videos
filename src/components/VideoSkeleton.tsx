'use client';

import { memo } from 'react';
import { motion } from 'framer-motion';

/**
 * 视频加载骨架屏组件
 * 在视频加载时显示，提升用户体验
 */
export const VideoSkeleton = memo(function VideoSkeleton() {
  return (
    <div className="relative w-full h-screen snap-start snap-always bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* 背景动画 */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
        animate={{
          x: ['-100%', '100%'],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: 'linear',
        }}
      />

      {/* 右侧工具栏骨架 */}
      <div className="absolute right-4 bottom-24 z-30 flex flex-col items-center gap-6">
        {/* 头像 */}
        <div className="w-12 h-12 rounded-full bg-gray-700 animate-pulse" />
        
        {/* 按钮 */}
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex flex-col items-center gap-1">
            <div className="w-12 h-12 rounded-full bg-gray-700 animate-pulse" />
            <div className="w-8 h-3 bg-gray-700 rounded animate-pulse" />
          </div>
        ))}
        
        {/* 音乐唱片 */}
        <div className="w-12 h-12 rounded-full bg-gray-700 animate-pulse mt-2" />
      </div>

      {/* 底部信息骨架 */}
      <div className="absolute bottom-0 left-0 right-16 z-20 p-4 pb-6">
        <div className="space-y-3">
          {/* 用户名 */}
          <div className="w-32 h-5 bg-gray-700 rounded animate-pulse" />
          
          {/* 描述 */}
          <div className="space-y-2">
            <div className="w-full h-4 bg-gray-700 rounded animate-pulse" />
            <div className="w-3/4 h-4 bg-gray-700 rounded animate-pulse" />
          </div>
          
          {/* 音乐标签 */}
          <div className="w-48 h-8 bg-gray-700 rounded-full animate-pulse" />
        </div>
      </div>

      {/* 中心加载指示器 */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          className="w-16 h-16 border-4 border-white/20 border-t-white rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        />
      </div>
    </div>
  );
});
