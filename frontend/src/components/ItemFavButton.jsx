import React, { useState } from 'react';

function ItemFavButton() {
  const [isFavorited, setIsFavorited] = useState(false);

  const toggleFavorite = () => {
    setIsFavorited(!isFavorited);
  };

  return (
    <button onClick={toggleFavorite}>
      {isFavorited ? 'Remove from Watchlist' : 'Add to Watchlist'}
    </button>
  );
}

export default ItemFavButton;
