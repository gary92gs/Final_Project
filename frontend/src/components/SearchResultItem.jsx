import { React, useState } from 'react';
import '../styles/SearchResultList.css'
import axios from 'axios';

function SearchResultItem ({symbol, name, setCurrentItemId, setStockData, fetchSelectedStockData}) {
let tickerSymbol = {tickerSymbol: symbol}

  return (
    <div className='search-result-item' onClick={() => fetchSelectedStockData(tickerSymbol)}>
      <span className='search-result-symbol'>{symbol}</span> - <span className='search-result-name'>{name}</span>
    </div>
  )
  
}

export default SearchResultItem;