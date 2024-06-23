import React, { useState, useEffect } from 'react';
import { HeartIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid';
import Cookies from 'js-cookie';

function HomeTable() {
    const [data, setData] = useState([]);
    const [favorites, setFavorites] = useState([]);
    const [userId, setUserId] = useState(null); // Estado para armazenar o userId

    useEffect(() => {
        // Função para obter userId do cookie
        const fetchUserIdFromCookie = () => {
            const userIdFromCookie = Cookies.get('userId');
            if (userIdFromCookie) {
                setUserId(userIdFromCookie);
            } else {
                console.error('UserId not found in cookie.');
            }
        };

        fetchUserIdFromCookie(); // Chamada inicial para carregar userId

        // Fetch para obter dados de ativos
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

        // Fetch para obter favoritos do usuário
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
        const isFavorite = favorites.some(fav => fav.coinId === coin.id);
        const updatedFavorites = isFavorite
            ? favorites.filter(fav => fav.coinId !== coin.id)
            : [...favorites, { coinId: coin.id, coinName: coin.coin }];

        setFavorites(updatedFavorites);

        try {
            if (isFavorite) {
                await fetch(`/api/favorites/${userId}/${coin.id}`, {
                    method: 'DELETE',
                });
            } else {
                await fetch('/api/favorites', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ userId, coinId: coin.id, coinName: coin.coin }),
                });
            }
        } catch (error) {
            console.error('Error toggling favorite:', error);
        }
    };

    // Função para verificar se um determinado coinId está presente nos favoritos
    const isFavorite = (coinId) => {
        return favorites.some(fav => fav.coinId === coinId);
    };

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
                            <td className='px-16 flex justify-center'>
                                <button onClick={() => toggleFavorite(row)}>
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
}

export default HomeTable;
