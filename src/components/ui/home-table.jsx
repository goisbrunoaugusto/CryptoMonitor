import React, { useState, useEffect } from 'react';
import { HeartIcon } from '@heroicons/react/24/outline';

function HomeTable() {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch('https://api.coincap.io/v2/assets')
            .then(response => response.json())
            .then(data => {
                const formattedData = data.data.map(asset => ({
                    coin: asset.name,
                    price: parseFloat(asset.priceUsd).toFixed(4),
                    change: parseFloat(asset.changePercent24Hr).toFixed(2),
                }));
                setData(formattedData);
            })
            .catch(error => console.error('Error:', error));
    }, []);
    return (
        <div className='flex justify-center mt-20'>
            <table className='bg-slate-200 py-5 '>
                <thead>
                    <tr>
                        <th className='px-16 text-left'>Coin</th>
                        <th className='px-16 text-left'>Price</th>
                        <th className='px-16 text-left'>% 24h</th>
                        <th className='px-16 text-left'>Favorite</th>
                    </tr>
                </thead>
                <tbody>
                    {data.sort((a, b) => b.price - a.price).map((row, index) => (
                        <tr key={index}>
                            <td className='px-16 text-left'>{row.coin}</td>
                            <td className='px-16 text-left'>$ {row.price}</td>
                            <td className={`px-16 text-left ${row.change < 0 ? 'text-red-500' : 'text-green-500'}`}>{row.change}</td>
                            <td className='px-16 flex justify-center'> <HeartIcon className='size-6'></HeartIcon> </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default HomeTable;