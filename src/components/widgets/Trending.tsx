import { nanoid } from "nanoid";
import { Link } from "react-router-dom";

type TrendingItem = {
  item: {
    id: string;
    market_cap_rank: number;
    name: string;
    symbol: string;
    thumb: string;
  };
};

export const Trending = ({ cryptos }: { cryptos: TrendingItem[] }) => {
  return (
    <div className="p-4 rounded-lg bg-white dark:bg-gray-800 shadow-md">
      <h2 className="text-lg font-semibold mb-3 text-gray-900 dark:text-gray-100">
        Trending
      </h2>

      <div className="space-y-1 overflow-y-auto max-h-[100%]">
        {cryptos.map((crypto) => (
          <Link
            key={nanoid()}
            to={`/${crypto.item.id}`}
            className="flex items-center space-x-3 p-2 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-md transition-colors"
          >
            <span className="text-gray-500 dark:text-gray-400 min-w-[40px] text-left">
              {crypto.item.market_cap_rank}
            </span>

            <img
              src={crypto.item.thumb}
              alt={crypto.item.name}
              className="w-6 h-6"
            />

            <div className="flex items-center space-x-3">
              <span className="text-gray-900 dark:text-gray-100 font-semibold">
                {crypto.item.name}
              </span>
              <span className="text-sm text-gray-500 dark:text-gray-400 uppercase">
                {crypto.item.symbol}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
