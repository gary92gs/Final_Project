import '../styles/ItemFavButton.css'
import React, { useState } from 'react';
import axios from 'axios';

function ItemFavButton({setFavStocks, favStocks, currentItemId, setCurrentItemId, fetchFavData }) {
  console.log('FavStocks.data.userFavourites: ', favStocks.data.userFavourites)

  const favStocksIds =[]
  for (let stock in favStocks.data.userFavourites) {
    favStocksIds.push(favStocks.data.userFavourites[stock].id)
  }
  console.log('favStocksIds', favStocksIds)

  const toggleFavorite = (stock_id) => {
    if (favStocksIds.includes(currentItemId)) {
      axios.delete('/api/favourites', { data: {stock_id} })

      .then(response => {
          fetchFavData();
          console.log('Post Response:', response.data);

      })
      .catch(error => {
          console.error('There was an error!', error);
      });

    } else {
    
    axios.post('/api/favourites', {stock_id})

      .then(response => {
          fetchFavData();
          console.log('Post Response:', response.data);
      })
      .catch(error => {
          console.error('There was an error!', error);
      });
    }
    setCurrentItemId(currentItemId)
  };

  return (
    <button className='fav-button' onClick={() => toggleFavorite(currentItemId)}>
      {favStocksIds.includes(currentItemId) ? 'Remove from Watchlist' : 'Add to Watchlist'}
    </button>
  );
}

export default ItemFavButton;
