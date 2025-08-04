import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useCryptoData } from '@/hooks/useCryptoData';
import type { TCoinDetail } from '@/type';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

export const CoinDetailPage = () => {
  const { coinId } = useParams();
  const { cryptosDetail, fetchCryptosById } = useCryptoData();

  useEffect(() => {
    if (coinId) {
      fetchCryptosById(coinId);
    }
  }, [coinId]);

  if (!cryptosDetail) {
    return <div className="p-4">Loading...</div>;
  }

  const detail = cryptosDetail as TCoinDetail;
  const sparklineData =
    detail.market_data?.sparkline_7d?.price?.map((p, idx) => ({
      time: idx,
      price: p,
    })) || [];

  return (
    <div className="p-4 max-w-7xl mx-auto flex gap-4">
      <div className="w-1/5 space-y-4">
        <div className="flex items-center gap-4">
          <img
            src={detail.image?.large}
            alt={detail.name}
            className="h-16 w-16"
          />
          <div>
            <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
              {detail.name}
            </h1>
            <p className="uppercase text-gray-500 dark:text-gray-400">
              {detail.symbol}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4">
          <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
            <p className="text-sm text-gray-500 dark:text-gray-400">Current Price</p>
            <p className="mt-1 text-lg font-semibold text-gray-900 dark:text-gray-100">
              ${detail.market_data?.current_price?.usd?.toLocaleString()}
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
            <p className="text-sm text-gray-500 dark:text-gray-400">Market Cap</p>
            <p className="mt-1 text-lg font-semibold text-gray-900 dark:text-gray-100">
              ${detail.market_data?.market_cap?.usd?.toLocaleString()}
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
            <p className="text-sm text-gray-500 dark:text-gray-400">24h Volume</p>
            <p className="mt-1 text-lg font-semibold text-gray-900 dark:text-gray-100">
              ${detail.market_data?.total_volume?.usd?.toLocaleString()}
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
            <p className="text-sm text-gray-500 dark:text-gray-400">24h High</p>
            <p className="mt-1 text-lg font-semibold text-gray-900 dark:text-gray-100">
              ${detail.market_data?.high_24h?.usd?.toLocaleString()}
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
            <p className="text-sm text-gray-500 dark:text-gray-400">24h Low</p>
            <p className="mt-1 text-lg font-semibold text-gray-900 dark:text-gray-100">
              ${detail.market_data?.low_24h?.usd?.toLocaleString()}
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
            <p className="text-sm text-gray-500 dark:text-gray-400">Market Cap Rank</p>
            <p className="mt-1 text-lg font-semibold text-gray-900 dark:text-gray-100">
              #{detail.market_cap_rank}
            </p>
          </div>
        </div>
      </div>

      <div className="w-3/5 bg-white dark:bg-gray-800 p-4 rounded shadow">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
          Price (7d)
        </h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={sparklineData}>
            <Line type="monotone" dataKey="price" stroke="#8884d8" dot={false} />
            <XAxis dataKey="time" hide />
            <YAxis domain={["auto", "auto"]} />
            <Tooltip />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="w-1/5">
        {detail.description?.en && (
          <div className="bg-white dark:bg-gray-800 p-4 rounded shadow h-full overflow-y-auto">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
              About {detail.name}
            </h2>
            <p
              className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: detail.description.en }}
            />
          </div>
        )}
      </div>
=======

  return (
    <div className="p-4 max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <img
          src={detail.image?.large}
          alt={detail.name}
          className="h-16 w-16"
        />
        <div>
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
            {detail.name}
          </h1>
          <p className="uppercase text-gray-500 dark:text-gray-400">
            {detail.symbol}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
        <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
          <p className="text-sm text-gray-500 dark:text-gray-400">Current Price</p>
          <p className="mt-1 text-lg font-semibold text-gray-900 dark:text-gray-100">
            ${detail.market_data?.current_price?.usd?.toLocaleString()}
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
          <p className="text-sm text-gray-500 dark:text-gray-400">Market Cap</p>
          <p className="mt-1 text-lg font-semibold text-gray-900 dark:text-gray-100">
            ${detail.market_data?.market_cap?.usd?.toLocaleString()}
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
          <p className="text-sm text-gray-500 dark:text-gray-400">24h Volume</p>
          <p className="mt-1 text-lg font-semibold text-gray-900 dark:text-gray-100">
            ${detail.market_data?.total_volume?.usd?.toLocaleString()}
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
          <p className="text-sm text-gray-500 dark:text-gray-400">24h High</p>
          <p className="mt-1 text-lg font-semibold text-gray-900 dark:text-gray-100">
            ${detail.market_data?.high_24h?.usd?.toLocaleString()}
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
          <p className="text-sm text-gray-500 dark:text-gray-400">24h Low</p>
          <p className="mt-1 text-lg font-semibold text-gray-900 dark:text-gray-100">
            ${detail.market_data?.low_24h?.usd?.toLocaleString()}
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
          <p className="text-sm text-gray-500 dark:text-gray-400">Market Cap Rank</p>
          <p className="mt-1 text-lg font-semibold text-gray-900 dark:text-gray-100">
            #{detail.market_cap_rank}
          </p>
        </div>
      </div>

      {detail.description?.en && (
        <div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
            About {detail.name}
          </h2>
          <p
            className="mt-2 text-sm text-gray-700 dark:text-gray-300 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: detail.description.en }}
          />
        </div>
      )}
    </div>
  );
};

export default CoinDetailPage;
