export interface Video {
  id: string;
  videoUrl: string;
  coverUrl: string;
  user: {
    id: string;
    username: string;
    avatar: string;
    verified?: boolean;
  };
  description: string;
  music?: {
    name: string;
    author: string;
  };
  stats: {
    likes: number;
    comments: number;
    shares: number;
  };
  liked?: boolean;
}

export interface Comment {
  id: string;
  userId: string;
  username: string;
  avatar: string;
  content: string;
  likes: number;
  timestamp: Date;
  liked?: boolean;
}

export type VideoState = 'IDLE' | 'BUFFERING' | 'PLAYING' | 'PAUSED' | 'ERROR';
