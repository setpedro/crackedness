export type User = {
  id: number;
  id_str: string;
  name: string;
  screen_name: string;
  location: string;
  url: string | null;
  description: string;
  protected: boolean;
  verified: boolean;
  followers_count: number;
  friends_count: number;
  listed_count: number;
  favourites_count: number;
  statuses_count: number;
  created_at: string;
  profile_banner_url: string;
  profile_image_url_https: string;
  can_dm: boolean | null;
};

export type Tweet = {
  tweet_created_at: string;
  id: number;
  id_str: string;
  text: string | null;
  full_text: string;
  source: string;
  truncated: boolean;
  is_pinned: boolean;
};

export type GptResponse = {
  completion: string;
};

export interface ApiResponse<T> {
  data: T;
  error?: string;
}

export type Horseman = {
  name: string;
  description: string;
};
