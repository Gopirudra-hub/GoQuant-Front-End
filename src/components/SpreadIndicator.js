"use client";
import { useState, useEffect } from "react";

export default function SpreadIndicator() {
    const [spread, setSpread] = useState(0);

    // Fetch the spread from the Binance API
    useEffect(() => {
        const fetchSpread = async () => {
            const response = await fetch(
                "https://api.binance.com/api/v3/depth?symbol=BTCUSDT&limit=1"
            );
            const data = await response.json();
            const bid = parseFloat(data.bids[0][0]);
            const ask = parseFloat(data.asks[0][0]);
            setSpread(ask - bid); // Set the spread value
        };

        fetchSpread();
        const interval = setInterval(fetchSpread, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="bg-gradient-to-r from-blue-500 to-indigo-500 dark:from-blue-800 dark:to-indigo-800 p-6 rounded-xl shadow-xl text-center">
            <h2 className="text-xl font-semibold text-white mb-2">
                Spread Indicator
            </h2>
            <p className="text-2xl font-bold text-white dark:text-blue-300">
                {spread.toFixed(2)} USD
            </p>
        </div>
    );
}
