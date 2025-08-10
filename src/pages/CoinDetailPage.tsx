import { useEffect, useMemo, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useCryptoData } from '@/hooks/useCryptoData';
import {
  createChart,
  ColorType,
  BaselineSeries,
  UTCTimestamp,
} from 'lightweight-charts';
import Box from '@/components/ui/Box';
import { CoinDetail } from '@/type';
import { formatNumberShort } from '@/utils/number';
import { TickerTable } from '@/components/TickerTable/TickerTable';
import { Chip } from '@/components/Chip/Chip';
import { LinksPanel } from '@/components/LinksPanel/LinksPanel';

export const CoinDetailPage = () => {
  const { coinId } = useParams();
  const { cryptosDetail, fetchCryptosById } = useCryptoData();
  console.log('🚀 ~ CoinDetailPage ~ cryptosDetail:', cryptosDetail);

  const chartContainerRef = useRef<HTMLDivElement>(null);
  const now = Math.floor(Date.now() / 1000);
  const sparklineData =
    cryptosDetail?.market_data?.sparkline_7d?.price?.map(
      (p: any, idx: any, arr: any) =>
        ({
          time: (now - (arr.length - idx) * 3600) as UTCTimestamp,
          value: p,
        } as const)
    ) || [];

  useEffect(() => {
    if (coinId) {
      fetchCryptosById(coinId);
    }
  }, [coinId]);

  useEffect(() => {
    if (
      !cryptosDetail ||
      sparklineData.length === 0 ||
      !chartContainerRef.current
    )
      return;
    const chart = createChart(chartContainerRef.current, {
      width: chartContainerRef.current.clientWidth,
      height: 500,
      layout: {
        background: { type: ColorType.Solid, color: 'transparent' },
        textColor: '#A1A7BB',
      },
      grid: {
        vertLines: { color: '#e0e0e0', visible: false },
        horzLines: { color: '#A1A7BB', style: 1 },
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
  }, [cryptosDetail, sparklineData]);

  if (!cryptosDetail) {
    return <div className="p-4">Loading...</div>;
  }

  const detail = cryptosDetail as CoinDetail;

  const extractMetrics = (data: CoinDetail, ccy: string = 'usd') => {
    const md = data.market_data;
    const marketCap = md.market_cap?.[ccy] ?? null;
    const volume24h = md.total_volume?.[ccy] ?? null;

    let fdv = md.fully_diluted_valuation?.[ccy] ?? null;
    if (
      fdv == null &&
      md.current_price?.[ccy] != null &&
      md.max_supply != null
    ) {
      fdv = md.current_price[ccy] * md.max_supply;
    }

    const volToMktCap24h =
      typeof marketCap === 'number' &&
      marketCap > 0 &&
      typeof volume24h === 'number'
        ? volume24h / marketCap
        : null;

    return {
      marketCap,
      volume24h,
      fdv,
      volToMktCap24h,
      totalSupply: md.total_supply ?? null,
      maxSupply: md.max_supply ?? null,
      circulatingSupply: md.circulating_supply ?? null,
    };
  };

  return (
    <div className="w-full">
      <div className="p-4 mx-auto flex gap-4">
        <div className="w-1/5 space-y-4">
          <div className="flex items-center gap-4">
            <img
              src={detail.image?.large}
              alt={detail.name}
              className="h-8 w-8"
            />
            <div>
              <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
                {detail.name} #{detail.market_cap_rank}
              </h1>
              <p className="uppercase text-gray-500 dark:text-gray-400">
                {detail.symbol}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4">
            <Box>
              <div className="flex flex-col justify-center items-center">
                <p className="text-sm text-[#A1A7BB]">Market Cap:</p>
                <p className="font-bold text-base">
                  ${formatNumberShort(extractMetrics(detail).marketCap)}
                </p>
              </div>
            </Box>
            <div className="grid grid-cols-2 gap-4">
              <Box>
                <div className="flex flex-col justify-center items-center">
                  <p className="text-sm text-[#A1A7BB]">Volume (24h):</p>
                  <p className="font-bold text-base">
                    ${formatNumberShort(extractMetrics(detail).volume24h)}
                  </p>
                </div>
              </Box>
              <Box>
                <div className="flex flex-col justify-center items-center">
                  <p className="text-sm text-[#A1A7BB]">FDV:</p>
                  <p className="font-bold text-base">
                    ${formatNumberShort(extractMetrics(detail).fdv || 0)}
                  </p>
                </div>
              </Box>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Box>
                <div className="flex flex-col justify-center items-center">
                  <p className="text-sm text-[#A1A7BB]">Vol/Mkt Cap (24h):</p>
                  <p className="font-bold text-base">
                    {formatNumberShort(
                      extractMetrics(detail).volToMktCap24h || 0
                    ).slice(0, 5)}
                  </p>
                </div>
              </Box>
              <Box>
                <div className="flex flex-col justify-center items-center">
                  <p className="text-sm text-[#A1A7BB]">Total supply:</p>
                  <p className="font-bold text-base">
                    {formatNumberShort(extractMetrics(detail).totalSupply || 0)}
                  </p>
                </div>
              </Box>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Box>
                <div className="flex flex-col justify-center items-center">
                  <p className="text-sm text-[#A1A7BB]">Max. supply:</p>
                  <p className="font-bold text-base">
                    {formatNumberShort(extractMetrics(detail).maxSupply || 0)}
                  </p>
                </div>
              </Box>
              <Box>
                <div className="flex flex-col justify-center items-center">
                  <p className="text-sm text-[#A1A7BB]">Circulating supply:</p>
                  <p className="font-bold text-base">
                    {formatNumberShort(
                      extractMetrics(detail).circulatingSupply || 0
                    )}
                  </p>
                </div>
              </Box>
            </div>
          </div>
        </div>

        <div className="w-3/5 bg-[#0d1421] p-4 rounded shadow">
          <div ref={chartContainerRef} className="w-full h-[500px]" />
          <TickerTable tickers={detail.tickers || []} />
        </div>

        <div className="w-1/5">
          {detail.description?.en && (
            <div className="bg-[#0d1421] p-4 rounded shadow h-full overflow-y-auto">
              <div className="flex gap-2 flex-wrap">
                {detail.categories?.map((cate, index) => (
                  <Chip
                    color="green"
                    variant="solid"
                    onRemove={() => console.log('removed')}
                  >
                    {cate}
                  </Chip>
                ))}
              </div>
              <LinksPanel links={detail.links} />
              <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 my-4">
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
    </div>
  );
};

export default CoinDetailPage;
