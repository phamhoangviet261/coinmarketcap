// --- Common helper types ---
type CurrencyMap = Record<string, number>; // Example: { usd: 123, vnd: 2800000, ... }
type ISODate = string; // Example: "2025-08-10T03:21:45.000Z"
type URLString = string;

// --- Links section ---
interface CoinLinks {
  homepage: URLString[];
  blockchain_site: URLString[];
  official_forum_url: URLString[];
  chat_url: URLString[];
  announcement_url: URLString[];
  twitter_screen_name?: string | null;
  facebook_username?: string | null;
  bitcointalk_thread_identifier?: number | null;
  telegram_channel_identifier?: string | null;
  subreddit_url?: URLString | null;
  repos_url: {
    github: URLString[];
    bitbucket: URLString[];
  };
}

// --- Image section ---
interface CoinImage {
  thumb: URLString;
  small: URLString;
  large: URLString;
}

// --- Market/Ticker section ---
interface TickerMarket {
  name: string;
  identifier?: string | null;
  has_trading_incentive?: boolean;
}

export interface Ticker {
  base: string; // Example: "BTC"
  target: string; // Example: "USDT"
  market: TickerMarket;
  last: number; // Last traded price
  volume: number; // Trading volume in target currency
  converted_last?: { btc?: number; eth?: number; usd?: number };
  converted_volume?: { btc?: number; eth?: number; usd?: number };
  trust_score?: 'green' | 'yellow' | 'red' | null;
  bid_ask_spread_percentage?: number | null;
  timestamp?: ISODate | null;
  last_traded_at?: ISODate | null;
  last_fetch_at?: ISODate | null;
  is_anomaly?: boolean;
  is_stale?: boolean;
  trade_url?: URLString | null;
  token_info_url?: URLString | null;
  coin_id?: string;
  target_coin_id?: string | null;
}

// --- Market data section ---
interface Sparkline {
  price: number[]; // Array of prices for sparkline chart
}

interface MarketData {
  current_price: CurrencyMap;

  // All-time high and low data
  ath: CurrencyMap;
  ath_change_percentage: CurrencyMap;
  ath_date: Record<string, ISODate>;

  atl: CurrencyMap;
  atl_change_percentage: CurrencyMap;
  atl_date: Record<string, ISODate>;

  // Market cap and valuation
  market_cap: CurrencyMap;
  market_cap_rank?: number | null;
  fully_diluted_valuation?: CurrencyMap | null;

  // Trading volume
  total_volume: CurrencyMap;

  // 24h high/low
  high_24h?: CurrencyMap;
  low_24h?: CurrencyMap;

  // Price changes
  price_change_24h?: number | null;
  price_change_percentage_24h?: number | null;

  // Market cap changes
  market_cap_change_24h?: number | null;
  market_cap_change_percentage_24h?: number | null;

  // Percentage price change by timeframes
  price_change_percentage_1h_in_currency?: CurrencyMap;
  price_change_percentage_24h_in_currency?: CurrencyMap;
  price_change_percentage_7d_in_currency?: CurrencyMap;
  price_change_percentage_14d_in_currency?: CurrencyMap;
  price_change_percentage_30d_in_currency?: CurrencyMap;
  price_change_percentage_60d_in_currency?: CurrencyMap;
  price_change_percentage_200d_in_currency?: CurrencyMap;
  price_change_percentage_1y_in_currency?: CurrencyMap;

  // Market cap change by currency
  market_cap_change_24h_in_currency?: CurrencyMap;
  market_cap_change_percentage_24h_in_currency?: CurrencyMap;

  // Supply metrics
  circulating_supply: number | null;
  total_supply: number | null;
  max_supply: number | null;

  // Sparkline data (name may differ depending on endpoint)
  sparkline_7d?: Sparkline;
  sparkline_in_7d?: Sparkline;

  last_updated?: ISODate;
}

// --- Community, developer, and interest stats ---
interface CommunityData {
  facebook_likes?: number | null;
  twitter_followers?: number | null;
  reddit_average_posts_48h?: number | null;
  reddit_average_comments_48h?: number | null;
  reddit_subscribers?: number | null;
  reddit_accounts_active_48h?: number | string | null;
  telegram_channel_user_count?: number | null;
}

interface CodeAddDel4Weeks {
  additions: number;
  deletions: number;
}

interface DeveloperData {
  forks?: number | null;
  stars?: number | null;
  subscribers?: number | null;
  total_issues?: number | null;
  closed_issues?: number | null;
  pull_requests_merged?: number | null;
  pull_request_contributors?: number | null;
  code_additions_deletions_4_weeks?: CodeAddDel4Weeks | null;
  commit_count_4_weeks?: number | null;
  last_4_weeks_commit_activity_series?: number[];
}

interface PublicInterestStats {
  alexa_rank?: number | null;
  bing_matches?: number | null;
}

// --- Status update section (only if requested) ---
interface StatusUpdate {
  description: string;
  category: string;
  created_at: ISODate;
  user?: string;
  user_title?: string;
  pin?: boolean;
  project?: {
    type?: string;
    id?: string;
    name?: string;
    symbol?: string;
    image?: string;
  };
}

// --- Main Coin Detail response type ---
export interface CoinDetail {
  // Identification
  id: string;
  symbol: string;
  name: string;

  // Platform info
  asset_platform_id?: string | null;
  platforms?: Record<string, string | null>;

  // General info
  block_time_in_minutes?: number | null;
  hashing_algorithm?: string | null;
  categories?: string[];
  preview_listing?: boolean;
  public_notice?: string | null;
  additional_notices?: string[];

  localization?: Record<string, string>; // Short description per language
  description: Record<string, string>; // Full description per language

  links: CoinLinks;
  image: CoinImage;

  // Origin and sentiment
  country_origin?: string | null;
  genesis_date?: string | null; // YYYY-MM-DD
  sentiment_votes_up_percentage?: number | null;
  sentiment_votes_down_percentage?: number | null;

  watchlist_portfolio_users?: number | null;
  market_cap_rank?: number | null;

  // Scores
  coingecko_rank?: number | null;
  coingecko_score?: number | null;
  developer_score?: number | null;
  community_score?: number | null;
  liquidity_score?: number | null;
  public_interest_score?: number | null;

  // Market data
  market_data: MarketData;

  // Additional data sections
  community_data?: CommunityData;
  developer_data?: DeveloperData;
  public_interest_stats?: PublicInterestStats;

  // Exchange tickers (included by default)
  tickers?: Ticker[];

  // Status updates (if included in query)
  status_updates?: StatusUpdate[];

  // Last updated timestamp
  last_updated: ISODate;
}
