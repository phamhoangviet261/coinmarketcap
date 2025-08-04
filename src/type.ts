/**
 * Kiểu phản hồi từ API GET /coins/{id}
 */
export type TCoinDetail = {
  id: string;
  symbol: string;
  name: string;
  asset_platform_id?: string | null;
  platforms: Record<string, string>; // e.g. { ethereum: "0x...", binance-smart-chain: "..." }
  block_time_in_minutes?: number;
  hashing_algorithm?: string | null;
  categories: string[];
  public_notice?: string | null;
  additional_notices?: string[];
  localization: Record<string, string>;
  description: Record<string, string>;
  links: {
    homepage: string[];
    blockchain_site: string[];
    official_forum_url: string[];
    chat_url: string[];
    announcement_url: string[];
    twitter_screen_name?: string;
    facebook_username?: string;
    bitcointalk_thread_identifier?: number;
    telegram_channel_identifier?: string;
    subreddit_url?: string;
    repos_url: {
      github?: string[];
      bitbucket?: string[];
    };
  };
  image: {
    thumb: string;
    small: string;
    large: string;
  };
  country_origin: string;
  sentiment_votes_up_percentage?: number;
  sentiment_votes_down_percentage?: number;
  genesis_date?: string | null;
  contract_address: string;
  market_cap_rank?: number;
  coingecko_rank?: number;
  coingecko_score?: number;
  developer_score?: number;
  community_score?: number;
  liquidity_score?: number;
  public_interest_score?: number;
  public_interest_stats?: {
    alexa_rank?: number;
    bing_matches?: null; // inconsistent type
  };
  developer_data?: {
    forks?: number;
    stars?: number;
    subscribers?: number;
    total_issues?: number;
    closed_issues?: number;
    pull_requests_merged?: number;
    pull_request_contributors?: number;
    code_additions_deletions_4_weeks?: {
      additions: number;
      deletions: number;
    };
    commit_count_4_weeks?: number;
  };
  community_data?: {
    facebook_likes?: null;
    twitter_followers?: number;
    reddit_average_posts_48h?: number;
    reddit_average_comments_48h?: number;
    reddit_subscribers?: number;
    reddit_accounts_active_48h?: number;
    telegram_channel_user_count?: number;
  };
  market_data?: {
    current_price: Record<string, number>;
    roi?: {
      times: number;
      currency: string;
      percentage: number;
    } | null;
    market_cap: Record<string, number>;
    total_volume: Record<string, number>;
    low_24h: Record<string, number>;
    high_24h: Record<string, number>;
    price_change_24h?: number;
    price_change_percentage_24h?: number;
    price_change_percentage_7d?: number;
    price_change_percentage_14d?: number;
    price_change_percentage_30d?: number;
    price_change_percentage_200d?: number;
    price_change_percentage_1y?: number;
    market_cap_change_24h?: number;
    market_cap_change_percentage_24h?: number;
    price_change_24h_in_currency?: Record<string, number>;
    price_change_percentage_1h_in_currency?: Record<string, number>;
    price_change_percentage_24h_in_currency?: Record<string, number>;
    price_change_percentage_7d_in_currency?: Record<string, number>;
    price_change_percentage_14d_in_currency?: Record<string, number>;
    price_change_percentage_30d_in_currency?: Record<string, number>;
    price_change_percentage_200d_in_currency?: Record<string, number>;
    price_change_percentage_1y_in_currency?: Record<string, number>;
    market_cap_change_24h_in_currency?: Record<string, number>;
    market_cap_change_percentage_24h_in_currency?: Record<string, number>;
    ath: Record<string, number>;
    ath_change_percentage: Record<string, number>;
    ath_date: Record<string, string>;
    atl: Record<string, number>;
    atl_change_percentage: Record<string, number>;
    atl_date: Record<string, string>;
    last_updated: string;
  };
  last_updated: string;
};
