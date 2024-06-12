import {React, } from "react";
import "../styles/WatchlistMainItem.css";

const WatchlistMainItem = ({
  onClick, //PASSED DOWN HANDLER
  favStock,
  fetchSelectedStockData,
}) => {
  
  let tickerSymbol = { tickerSymbol: favStock.ticker_symbol}
  
  return (
    <div className="watchlist-main-item" onClick={() => fetchSelectedStockData(tickerSymbol)}>
      <img src={favStock.image_url} alt={`${favStock.company_name} logo`} className="stock-image" />
      <div className="stock-details">
        <div className='watchlist-main-item-headers'>    
          <h2> {favStock.ticker_symbol} </h2>
          <h3> {favStock.company_name} </h3>
          <h4>Country: {favStock.country}</h4> 
        </div>
        <div className="stock-description">
        <p> {favStock.description} </p>
        </div>
      </div>
    </div>
  );
};


export default WatchlistMainItem;