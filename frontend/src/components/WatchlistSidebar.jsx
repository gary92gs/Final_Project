import React from 'react';
import WatchlistSidebarItem from './WatchlistSidebarItem';
import '../styles/WatchlistSidebar.css';

const WatchlistSidebar = ({ favStocks, setCurrentItemId, currentItemId, fetchSelectedStockData }) => {

  return (
    <div className="watchlist-sidebar">
      <h1>Your Watchlist</h1>
      <ul>
        {favStocks && favStocks.length > 0 ? ( /* Check if favStocks is not null and has items */
          favStocks.map((favStock, index) => ( /* Map through the favStocks array */
            <WatchlistSidebarItem
              key={index} /* Use index as key since id might not be unique */
              favStock={favStock}
              setCurrentItemId={setCurrentItemId}
              currentItemId={currentItemId}
              fetchSelectedStockData={fetchSelectedStockData}
            />
          ))
        ) : (
          <li>No favorite stocks added.</li> /* Display message when no favorite stocks are available */
        )}
      </ul>
    </div>
  );
};

export default WatchlistSidebar;