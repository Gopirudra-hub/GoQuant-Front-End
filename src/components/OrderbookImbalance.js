"use client";
import { useState, useEffect } from "react";

export default function OrderbookImbalance() {
    const [imbalance, setImbalance] = useState(0);

    // Fetch the order book data from Binance API and calculate imbalance
    useEffect(() => {
        const fetchOrderBook = async () => {
            const response = await fetch(
                "https://api.binance.com/api/v3/depth?symbol=BTCUSDT&limit=10"
            );
            const data = await response.json();

            const totalBids = data.bids.reduce((acc, bid) => acc + parseFloat(bid[1]), 0);
            const totalAsks = data.asks.reduce((acc, ask) => acc + parseFloat(ask[1]), 0);

            const imbalanceValue = ((totalBids - totalAsks) / (totalBids + totalAsks)) * 100;
            setImbalance(imbalanceValue);
        };

        fetchOrderBook();
        const interval = setInterval(fetchOrderBook, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="bg-gradient-to-r from-yellow-400 to-orange-500 dark:from-yellow-600 dark:to-orange-700 p-6 rounded-xl shadow-lg text-center">
            <h2 className="text-xl font-semibold text-white mb-2">
                Orderbook Imbalance
            </h2>
            <p className="text-2xl font-bold text-white dark:text-yellow-300">
                {imbalance.toFixed(2)}%
            </p>
        </div>
    );
}
