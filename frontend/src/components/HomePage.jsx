import WatchlistSidebar from './WatchlistSidebar';
import WatchlistMain from './WatchlistMain'
import SearchResultList from './SearchResultList';
import SelectedStock from './SelectedStock';
import '../styles/HomePage.css'
import axios from 'axios';
import React, { useState, useEffect } from 'react';

function HomePage({favStocks, setFavStocks, searchResults, currentItemId, setCurrentItemId, isMobile, setStockData, stockData }) {
  console.log("In Home Page, Current Item Id " , currentItemId)
  console.log("FavStocks:", favStocks)
  console.log('FavStocks.data: ', favStocks.data)
 

  
  const fetchFavData = async () => { //fetch's data
    try {
      const response = await axios.get('/api/favourites');
      setFavStocks(response)

    } catch (error) {
      console.error(`Error fetching data: ${error.message}`);
    }
  };

  useEffect(() => {
    fetchFavData();
  }, []);

  return (
    <div className='home-page-container'>
      <div className='home-page-container2'>
          {!isMobile() ? (
            <WatchlistSidebar favStocks={favStocks} setCurrentItemId={setCurrentItemId} currentItemId={currentItemId} />

          ) : undefined}


          {searchResults.length > 0 && currentItemId === null ? (
          <SearchResultList searchResults={searchResults} setCurrentItemId={setCurrentItemId} setStockData={setStockData} />
        ) : currentItemId !== null ? (
          <SelectedStock currentItemId={currentItemId} setCurrentItemId={setCurrentItemId} isMobile={isMobile} stockData={stockData} setfavStocks={setFavStocks} favStocks={favStocks} fetchFavData={fetchFavData}/>
        ) : (
          <WatchlistMain favStocks={favStocks} setCurrentItemId={setCurrentItemId} />
        )}

      </div>   
    </div>
  )
}

export default HomePage