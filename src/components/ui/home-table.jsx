import React, { useState, useEffect } from 'react';
import { HeartIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid';
import Cookies from 'js-cookie';

function HomeTable() {
    const [data, setData] = useState([]);
    const [favorites, setFavorites] = useState([]);
    const [userId, setUserId] = useState(null); // Estado para armazenar o userId

    useEffect(() => {
        const fetchUserIdFromCookie = () => {
            const userIdFromCookie = Cookies.get('userId');
            if (userIdFromCookie) {
                setUserId(userIdFromCookie);
            } else {
                console.error('UserId not found in cookie.');
            }
        };

        fetchUserIdFromCookie(); // Chamada inicial para carregar userId

        fetch('https://api.coincap.io/v2/assets')
            .then(response => response.json())
            .then(data => {
                const formattedData = data.data.map(asset => ({
                    id: asset.id,
                    coin: asset.name,
                    price: parseFloat(asset.priceUsd).toFixed(4),
                    change: parseFloat(asset.changePercent24Hr).toFixed(2),
                }));
                setData(formattedData);
            })
            .catch(error => console.error('Error fetching assets:', error));

        if (userId) {
            fetch(`/api/favorites/${userId}`)
                .then(response => response.json())
                .then(data => {
                    setFavorites(data);
                })
                .catch(error => console.error('Error fetching favorites:', error));
        }
    }, [userId]);

    const toggleFavorite = async (coin) => {
        try {
            const isFavorite = favorites.some(fav => fav.coinId === coin.id);

            if (isFavorite) {
                await fetch(`/api/favorites/${userId}/${coin.id}`, {
                    method: 'DELETE',
                });
                setFavorites(favorites.filter(fav => fav.coinId !== coin.id));
            } else {
                await fetch('/api/favorites', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ userId, coinId: coin.id, coinName: coin.coin }),
                });
                setFavorites([...favorites, { userId, coinId: coin.id, coinName: coin.coin }]);
            }
        } catch (error) {
            console.error('Error toggling favorite:', error);
        }
    };

    const isFavorite = (coinId) => {
        return favorites.some(fav => fav.coinId === coinId);
    };

    const renderTable = (tableData) => (
        <div className='shadow-md rounded-lg overflow-hidden'>
            <table className='min-w-full bg-slate-200'>
                <thead className='bg-slate-200'>
                    <tr>
                        <th className='px-4 py-3 text-left text-sm font-medium text-gray-700 uppercase tracking-wider'>Coin</th>
                        <th className='px-4 py-3 text-left text-sm font-medium text-gray-700 uppercase tracking-wider'>Price</th>
                        <th className='px-4 py-3 text-left text-sm font-medium text-gray-700 uppercase tracking-wider'>% 24h</th>
                        <th className='px-4 py-3 text-left text-sm font-medium text-gray-700 uppercase tracking-wider'>Favorite</th>
                    </tr>
                </thead>
                <tbody className='divide-y divide-gray-200'>
                    {tableData.sort((a, b) => b.price - a.price).map((row, index) => (
                        <tr key={index} className='bg-white'>
                            <td className='px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900'>{row.coin}</td>
                            <td className='px-4 py-4 whitespace-nowrap text-sm text-gray-700'>$ {row.price}</td>
                            <td className={`px-4 py-4 whitespace-nowrap text-sm ${row.change < 0 ? 'text-red-700' : 'text-green-700'}`}>{row.change} %</td>
                            <td className='px-4 py-4 whitespace-nowrap text-right text-sm font-medium'>
                                <button onClick={() => toggleFavorite(row)} className='flex items-center justify-center'>
                                    {isFavorite(row.id)
                                        ? <HeartIconSolid className='h-6 w-6 text-red-500' />
                                        : <HeartIcon className='h-6 w-6' />
                                    }
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );

    // Dividir os dados em duas colunas
    const midIndex = Math.ceil(data.length / 2);
    const firstColumnData = data.slice(0, midIndex);
    const secondColumnData = data.slice(midIndex);

    return (
        <div className='flex justify-center mt-10 mb-10 px-4'>
            <div className='w-full max-w-6xl'>
                <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
                    <div className='overflow-x-auto'>
                        {renderTable(firstColumnData)}
                    </div>
                    <div className='overflow-x-auto'>
                        {renderTable(secondColumnData)}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HomeTable;
