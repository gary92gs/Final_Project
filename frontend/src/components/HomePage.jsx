import SearchResultList from './SearchResultList';
import SelectedStock from './SelectedStock';
import WatchlistSidebar from './WatchlistSidebar';
import WatchlistMain from './WatchlistMain';
import Carousel from './Carousel';
import '../styles/HomePage.css';
import React from 'react';

function HomePage({
  fetchFavData,
  favStocks,
  setFavStocks,
  searchResults,
  currentItemId,
  setCurrentItemId,
  isMobile,
  setStockData,
  stockData,
  fetchSelectedStockData,
  trendingStocks,
}) {

  return (
    <div className='home-page-container'>
      <Carousel 
        trendingStocks={trendingStocks} 
        currentItemId={currentItemId} 
        setCurrentItemId={setCurrentItemId}
        fetchSelectedStockData={fetchSelectedStockData}
        />
      <div className='home-page-container2'>

        {!isMobile() ? (
          <WatchlistSidebar
            favStocks={favStocks}
            setCurrentItemId={setCurrentItemId}
            fetchFavData={fetchFavData} // Pass fetchFavData function to the WatchlistSidebar
            fetchSelectedStockData={fetchSelectedStockData}
          />
        ) : undefined}

        {searchResults.length > 0 && currentItemId === null ? (
          <SearchResultList
            searchResults={searchResults}
            setCurrentItemId={setCurrentItemId}
            setStockData={setStockData}
            fetchSelectedStockData={fetchSelectedStockData}
          />
        ) : currentItemId !== null ? (
          <SelectedStock
            currentItemId={currentItemId}
            setCurrentItemId={setCurrentItemId}
            isMobile={isMobile}
            stockData={stockData}
            setFavStocks={setFavStocks} // changed to setFavStocks
            favStocks={favStocks}
            fetchFavData={fetchFavData} // Pass fetchFavData function to the SelectedStock
          />
        ) : (
          <div className='homepage-sub-container'>
            { favStocks.length > 0 ? (
              <WatchlistMain
                favStocks={favStocks}
                setCurrentItemId={setCurrentItemId}
                fetchSelectedStockData={fetchSelectedStockData}
              />
            ) : (
              <div className='no-favourites'> No Favourite Stocks Added</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default HomePage;