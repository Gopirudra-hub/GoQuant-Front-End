import OrderBook from '../components/OrderBook';
import SpreadIndicator from '../components/SpreadIndicator';
import OrderbookImbalance from '../components/OrderbookImbalance';
import MarketDepthChart from '../components/MarketDepthChart';

export default function Home() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 py-8">
      <div className="bg-white dark:bg-gray-800 p-4 rounded-md shadow-lg">
        <OrderBook />
      </div>
      <div className="flex flex-col gap-6">
        <SpreadIndicator />
        <OrderbookImbalance />
      </div>
      <div className="col-span-1 lg:col-span-2">
        <MarketDepthChart />
      </div>
    </div>
  );
}
