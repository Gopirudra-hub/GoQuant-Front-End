"use client";
import { useState, useEffect } from "react";

export default function OrderBook() {
    const [orderBook, setOrderBook] = useState({ bids: [], asks: [] });

    // Fetch orderbook data from Binance API
    useEffect(() => {
        const fetchOrderBook = async () => {
            const response = await fetch(
                "https://api.binance.com/api/v3/depth?symbol=BTCUSDT&limit=10"
            );
            const data = await response.json();
            setOrderBook({ bids: data.bids, asks: data.asks });
        };

        fetchOrderBook();

        const interval = setInterval(fetchOrderBook, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div>
            <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-4">
                Real-Time Order Book (BTC-USD)
            </h2>
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <h3 className="font-bold text-green-500 dark:text-green-300 mb-2">
                        Bids (Buy Orders)
                    </h3>
                    <table className="w-full table-auto text-sm">
                        <thead>
                            <tr>
                                <th className="border p-2 bg-gray-100 dark:bg-gray-700">
                                    Price (USD)
                                </th>
                                <th className="border p-2 bg-gray-100 dark:bg-gray-700">
                                    Quantity
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {orderBook.bids.map((bid, idx) => (
                                <tr
                                    key={idx}
                                    className="bg-green-50 dark:bg-green-900 text-green-800 dark:text-green-300"
                                >
                                    <td className="border p-2">{bid[0]}</td>
                                    <td className="border p-2">{bid[1]}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div>
                    <h3 className="font-bold text-red-500 dark:text-red-300 mb-2">
                        Asks (Sell Orders)
                    </h3>
                    <table className="w-full table-auto text-sm">
                        <thead>
                            <tr>
                                <th className="border p-2 bg-gray-100 dark:bg-gray-700">
                                    Price (USD)
                                </th>
                                <th className="border p-2 bg-gray-100 dark:bg-gray-700">
                                    Quantity
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {orderBook.asks.map((ask, idx) => (
                                <tr
                                    key={idx}
                                    className="bg-red-50 dark:bg-red-900 text-red-800 dark:text-red-300"
                                >
                                    <td className="border p-2">{ask[0]}</td>
                                    <td className="border p-2">{ask[1]}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
