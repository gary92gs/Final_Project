import '../styles/ItemFavButton.css'
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ItemFavButton({ setFavStocks, favStocks, currentItemId, setCurrentItemId, fetchFavData }) {
// Implement useState hook to manage the state of favourite Stock Id's - set state to empty array
const [favouriteStockIds, setFavouriteStockIds] = useState([]);
  // Update the list of favorite stock IDs when the list of favorite stocks changes.
  useEffect(() => {
    // Check if there are favorite stocks and if the array is not empty
    if (favStocks && favStocks.length > 0) {
      // Extract the IDs from the list of favorite stocks
      const ids = favStocks.map(stock => stock.id);
      // Update the state with the new list of favorite stock IDs
      setFavouriteStockIds(ids);
    } else {
      // If there are no favorite stocks or the array is empty, set the list of favorite stock IDs to an empty array
      setFavouriteStockIds([]);
    }
  }, [favStocks]);

  const toggleFavorite = (stock_id) => {
    if (favouriteStockIds.includes(stock_id)) { // Check if the current item ID is in the list of favorite stock IDs
      axios.delete('/api/favourites', { data: { stock_id } })
        .then(response => {
          fetchFavData(); // Fetch favorite data after removing from favorites
          console.log('Delete Response:', response.data);
        })
        .catch(error => {
          console.error('There was an error!', error);
        });
    } else {
      axios.post('/api/favourites', { stock_id })

        .then(response => {
          fetchFavData(); // Fetch favorite data after adding to favorites
          console.log('Post Response:', response.data);
        })
        .catch(error => {
          console.error('There was an error!', error);
        });
    }
    setCurrentItemId(stock_id) // Set the current item ID
  };

  return (
    <button className='fav-button' onClick={() => toggleFavorite(currentItemId)}>
      {favouriteStockIds.includes(currentItemId) ? 'Remove from Watchlist' : 'Add to Watchlist'}
    </button>
  );
}

export default ItemFavButton;
