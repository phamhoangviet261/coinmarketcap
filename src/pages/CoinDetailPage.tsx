import { useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useCryptoData } from '@/hooks/useCryptoData';
import type { TCoinDetail } from '@/type';
import {
  createChart,
  ColorType,
  BaselineSeries,
  UTCTimestamp,
} from 'lightweight-charts';

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
  const now = Math.floor(Date.now() / 1000);
  const sparklineData =
    detail.market_data?.sparkline_7d?.price?.map(
      (p, idx, arr) =>
        ({
          time: (now - (arr.length - idx) * 3600) as UTCTimestamp,
          value: p,
        }) as const,
    ) || [];
  const chartContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!chartContainerRef.current) return;
    const chart = createChart(chartContainerRef.current, {
      width: chartContainerRef.current.clientWidth,
      height: 300,
      layout: {
        background: { type: ColorType.Solid, color: 'transparent' },
        textColor: '#333',
      },
      grid: {
        vertLines: { color: '#e0e0e0' },
        horzLines: { color: '#e0e0e0' },
      },
    });
    const baselineSeries = chart.addSeries(BaselineSeries, {
      baseValue: { type: 'price', price: sparklineData[0]?.value ?? 0 },
      topLineColor: 'rgba(38, 166, 154, 1)',
      topFillColor1: 'rgba(38, 166, 154, 0.4)',
      topFillColor2: 'rgba(38, 166, 154, 0.05)',
      bottomLineColor: 'rgba(239, 83, 80, 1)',
      bottomFillColor1: 'rgba(239, 83, 80, 0.05)',
      bottomFillColor2: 'rgba(239, 83, 80, 0.4)',
    });
    baselineSeries.setData(sparklineData);

    const handleResize = () => {
      chart.applyOptions({ width: chartContainerRef.current!.clientWidth });
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      chart.remove();
    };
  }, [sparklineData]);

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
        <div ref={chartContainerRef} className="w-full h-[300px]" />
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
    </div>
  );
};

export default CoinDetailPage;
