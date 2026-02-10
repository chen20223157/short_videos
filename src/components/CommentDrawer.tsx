'use client';

import { memo, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Heart, Send } from 'lucide-react';
import { Comment } from '@/types/video';
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface CommentDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  videoId: string;
}

// Mock 评论数据
const mockComments: Comment[] = [
  {
    id: '1',
    userId: 'user1',
    username: '热心网友',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=comment1',
    content: '太棒了！这个视频拍得真好 👍',
    likes: 234,
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
    liked: false,
  },
  {
    id: '2',
    userId: 'user2',
    username: '创意达人',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=comment2',
    content: '学到了，感谢分享！',
    likes: 128,
    timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000),
    liked: false,
  },
  {
    id: '3',
    userId: 'user3',
    username: '视频爱好者',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=comment3',
    content: '期待更多这样的内容 🔥🔥🔥',
    likes: 89,
    timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    liked: false,
  },
  {
    id: '4',
    userId: 'user4',
    username: '路过的小伙伴',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=comment4',
    content: '这个拍摄角度绝了！',
    likes: 456,
    timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    liked: false,
  },
  {
    id: '5',
    userId: 'user5',
    username: '点赞狂魔',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=comment5',
    content: '已经看了10遍了，每次都有新发现',
    likes: 321,
    timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    liked: false,
  },
];

export const CommentDrawer = memo(function CommentDrawer({
  isOpen,
  onClose,
  videoId,
}: CommentDrawerProps) {
  const [comments, setComments] = useState<Comment[]>(mockComments);
  const [commentText, setCommentText] = useState('');

  const formatTimestamp = (date: Date): string => {
    const now = Date.now();
    const diff = now - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 60) return `${minutes}分钟前`;
    if (hours < 24) return `${hours}小时前`;
    return `${days}天前`;
  };

  const formatCount = (count: number): string => {
    if (count >= 1000) return `${(count / 1000).toFixed(1)}K`;
    return count.toString();
  };

  const handleLikeComment = useCallback((commentId: string) => {
    setComments((prev) =>
      prev.map((comment) =>
        comment.id === commentId
          ? {
              ...comment,
              liked: !comment.liked,
              likes: comment.liked ? comment.likes - 1 : comment.likes + 1,
            }
          : comment
      )
    );
  }, []);

  const handleSendComment = useCallback(() => {
    if (!commentText.trim()) return;

    const newComment: Comment = {
      id: Date.now().toString(),
      userId: 'current-user',
      username: '我',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=currentuser',
      content: commentText,
      likes: 0,
      timestamp: new Date(),
      liked: false,
    };

    setComments((prev) => [newComment, ...prev]);
    setCommentText('');
  }, [commentText]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* 背景遮罩 */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
          />

          {/* 抽屉内容 */}
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed bottom-0 left-0 right-0 z-50 bg-white dark:bg-gray-900 rounded-t-3xl shadow-2xl"
            style={{ maxHeight: '70vh' }}
          >
            {/* 头部 */}
            <div className="flex items-center justify-between p-4 border-b dark:border-gray-800">
              <h3 className="text-lg font-semibold">
                {comments.length} 条评论
              </h3>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* 评论列表 */}
            <div className="overflow-y-auto" style={{ maxHeight: 'calc(70vh - 140px)' }}>
              {comments.map((comment) => (
                <div
                  key={comment.id}
                  className="flex gap-3 p-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                >
                  {/* 头像 */}
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200">
                      <Image
                        src={comment.avatar}
                        alt={comment.username}
                        width={40}
                        height={40}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>

                  {/* 内容 */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-sm">
                        {comment.username}
                      </span>
                      <span className="text-xs text-gray-500">
                        {formatTimestamp(comment.timestamp)}
                      </span>
                    </div>
                    <p className="text-sm mt-1 break-words">{comment.content}</p>
                  </div>

                  {/* 点赞 */}
                  <div className="flex flex-col items-center gap-1">
                    <button
                      onClick={() => handleLikeComment(comment.id)}
                      className="p-2"
                    >
                      <Heart
                        className={cn(
                          'w-5 h-5 transition-colors',
                          comment.liked
                            ? 'fill-red-500 text-red-500'
                            : 'text-gray-400'
                        )}
                      />
                    </button>
                    <span className="text-xs text-gray-500">
                      {formatCount(comment.likes)}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* 输入框 */}
            <div className="p-4 border-t dark:border-gray-800">
              <div className="flex items-center gap-3">
                <input
                  type="text"
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleSendComment();
                    }
                  }}
                  placeholder="说点什么..."
                  className="flex-1 px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-full outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                />
                <button
                  onClick={handleSendComment}
                  disabled={!commentText.trim()}
                  className={cn(
                    'p-3 rounded-full transition-colors',
                    commentText.trim()
                      ? 'bg-blue-500 text-white hover:bg-blue-600'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-400'
                  )}
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
});
