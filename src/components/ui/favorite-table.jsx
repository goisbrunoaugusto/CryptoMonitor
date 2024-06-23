import React, { useState, useEffect } from 'react';
import { HeartIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid';

function FavoriteTable() {
    const [data, setData] = useState([]);
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
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
            .catch(error => console.error('Error:', error));

        const savedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
        setFavorites(savedFavorites);
    }, []);

    const toggleFavorite = (coin) => {
        const isFavorite = favorites.some(fav => fav.id === coin.id);
        const updatedFavorites = isFavorite
            ? favorites.filter(fav => fav.id !== coin.id)
            : [...favorites, coin];

        setFavorites(updatedFavorites);
        localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    };

    // Filtra os dados para exibir apenas os favoritos
    const favoriteData = data.filter(coin => favorites.some(fav => fav.id === coin.id));

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
                    {favoriteData.sort((a, b) => b.price - a.price).map((row, index) => (
                        <tr key={index}>
                            <td className='px-16 text-left'>{row.coin}</td>
                            <td className='px-16 text-left'>$ {row.price}</td>
                            <td className={`px-16 text-left ${row.change < 0 ? 'text-red-500' : 'text-green-500'}`}>{row.change}</td>
                            <td className='px-16 flex justify-center'>
                                <button onClick={() => toggleFavorite(row)}>
                                    {favorites.some(fav => fav.id === row.id)
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

export default FavoriteTable;
