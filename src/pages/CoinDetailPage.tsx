import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export const CoinDetailPage = () => {
  const { coinId } = useParams();
  const [coin, setCoin] = useState<any>(null);

  useEffect(() => {
    if (coinId) {
      const headers = {
        accept: "application/json",
        "x-cg-demo-api-key": import.meta.env.VITE_COINGECKO_DEMO_API_KEY,
      } as any;

      axios
        .get(`https://api.coingecko.com/api/v3/coins/${coinId}`, { headers })
        .then((res) => {
          setCoin(res.data);
        })
        .catch((err) => {
          console.error("Error fetching coin data: ", err);
        });
    }
  }, [coinId]);

  if (!coin) {
    return <div className="p-4">Loading...</div>;
  }

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <div className="flex items-center gap-4">
        <img src={coin.image?.large} alt={coin.name} className="h-16 w-16" />
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
          {coin.name}
        </h1>
      </div>
      <p className="mt-4 text-gray-700 dark:text-gray-300">
        Current Price: $
        {coin.market_data?.current_price?.usd?.toLocaleString()}
      </p>
    </div>
  );
};

export default CoinDetailPage;
