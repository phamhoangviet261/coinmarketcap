import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useCryptoData } from '@/hooks/useCryptoData';

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

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <div className="flex items-center gap-4">
        <img
          src={cryptosDetail.image?.large}
          alt={cryptosDetail.name}
          className="h-16 w-16"
        />
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
          {cryptosDetail.name}
        </h1>
      </div>
      <p className="mt-4 text-gray-700 dark:text-gray-300">
        Current Price: $
        {cryptosDetail.market_data?.current_price?.usd?.toLocaleString()}
      </p>
    </div>
  );
};

export default CoinDetailPage;
