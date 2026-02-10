import { Video } from "@/types/video";

// Mock 视频数据 - 使用真实可访问的演示视频
export const mockVideos: Video[] = [
  {
    id: "1",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    coverUrl: "https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?w=400&h=700&fit=crop",
    user: {
      id: "user1",
      username: "创意视频师",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=user1",
      verified: true,
    },
    description: "🎬 这是一个超级有趣的短视频！Big Buck Bunny 经典动画片段 #创意 #动画 #vlog",
    music: {
      name: "欢快旋律",
      author: "知名艺术家",
    },
    stats: {
      likes: 128500,
      comments: 3200,
      shares: 890,
    },
    liked: false,
  },
  {
    id: "2",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    coverUrl: "https://images.unsplash.com/photo-1682687221038-404cb8830901?w=400&h=700&fit=crop",
    user: {
      id: "user2",
      username: "艺术电影爱好者",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=user2",
    },
    description: "🎨 Elephant's Dream - 探索超现实的艺术世界 🌍✨ #艺术 #科幻 #独立电影",
    music: {
      name: "迷幻电音",
      author: "Electronic Dreams",
    },
    stats: {
      likes: 95600,
      comments: 2100,
      shares: 560,
    },
    liked: false,
  },
  {
    id: "3",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    coverUrl: "https://images.unsplash.com/photo-1682687220063-4742bd7fd538?w=400&h=700&fit=crop",
    user: {
      id: "user3",
      username: "户外探险家",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=user3",
      verified: true,
    },
    description: "🔥 For Bigger Blazes - 点燃你的冒险精神！户外探险必看 #探险 #户外 #自然",
    music: {
      name: "冒险进行曲",
      author: "Adventure Beats",
    },
    stats: {
      likes: 215000,
      comments: 5400,
      shares: 1230,
    },
    liked: false,
  },
  {
    id: "4",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
    coverUrl: "https://images.unsplash.com/photo-1682687220923-c58b9a4592ae?w=400&h=700&fit=crop",
    user: {
      id: "user4",
      username: "旅行摄影师",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=user4",
      verified: true,
    },
    description: "✈️ For Bigger Escapes - 逃离城市，拥抱自然！旅行VLOG第一期 💪 #旅行 #摄影 #生活方式",
    music: {
      name: "旅途之声",
      author: "Wanderlust Music",
    },
    stats: {
      likes: 187300,
      comments: 4800,
      shares: 920,
    },
    liked: false,
  },
  {
    id: "5",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
    coverUrl: "https://images.unsplash.com/photo-1682687221080-5cb261c645cb?w=400&h=700&fit=crop",
    user: {
      id: "user5",
      username: "娱乐达人",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=user5",
      verified: true,
    },
    description: "🎉 For Bigger Fun - 快乐就是这么简单！生活中的小确幸 👗✨ #娱乐 #快乐 #生活",
    music: {
      name: "欢乐颂",
      author: "Happy Tunes",
    },
    stats: {
      likes: 342000,
      comments: 8900,
      shares: 2100,
    },
    liked: false,
  },
  {
    id: "6",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
    coverUrl: "https://images.unsplash.com/photo-1682687982501-1e58ab814714?w=400&h=700&fit=crop",
    user: {
      id: "user6",
      username: "汽车狂热者",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=user6",
      verified: true,
    },
    description: "🚗 For Bigger Joyrides - 驾驶的乐趣，速度与激情！汽车评测系列 #汽车 #驾驶 #速度",
    music: {
      name: "引擎轰鸣",
      author: "Motor Beats",
    },
    stats: {
      likes: 456000,
      comments: 12000,
      shares: 3400,
    },
    liked: false,
  },
  {
    id: "7",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4",
    coverUrl: "https://images.unsplash.com/photo-1682687982167-d7fb3ed8541d?w=400&h=700&fit=crop",
    user: {
      id: "user7",
      username: "科技评测君",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=user7",
    },
    description: "📱 For Bigger Meltdowns - 最新科技产品深度评测！这性能太炸裂了 #科技 #评测 #数码",
    music: {
      name: "科技感电音",
      author: "Tech Sounds",
    },
    stats: {
      likes: 278000,
      comments: 6700,
      shares: 1560,
    },
    liked: false,
  },
  {
    id: "8",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
    coverUrl: "https://images.unsplash.com/photo-1682687982029-fdf2a13d8d3f?w=400&h=700&fit=crop",
    user: {
      id: "user8",
      username: "动画电影收藏家",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=user8",
      verified: true,
    },
    description: "🐉 Sintel - 感人至深的奇幻冒险故事，开源电影史上的传奇！ #动画 #奇幻 #感动",
    music: {
      name: "史诗配乐",
      author: "Epic Orchestra",
    },
    stats: {
      likes: 567000,
      comments: 15000,
      shares: 4200,
    },
    liked: false,
  },
  {
    id: "9",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
    coverUrl: "https://images.unsplash.com/photo-1682687982433-e54d3d2c3b73?w=400&h=700&fit=crop",
    user: {
      id: "user9",
      username: "科幻电影迷",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=user9",
      verified: true,
    },
    description: "🤖 Tears of Steel - 未来世界的视觉盛宴！科幻特效炸裂 #科幻 #特效 #未来",
    music: {
      name: "赛博朋克",
      author: "Cyber Punk Mix",
    },
    stats: {
      likes: 623000,
      comments: 18500,
      shares: 5100,
    },
    liked: false,
  },
  {
    id: "10",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/VolkswagenGTIReview.mp4",
    coverUrl: "https://images.unsplash.com/photo-1682687982501-1e58ab814714?w=400&h=700&fit=crop",
    user: {
      id: "user10",
      username: "汽车测评专家",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=user10",
      verified: true,
    },
    description: "🚘 Volkswagen GTI 深度评测 - 钢炮之王的魅力！性能与操控的完美平衡 #汽车评测 #GTI #性能车",
    music: {
      name: "动感电音",
      author: "EDM Master",
    },
    stats: {
      likes: 445000,
      comments: 11200,
      shares: 2890,
    },
    liked: false,
  },
  {
    id: "11",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4",
    coverUrl: "https://images.unsplash.com/photo-1682687220208-22d7a2543e88?w=400&h=700&fit=crop",
    user: {
      id: "user11",
      username: "极限运动挑战者",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=user11",
    },
    description: "🏁 We Are Going On Bullrun - 加入这场疯狂的冒险之旅！肾上腺素飙升时刻 #极限 #冒险 #挑战",
    music: {
      name: "极限摇滚",
      author: "Rock Warriors",
    },
    stats: {
      likes: 389000,
      comments: 9500,
      shares: 2340,
    },
    liked: false,
  },
  {
    id: "12",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WhatCarCanYouGetForAGrand.mp4",
    coverUrl: "https://images.unsplash.com/photo-1682687220923-c58b9a4592ae?w=400&h=700&fit=crop",
    user: {
      id: "user12",
      username: "省钱购车指南",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=user12",
      verified: true,
    },
    description: "💰 What Car Can You Get For A Grand - 预算有限？这些车值得考虑！省钱购车攻略 #购车 #省钱 #攻略",
    music: {
      name: "轻松爵士",
      author: "Jazz Vibes",
    },
    stats: {
      likes: 298000,
      comments: 7800,
      shares: 1920,
    },
    liked: false,
  },
];

// 模拟加载更多视频
export const loadMoreVideos = (page: number): Video[] => {
  return mockVideos.map((video, index) => ({
    ...video,
    id: `${video.id}-page${page}-${index}`,
    stats: {
      likes: video.stats.likes + Math.floor(Math.random() * 10000),
      comments: video.stats.comments + Math.floor(Math.random() * 1000),
      shares: video.stats.shares + Math.floor(Math.random() * 500),
    },
  }));
};
