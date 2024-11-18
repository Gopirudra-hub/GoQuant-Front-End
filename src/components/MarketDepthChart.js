"use client"
import { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import 'chart.js/auto';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default function MarketDepthChart() {
    const [chartData, setChartData] = useState({
        labels: [],
        datasets: [
            {
                label: 'Market Depth (Bids)',
                data: [],
                borderColor: 'rgba(34, 197, 94, 1)',
                backgroundColor: 'rgba(34, 197, 94, 0.2)',
                fill: true,
                tension: 0.4,
            },
            {
                label: 'Market Depth (Asks)',
                data: [],
                borderColor: 'rgba(239, 68, 68, 1)',
                backgroundColor: 'rgba(239, 68, 68, 0.2)',
                fill: true,
                tension: 0.4,
            },
        ],
    });

    useEffect(() => {
        const fetchMarketDepth = async () => {
            const response = await fetch('https://api.binance.com/api/v3/depth?symbol=BTCUSDT&limit=10');
            const data = await response.json();

            const bids = data.bids.map(bid => ({ price: parseFloat(bid[0]), quantity: parseFloat(bid[1]) }));
            const asks = data.asks.map(ask => ({ price: parseFloat(ask[0]), quantity: parseFloat(ask[1]) }));

            setChartData({
                labels: [...bids.map(bid => bid.price), ...asks.map(ask => ask.price)],
                datasets: [
                    {
                        ...chartData.datasets[0],
                        data: bids.map(bid => bid.quantity),
                    },
                    {
                        ...chartData.datasets[1],
                        data: asks.map(ask => ask.quantity),
                    },
                ],
            });
        };

        fetchMarketDepth();
        const interval = setInterval(fetchMarketDepth, 1000);
        return () => clearInterval(interval);
    }, []);

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            tooltip: {
                backgroundColor: 'rgba(0, 0, 0, 0.7)',
                titleColor: '#fff',
                bodyColor: '#fff',
                callbacks: {
                    label: function (tooltipItem) {
                        return `${tooltipItem.dataset.label}: ${tooltipItem.raw.toFixed(2)}`;
                    },
                },
            },
            legend: {
                position: 'top',
                labels: {
                    font: {
                        size: 14,
                        weight: 'bold',
                        color: '#fff',
                    },
                },
            },
        },
        scales: {
            x: {
                ticks: {
                    font: {
                        size: 14,
                        weight: 'bold',
                        color: '#fff',
                    },
                    color: '#fff',
                },
                grid: {
                    color: '#444',
                },
            },
            y: {
                ticks: {
                    font: {
                        size: 14,
                        weight: 'bold',
                        color: '#fff',
                    },
                    color: '#fff',
                },
                grid: {
                    color: '#444',
                },
            },
        },
        elements: {
            point: {
                radius: 0,
            },
        },
    };

    return (
        <div className="bg-gray-800 p-4 rounded-md shadow-lg">
            <h2 className="text-lg font-bold text-white mb-4">Market Depth Chart</h2>
            <div className="relative h-72 w-full bg-black rounded-md shadow-md">
                <Line data={chartData} options={options} />
            </div>
        </div>
    );
}
