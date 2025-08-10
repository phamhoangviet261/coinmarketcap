import { Ticker } from '@/type';
import { formatNumberShort } from '@/utils/number';
import React from 'react';

interface Props {
  tickers: Ticker[];
}

const TrustDot: React.FC<{ score: Ticker['trust_score'] }> = ({ score }) => {
  let color = 'bg-gray-400';
  if (score === 'green') color = 'bg-green-500';
  if (score === 'yellow') color = 'bg-yellow-400';
  if (score === 'red') color = 'bg-red-500';
  return <span className={`inline-block w-3 h-3 rounded-full ${color}`} />;
};

export const TickerTable: React.FC<Props> = ({ tickers }) => {
  // Sort by highest USD volume
  const sorted = [...tickers].sort(
    (a, b) => (b.converted_volume?.usd ?? 0) - (a.converted_volume?.usd ?? 0)
  );

  return (
    <div className="overflow-x-auto rounded-lg shadow">
      <table className="min-w-full border-collapse ">
        <thead className=" ">
          <tr>
            <th className="px-4 py-2 text-left">#</th>
            <th className="px-4 py-2 text-left">Exchange</th>
            <th className="px-4 py-2 text-left">Pair</th>
            <th className="px-4 py-2 text-right">Last Price (USD)</th>
            <th className="px-4 py-2 text-right">24h Volume</th>
            <th className="px-4 py-2 text-right">Spread</th>
            <th className="px-4 py-2 text-center">Trust</th>
            <th className="px-4 py-2 text-center">Trade</th>
          </tr>
        </thead>
        <tbody>
          {sorted.map((t, i) => (
            <tr key={i} className="border-t hover:bg-gray-900 cursor-pointer">
              <td className="px-4 py-2">{i + 1}</td>
              <td className="px-4 py-2">{t.market.name}</td>
              <td className="px-4 py-2">
                {t.base}/{t.target}
              </td>
              <td className="px-4 py-2 text-right">
                {t.converted_last?.usd
                  ? `$${t.converted_last.usd.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}`
                  : '-'}
              </td>
              <td className="px-4 py-2 text-right">
                {t.converted_volume?.usd
                  ? `$${formatNumberShort(t.converted_volume.usd)}`
                  : '-'}
              </td>
              <td className="px-4 py-2 text-right">
                {t.bid_ask_spread_percentage != null
                  ? `${t.bid_ask_spread_percentage.toFixed(2)}%`
                  : '-'}
              </td>
              <td className="px-4 py-2 text-center">
                <TrustDot score={t.trust_score} />
              </td>
              <td className="px-4 py-2 text-center">
                {t.trade_url ? (
                  <a
                    href={t.trade_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    Trade
                  </a>
                ) : (
                  '-'
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
