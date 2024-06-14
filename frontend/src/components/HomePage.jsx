import SearchResultList from './SearchResultList';
import SelectedStock from './SelectedStock';
import WatchlistSidebar from './WatchlistSidebar';
import WatchlistMain from './WatchlistMain';
import Carousel from './Carousel'
import '../styles/HomePage.css'
import axios from 'axios';
import React, { useState, useEffect } from 'react';

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
  fetchSelectedStockData
}) {

  console.log("In Home Page, Current Item Id:", currentItemId);
  console.log("FavStocks:", favStocks);
  console.log("FavStocks.data:", favStocks.data);

  return (
    <div className='home-page-container'>
            <Carousel/>
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

          <WatchlistMain
            favStocks={favStocks}
            setCurrentItemId={setCurrentItemId}
            fetchSelectedStockData={fetchSelectedStockData}
          />
          </div>
        )}
      </div>
    </div>
  )
}

export default HomePage;